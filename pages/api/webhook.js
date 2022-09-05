import { buffer } from "micro"
import * as admin from "firebase-admin"

const serviceAccount = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
    client_cert_url: process.env.CLIENT_CERT_URL
}

const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const secret = process.env.STRIPE_SIGNING_SECRET

const fulfillOrder = async (session) => {
    return app
        .firestore()
        .collection("users")
        .doc(session.metadata.address)
        .collection("orders")
        .doc(session.id)
        .set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metadata.images),
            type: "card",
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        })
}

export default async (req, res) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"]

        let event

        try {
            event = stripe.webhooks.constructEvent(payload, sig, secret);
        } catch (error) {
            return res.status(400).send(`Webhook error: ${error.message}`);
        }

        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object

                return fulfillOrder(session)
                    .then(() => res.status(200))
                    .catch((error) => res.status(400).send(`Webhook error: ${error.message}`));
            default:
                return
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
import { buffer } from "micro"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const secret = process.env.STRIPE_WEBHOOK_SECRET

const Moralis = require("moralis/node");

const fulfillOrder = async (session) => {
    await Moralis.start({
        appId: process.env.MORALIS_APP_ID,
        serverUrl: process.env.MORALIS_SERVER_URL
    })

    const Transaction = Moralis.Object.extend("Transactions");
    const transaction = new Transaction();

    transaction.set("order_id", session.id);
    transaction.set("type", "card");
    transaction.set("amount", session.amount_subtotal / 100);
    transaction.set("amount_shipping", session.shipping_options[0].shipping_amount / 100);
    transaction.set("user", session.metadata.user);
    transaction.set("images", JSON.parse(session.metadata.images));

    return await transaction.save();
}

export default async (req, res) => {
    if (req.method === "POST") {
        const reqBuffer = await buffer(req);
        const payload = reqBuffer.toString();
        const sig = req.headers["stripe-signature"]

        let event

        try {
            event = stripe.webhooks.constructEvent(payload, sig, secret);
        } catch (err) {
            console.log("ERROR:", err.message);
            return res.status(400).send(`Webhook error: ${err.message}`);
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object

            return fulfillOrder(session)
                .then((res) => res.status(200))
                .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
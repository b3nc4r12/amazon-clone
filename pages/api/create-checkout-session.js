const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, address } = req.body

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["US", "CA", "GB"]
        },
        shipping_rates: ["shr_1KbVoTLWkDDhDpEHFBBywU2U"],
        line_items: items.map((item) => ({
            description: item.description,
            quantity: 1,
            price_data: {
                currency: "usd",
                unit_amount: item.price * 100,
                product_data: {
                    name: item.title,
                    images: [item.image]
                }
            }
        })),
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/cart`,
        metadata: {
            address,
            images: JSON.stringify(items.map((item) => item.image))
        }
    })

    res.status(200).json({ id: session.id });
}
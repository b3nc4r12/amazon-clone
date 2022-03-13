import Head from "next/head"
import Image from "next/image"
import Header from "../components/Header"
import useCart from "../hooks/useCart"
import { useMoralis } from "react-moralis"
import CartProduct from "../components/CartProduct"
import Router from "next/router"
import { loadStripe } from "@stripe/stripe-js"
import { ethers } from "ethers"

const stripePromise = loadStripe(process.env.stripe_public_key);

const Cart = () => {
    const { isAuthenticated, authenticate, Moralis, user, setUserData } = useMoralis();
    const { cart, selectTotal, emptyCart } = useCart();
    const total = selectTotal(cart);

    const payWithCard = async () => {
        const stripe = await stripePromise

        const session = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: cart, user: user.get("ethAddress") })
        })
            .then(res => res.json());

        const result = await stripe.redirectToCheckout({ sessionId: await session.id });

        if (result.error) alert(result.error.message);
    }

    const payWithEth = async () => {
        try {
            // Get ETH price in USD
            const ethInUsd = await Moralis.Web3API.token.getTokenPrice({
                address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
                chain: "bsc",
                exchange: "PancakeSwapv2"
            })
                .then((res) => res.usdPrice)

            // Process Payment
            const amount = (total + 4.99) / ethInUsd

            const transaction = await Moralis.transfer({
                type: "native",
                amount: Moralis.Units.ETH(amount),
                receiver: "0x9d7DabDadb78ab7067c143Ee6A4602B31F001916"
            })

            // Add Transaction to DB
            const Transaction = Moralis.Object.extend("Transactions");
            const transactionObject = new Transaction();

            transactionObject.set("order_id", transaction.hash);
            transactionObject.set("type", "crypto");
            transactionObject.set("amount", (total / ethInUsd) + Number(ethers.utils.formatUnits(transaction.gasPrice)));
            transactionObject.set("amount_shipping", 4.99 / ethInUsd);
            transactionObject.set("user", user.get("ethAddress"));
            transactionObject.set("images", cart.map((item) => item.image));

            await transactionObject.save();

            // Empty Cart and Redirect to Home
            emptyCart();
            Router.push("/orders");
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="bg-gray-100">
            <Head>
                <title>Your Shopping Cart</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        height={250}
                        width={1020}
                        objectFit="contain"
                        alt="Amazon Ad"
                    />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {cart.length === 0 ? "Your Amazon Cart is empty." : "Your Shopping Cart"}
                        </h1>

                        {cart.map(({ id, title, price, rating, description, category, image, hasPrime }, i) => (
                            <CartProduct
                                key={i}
                                {...{ id, title, price, rating, description, category, image, hasPrime }}
                            />
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {cart.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">
                                Subtotal ({cart.length}) {cart.length === "1" ? "item" : "items"}:{" "}
                                <span className="font-bold">
                                    {new Intl.NumberFormat("en-CA", {
                                        style: "currency",
                                        currency: "USD"
                                    }).format(total)}
                                </span>
                            </h2>
                            {!isAuthenticated ? (
                                <button
                                    onClick={authenticate}
                                    className="button mt-2"
                                >
                                    Connect Wallet to Pay
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={payWithCard}
                                        className="button mt-2"
                                    >
                                        Pay with Card
                                    </button>
                                    <p className="text-center text-sm text-gray-700 mt-1">or</p>
                                    <button
                                        onClick={payWithEth}
                                        className="button mt-2"
                                    >
                                        Pay with ETH
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Cart
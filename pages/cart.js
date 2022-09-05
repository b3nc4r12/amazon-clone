import Head from "next/head"
import Image from "next/image"
import Header from "../components/Header"
import { useSelector } from "react-redux"
import { selectItems, selectTotal } from "../slices/cartSlice"
import CartProduct from "../components/CartProduct"
import Currency from "react-currency-formatter"
import { useAddress, useContract, useContractCall } from "@thirdweb-dev/react"
import Moralis from "moralis"
import { ethers } from "ethers"
import toast from "react-hot-toast"
import { useRouter } from "next/router"
import { loadStripe } from "@stripe/stripe-js"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"

const stripePromise = loadStripe(process.env.stripe_public_key);

const Cart = () => {
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const address = useAddress();
    const router = useRouter();
    const { contract } = useContract(process.env.payment_contract_address);
    const { mutateAsync: makePayment } = useContractCall(contract, "makePayment");

    const payWithEth = async () => {
        const notification = toast.loading("Processing payment...");

        try {
            await Moralis.start({ apiKey: "1bhIBL2VT5KDZ5kIFhaX44Up59w6PnLPRtlrwBXaj2Ue8CLHLvV58Rj2Zzc9RJXn" });

            const ethInUsd = await Moralis.EvmApi.token.getTokenPrice({
                address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
                chain: 56
            })
                .then((res) => res.result.usdPrice)

            const amount = total / ethInUsd
            const amountShipping = 4.99 / ethInUsd

            const { receipt } = await makePayment([
                {
                    value: ethers.utils.parseEther((amount + amountShipping).toString()),
                }
            ])

            const gasPrice = await Moralis.EvmApi.native.getTransaction({
                transactionHash: receipt.transactionHash,
                chain: 5
            }).then((data) => ethers.utils.formatEther(data.raw.gas_price))

            await setDoc(doc(db, "users", address, "orders", receipt.transactionHash), {
                amount: (amount + amountShipping) + Number(gasPrice),
                amount_shipping: amountShipping,
                images: items.map((item) => item.image),
                type: "crypto",
                timestamp: serverTimestamp()
            })

            toast.success("Payment successfully processed!", {
                id: notification
            })

            router.push("/orders");
        } catch (error) {
            toast.error("Whoops something went wrong!", {
                id: notification
            })
        }
    }

    const payWithCard = async () => {
        const stripe = await stripePromise

        const notification = toast.loading("Processing payment...");

        const { id } = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                address,
                items
            })
        })
            .then((res) => res.json())

        const result = await stripe.redirectToCheckout({ sessionId: id });

        if (result.error) {
            toast.error("Whoops something went wrong!", {
                id: notification
            })
        } else {
            toast.dismiss(notification);
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
                <section className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">{items.length === 0 ? "Your Amazon Cart is empty." : "Shopping Cart"}</h1>
                        {items.map((item, i) => (
                            <CartProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                rating={item.rating}
                                hasPrime={item.hasPrime}
                            />
                        ))}
                    </div>
                </section>

                {/* Right */}
                <section className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className="whitespace-nowrap">
                                Subtotal ({items.length} items):{" "}
                                <span className="font-bold">
                                    <Currency quantity={total} currency="USD" />
                                </span>
                            </h2>
                            <button
                                role="link"
                                onClick={payWithCard}
                                disabled={!address}
                                className={`button mt-2 ${!address && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed active:from-gray-300 active:to-gray-500"}`}
                            >
                                {!address ? "Connect Wallet to Checkout" : "Pay with Card"}
                            </button>
                            {address && (
                                <>
                                    <p className="text-sm text-center mt-1">or</p>
                                    <button onClick={payWithEth} className="button mt-2">
                                        Pay with ETH
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </section>
            </main>
        </div>
    )
}

export default Cart
import Head from "next/head"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import Order from "../components/Order"

const Orders = () => {
    const { isAuthenticated, Moralis, user } = useMoralis();
    const [orders, setOrders] = useState([]);
    console.log(orders);

    useEffect(() => {
        const Transactions = Moralis.Object.extend("Transactions");
        const query = new Moralis.Query(Transactions);

        query.equalTo("user", user?.get("ethAddress"));

        query.find().then((transactions) => setOrders(transactions));
    }, [user, Moralis])

    return (
        <>
            <Head>
                <title>Your Orders</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>
                {isAuthenticated ? (
                    <h2>{orders.length} {orders.length === 1 ? "Order" : "Orders"}</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}
                <div className="mt-5 space-y-4">
                    {orders?.map(({ attributes }) => (
                        <Order
                            key={attributes.order_id}
                            id={attributes.order_id}
                            type={attributes.type}
                            amount={attributes.amount}
                            amountShipping={attributes.amount_shipping}
                            createdAt={attributes.createdAt}
                            images={attributes.images}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}

export default Orders
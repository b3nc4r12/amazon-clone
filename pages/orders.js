import Head from "next/head"
import Header from "../components/Header"
import { getDocs, query, collection, orderBy } from "firebase/firestore"
import { db } from "../firebase"
import moment from "moment"
import { useEffect, useState } from "react"
import { useAddress } from "@thirdweb-dev/react"
import Order from "../components/Order"

const Orders = () => {
    const address = useAddress();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!address) return

        getDocs(query(
            collection(db, "users", address, "orders"),
            orderBy("timestamp", "desc")
        )).then((snapshot) => {
            setOrders(
                snapshot.docs.map((order) => ({
                    id: order.id,
                    ...order.data(),
                    timestamp: moment(order.data().timestamp.toDate()).unix()
                }))
            )
        })
    }, [db, address])

    return (
        <>
            <Head>
                <title>Your Orders</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl mb-2 pb-1 border-b border-yellow-400">Your Orders</h1>
                {address ? (
                    <h2>{orders.length} Order(s)</h2>
                ) : (
                    <h2>Connect wallet to see your orders</h2>
                )}
                <div className="mt-5 space-y-4">
                    {orders?.map((order) => (
                        <Order
                            key={order.id}
                            id={order.id}
                            amount={order.amount}
                            amountShipping={order.amount_shipping}
                            timestamp={order.timestamp}
                            images={order.images}
                            type={order.type}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}

export default Orders
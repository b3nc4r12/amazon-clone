import Head from "next/head"
import Header from "../components/Header"
import { CheckCircleIcon } from "@heroicons/react/solid"
import Link from "next/link"

const Success = () => {
    return (
        <div className="bg-gray-100 h-screen">
            <Head>
                <title>Success!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="max-w-screen-lg mx-auto">
                <div className="flex flex-col p-10 bg-white">
                    <div className="flex items-center space-x-2 mb-5">
                        <CheckCircleIcon className="text-emerald-500 h-10" />
                        <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
                    </div>
                    <p>Thank you for shopping with us. We&apos;ll send a confirmation once your item has shipped, if you would like to check the status of your order(s) please press the link below.</p>
                    <Link href="/orders" passHref={false}>
                        <button className="button mt-8">Go to my orders</button>
                    </Link>
                </div>
            </main>
        </div>
    )
}

export default Success
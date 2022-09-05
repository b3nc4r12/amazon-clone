import Head from "next/head"
import Header from "../components/Header"
import Banner from "../components/Banner"
import ProductFeed from "../components/ProductFeed"

const Home = ({ products }) => {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>Amazon Clone</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main className="max-w-screen-2xl mx-auto">
                <Banner />
                <ProductFeed products={products} />
            </main>
        </div>
    )
}

export default Home

export const getStaticProps = async () => {
    const products = await fetch("https://fakestoreapi.com/products").then((res) => res.json());

    return {
        props: {
            products
        }
    }
}
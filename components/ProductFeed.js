import dynamic from "next/dynamic"
const Product = dynamic(() => import("./Product"), { ssr: false });

const ProductFeed = ({ products }) => {
    return (
        <section className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
            {products.slice(0, 4).map(({ id, title, price, description, category, image, rating }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    rating={rating}
                />
            ))}
            <img src="https://links.papareact.com/dyz" className="md:col-span-full md:mx-auto" alt="" />
            <div className="md:col-span-2">
                {products.slice(4, 5).map(({ id, title, price, description, category, image, rating }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                        rating={rating}
                    />
                ))}
            </div>
            {products.slice(5).map(({ id, title, price, description, category, image, rating }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    rating={rating}
                />
            ))}
        </section>
    )
}

export default ProductFeed
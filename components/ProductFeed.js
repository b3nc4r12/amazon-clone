import Product from "./Product"

const ProductFeed = ({ products }) => {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
            {products
                .slice(0, 4)
                .map(({ id, title, price, description, category, image, rating: { rate } }) => (
                    <Product
                        key={id}
                        rating={parseInt(rate)}
                        {...{ id, title, description, category, image, price }}
                    />
                ))
            }

            <img className="md:col-span-full mx-auto" src="https://links.papareact.com/dyz" alt="" />

            <div className="md:col-span-2">
                {products
                    .slice(4, 5)
                    .map(({ id, title, price, description, category, image, rating: { rate } }) => (
                        <Product
                            key={id}
                            rating={parseInt(rate)}
                            {...{ id, title, description, category, image, price }}
                        />
                    ))
                }
            </div>

            {products
                .slice(5)
                .map(({ id, title, price, description, category, image, rating: { rate } }) => (
                    <Product
                        key={id}
                        rating={parseInt(rate)}
                        {...{ id, title, description, category, image, price }}
                    />
                ))
            }
        </div>
    )
}

export default ProductFeed
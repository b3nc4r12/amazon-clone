import Image from "next/image"
import { useState } from "react"
import useCart from "../hooks/useCart"

const Product = ({ id, title, price, description, category, image, rating }) => {
    const [hasPrime] = useState(Math.random() < 0.5);
    const { addToCart } = useCart();

    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
            <Image
                src={image}
                height={200}
                width={200}
                objectFit="contain"
                alt={title}
            />
            <h4 className="my-3">{title}</h4>
            <div className="flex">
                {Array(rating)
                    .fill(0)
                    .map((_, i) => (
                        <span key={i} className="inline-block mr-2">
                            <svg
                                className="w-4 h-4 fill-current text-yellow-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        </span>
                    ))
                }
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                {new Intl.NumberFormat("en-CA", {
                    style: "currency",
                    currency: "USD"
                }).format(price)}
            </div>
            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                    <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                </div>
            )}
            <button onClick={() => addToCart({ id, title, price, description, category, image, rating, hasPrime })} className="mt-auto button">Add to Cart</button>
        </div>
    )
}

export default Product
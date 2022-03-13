import Image from "next/image"
import useCart from "../hooks/useCart"

const CartProduct = ({ id, title, price, rating, description, category, image, hasPrime }) => {
    const { addToCart, removeFromCart } = useCart();

    return (
        <div className="grid grid-cols-5">
            <Image
                src={image}
                height={200}
                width={200}
                objectFit="contain"
                alt={title}
            />

            {/* Middle */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>
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
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <span>
                    {new Intl.NumberFormat("en-CA", {
                        style: "currency",
                        currency: "USD"
                    }).format(price)}
                </span>
                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img
                            loading="lazy"
                            className="w-12"
                            src="https://links.papareact.com/fdw"
                            alt=""
                        />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>

            {/* Right */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button className="button" onClick={() => addToCart({ id, title, price, rating, description, category, image, hasPrime })}>Add to Cart</button>
                <button className="button" onClick={() => removeFromCart(id)}>Remove from Cart</button>
            </div>
            <div className="my-4" />
        </div>
    )
}

export default CartProduct
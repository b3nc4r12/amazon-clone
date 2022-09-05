import Image from "next/image"
import { StarIcon } from "@heroicons/react/solid"
import Currency from "react-currency-formatter"
import { useDispatch } from "react-redux"
import { addToCart, removeFromCart } from "../slices/cartSlice"

const CartProduct = ({ id, title, price, description, category, image, rating, hasPrime }) => {
    const dispatch = useDispatch();

    const addItemToCart = () => {
        dispatch(addToCart({
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            hasPrime
        }))
    }

    return (
        <div className="grid grid-cols-5">
            {/* Image */}
            <Image
                src={image}
                height={200}
                width={200}
                objectFit="contain"
            />

            {/* Middle */}
            <div className="col-span-3 mx-5">
                <p className="line-clamp-3">{title}</p>
                <div className="flex">
                    {Array(Math.round(rating.rate)).fill().map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} currency="USD" />
                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <Image
                            src="https://links.papareact.com/fdw"
                            height={48}
                            width={48}
                            alt="Prime"
                        />
                        <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
                    </div>
                )}
            </div>

            {/* Right */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button onClick={addItemToCart} className="button">Add to Cart</button>
                <button onClick={() => dispatch(removeFromCart(id))} className="button">Remove from Cart</button>
            </div>
        </div>
    )
}

export default CartProduct
import Image from "next/image"
import { StarIcon } from "@heroicons/react/solid"
import { useState } from "react"
import Currency from "react-currency-formatter"
import { useDispatch } from "react-redux"
import { addToCart } from "../slices/cartSlice"

const Product = ({ id, title, price, description, category, image, rating }) => {
    const [hasPrime] = useState(Math.random() < 0.5);
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
                {Array(Math.round(rating.rate)).fill(null).map((_, i) => (
                    <StarIcon key={i} className="h-5 text-yellow-500" />
                ))}
            </div>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                <Currency quantity={price} currency="USD" />
            </div>
            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <Image
                        src="https://links.papareact.com/fdw"
                        height={48}
                        width={48}
                        alt="Prime"
                    />
                    <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
                </div>
            )}
            <button onClick={addItemToCart} className="mt-auto button">Add to Cart</button>
        </div>
    )
}

export default Product
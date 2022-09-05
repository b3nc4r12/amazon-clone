import moment from "moment"
import Image from "next/image"
import Currency from "react-currency-formatter"

const Order = ({ id, amount, amountShipping, timestamp, images, type }) => {
    return (
        <div className="relative border rounded-md">
            <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment.unix(timestamp).format("MMM DD, YYYY")}</p>
                </div>
                <div>
                    <p className="font-bold text-xs">TYPE</p>
                    <p>{type.slice(0, 1).toUpperCase() + type.slice(1)}</p>
                </div>
                <div>
                    <p className="text-xs font-bold">TOTAL</p>
                    <p>
                        {type === "card" ? (
                            <>
                                <Currency quantity={amount} currency="USD" /> | Shipping - 3-5 Business Days -{" "}
                                <Currency quantity={amountShipping} currency="USD" />
                            </>
                        ) : (
                            <>
                                {amount.toFixed(4)} ETH | Shipping - 3-5 Business Days -{" "}
                                {amountShipping.toFixed(4)} ETH
                            </>
                        )}
                    </p>
                </div>
                <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">{images.length} item(s)</p>
                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
                    {type === "card" ? "ORDER ID" : "TX HASH"}: {id}
                </p>
            </div>
            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {images.map((image, i) => (
                        <img
                            key={i}
                            src={image}
                            className="h-20 object-contain sm:h-32"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
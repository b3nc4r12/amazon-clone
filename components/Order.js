import moment from "moment"

const Order = ({ id, type, amount, amountShipping, createdAt, images }) => {
    return (
        <div className="relative border rounded-md">
            <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="font-bold text-xs">ORDER PLACED</p>
                    <p>{moment(createdAt).format("MMM DD, YYYY")}</p>
                </div>
                <div>
                    <p className="font-bold text-xs">TYPE</p>
                    <p>{type.slice(0, 1).toUpperCase() + type.slice(1)}</p>
                </div>
                <div>
                    <p className="font-bold text-xs">TOTAL</p>
                    {type === "card" ? (
                        <p>
                            {new Intl.NumberFormat("en-CA", {
                                style: "currency",
                                currency: "USD"
                            }).format(amount)} | Shipping - 3-5 Business Days -{" "}
                            {new Intl.NumberFormat("en-CA", {
                                style: "currency",
                                currency: "USD"
                            }).format(amountShipping)}
                        </p>
                    ) : (
                        <p>
                            {amount.toFixed(4)} ETH | Shipping - 3-5 Business Days -{" "}
                            {amountShipping.toFixed(4)} ETH
                        </p>
                    )}
                </div>
                <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
                    {images.length} {images.length === 1 ? "item" : "items"}
                </p>
                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">ORDER ID: {id}</p>
            </div>
            <div className="p-5 sm:p-10">
                <div className="flex space-x-6 overflow-x-auto">
                    {images.map((image) => (
                        <img key={image} src={image} alt="" className="h-20 object-contain sm:h-32" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
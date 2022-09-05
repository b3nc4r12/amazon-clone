import Image from "next/image"
import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline"
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { selectItems } from "../slices/cartSlice"

const Header = () => {
    const address = useAddress();
    const connectWallet = useMetamask();
    const disconnectWallet = useDisconnect();
    const items = useSelector(selectItems);

    return (
        <header>
            <section className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <Link href="/" passHref>
                    <a className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                        <Image
                            src="https://links.papareact.com/f90"
                            width={150}
                            height={40}
                            objectFit="contain"
                            alt="Amazon Logo"
                            className="cursor-pointer"
                        />
                    </a>
                </Link>
                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
                    <input type="text" className="p-2 outline-none h-full flex-grow flex-shrink rounded-l-md" />
                    <SearchIcon className="h-12 p-4" />
                </div>
                <div className="text-white flex items-center space-x-6 text-xs px-6 whitespace-nowrap">
                    <div onClick={() => address ? disconnectWallet() : connectWallet()} className="link">
                        <p>Hello, {address ? `${address.substring(0, 5)}...${address.substring(address.length - 4)}` : "Sign In"}</p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>
                    <Link href="/orders" passHref>
                        <a className="link">
                            <p>Returns</p>
                            <p className="font-extrabold md:text-sm">& Orders</p>
                        </a>
                    </Link>
                    <Link href="/cart" passHref>
                        <a className="relative link flex items-center">
                            <span className="absolute top-0 right-0 md:right-7 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                                {items.length}
                            </span>
                            <ShoppingCartIcon className="h-10" />
                            <p className="hidden md:inline font-extrabold md:text-sm mt-2">Cart</p>
                        </a>
                    </Link>
                </div>
            </section>
            <section className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p className="link flex items-center">
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Best Sellers</p>
                <p className="link">New Releases</p>
                <p className="link">Deals Store</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Customer Service</p>
                <p className="link hidden lg:inline-flex">Sell</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link hidden lg:inline-flex">Home</p>
                <p className="link hidden lg:inline-flex">Fashion</p>
                <p className="link hidden lg:inline-flex">Books</p>
                <p className="link hidden lg:inline-flex">Sports & Outdoors</p>
            </section>
        </header>
    )
}

export default Header
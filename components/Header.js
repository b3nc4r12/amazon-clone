import Image from "next/image"
import Link from "next/link"
import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline"
import { useMoralis } from "react-moralis"
import useCart from "../hooks/useCart"

const Header = () => {
    const { authenticate, logout, isAuthenticated, user } = useMoralis();
    const { cart } = useCart();

    return (
        <header className="sticky top-0 z-50">
            <div className="flex items-center justify-between bg-amazon_blue px-5 py-3">
                {/* Amazon Logo */}
                <Link href="/">
                    <div className="relative h-10 w-24 cursor-pointer">
                        <Image
                            src="/images/amazon.png"
                            layout="fill"
                            alt="Amazon Logo"
                            objectFit="contain"
                        />
                    </div>
                </Link>

                {/* Search Bar */}
                <div className="hidden sm:flex flex-1 items-center h-10 ml-6">
                    <div className="bg-white h-full flex-1 px-5 flex items-center rounded-l-md">
                        <input
                            type="text"
                            className="flex-1 outline-none"
                        />
                    </div>
                    <div className="bg-amber-400 h-full px-3 flex items-center rounded-r-md cursor-pointer hover:bg-amber-500">
                        <SearchIcon className="h-6" />
                    </div>
                </div>

                {/* Right Menu */}
                <div className="flex items-center space-x-6 ml-6 text-white text-xs">
                    {/* Account & Lists */}
                    <div onClick={() => isAuthenticated ? logout() : authenticate()} className="cursor-pointer group">
                        <p className="group-hover:underline">
                            Hello,{" "}
                            {
                                isAuthenticated ?
                                    `${user.get("ethAddress").slice(0, 5)}...${user.get("ethAddress").slice(user.get("ethAddress").length - 4)}`
                                    : "Connect Wallet"
                            }
                        </p>
                        <p className="font-extrabold text-sm group-hover:underline">Account & Lists</p>
                    </div>

                    {/* Returns & Orders */}
                    <Link href="/orders">
                        <div className="cursor-pointer group">
                            <p className="group-hover:underline">Returns</p>
                            <p className="font-extrabold text-sm group-hover:underline">& Orders</p>
                        </div>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart">
                        <div className="flex cursor-pointer group">
                            <div className="relative">
                                <ShoppingCartIcon className="h-10" />
                                <span
                                    className="absolute top-0 right-0 h-4 w-4 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold"
                                >
                                    {cart.length}
                                </span>
                            </div>
                            <p className="hidden md:inline-flex font-extrabold text-sm mt-auto group-hover:underline">Cart</p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p className="link flex items-center">
                    <MenuIcon className="h-6 mr-1" />
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today&apos;s Deals</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Buy Again</p>
                <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                <p className="link hidden lg:inline-flex">Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header
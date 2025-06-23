"use client";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
    isLoggedIn: boolean;
}

const Header = ({ isLoggedIn }: HeaderProps) => {
    console.log("islll", isLoggedIn)
    const { state } = useCart();
    const totalItems = state.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );
    return (
        <nav className="bg-gray-100 flex justify-between items-center px-12 py-6 sticky top-0 z-50 shadow-md">
            <Link href="/" className="flex items-center gap-4">
                <Image src="/logo.png" alt="Cartify Logo" width={40} height={40} />
                <h1 className="text-xl font-bold">Cartify</h1>
            </Link>

            <div className="flex items-center gap-6 px-4 py-2">
                <Link href="/products">
                    <h1 className="hover:underline">Products</h1>
                </Link>

                <Link href="/carts" className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                            {totalItems}
                        </span>
                    )}
                </Link>
                {isLoggedIn ? (
                    <Link href="/auth/logout">
                        <h1 className="hover:underline">Log Out</h1>
                    </Link>
                ) : (
                    <Link href="/auth/login">
                        <h1 className="hover:underline">Log In</h1>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Header;

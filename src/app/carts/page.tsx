"use client";
import CartItemPage from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
    const { state, dispatch } = useCart();
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

            {state.cartItems.length === 0 ? (
                <div className="text-center text-gray-600">
                    Your cart is empty.
                    <br />
                    <Link href="/products" className="text-blue-500 hover:underline">
                        Go back to products
                    </Link>
                </div>
            ) : (
                <>
                    <div className="space-y-6">
                        {state.cartItems.map((item) => (
                            <div key={item.product.id}>
                                <CartItemPage item={item} />
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <OrderSummary />
                </>
            )}
        </div>
    );
}

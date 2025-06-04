"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
    const { state, dispatch } = useCart();

    const handleRemove = (id: string) => {
        dispatch({ type: "REMOVE_FROM_CART", id });
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity >= 1) {
            dispatch({ type: "ADJUST_QUANTITY", id, quantity });
        }
    };

    const subtotal = state.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;

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
                            <div
                                key={item.product.id}
                                className="flex items-center justify-between border-b pb-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        width={80}
                                        height={80}
                                        className="rounded"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {item.product.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            ${item.product.price.toFixed(2)}
                                        </p>
                                        <div className="mt-2 flex items-center space-x-2">
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.product.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.product.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="px-2 py-1 bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                            <span className="inline-block px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full shadow-sm">
                                                Remaining: {item.product.stock - item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleRemove(item.product.id)}
                                        className="text-red-500 text-sm mt-1"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="text-right mt-10 border-t pt-6">
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2 text-base text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount (20%):</span>
                                <span>-${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee:</span>
                                <span>${deliveryFee.toFixed(2)}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

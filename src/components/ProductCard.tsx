"use client";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";
import { Product } from "@/types/product";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

const ProductCard = () => {
    const { state, dispatch } = useCart();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {products.map((product: Product) => {
                return (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                    >
                        <div className="relative w-full h-48">
                            <div>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="rounded-t-lg"
                                />
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-base font-semibold text-gray-900">
                                {product.name}
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                {product.description}
                            </p>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="ml-1 text-sm font-medium">
                                        {product.rating}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500 ml-1">
                                    ({product.reviewCount} reviews)
                                </span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-lg font-semibold text-gray-900">
                                    ${product.price}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through">
                                        ${product.originalPrice}
                                    </span>
                                )}
                            </div>
                            {product.stock >= 1 ? (
                                <p className="text-sm text-gray-600 mt-2">
                                    Stock:{" "}
                                    <span className="text-sm text-green-500 mt-1">
                                        {product.stock} available
                                    </span>
                                </p>
                            ) : (
                                <p className="text-sm text-red-500 mt-2 font-semibold">Out of stock</p>
                            )}

                            <div className="mt-auto pt-4 flex gap-2">
                                <button
                                    onClick={() => dispatch({ type: "ADD_TO_CART", product })}
                                    disabled={product.stock === 0}
                                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${product.stock === 0
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-[#00C897] hover:bg-[#00b383]"
                                        }`}
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProductCard

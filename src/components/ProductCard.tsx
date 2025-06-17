"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ProductCard = () => {
    const { state, dispatch } = useCart();
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("");

    const filteredProducts = state.products
        .filter((product: Product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === "popularity") return b.rating - a.rating;
            if (sortOption === "priceLowHigh") return a.price - b.price;
            if (sortOption === "priceHighLow") return b.price - a.price;
            if (sortOption === "newest") {
                return new Date(b.created).getTime() - new Date(a.created).getTime();
            }
            return 0;
        });

    return (
        <div className="mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/4"
                />
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/4"
                >
                    <option value="">Sort By</option>
                    <option value="popularity">Popularity</option>
                    <option value="newest">Newest</option>
                    <option value="priceLowHigh">Price: Low to High</option>
                    <option value="priceHighLow">Price: High to Low</option>
                </select>
            </div>
            {filteredProducts.length === 0 ? (
                <p className="text-center text-gray-500">No products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {filteredProducts.map((product: Product) => {
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
                                        <p className="text-sm text-red-500 mt-2 font-semibold">
                                            Out of stock
                                        </p>
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
            )}
        </div>
    );
};

export default ProductCard;

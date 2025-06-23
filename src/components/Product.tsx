"use client";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { useState } from "react";

const ProductPage = () => {
    const { state } = useCart();
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
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ProductPage;

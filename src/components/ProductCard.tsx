"use client";
import CustomButton from "@/components/CustomButton";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
    const { dispatch } = useCart();
    return (
        <Link href={`/products/${product.id}`}>
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
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    <div className="flex items-center mt-2">
                        <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{product.rating}</span>
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
                        <CustomButton
                            variant="addToCart"
                            disabled={product.stock === 0}
                            onClick={() => dispatch({ type: "ADD_TO_CART", product })}
                            stock={product.stock}
                        >
                            Add to Cart
                        </CustomButton>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

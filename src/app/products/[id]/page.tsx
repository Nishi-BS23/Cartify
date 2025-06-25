"use client";
import CustomButton from "@/components/CustomButton";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";

type Props = {
    params: {
        id: string;
    };
};

export default function ProductDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { state, dispatch } = useCart();
    const router = useRouter();

    // Unwrap params using React.use()
    const { id } = use(params);
    const product = state.products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <main className="flex min-h-screen p-6 bg-gray-100">
            <div className="container mx-auto max-w-4xl">
                <Link
                    href="/products"
                    className="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block transition-colors"
                >
                    ← Back to Products
                </Link>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative w-full h-64">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-t-lg"
                        />
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 mt-1">{product.category}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                                ${product.price}
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                    ${product.originalPrice}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <p className="text-gray-600">
                                Stock:{" "}
                                <span
                                    className={
                                        product.stock >= 1 ? "text-green-600" : "text-red-600"
                                    }
                                >
                                    {product.stock} available
                                </span>
                            </p>
                            <div className="flex items-center">
                                <span className="text-yellow-400 mr-1">★</span>
                                <span className="text-gray-900 font-medium">
                                    {product.rating}
                                </span>
                                <span className="text-gray-500 ml-1">
                                    ({product.reviewCount} reviews)
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-700">{product.description}</p>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Reviews
                            </h2>
                            {product.reviews && product.reviews.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-3">
                                    {product.reviews.map((review) => (
                                        <li key={review.id} className="bg-gray-50 p-3 rounded-md">
                                            <p className="font-medium text-gray-900">{review.user}</p>
                                            <p className="text-yellow-400">★ {review.rating}/5</p>
                                            <p className="text-gray-600 mt-1">{review.comment}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {new Date(review.date).toLocaleDateString()}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No reviews yet.</p>
                            )}
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Attributes</h2>
                            {product.attributes && Object.keys(product.attributes).length > 0 ? (
                                <div className="space-y-6">
                                    {Object.entries(product.attributes).map(([attribute, values]) => (
                                        <div key={attribute} className="border-b border-gray-200 pb-4 last:border-b-0">
                                            <h3 className="text-lg font-medium text-gray-700 mb-3 capitalize">
                                                {attribute.replace(/([A-Z])/g, " $1").trim()}
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                {values.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                                                    >
                                                        <span className="text-gray-800 font-medium capitalize">
                                                            {item.value}
                                                        </span>
                                                        <span
                                                            className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-semibold ${item.quantity > 0
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                                }`}
                                                        >
                                                            {item.quantity} available
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No attributes available.</p>
                            )}
                        </div>

                        <div className="mt-6">
                            {product.stock >= 1 ? (
                                <CustomButton
                                    variant="addToCart"
                                    disabled={product.stock === 0}
                                    onClick={() => dispatch({ type: "ADD_TO_CART", product })}
                                    stock={product.stock}
                                >
                                    Add to Cart
                                </CustomButton>
                            ) : (
                                <span className="w-full bg-red-100 text-red-800 text-center px-4 py-2 rounded-md inline-block">
                                    Out of Stock
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

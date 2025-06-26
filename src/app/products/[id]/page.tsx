"use client";
import CustomButton from "@/components/CustomButton";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";

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

    // State to track selected attributes
    const [selectedAttributes, setSelectedAttributes] = useState<{
        [key: string]: string;
    }>({});

    // Handle attribute selection
    const handleAttributeSelect = (attribute: string, value: string) => {
        console.log("Atrribute --> ", attribute);
        console.log("Value--->", value);
        setSelectedAttributes((prev) => ({
            ...prev,
            [attribute]: value,
        }));
    };

    // Check if all required attributes are selected
    const areAttributesSelected = () => {
        const requiredAttributes = Object.keys(product.attributes || {});
        return requiredAttributes.find((attr) =>
            selectedAttributes.hasOwnProperty(attr)
        );
    };

    // Dispatch ADD_TO_CART with selected attributes
    const handleAddToCart = () => {
        console.log("Selected ---> ", selectedAttributes);
        if (areAttributesSelected()) {
            dispatch({
                type: "ADD_TO_CART",
                product: {
                    ...product,
                    selectedAttributes,
                },
            });
            alert("Added to cart!");
        } else {
            alert("Please select all options before adding to cart!");
        }
    };

    // Helper to get cart quantity for a product+attribute
    const getCartQuantityForAttribute = (
        productId: string,
        attribute: string,
        value: string
    ) => {
        return state.cartItems.reduce((sum, item) => {
            if (
                item.product.id === productId &&
                item.product.selectedAttributes &&
                item.product.selectedAttributes[attribute] === value
            ) {
                return sum + item.quantity;
            }
            return sum;
        }, 0);
    };

    return (
        <main className="flex min-h-screen p-6 bg-gray-50">
            <div className="container mx-auto max-w-6xl">
                <Link
                    href="/products"
                    className="text-blue-600 hover:text-blue-800 font-medium mb-6 flex items-center gap-2"
                >
                    <span className="mr-1 text-lg">&#8592;</span>
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Product Image */}
                    <div className="relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105 duration-300"
                        />
                        <div className="absolute top-4 left-4 bg-yellow-400 text-white px-2 py-1 rounded-full text-sm font-semibold">
                            ★ {product.rating} ({product.reviewCount} reviews)
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-6 space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 mt-1 text-base">{product.category}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-gray-900">
                                ${product.price}
                            </span>
                            {product.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">
                                    ${product.originalPrice}
                                </span>
                            )}
                            {product.originalPrice && (
                                <span className="text-green-600 font-semibold">
                                    -
                                    {Math.round(
                                        ((product.originalPrice - product.price) /
                                            product.originalPrice) *
                                        100
                                    )}
                                    % Off
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <p className="text-gray-700 text-sm">
                                Stock:{" "}
                                <span
                                    className={
                                        product.stock >= 1
                                            ? "text-green-600 font-medium"
                                            : "text-red-600 font-medium"
                                    }
                                >
                                    {product.stock} available
                                </span>
                                {product.stock <= 2 && (
                                    <span className="text-red-600 ml-1">Almost sold out!</span>
                                )}
                            </p>
                        </div>

                        <p className="text-gray-700 text-sm">{product.description}</p>

                        {/* Attributes */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Select Options
                            </h2>
                            {product.attributes &&
                                Object.keys(product.attributes).length > 0 ? (
                                <div className="space-y-4">
                                    {Object.entries(product.attributes).map(
                                        ([attribute, values]) => (
                                            <div
                                                key={attribute}
                                                className="border-b border-gray-200 pb-3 last:border-b-0"
                                            >
                                                <h3 className="text-base font-medium text-gray-700 mb-2">
                                                    {attribute}
                                                </h3>
                                                <div className="flex gap-2">
                                                    {values.map((item) => {
                                                        const cartQty = getCartQuantityForAttribute(
                                                            product.id,
                                                            attribute,
                                                            item.value
                                                        );
                                                        const displayQty = Math.max(
                                                            item.quantity - cartQty,
                                                            0
                                                        );
                                                        return (
                                                            <button
                                                                key={item.value}
                                                                className={`flex items-center justify-between w-full sm:w-auto px-3 py-2 bg-gray-50 rounded-md hover:bg-gray-100  ${displayQty > 0
                                                                        ? selectedAttributes[attribute] ===
                                                                            item.value
                                                                            ? "bg-blue-100 border border-blue-500"
                                                                            : "cursor-pointer"
                                                                        : "cursor-not-allowed opacity-50"
                                                                    }`}
                                                                disabled={displayQty === 0}
                                                                onClick={() =>
                                                                    handleAttributeSelect(attribute, item.value)
                                                                }
                                                            >
                                                                <span className="text-gray-800 text-sm font-medium capitalize">
                                                                    {item.value}
                                                                </span>
                                                                <span
                                                                    className={`ml-2 items-center px-2 py-0.5 rounded-full text-xs font-semibold ${displayQty > 0
                                                                            ? "bg-green-100 text-green-800"
                                                                            : "bg-red-100 text-red-800"
                                                                        }`}
                                                                >
                                                                    {displayQty} left
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No attributes available.
                                </p>
                            )}
                        </div>

                        {/* Reviews */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                Customer Reviews
                            </h2>
                            {product.reviews && product.reviews.length > 0 ? (
                                <div className="space-y-3">
                                    {product.reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="text-gray-900 text-sm font-medium">
                                                    {review.user}
                                                </p>
                                                <p className="text-yellow-400 text-xs">
                                                    ★ {review.rating}/5
                                                </p>
                                            </div>
                                            <p className="text-gray-600 text-sm mt-1">
                                                {review.comment}
                                            </p>
                                            <p className="text-gray-500 text-xs mt-1">
                                                {new Date(review.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No reviews yet.</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex gap-3">
                            {product.stock >= 1 ? (
                                <>
                                    <CustomButton
                                        variant="addToCart"
                                        onClick={handleAddToCart}
                                        stock={product.stock}
                                        disabled={!areAttributesSelected()}
                                        className="w-full md:w-auto px-4 py-2 text-base"
                                    >
                                        Add to Cart
                                    </CustomButton>
                                    <CustomButton
                                        variant="buyNow"
                                        onClick={() => alert("Buy Now clicked")}
                                        stock={product.stock}
                                        className="w-full md:w-auto px-4 py-2 text-base bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Buy Now
                                    </CustomButton>
                                </>
                            ) : (
                                <span className="w-full bg-red-100 text-red-800 text-center px-4 py-2 rounded-md inline-block text-base font-medium">
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

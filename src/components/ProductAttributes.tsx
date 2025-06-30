import { Product } from "@/types/product";

interface ProductAttributesProps {
    product: Product;
    selectedAttributes: { [key: string]: string };
    handleAttributeSelect: (attribute: string, value: string) => void;
    getCartQuantityForAttribute: (
        productId: string,
        attribute: string,
        value: string
    ) => number;
}

export default function ProductAttributes({
    product,
    selectedAttributes,
    handleAttributeSelect,
    getCartQuantityForAttribute,
}: ProductAttributesProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Select Options
            </h2>
            {product.attributes && Object.keys(product.attributes).length > 0 ? (
                <div className="space-y-4">
                    {Object.entries(product.attributes).map(([attribute, values]) => (
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
                                    const displayQty = Math.max(item.quantity - cartQty, 0);
                                    return (
                                        <button
                                            key={item.value}
                                            className={`flex items-center justify-between w-full sm:w-auto px-3 py-2 bg-gray-50 rounded-md hover:bg-gray-100 ${displayQty > 0
                                                    ? selectedAttributes[attribute] === item.value
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
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm">No attributes available.</p>
            )}
        </div>
    );
}

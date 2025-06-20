import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types/cart";
import Image from "next/image";

const CartItemPage = ({ item }: { item: CartItem }) => {
    const { dispatch } = useCart();
    const handleRemove = (id: string) => {
        dispatch({ type: "REMOVE_FROM_CART", id });
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity >= 1) {
            dispatch({ type: "ADJUST_QUANTITY", id, quantity });
        }
    };
    return (
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
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <p className="text-sm text-gray-500">
                        ${item.product.price.toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                        <button
                            onClick={() =>
                                handleQuantityChange(item.product.id, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                            className={`px-2 py-1 rounded transition-colors ${item.quantity === 1
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                            onClick={() =>
                                handleQuantityChange(item.product.id, item.quantity + 1)
                            }
                            disabled={item.product.stock === item.quantity}
                            className={`px-2 py-1 rounded transition-colors ${item.product.stock === item.quantity
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
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
    );
};

export default CartItemPage;

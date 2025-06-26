import CustomButton from "@/components/CustomButton";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import Image from "next/image";

const getAttributeStock = (
    product: Product,
    selectedAttributes?: { [key: string]: string }
) => {
    if (!product.attributes || !selectedAttributes) return product.stock;
    let minStock = Infinity;
    for (const [attr, value] of Object.entries(selectedAttributes)) {
        const attrObj = product.attributes[attr]?.find((v) => v.value === value);
        if (attrObj) {
            minStock = Math.min(minStock, attrObj.quantity);
        }
    }
    return isFinite(minStock) ? minStock : product.stock;
};

const CartItemPage = ({ item }: { item: CartItem }) => {
    const { dispatch, state } = useCart();
    const product = state.products.find(
        (p) => p.id === item.product.id
    ) as Product;
    const attributeStock = getAttributeStock(
        product,
        item.product.selectedAttributes
    );
    const remaining = attributeStock - item.quantity;
    const handleRemove = (id: string) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            id,
            selectedAttributes: item.product.selectedAttributes,
        });
    };
    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity >= 1 && quantity <= attributeStock) {
            dispatch({
                type: "ADJUST_QUANTITY",
                id,
                quantity,
                selectedAttributes: item.product.selectedAttributes,
            });
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
                    {/* Show selected attributes */}
                    {item.product.selectedAttributes && (
                        <div className="text-xs text-gray-600 mt-1">
                            {Object.entries(item.product.selectedAttributes).map(
                                ([attr, value]) => (
                                    <span key={attr} className="mr-2">
                                        {attr}: <b>{value}</b>
                                    </span>
                                )
                            )}
                        </div>
                    )}
                    <div className="mt-2 flex items-center space-x-2">
                        <CustomButton
                            variant="decrement"
                            disabled={item.quantity === 1}
                            productId={item.product.id}
                            quantity={item.quantity}
                            handleQuantityChange={handleQuantityChange}
                        >
                            -
                        </CustomButton>
                        <span>{item.quantity}</span>
                        <CustomButton
                            variant="increment"
                            disabled={item.quantity >= attributeStock}
                            productId={item.product.id}
                            quantity={item.quantity}
                            stock={attributeStock}
                            handleQuantityChange={handleQuantityChange}
                        >
                            +
                        </CustomButton>
                        <span className="inline-block px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full shadow-sm">
                            Remaining: {remaining}
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <CustomButton
                    variant="remove"
                    productId={item.product.id}
                    handleRemove={handleRemove}
                >
                    ❌
                </CustomButton>
            </div>
        </div>
    );
};

export default CartItemPage;

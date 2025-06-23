import CustomButton from "@/components/CustomButton";
import { useCart } from "@/context/CartContext";

const OrderSummary = () => {
    const { state } = useCart();
    const subtotal = state.cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const discount = subtotal * 0.2;
    const deliveryFee = 15;
    const total = subtotal - discount + deliveryFee;
    return (
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
            <CustomButton variant="checkout" >
                Proceed to Checkout
            </CustomButton>
        </div>
    );
};

export default OrderSummary;

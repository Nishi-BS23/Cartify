"use client";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { createContext, ReactNode, useContext, useReducer } from "react";

interface CartState {
    cartItems: CartItem[];
}
const initialState: CartState = {
    cartItems: [],
};
type Action =
    | { type: "ADD_TO_CART"; product: Product }
    | { type: "REMOVE_FROM_CART"; id: string }
    | { type: "ADJUST_QUANTITY"; id: string; quantity: number };

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => { },
});

function cartReducer(state: CartState, action: Action): CartState {
    switch (action.type) {
        case "ADD_TO_CART": {
            const item = state.cartItems.find(
                (i) => i.product.id === action.product.id
            );
            if (item) {
                const newQuantity = item.quantity + 1;
                // console.log("New qq", newQuantity);
                // console.log("item", item.product.stock);
                if (newQuantity > item.product.stock) {
                    return state;
                }
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product.id === action.product.id && i.quantity < i.product.stock
                            ? {
                                ...i,
                                quantity: i.quantity + 1,
                            }
                            : i
                    ),
                };
            }

            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    { product: action.product, quantity: 1 },
                ],
            };
        }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product.id !== action.id),
            };
        case "ADJUST_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems.map((i) => {
                    if (i.product.id === action.id) {
                        const clampedQuantity = Math.min(action.quantity, i.product.stock);
                        return { ...i, quantity: clampedQuantity };
                    }
                    return i;
                }),
            };
        default:
            return state;
    }
}
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

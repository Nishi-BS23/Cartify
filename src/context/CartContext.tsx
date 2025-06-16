"use client";
import { products as initialProducts } from "@/lib/products";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { createContext, ReactNode, useContext, useReducer } from "react";

interface CartState {
    cartItems: CartItem[];
    products: Product[];
}
const initialState: CartState = {
    cartItems: [],
    products: initialProducts,
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
                    products: state.products.map((p) =>
                        p.id === action.product.id ? {
                            ...p, stock: p.stock - 1,
                        } : p
                    ),
                };
            }

            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    { product: action.product, quantity: 1 },
                ],
                products: state.products.map((p) =>
                    p.id === action.product.id ? {
                        ...p, stock: p.stock - 1,
                    } : p
                ),
            };
        }
        case "REMOVE_FROM_CART": {
            const item = state.cartItems.find((i) => i.product.id === action.id);
            if (!item) {
                return state;
            }
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product.id !== action.id),
                products: state.products.map((p) =>
                    p.id === action.id ? {
                        ...p, stock: p.stock + item.quantity,
                    } : p
                ),
            };
        }

        case "ADJUST_QUANTITY": {
            const item = state.cartItems.find((i) => i.product.id === action.id);
            const product = state.products.find((p) => p.id === action.id);
            if (!item || !product) {
                return state;
            }
            console.log("Action quantity : ", action.quantity);
            const quantityDiff = action.quantity - item.quantity;
            if (action.quantity > product.stock + item.quantity) {
                return state;
            }
            return {
                ...state,
                cartItems: state.cartItems.map((i) => {
                    if (i.product.id === action.id) {
                        return { ...i, quantity: action.quantity };
                    }
                    return i;
                }),
                products: state.products.map((p) =>
                    p.id === action.id ? {
                        ...p, stock: p.stock - quantityDiff,
                    } : p
                ),
            };
        }

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

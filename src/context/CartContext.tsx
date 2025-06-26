"use client";
import { products as initialProducts } from "@/lib/products";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { ProductWithVariant } from "@/types/productWithVarient";
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
    | { type: "ADD_TO_CART"; product: ProductWithVariant }
    | {
        type: "REMOVE_FROM_CART";
        id: string;
        selectedAttributes?: {
            [key: string]: string;
        };
    }
    | { type: "ADJUST_QUANTITY"; id: string; quantity: number; selectedAttributes?: { [key: string]: string } };

const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => { },
});
function isSameAttributes(
    a?: { [key: string]: string },
    b?: { [key: string]: string }
) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => a[key] === b[key]);
}

function cartReducer(state: CartState, action: Action): CartState {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingCartItem = state.cartItems.find(
                (i) =>
                    i.product.id === action.product.id &&
                    isSameAttributes(
                        i.product.selectedAttributes,
                        action.product.selectedAttributes
                    )
            );
            // find the product in the global list
            const productIndex = state.products.findIndex(
                (p) => p.id === action.product.id
            );
            // if not found
            if (productIndex === -1) {
                return state;
            }
            const currentProduct = state.products[productIndex];
            if (currentProduct.stock <= 0) {
                return state;
            }
            let canAdd = true;
            let updatedAttributes: Product["attributes"] | undefined =
                currentProduct.attributes
                    ? { ...currentProduct.attributes }
                    : undefined;
            if (action.product.selectedAttributes && updatedAttributes) {
                for (const attributeType of Object.keys(
                    action.product.selectedAttributes
                )) {
                    const selectedValue =
                        action.product.selectedAttributes[attributeType];
                    const values = updatedAttributes[attributeType];
                    const updatedValues = values.map((v) => {
                        if (v.value == selectedValue) {
                            if (v.quantity < 0) {
                                canAdd = false;
                            }
                            if (v.quantity > 0) {
                                return { ...v, quantity: v.quantity - 1 };
                            }
                        }
                        return v;
                    });
                    updatedAttributes[attributeType] = updatedValues;
                }
            }
            if (!canAdd) {
                return state;
            }
            const updateCartItems = existingCartItem
                ? state.cartItems.map((item) =>
                    item.product.id === action.product.id &&
                        isSameAttributes(
                            item.product.selectedAttributes,
                            action.product.selectedAttributes
                        )
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...state.cartItems, { product: action.product, quantity: 1 }];

            const updateProducts = state.products.map((p, index) =>
                index == productIndex
                    ? {
                        ...p,
                        stock: p.stock - 1,
                        attributes: updatedAttributes ?? p.attributes,
                    }
                    : p
            );

            return {
                ...state,
                cartItems: updateCartItems,
                products: updateProducts,
            };
        }
        case "REMOVE_FROM_CART": {
            const cartItemToRemove = state.cartItems.find(
                (item) =>
                    item.product.id === action.id &&
                    isSameAttributes(
                        item.product.selectedAttributes,
                        action.selectedAttributes
                    )
            );

            if (!cartItemToRemove) {
                return state;
            }

            // Restore global product stock and attributes
            const updatedProducts = state.products.map((product) => {
                if (product.id !== action.id) {
                    return product; // Keep unchanged products
                }

                // Clone top-level attributes
                let restoredAttributes: Product["attributes"] | undefined =
                    product.attributes ? { ...product.attributes } : undefined;

                // Restore attribute quantities if applicable
                if (cartItemToRemove.product.selectedAttributes && restoredAttributes) {
                    for (const [attrKey, attrValue] of Object.entries(
                        cartItemToRemove.product.selectedAttributes
                    )) {
                        const attributeList = restoredAttributes[attrKey];

                        if (!attributeList) continue;

                        const updatedList = attributeList.map((attrItem) =>
                            attrItem.value === attrValue
                                ? {
                                    ...attrItem,
                                    quantity: attrItem.quantity + cartItemToRemove.quantity,
                                }
                                : attrItem
                        );

                        restoredAttributes[attrKey] = updatedList;
                    }
                }

                // Return updated product
                return {
                    ...product,
                    stock: product.stock + cartItemToRemove.quantity,
                    attributes: restoredAttributes,
                };
            });

            // Remove item from cart
            const updatedCartItems = state.cartItems.filter(
                (item) =>
                    !(
                        item.product.id === action.id &&
                        isSameAttributes(
                            item.product.selectedAttributes,
                            action.selectedAttributes
                        )
                    )
            );

            return {
                ...state,
                cartItems: updatedCartItems,
                products: updatedProducts,
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
                    p.id === action.id
                        ? {
                            ...p,
                            stock: p.stock - quantityDiff,
                        }
                        : p
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

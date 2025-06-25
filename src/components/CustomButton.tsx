"use client";
import { ShoppingCart } from "lucide-react";

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    variant?:
    | "decrement"
    | "increment"
    | "remove"
    | "addToCart"
    | "buyNow"
    | "checkout"
    | "default";
    className?: string;
    stock?: number;
    quantity?: number;
    productId?: string;
    handleQuantityChange?: (id: string, qty: number) => void;
    handleRemove?: (id: string) => void;
}

export default function CustomButton({
    onClick,
    disabled = false,
    children,
    variant = "default",
    className = "",
    stock,
    quantity,
    productId,
    handleQuantityChange,
    handleRemove,
}: ButtonProps) {
    const getBaseClass = () => {
        switch (variant) {
            case "decrement":
            case "increment":
                return `px-2 py-1 rounded transition-colors ${disabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`;
            case "remove":
                return "text-red-500 text-sm mt-1";
            case "buyNow":
            case "addToCart":
                return `w-fulll md:mx-auto flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#00C897] hover:bg-[#00b383]"
                    }`;
            case "checkout":
                return "mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";
            case "default":
                return "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300";
            default:
                return "px-4 py-2 bg-gray-200 rounded hover:bg-gray-300";
        }
    };

    const handleClick = () => {
        if (disabled) return;

        if (
            variant === "decrement" &&
            handleQuantityChange &&
            productId &&
            quantity
        ) {
            handleQuantityChange(productId, quantity - 1);
        } else if (
            variant === "increment" &&
            handleQuantityChange &&
            productId &&
            quantity &&
            stock
        ) {
            handleQuantityChange(productId, quantity + 1);
        } else if (variant === "remove" && handleRemove && productId) {
            handleRemove(productId);
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`${getBaseClass()} ${className}`}
        >
            {variant === "addToCart" && !disabled && (
                <ShoppingCart className="h-4 w-4" />
            )}
            {children}
        </button>
    );
}

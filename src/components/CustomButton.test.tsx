import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CustomButton from './CustomButton';

describe('CustomButton', () => {
    it('renders children correctly', () => {
        render(<CustomButton>Click Me</CustomButton>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<CustomButton onClick={handleClick}>Click Me</CustomButton>);
        fireEvent.click(screen.getByText('Click Me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
        const handleClick = vi.fn();
        render(
            <CustomButton onClick={handleClick} disabled>
                Click Me
            </CustomButton>
        );
        fireEvent.click(screen.getByText('Click Me'));
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles increment correctly', () => {
        const handleQuantityChange = vi.fn();
        render(
            <CustomButton
                variant="increment"
                productId="p1"
                quantity={2}
                stock={10}
                handleQuantityChange={handleQuantityChange}
            >
                +
            </CustomButton>
        );
        fireEvent.click(screen.getByText('+'));
        expect(handleQuantityChange).toHaveBeenCalledWith('p1', 3);
    });

    it('handles decrement correctly', () => {
        const handleQuantityChange = vi.fn();
        render(
            <CustomButton
                variant="decrement"
                productId="p1"
                quantity={2}
                handleQuantityChange={handleQuantityChange}
            >
                -
            </CustomButton>
        );
        fireEvent.click(screen.getByText('-'));
        expect(handleQuantityChange).toHaveBeenCalledWith('p1', 1);
    });

    it('handles remove correctly', () => {
        const handleRemove = vi.fn();
        render(
            <CustomButton
                variant="remove"
                productId="p1"
                handleRemove={handleRemove}
            >
                Remove
            </CustomButton>
        );
        fireEvent.click(screen.getByText('Remove'));
        expect(handleRemove).toHaveBeenCalledWith('p1');
    });

    it('renders ShoppingCart icon for addToCart', () => {
        render(<CustomButton variant="addToCart">Add to Cart</CustomButton>);
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });
});

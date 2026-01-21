// components/cart/QuantitySelector.tsx
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange?: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  size = 'md',
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onDecrease();
      if (onChange) onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onIncrease();
      if (onChange) onChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      if (onChange) onChange(value);
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className="flex items-center">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={disabled || quantity <= min}
        className={`rounded-r-none ${sizeClasses[size]}`}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3 w-3" />
      </Button>
      
      <input
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        disabled={disabled}
        className={`w-16 text-center border-y border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${textSizeClasses[size]} ${
          size === 'sm' ? 'h-8' : size === 'lg' ? 'h-12' : 'h-10'
        }`}
        aria-label="Quantity"
      />
      
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={disabled || quantity >= max}
        className={`rounded-l-none ${sizeClasses[size]}`}
        aria-label="Increase quantity"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
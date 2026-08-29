import { CURRENCY_SYMBOLS, Currency } from '../types/inventory';

/**
 * Format a price with currency symbol
 */
export function formatPrice(price: number | undefined, currency: Currency): string {
  if (price === undefined) return 'N/A';
  
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  return `${symbol}${price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

/**
 * Format a date string
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch {
    return 'Invalid date';
  }
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Formats a number to Indian Rupee (INR) currency format.
 * Example: 1499 -> "₹1,499"
 */
export function formatINR(amount: number, options?: { showDecimals?: boolean }): string {
  const showDecimals = options?.showDecimals ?? false;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

export const formatCurrency = formatINR;

/**
 * Calculates discount percentage given MRP and Sale Price.
 */
export function calculateDiscount(mrp: number, salePrice: number): number {
  if (mrp <= 0 || salePrice >= mrp) return 0;
  return Math.round(((mrp - salePrice) / mrp) * 100);
}

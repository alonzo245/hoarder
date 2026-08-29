/**
 * Open a Google search for an item's price in a new tab
 */
export function searchItemPrice(itemName: string): void {
  const query = encodeURIComponent(`${itemName} price`);
  const url = `https://www.google.com/search?q=${query}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

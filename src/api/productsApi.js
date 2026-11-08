export async function fetchProducts(signal) {
  const response = await fetch("https://dummyjson.com/products?limit=100", { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  return await response.json();
}

export async function fetchProduct(id, signal) {
  const response = await fetch(`https://dummyjson.com/products/${id}`, { signal });
  if (!response.ok) {
    throw new Error(`Product not found (Status: ${response.status})`);
  }
  return await response.json();
}

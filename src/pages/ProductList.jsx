import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchProducts } from "../api/productsApi";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";

  const fetchFn = useCallback((signal) => fetchProducts(signal), []);
  const { loading, error, data } = useFetch(fetchFn, []);

  const products = data?.products || [];

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    const matchesQuery = product.title.toLowerCase().includes(queryParam.toLowerCase());
    const matchesCategory = categoryParam ? product.category === categoryParam : true;
    return matchesQuery && matchesCategory;
  });

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (val) {
        nextParams.set("q", val);
      } else {
        nextParams.delete("q");
      }
      return nextParams;
    });
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (val) {
        nextParams.set("category", val);
      } else {
        nextParams.delete("category");
      }
      return nextParams;
    });
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div>
      <h2>Product Catalogue</h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Filter by title..."
          value={queryParam}
          onChange={handleQueryChange}
        />

        <select value={categoryParam} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products match your criteria.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

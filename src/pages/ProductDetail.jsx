import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchProduct } from "../api/productsApi";
import { useCartStore } from "../store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const fetchFn = useCallback((signal) => fetchProduct(id, signal), [id]);
  const { loading, error, data: product } = useFetch(fetchFn, [id]);

  if (loading) return <div>Loading product detail...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        &larr; Back
      </button>
      <div style={{ display: "flex", gap: "2rem" }}>
        <img src={product.thumbnail} alt={product.title} style={{ maxWidth: "300px" }} />
        <div>
          <h2>{product.title}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => addItem(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

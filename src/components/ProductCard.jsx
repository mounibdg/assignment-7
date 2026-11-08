import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "4px" }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h3>{product.title}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <Link to={`/products/${product.id}`}>View Details</Link>
    </div>
  );
}

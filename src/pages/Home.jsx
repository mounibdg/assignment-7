import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <p>Browse our wide range of products loaded dynamically.</p>
      <Link to="/products">Explore Catalogue</Link>
    </div>
  );
}

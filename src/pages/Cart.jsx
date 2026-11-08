import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div>
        <h2>Your Cart is Empty</h2>
        <p>
          Go back to the <Link to="/products">product list</Link> to add items.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
                <span style={{ margin: "0 0.5rem" }}>{item.quantity}</span>
                <button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

      <button onClick={clear}>Clear Cart</button>
    </div>
  );
}

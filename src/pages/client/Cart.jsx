import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Cart = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/books").then((res) => setBooks(res.data.slice(0, 3)));
  }, []);

  const total = useMemo(
    () => selected.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selected]
  );

  const addToCart = (book) => {
    setSelected((prev) => {
      const existing = prev.find((i) => i.book === book._id);
      if (existing) {
        return prev.map((i) =>
          i.book === book._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { book: book._id, title: book.title, quantity: 1, price: book.price }];
    });
  };

  const placeOrder = async () => {
    if (!user) {
      setMessage("Please login first.");
      return;
    }
    if (!selected.length) {
      setMessage("Select at least one book.");
      return;
    }
    await api.post("/orders", { items: selected, totalAmount: total });
    setMessage("Order placed successfully.");
    setSelected([]);
  };

  return (
    <section>
      <h2>Cart</h2>
      <div className="grid">
        {books.map((book) => (
          <div className="card" key={book._id}>
            <h4>{book.title}</h4>
            <p>${book.price}</p>
            <button type="button" onClick={() => addToCart(book)}>
              Add
            </button>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>Selected Items</h3>
        {selected.map((item) => (
          <p key={item.book}>
            {item.title} x {item.quantity}
          </p>
        ))}
        <strong>Total: ${total.toFixed(2)}</strong>
        <button type="button" onClick={placeOrder}>
          Place Order
        </button>
        {message && <p>{message}</p>}
      </div>
    </section>
  );
};

export default Cart;

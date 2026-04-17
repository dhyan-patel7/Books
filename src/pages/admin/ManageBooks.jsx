import { useEffect, useState } from "react";
import api from "../../api/axios";
import { getImageUrl } from "../../utils/image";

const initialBook = {
  title: "",
  author: "",
  description: "",
  price: 0,
  category: "Marine",
  stock: 0
};

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(initialBook);
  const [coverFile, setCoverFile] = useState(null);

  const fetchBooks = async () => {
    const { data } = await api.get("/books");
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (coverFile) payload.append("coverImage", coverFile);

    await api.post("/books", payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    setForm(initialBook);
    setCoverFile(null);
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/books/${id}`);
    fetchBooks();
  };

  return (
    <section>
      <h2>Manage Books</h2>
      <form className="card form" onSubmit={handleCreate}>
        <input value={form.title} placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input value={form.author} placeholder="Author" onChange={(e) => setForm({ ...form, author: e.target.value })} required />
        <input
          value={form.description}
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input type="number" value={form.price} placeholder="Price" onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
        <input type="number" value={form.stock} placeholder="Stock" onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} required />
        <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
        <button type="submit">Add Book</button>
      </form>
      <div className="grid">
        {books.map((book) => (
          <article className="card" key={book._id}>
            {book.coverImage && (
              <img className="book-cover" src={getImageUrl(book.coverImage)} alt={book.title} />
            )}
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <button type="button" onClick={() => handleDelete(book._id)}>
              Delete
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ManageBooks;

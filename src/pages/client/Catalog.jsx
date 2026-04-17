import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { getImageUrl } from "../../utils/image";

const Catalog = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books").then((res) => setBooks(res.data));
  }, []);

  return (
    <section>
      <h2>Catalog</h2>
      <div className="grid">
        {books.map((book) => (
          <article className="card" key={book._id}>
            {book.coverImage && (
              <img className="book-cover" src={getImageUrl(book.coverImage)} alt={book.title} />
            )}
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>${book.price}</p>
            <Link to={`/book/${book._id}`}>View Details</Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Catalog;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { getImageUrl } from "../../utils/image";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    api.get(`/books/${id}`).then((res) => setBook(res.data));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <article className="card">
      {book.coverImage && (
        <img className="book-cover book-cover-large" src={getImageUrl(book.coverImage)} alt={book.title} />
      )}
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
      <p>{book.description}</p>
      <strong>${book.price}</strong>
    </article>
  );
};

export default BookDetails;

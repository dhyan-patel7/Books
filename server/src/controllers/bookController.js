import Book from "../models/Book.js";

const getCoverImagePath = (file) => (file ? `/uploads/${file.filename}` : "");

export const getBooks = async (_req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

export const createBook = async (req, res) => {
  const book = await Book.create({
    ...req.body,
    coverImage: getCoverImagePath(req.file)
  });
  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const payload = {
    ...req.body
  };

  if (req.file) {
    payload.coverImage = getCoverImagePath(req.file);
  }

  const book = await Book.findByIdAndUpdate(req.params.id, payload, { new: true });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

export const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json({ message: "Book deleted" });
};

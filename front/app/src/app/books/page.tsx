"use client";

import Link from "next/link";
// git GUI test

import React from "react";
import { FC, useEffect, useState } from "react";

type Book = {
  id: number;
  title: string;
  body: string;
};

async function getBook() {
  const res = await fetch("http://localhost:3000/api/books");

  if (!res.ok) {
    throw new Error("Failed to fetch Post");
  }

  return res.json();
}

const Home: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getBook();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <div className="m-4">
        <h1 className="text-4xl mb-4 underline">Book一覧</h1>
        {books.map((book) => (
          <React.Fragment key={book.id}>
            <Link href={`/books/${book.id}`}>{book.title}</Link>
            <p>{book.body}</p>
          </React.Fragment>
        ))}
      </div>
      <p></p>
    </>
  );
};

export default Home;

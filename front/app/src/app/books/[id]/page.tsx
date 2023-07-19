"use client";

import { useEffect, useState } from "react";

type Book = {
  id: number;
  title: string;
  body: string;
};

export default function Page({ params }: { params: { id: number } }) {
  const [book, setBook] = useState<Book | null>(null);

  async function getBook(id: number) {
    const res = await fetch(`http://localhost:3000/api/books/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch Post");
    }
    return res.json();
  }

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const fetchedBook = await getBook(params.id);
        setBook(fetchedBook);
        console.log(fetchedBook);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [params.id]);

  return (
    <>
      <div>Title: {book?.title}</div>
      <div>Body: {book?.body}</div>
    </>
  );
}

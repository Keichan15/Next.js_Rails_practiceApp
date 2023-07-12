"use client";

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

interface BookInputs {
  title: string;
  body: string;
}

export default function NewBookPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookInputs>();

  const createBook: SubmitHandler<BookInputs> = async (data) => {
    try {
      await axios.post("/api/books", data);
      console.log("Book created successfully");
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(createBook)}>
      <div>
        <label>title</label>
        <input {...register("title")} />
      </div>
      <div>
        body
        <textarea {...register("body")}></textarea>
      </div>
      <div>
        <button type="submit">Create Book</button>
      </div>
    </form>
  );
}

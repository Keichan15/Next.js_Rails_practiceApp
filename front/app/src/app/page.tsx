"use client";

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface BookInputs {
  title: string;
  body: string;
}

export default function NewBookPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookInputs>();

  const createBook: SubmitHandler<BookInputs> = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/books", data);
      console.log("Book created successfully");
      router.push("/books");
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

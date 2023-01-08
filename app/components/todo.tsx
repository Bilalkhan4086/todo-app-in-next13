"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Todo: React.FC = () => {
  const { refresh } = useRouter();

  const [todoText, setTodoText] = useState<string>("");
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTodoText(e.target.value);
  };
  const handleAddTodo = async () => {
    try {
      await fetch(`http://localhost:3000/api/todo`, {
        method: "POST",
        body: JSON.stringify({
          title: todoText,
        }),
      });
      setTodoText("");
      refresh();
    } catch (err) {
      console.log("err", err);
    }
  };

  const updateTodo = async (id: string, title: string, is_done: boolean) => {
    await fetch(`http://localhost:3000/api/todo?id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, is_done }),
    });
  };

  return (
    <div>
      <input
        style={{ width: "300px", padding: "6px" }}
        value={todoText}
        onChange={handleInputChange}
        placeholder="Enter the title for todo..."
        onKeyPress={(e: any) => {
          if (e.key === "Enter") {
            handleAddTodo();
          }
        }}
      />
      <button
        style={{ marginLeft: "16px", padding: "6px" }}
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
    </div>
  );
};

export default Todo;

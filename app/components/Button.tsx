"use client";
import React from "react";
import { useRouter } from "next/navigation";

type PropsTypes = {
  id: string;
  isDeleteButton?: boolean;
  title?: string;
  isDone?: boolean;
};
const deleteTodo = async (id: string) => {
  await fetch(`http://localhost:3000/api/todo?id=${id}`, {
    method: "DELETE",
  });
};
const Button: React.FC<PropsTypes> = ({
  id,
  isDeleteButton,
  title = "",
  isDone = false,
}) => {
  const { refresh } = useRouter();
  return (
    <button
      style={{ margin: "0px 7px 0px 7px" }}
      onClick={() => {
        if (isDeleteButton) {
          deleteTodo(id);
        } else {
          console.log(
            "Want to implement get todos remain in server side but implement client side rendering during updating",
            title,
            isDone
          );
        }
        refresh();
      }}
    >
      {isDeleteButton ? "X" : "U"}
    </button>
  );
};

export default Button;

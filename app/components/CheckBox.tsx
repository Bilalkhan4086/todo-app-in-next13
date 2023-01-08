"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useRouter as router } from "next/router";

type PropsTypes = {
  id: string;
  isDone: boolean;
};
const toggleIsDone = async (
  id: string,
  isDone: boolean,
  refreshIt: () => void
) => {
  await fetch(`http://localhost:3000/api/todo?id=${id}`, {
    method: "PUT",
    body: JSON.stringify({ is_done: isDone }),
  });
  refreshIt();
};
const CheckBox: React.FC<PropsTypes> = ({ id, isDone = false }) => {
  const { refresh } = useRouter();

  return (
    <input
      type="checkbox"
      onChange={(e) => {
        toggleIsDone(id, e.target.checked, refresh);
      }}
      checked={isDone}
    />
  );
};

export default CheckBox;

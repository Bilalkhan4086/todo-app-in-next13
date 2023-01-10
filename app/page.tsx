import Todo from "./components/todo";
import Button from "./components/Button";
import CheckBox from "./components/CheckBox";
import { BASE_URL } from "../lib/constants";

interface TodoTypes {
  _id: string;
  title: string;
  is_done: boolean;
}
const getTodos = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/todo`);
    let response = await res.json();
    return response;
  } catch (e) {
    console.log("e", e);
  }
};

export default async function Home() {
  const todos: TodoTypes[] = await getTodos();
  return (
    <div>
      <div
        style={{ display: "flex", margin: "auto", justifyContent: "center" }}
      >
        <Todo />
      </div>
      <ul>
        {todos?.map((todo: TodoTypes, i: number) => (
          <li
            key={`todo-list-${i}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "16px 20% 16px 20%",
              border: "2px solid black",
              borderRadius: "4px",
              padding: "16px 10px",
            }}
          >
            <div style={{ width: "80%", textOverflow: "ellipsis" }}>
              <CheckBox isDone={todo?.is_done} id={todo?._id} />

              {todo.title}
            </div>
            <div>
              <Button
                isDeleteButton={false}
                isDone={todo.is_done}
                title={todo.title}
                id={todo._id}
              />
              <Button isDeleteButton={true} id={todo._id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Todo from "./components/todo";
import Button from "./components/Button";
import CheckBox from "./components/CheckBox";

interface TodoTypes {
  _id: string;
  title: string;
  is_done: boolean;
}
const getTodos = async () => {
  const res = await fetch("http://localhost:3000/api/todo");
  return res.json();
};

export default async function Home() {
  const todos: TodoTypes[] = await getTodos();
  return (
    <>
      <div
        style={{ display: "flex", margin: "auto", justifyContent: "center" }}
      >
        <Todo />
      </div>
      <ul>
        {todos.map((todo: TodoTypes) => (
          <li
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
    </>
  );
}

import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch, useSelector } from "@/stores";
import {
  Todo,
  TodoID,
  Status,
  editTodoItem,
  removeTodoItem,
  selectAllTodo,
  FilterStatus,
} from "./slice";
import dayjs from "dayjs";

interface Props {
  filter: FilterStatus
}
const List: FC<Props> = ({ filter }) => {
  const [id, setId] = useState<TodoID>("");
  // 可以将函数 state => state.todolist 提取出来, 作为可复用的选择器
  // const data = useSelector(state => state.todolist);
  const data = useSelector(selectAllTodo);
  const dispatch = useDispatch();

  const removeItem = (id: TodoID) => {
    dispatch(removeTodoItem(id));
  };
  const editItem = (e: ChangeEvent<HTMLInputElement>, item: Todo) => {
    let content = e.target.value;
    content = content.trim();
    if (!content) return;
    const payload: Todo = {
      ...item,
      content,
      updatedBy: "zwz",
      updatedDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    dispatch(editTodoItem(payload));
  };
  const changeStatus = (item: Todo) => {
    const payload: Todo = {
      ...item,
      status: item.status === "todo" ? "doing" : "done",
      updatedBy: "zwz",
      updatedDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    dispatch(editTodoItem(payload));
  };
  return (
    <ul>
      {data.length
        ? data
            .filter(item => filter === "other" || item.status === filter)
            ?.map((item: Todo) => (
              <li key={item.id} className="flex justify-start items-center">
                {item.status === "done" ? (
                  <div className="i-quill-todo" />
                ) : (
                  <div
                    className={
                      item.status === "todo"
                        ? "i-quill-breather"
                        : "i-quill-nuclear"
                    }
                    onClick={() => {
                      changeStatus(item);
                    }}
                  />
                )}
                {item.id === id ? (
                  <>
                    <input
                      defaultValue={item.content}
                      onChange={e => editItem(e, item)}
                    />
                    <button onClick={() => setId("")}>done</button>
                  </>
                ) : (
                  <>
                    <span
                      className={
                        item.status === "done"
                          ? "text-gray-3"
                          : "hover:text-blue-4"
                      }
                    >
                      {item.content}
                    </span>
                    <button onClick={() => setId(item.id)}>edit</button>
                  </>
                )}
                <button onClick={() => removeItem(item.id)}>remove</button>

                <span>
                  <span className="text-blue mx-2">{item.creator}</span>
                  created by {item.creationDate}
                </span>
                {item.updatedBy && (
                  <span>
                    <span className="text-blue-3 mx-2">{item.updatedBy}</span>
                    updated by {item.updatedDate}
                  </span>
                )}
              </li>
            ))
        : "not item"}
    </ul>
  );
};
export default List;

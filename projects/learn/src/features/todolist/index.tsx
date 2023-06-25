import React, { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "@/stores";
import List from "./list";
import { addTodoItem, Todo, Status, fetchPokemon, FilterStatus } from "./slice";

const STATUS_ICON = {
  todo: "breather",
  doing: "nuclear",
  done: "todo",
  other: "off",
} as const;

// type S = keyof typeof STATUS;
// type Status = typeof STATUS[S];

const TodoList = () => {
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("other");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemon({ name: "bulbasaur" }));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setValue(value);
  };
  const addItem = () => {
    const content = value.trim();
    if (!content) return;
    const payload: Todo = {
      id: nanoid(),
      content,
      status: "todo",
      creator: "buleak",
      creationDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    dispatch(addTodoItem(payload));
    setValue("");
  };
  const changeFilter = () => {
    switch (filter) {
      case "todo":
        setFilter("doing");
        break;
      case "doing":
        setFilter("done");
        break;
      case "done":
        setFilter("other");
        break;
      case "other":
        setFilter("todo");
        break;
      default:
        setFilter("todo");
        break;
    }
  };
  return (
    <div>
      <List filter={filter} />
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={addItem}>add</button>
      <div className="flex items-center">
        filter: {filter}
        <div
          onClick={changeFilter}
          className={`i-quill-${STATUS_ICON[filter]} w10 h10`}
        />
      </div>
    </div>
  );
};
export default TodoList;

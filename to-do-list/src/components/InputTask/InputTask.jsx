import "./InputTask.css";
import { useRef, useState, useEffect } from "react";
import TaskCard from "../TaskCard/TaskCard";
import CheckBox from "../CheckBox/CheckBox";

function InputTask() {
  const inputRef = useRef(null);

  const [arrOfTasks, setArrOfTasks] = useState([
    { id: 1, text: "Покакать", checked: false, doneState: false },
    { id: 2, text: "Пописать", checked: false, doneState: false },
    { id: 3, text: "Поспать", checked: false, doneState: false },
  ]);

  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    const selected = arrOfTasks
      .filter((task) => task.checked)
      .map((task) => task.id);
    setSelectedTasks(selected);
  }, [arrOfTasks]);

  const addTask = () => {
    if (inputRef.current.value !== "") {
      const newTask = {
        id: Date.now(),
        text: inputRef.current.value,
        checked: false,
        doneState: false,
      };

      setArrOfTasks([...arrOfTasks, newTask]);
      inputRef.current.value = "";
    }
  };

  const removeTask = (id) => {
    setArrOfTasks(arrOfTasks.filter((task) => task.id !== id));
    setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
  };

  const toggleSelectTask = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
    setArrOfTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const doneChecked = () => {
    const updatedTasks = arrOfTasks.map((item) => {
      if (selectedTasks.includes(item.id)) {
        return { ...item, doneState: true, checked: false };
      }
      return item;
    });

    setArrOfTasks(updatedTasks);
    setSelectedTasks([]);
  };

  const deleteSelectedTasks = () => {
    setArrOfTasks(
      arrOfTasks.filter((task) => !selectedTasks.includes(task.id))
    );
    setSelectedTasks([]);
  };

  const isCheckboxSelected = arrOfTasks.some((item) =>
    selectedTasks.includes(item.id)
  );

  const selectAll = () => {
    setArrOfTasks(arrOfTasks.map((item) => ({ ...item, checked: true })));
    setSelectedTasks([...selectedTasks]);
  };

  const clearSelection = () => {
    setArrOfTasks(arrOfTasks.map((item) => ({ ...item, checked: false })));
    setSelectedTasks([]);
  };

  return (
    <>
      <div className="input-task-container">
        <h1 className="input-task-h">Мой ToDo List</h1>
        <div className="btn-inp">
          <input
            className="inp"
            ref={inputRef}
            type={"text"}
            placeholder={"Введите задание"}
          />
          <button className="button" onClick={addTask}>
            Добавить
          </button>
        </div>
      </div>

      {arrOfTasks.map((item) => (
        <div key={item.id} className="task-section">
          <CheckBox
            checkedState={item.checked}
            onChange={() => toggleSelectTask(item.id)}
          />
          <TaskCard
            doneState={item.doneState}
            action={() => removeTask(item.id)}
          >
            {item.text}
          </TaskCard>
        </div>
      ))}

      <div className="btns">
        {isCheckboxSelected && (
          <>
            <button className="task-btn" onClick={doneChecked}>
              Сделать выполненным
            </button>

            <button className="task-btn" onClick={deleteSelectedTasks}>
              Удалить
            </button>
          </>
        )}
      </div>

      <button className="select-all" onClick={selectAll}>
        Выбрать всё
      </button>
      {selectedTasks.length > 0 && (
        <button className="clear-selected" onClick={clearSelection}>
          Очистить всё
        </button>
      )}
    </>
  );
}

export default InputTask;

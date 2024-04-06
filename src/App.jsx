import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import getKeyDown from "./components/getKeyDown";
// import "./App.css";

function App() {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  // const [showAll, setShowAll] = useState(false);
  const addBtnRef = useRef();
  const editBtnRef = useRef();
  const [addBtnIsBlock, setaddBtnIsBlock] = useState(true);
  const addTaskInputRef = useRef();
  const [edistTaskIndex, setEditTaskIndex] = useState(null);
  const [toogleShowAll, settoogleShowAll] = useState(true);

  useEffect(() => {
    let listString = localStorage.getItem("taskList");
    // console.log(listString);
    editBtnRef.current.style.display = "none";
    addBtnRef.current.style.display = "block";
    // setEditBtnDisplay("none");
    setaddBtnIsBlock(true);
    if (listString) {
      let newTaskList = JSON.parse(localStorage.getItem("taskList"));
      setTaskList(newTaskList);
    }
  }, []);

  // useEffect(() => {
  //   taskList.forEach((task) => {
  //     task.display = "flex";
  //     // console.log(task);
  //     console.log(taskList);
  //   });
  // }, []);

  const saveToLS = (saveTask) => {
    // console.log("List ", saveTask);
    if (saveTask != undefined)
      localStorage.setItem("taskList", JSON.stringify(saveTask));
    // console.log(localStorage.getItem("taskList"));
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAdd = () => {
    // let numberOfTask = taskList.length;
    // console.log(addTaskInputRef.current.value.length);
    if (addTaskInputRef.current.value.length > 2) {
      let updateTaskList = [
        ...taskList,
        { id: uuidv4(), newTask, isCompleted: false, display: "flex" },
      ];
      // taskList[numberOfTask] = {
      //   id: uuidv4(),
      //   newTask,
      //   isCompleted: false,
      //   display: "flex",
      // };

      setTaskList(updateTaskList);
      setNewTask("");
      saveToLS(updateTaskList);
    }
  };
  // console.log("Local ", localStorage.getItem("taskList"));

  const handleIsCompleted = (e) => {
    // let id = e.target.id;
    let index = taskList.findIndex((task) => {
      return task.id === e.target.id;
    });
    let newTaskList = [...taskList];
    newTaskList[index].isCompleted = !newTaskList[index].isCompleted;

    if (toogleShowAll == false) newTaskList[index].display = "hidden";
    // console.log(newTaskList[index].display);

    // s;

    setTaskList(newTaskList);
    saveToLS(newTaskList);
    // console.log(taskList);
  };

  const handleShowAll = (e) => {
    if (toogleShowAll == false) settoogleShowAll(true);
    else settoogleShowAll(false);

    // console.log(toogleShowAll);

    taskList.forEach((task) => {
      if (toogleShowAll == false) task.display = "flex";
      else if (task.isCompleted == true) task.display = "hidden";
      saveToLS(taskList);

      // console.log(task);
    });
  };

  const handleAddEdit = () => {
    addBtnRef.current.style.display = "block";
    editBtnRef.current.style.display = "none";
    setaddBtnIsBlock(true);
    // setEditBtnDisplay("none");
    // console.log("edit  : ", taskList);
    taskList[edistTaskIndex].newTask = addTaskInputRef.current.value;
    setEditTaskIndex(null);
    setNewTask("");
    saveToLS(taskList);
  };

  const handleEdit = (task) => {
    addBtnRef.current.style.display = "none";
    editBtnRef.current.style.display = "block";
    setaddBtnIsBlock(false);
    // setEditBtnDisplay("block");
    addTaskInputRef.current.focus();

    setNewTask(task.newTask);

    let index = taskList.findIndex((taskId) => {
      return taskId.id === task.id;
    });

    setEditTaskIndex(index);
    // console.log(task.id);
  };

  const handleDelete = (task) => {
    let index = taskList.findIndex((taskId) => {
      return taskId.id === task.id;
    });
    // console.log(index);
    let newTaskList = taskList.filter((delTask) => {
      return delTask.id !== task.id;
    });
    // console.log("newTaskList", newTaskList);
    // newTaskList.splice(index, 1);

    setTaskList(newTaskList);
    saveToLS(newTaskList);
    // console.log("task list ", taskList);

    // confirmDelete();
  };
  // console.log(taskList);
  const confirmDelete = () => {
    alert("Confirm Delete");
  };

  // console.log("addBtnIsBlock", addBtnIsBlock);
  // console.log("editBtnDisplay", editBtnDisplay);
  if (addBtnIsBlock) getKeyDown("Enter", handleAdd);
  else getKeyDown("Enter", handleAddEdit);

  return (
    <>
      <div className="container mx-auto">
        <div className="sticky top-0 mx-auto text-[#FAF3DD] bg-[#141414] max-w-[1000px] rounded-[6px] min-h-[70vh] px-9 flex flex-col ">
          <div className="sticky top-0 bg-[#141414] z-20 sm:py-9 py-5">
            <h1 className="font-bold text-center sm:text-2xl text-lg">
              TODO List
            </h1>
            <div className="addTodo flex flex-col gap-5 justify-between  ">
              <h2 className="sm:text-xl text-md font-medium">Add a Task</h2>
              <div className="flex gap-4 sm:flex-nowrap flex-wrap">
                <input
                  ref={addTaskInputRef}
                  onChange={handleChange}
                  type="text"
                  name="task"
                  value={newTask}
                  className="bg-transparent border border-[#FAF3DD] w-full rounded-md px-4 py-2 placeholder:text-[#FAF3DD]/[0.6] text-lg outline-black/[0]"
                  placeholder="New Task"
                />
                <button
                  ref={addBtnRef}
                  disabled={newTask.length <= 2}
                  onClick={handleAdd}
                  className="disabled:opacity-[0.5] disabled:hover:bg-[#FAF3DD] sm:w-[120px] w-full bg-[#FAF3DD] rounded-md text-[#141414] text-lg font-bold hover:bg-[#FAF3DD]/[0.9] active:bg-[#FAF3DD]/[0.85] py-1">
                  Add
                </button>
                <button
                  ref={editBtnRef}
                  onClick={handleAddEdit}
                  className="sm:w-[120px] w-full bg-[#FAF3DD] rounded-md text-[#141414] text-lg font-bold hover:bg-[#FAF3DD]/[0.9] active:bg-[#FAF3DD]/[0.85] py-1">
                  Edit
                </button>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  onChange={handleShowAll}
                  checked={toogleShowAll}
                  type="checkbox"
                  id="show-task"
                  className="peer relative sm:h-5 sm:w-5 h-4 w-4 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full
                    after:bg-[url('./tick.svg')] bg-[#141414] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-white/[0.5] hover:ring-1 hover:ring-gray-300 focus:outline-none"
                />
                <label
                  htmlFor="show-task"
                  className="w-full cursor-pointer sm:text-lg
                  text-sm font-medium">
                  Show Completed Tasks
                </label>
              </div>
            </div>
            <hr className="my-3 border-[#FAF3DD]" />
          </div>
          <div className="h-fit flex flex-col">
            <h2 className="text-xl font-medium">Your Tasks</h2>
            {/* TODO LIST */}
            <div className="mt-1  flex flex-col h-[full]">
              {/* TODOs */}

              {taskList.length == 0 && (
                <h1 className="sm:mt-3 mt-8 text-center sm:text-[25px] text-[18px] font-bold m-auto opacity-80">
                  Nothing to do Today!!!
                </h1>
              )}
              {taskList.length == 0 && (
                <img
                  src="./img/empty.png"
                  alt="empty.png"
                  className=" w-[500px] opacity-60 m-auto"
                />
              )}
              {taskList.map((task) => {
                return (
                  <div
                    key={task.id}
                    className={`${
                      toogleShowAll ? "flex" : task.display
                    } justify-between items-center border-b py-3 px-2 border-[#FAF3DD]/[0.6] hover:bg-[#FAF3DD]/[0.15] transition-all rounded-md min-w-[180px]`}>
                    <div className="flex gap-2 items-center h-fit  sm:w-[75%] w-[60%]">
                      <input
                        onChange={handleIsCompleted}
                        type="checkbox"
                        checked={task.isCompleted}
                        id={task.id}
                        className="peer relative sm:h-5 sm:w-5 h-4 w-4 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('./tick.svg')] bg-[#141414] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-white/[0.5] hover:ring-1 p-[12px] hover:ring-gray-300 focus:outline-none"
                      />
                      <label
                        htmlFor={task.id}
                        className="cursor-pointer sm:text-xl font-base  peer-checked:text-gray-400 peer-checked:line-through break-words w-full">
                        {task.newTask}
                      </label>
                    </div>
                    <div className="flex sm:w-fit w-[60px] sm:gap-5 gap-0  place-content-center">
                      <button
                        onClick={() => {
                          handleEdit(task);
                        }}
                        className="  hover:bg-[#FAF3DD]/[0.2] p-2 rounded-full hover:text-black transition-all   grid place-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          width={"22px"}>
                          <path
                            fill="#FAF3DD"
                            d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
                          />
                          <path
                            fill="#FAF3DD"
                            d="m469.952 554.24l52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(task);
                        }}
                        className="hover:bg-[#FAF3DD]/[0.2] p-2 rounded-full hover:text-black transition-all   grid place-content-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          width={"22px"}>
                          <path
                            fill="white"
                            d="M360 184h-8c4.4 0 8-3.6 8-8zh304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32M731.3 840H292.7l-24.2-512h487z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
              {/* TODOs */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

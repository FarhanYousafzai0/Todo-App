import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './globals.css';
import { LuListMinus } from "react-icons/lu";
import { RiHeartAdd2Line } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { GiFocusedLightning } from "react-icons/gi";
import { MdOutlineModeEdit } from "react-icons/md";
import { motion } from 'motion/react';

const App = () => {
  // States
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [notification, setNotification] = useState(false);
  const [todoDelete, setTodoDelete] = useState(false);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to localStorage whenever `todos` state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to handle adding a todo
  const handleAdd = () => {
    if (inputValue.trim().length < 4) return; // Prevent adding empty todos
    const newTodo = { id: uuidv4(), text: inputValue };
    setTodos([...todos, newTodo]); // Add new todo
    setInputValue(""); // Clear input field

    // Notification
    setNotification("Todo added successfully!");

    setTimeout(() => {
      setNotification("");
    }, 1000);
  };

  // Function to handle deleting a todo
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    setTodoDelete("Todo deleted successfully!");
    setTimeout(() => {
      setTodoDelete("");
    }, 1000);

    // Save updated todos to localStorage after delete
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Function to handle editing a todo
  const handleEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    if (editTodo) {
      setInputValue(editTodo.text); // Set input value to the todo's text
      setTodos(todos.filter((todo) => todo.id !== id)); // Remove the todo from the list

      // Save the updated todos to localStorage
      localStorage.setItem("todos", JSON.stringify(todos.filter((todo) => todo.id !== id)));
    }
  };

  return (
    <>
      <div className='rounded-lg  container mx-auto w-full md:w-[40%] shadow-lg'>
        <div className="w-full rounded-lg rounded-1xl bg-pink-400 p-5 flex justify-between items-center">
          <div className="text-2xl text-white font-semibold flex items-center gap-">FocusList <GiFocusedLightning /></div>
          <input type="" />
        </div>

        {/* Add Todos */}
        <div className="Add-Todos p-5">
          <p className='text-[1.3rem] uppercase flex items-center gap-2'>Set Your Goals Now <GoGoal /></p>

          <div className="flex items-center justify-between mt-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              type="text"
              placeholder="Let's Get Things Done"
              className="border-2 w-full p-3 rounded-l-lg border-pink-400 outline-0"
            />

            <button 
              onClick={handleAdd} 
              disabled={inputValue.length < 4}
              className={`py-[14px] ${inputValue.length < 4 ? 'opacity-80 cursor-not-allowed' : ''} cursor-pointer rounded-r-lg px-2 flex items-center gap-1 bg-pink-400 text-white`}>
              Add <RiHeartAdd2Line />
            </button>
          </div>
        </div>

        {notification && (
          <motion.div 
          initial={{opacity:0 }}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{duration:0.5 ,
            y: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 } // Smooth spring movement

          }}
          className="bg-pink-500 text-white text-center py-2 rounded-sm mt-3 ">
            {notification}
          </motion.div>
        )}

        {todoDelete && (
          <motion.div
            className="bg-gradient-to-r from-red-500 to-red-700 text-white text-center py-2 rounded-sm mt-3"
            initial={{ opacity: 0, }} // Starts off invisible and slightly above
            animate={{ opacity: 1 }} // Becomes fully visible and slides to normal position
            exit={{ opacity: 0 }} // Fades out and slides down when it disappears
            transition={{
              opacity: { duration: 0.5 },
              y: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 } // Smooth spring movement
            }}
          >
            {todoDelete}
          </motion.div>
        )}

        {/* Your Todos */}
        <div className="Your-Todos p-5">
          <p className='text-[1.3rem] uppercase flex items-center gap-2'>Your List is Waiting! <GoGoal /></p>

          {todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo.id} className="flex justify-between items-center rounded-lg mt-2 border-1 border-pink-200 shadow-lg shadow-pink-100 p-3">
                <p>{todo.text}</p>

                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(todo.id)} className='py-[6px] cursor-pointer px-2 flex items-center gap-1 rounded-md bg-pink-400 text-white'>
                    <MdOutlineModeEdit /> Edit
                  </button>
                  <button onClick={() => handleDelete(todo.id)} className='py-[6px] cursor-pointer px-2 flex items-center gap-1 rounded-md bg-pink-400 text-white'>
                    <MdDeleteOutline /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">There are no todos yet!</p>
          )}
        </div>



        <div className="w-full py-3  rounded-md bg-pink-400 text-center  text-white">Create by @Farhan Yousafzai</div>
      </div>
    </>
  );
};

export default App;

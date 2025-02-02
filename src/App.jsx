import React, { useState } from 'react';
import './globals.css';
import { LuListMinus } from "react-icons/lu";
import { RiHeartAdd2Line } from "react-icons/ri";
import { GoGoal } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { GiFocusedLightning } from "react-icons/gi";
import { MdOutlineModeEdit } from "react-icons/md";

const App = () => {
  // states
  const [InputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  // function to handle adding todo
  const handleAdd = () => {
    if (InputValue.trim() === "") return; // Prevent adding empty todos
    setTodos([...todos, InputValue]); // Add todo to the list
    setToDoValue(""); // Clear input field after adding
  }

  // function to handle editing todo (for now, just a placeholder)
  const handleEdit = () => {

  }

  // function to handle deleting todo (for now, just a placeholder)
  const handleDelete = () => {

  }

  return (
    <>
      <div className='rounded-2xl mt-1 container mx-auto w-full md:w-[40%] shadow-lg'>
        <div className="w-full rounded-2xl bg-pink-400 p-5 flex justify-between items-center">
          <div className="text-2xl text-white font-semibold flex items-center gap-">FocusList <GiFocusedLightning /></div>
          <LuListMinus className='text-white cursor-pointer' size={30} />
        </div>

        {/* Add todos */}
        <div className="Add-Todos p-5">
          <p className='text-[1.3rem] uppercase flex items-center gap-2'>Set Your Goals Now <GoGoal /></p>

          <div className="flex items-center justify-between gap-2 mt-3">
            <input
              value={InputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder='Let’s Get Things Done'
              className='border-2 w-full py-4 rounded-l-lg border-pink-400 outline-0 '
            />
            <button onClick={handleAdd} className='py-[10px] cursor-pointer px-2 flex items-center gap-1 rounded-md bg-pink-400 text-white'>
              Add <RiHeartAdd2Line />
            </button>
          </div>
        </div>

        {/* Your Todos */}
        <div key={index} className="flex justify-between items-center rounded-lg mt-2 border-1 border-pink-200 shadow-lg shadow-pink-100 p-4 md:p-5">
  <p>{todo}</p>

  <div className="flex items-center gap-2">
    <button onClick={handleEdit} className='py-[5px] cursor-pointer px-2 flex items-center gap-1 rounded-md bg-pink-400 text-white'>
      <MdOutlineModeEdit /> Edit
    </button>
    <button onClick={handleDelete} className='py-[5px] cursor-pointer px-2 flex items-center gap-1 rounded-md bg-pink-400 text-white'>
      <MdDeleteOutline /> Delete
    </button>
  </div>
</div>

      </div>
    </>
  )
}

export default App;
 
import React, { useContext } from 'react'
// import Alltask from './Context';

const Modal = ({
  isOpen,
  onClose,
  newTask,
  setNewTask,
  newTaskStatus,
  setNewTaskStatus,
  addTask
}) => {


  if (!isOpen) return null;


  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'>
      <div className=' bg-gray-600 rounded-lg shadow-lg w-full max-w-[80%] h-auto p-6'>
        <h2 className='text-xl font-bold text-center text-gray-50 mb-4'>
          Edit Task
        </h2>
        <div className=' mx-auto py-4 flex flex-col sm:flex-row w-full sm:w-[90%] justify-around items-center gap-4'>
          <input
            type='text'
            placeholder='Please Add your task'
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            className='border py-2 text-gray-700 rounded-md px-4 w-full sm:w-[50%]'
          />
          <select
            // value={newTaskStatus}
            onChange={e => setNewTaskStatus(e.target.value)}
            className='w-full sm:w-[25%] border text-gray-700 py-2 px-4 rounded-md'
          >
            <option value='incomplete'>Incomplete</option>
            <option value='complete'>Complete</option>
          </select>
          <button
            onClick={addTask}
            className='w-full sm:w-[20%] bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600'
          >
            Save Task
          </button>
        </div>
        <button
          onClick={onClose}
          className='mt-4  w-[100%] bg-indigo-500 text-white py-2 rounded hover:bg-red-600'
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal

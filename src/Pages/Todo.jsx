import React, { useEffect, useState } from 'react'
import apiRequest from '../Axios';
import { data, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import deleteImg from "../assets/img/delete.png"
import roket from "../assets/img/rocket.png"
import Edit from "../assets/img/edit.png"
import add from "../assets/img/plus.png"
import EamptyTask from "../assets/img/Clipboard.png"
import { notifyError, notifySuccess } from '../Component/Toaster';
const Todo = () => {

    //useState Hook
    const [categories, setCategories] = useState([]);
    //Get All categories
    const GetCategories = async () => {
        try {
            const response = await apiRequest.get('/categories');
            const data = response.data;
            setCategories(data);
        } catch (error) {
            console.log(error)
        }
    }
    //Get Id from URL
    const { id } = useParams();
    const [singleTask, setSingleTask] = useState([]);
    const [categoriesName, setCategoriesName] = useState("");

    // Get All Task Under The Categories Id
    const getAllTask = async () => {
        let taskId = Number(id);
        try {
            const response = await apiRequest.get(`/tasks/category/${taskId}`);
            const data = response.data;
            if (response) {
            }
            setSingleTask(() => {
                let newarr = data.sort((a, b) => Number(a.id) - Number(b.id));
                return newarr;
            });
        } catch (err) {
            console.log(err)

        }
    }

    useEffect(() => {
        getAllTask();
    }, [])

    // Add New Task Under The Categories Id
    const AddNewTask = async () => {
        const categoriesId = Number(id);
        const data = {
            name: categoriesName,
            categoryId: categoriesId,
        }
        try {
            const response = await apiRequest.post(`/tasks`, data)
            getAllTask();
            if (response.status == 201) {
                setCategoriesName("")
                notifySuccess("Task added successfully! Start getting things done.");
            }
        } catch (error) {
            console.log(error)
            notifyError(error.response?.data?.message?.[0] || error.message);
        }

    }

    //Delete Modal Handle
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState({});
    const handleOpenModal = (id, item) => {
        modalOpen ? setModalOpen(false) : setModalOpen(true);
        setDeleteId(id);
    }



    //Delete Task Using Individual Task ID
    const DeleteTask = async () => {
        const itemID = Number(deleteId);
        setModalOpen(false);
        try {
            const response = await apiRequest.delete(`/tasks/${itemID}`);
            getAllTask();
            if (response.status == 200) {
                notifySuccess("Task removed from your list.");
            }
        } catch (error) {
            console.log(error)

        }
    }

    //Edit Task Using Individual Task ID
    const [isEdit, setIsEdit] = useState(false);
    const [editTaskId, setEditTaskId] = useState()
    const EditTask = async (id, item) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setIsEdit(true);
        setCategoriesName(item.name)
        setEditTaskId(Number(id))

    }

    // Save Task After Edit 
    const saveTask = async () => {
        const data = {
            name: categoriesName,
        }
        try {
            const response = await apiRequest.patch(`/tasks/${editTaskId}`, data)
            getAllTask();
            setIsEdit(false)
            if (response) {
                setCategoriesName("")
                notifySuccess("Task Save");
                window.scrollTo({
                    top: 600,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.log(error)

        }

    }

    // HandleTask Complete or Incomplete
    // Make API call to update the task status
    const handleTaskComplete = async (id, item) => {
        const updatedStatus = !item.isCompleted;
        const data = {
            isCompleted: updatedStatus,
        };

        setSingleTask(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, isCompleted: updatedStatus } : task));
        try {
            const response = await apiRequest.patch(`/tasks/${id}`, data);
            if (response.status === 200) {
                getAllTask();
                GetCategories()
            }
        } catch (err) {
            console.error(err);
        }
    };


 
    useEffect(() => {
        GetCategories();
        
    }, [])
  const NoData= ()=>{
    return singleTask?.length==0
  }
    return (

        <div div className='font-serif' >

            <div className='mx-auto bg-gray-900 h-auto  ' >
                <div className=' bg-black  mx-auto h-[200px] w-[100%] rounded-md'>
                    <h1 className='text-center flex justify-center items-center font-bold text-[30px] sm:text-6xl  py-[40px] text-indigo-500'>
                        <Link to="/">
                            <img src={roket} className='w-8  h-10 sm:h-14 m-2 cursor-pointer' alt="" />
                        </Link>

                        {
                            categories.filter((item) => item.id === Number(id)).map((item) => {
                                return (
                                    <span key={item.id}>{item.name}</span>
                                )
                            })

                        } </h1>
                    <div className='flex justify-center gap-2 items-center mx-auto py-9 sm:py-[18px] px-[5%] w-[90%] sm:w-[80%]'>
                        <input
                            type="text"
                            value={categoriesName}
                            onChange={(e) => setCategoriesName(e.target.value)}
                            onKeyDown={(e) => {
                                console.log(e)
                                if (e.code === 'Enter' && isEdit == true) {
                                    saveTask();

                                } else {
                                    if (e.code === 'Enter') {
                                        AddNewTask()
                                    }
                                }
                            }
                            }
                            placeholder='Add New Task'
                            className='bg-gray-700 w-full h-[40px] sm:h-[54px] px-4 rounded-lg outline-none ring-2 active:ring-indigo-500 text-white text-[16px]'
                        />
                        {
                            isEdit ?
                                <button onClick={saveTask} onKeyDown={(e) => e.code == "Enter" && saveTask()} className='flex gap-3 rounded-lg text-white bg-indigo-400  hover:bg-indigo-700 justify-center items-center h-[44px] sm:h-[54px] w-[120px]'>
                                    Save <img src={add} className='w-4 h-4 p1 mt-2 ' alt="" />
                                </button>
                                :
                                <button onClick={AddNewTask} onKeyDown={(e) => e.code == "Enter" && AddNewTask()} className=' text-sm sm:text-[20px] flex gap-3 rounded-lg text-white bg-indigo-400  hover:bg-indigo-700 justify-center items-center h-[44px] sm:h-[54px] w-[120px]'>
                                    Create <img src={add} className='w-4 h-4 pr-1 mt-1 ' alt="" />
                                </button>
                        }
                    </div>
                </div>
                <div>

                    {categories?.length > 0 &&
                        categories
                            .filter((item) => item.id === Number(id))
                            .map((item) => (
                                <div key={item.id}>
                                    <div key={Math.random()} className="h-auto group text-sm  shadow-sm shadow-gray-700  font-bold sm:text-3xl justify-between mx-8 my-16 flex">
                                        <div className="justify-around items-center mx-0 sm:mx-6 gap-2 flex">
                                            <div className="text-[#4ea8de]">Total Task</div>
                                            <div className="px-2 py-0.5 bg-[#333333] rounded-[999px] flex-col justify-center items-center gap-2.5 inline-flex">
                                                <div className="text-[#d9d9d9] ">{item.tasks.length}</div>
                                            </div>
                                        </div>
                                        <div className="justify-start items-center gap-2 flex">
                                            <div className="text-[#8284fa] "> Completed </div>
                                            <div className="px-2 py-0.5 bg-[#333333] rounded-[999px] flex-col justify-center items-center gap-2.5 inline-flex">
                                                <div className="text-[#d9d9d9]">
                                                    {item.tasks.filter(task => task.isCompleted).length}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>))}

                </div>

                <div className='mx-auto'>
                    {
                       NoData() ? <div className=" w-[90%] h-[200px] mx-auto text-sm shadow-lg font-bold   py-2">
                        <p className=' text-gray-700 text-sm sm:text-2xl  my-1 text-center'>This category has no tasks</p>
                            <img src={EamptyTask} className="sm:w-[20%]  sm:h-[30vh] h-[100px]  mx-auto " alt="Task Empty" />
                        </div> : singleTask?.map((item) => {
                            return (
                                <div key={item.id} className="h-[19px] text-sm gap-20 font-bold sm:text-4xl justify-between py-2 my-7 sm:my-20 flex">
                                    <div className=" group task h-auto sm:h-[72px] p-4 w-[95%] rounded-lg mx-auto shadow border border-[#333333] flex justify-between items-center gap-0">
                                        <div className="relative w-7 mx-3 flex justify-center items-center">
                                            <input
                                                onChange={(e) => handleTaskComplete(item.id, item)}
                                                type="checkbox"
                                                id={`checkbox-${item.id}`}
                                                className="hidden cursor-pointer peer"
                                                checked={item.isCompleted}
                                            />
                                            <label
                                                htmlFor={`checkbox-${item.id}`}
                                                className="w-5 sm:w-10 h-5 sm:h-7 rounded-[50%] border-2 border-indigo-400 flex items-center justify-center cursor-pointer 
                                            peer-checked:bg-[url('https://www.pngplay.com/wp-content/uploads/12/Check-Mark-Tick-PNG-HD-Free-File-Download.png')] peer-checked:bg-center peer-checked:bg-cover peer-checked:bg-no-repeat"
                                            >
                                            </label>
                                        </div>


                                        <p className={` font-normal ${item.isCompleted ? "line-through text-gray-300 " : "text-gray-100 "}  font-['Inter'] text-start w-[95%] sm:w-[90%] leading-tight`}>
                                            {item.name}
                                        </p>


                                        <button
                                            onClick={() => EditTask(item.id, item)}
                                            className="delete-btn block sm:hidden group-hover:block w-10 sm:w-12 rounded-md mx-2 h-7 sm:h-12 flex items-center justify-center text-gray-400 hover:bg-[#D3F1DF] "
                                        >
                                            <img
                                                src={Edit}
                                                className=" sm:w-16 w-8 mx-auto rounded-full h-7 sm:h-10"
                                                alt="Delete"
                                            />
                                        </button>
                                        <button
                                            onClick={() => handleOpenModal(item.id)}
                                            className="delete-btn h-7 sm:w-12 w-[10] sm:h-12 hover:bg-red-500 rounded-md flex items-center justify-center text-gray-400 "
                                        >
                                            <img
                                                src="https://png.pngtree.com/png-vector/20190420/ourmid/pngtree-delete-vector-icon-png-image_963444.jpg"
                                                className=" sm:w-8 rounded-full w-6 h-5 mx-1 sm:h-8"
                                                alt="Delete"
                                            />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                modalOpen && (
                    <div
                        className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                        <div className="w-full max-w-md my-5 bg-gray-100 shadow-lg rounded-lg p-6 relative">
                            <div className="my-5 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-14 fill-red-500 inline" viewBox="0 0 24 24">
                                    <path
                                        d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                        data-original="#000000" />
                                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                        data-original="#000000" />
                                </svg>
                                <h4 className="text-gray-800 text-md font-semibold mt-2  tracking-tight">Are you sure you want to delete this Task?</h4>
                                <p className="text-sm text-gray-600 mt-4 w-[90%] mx-4 leading-5 tracking-tighter text-justify">This action cannot be undone, and the task will be permanently removed.</p>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <button onClick={DeleteTask} type="button"
                                    className="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-red-800 hover:bg-red-600 active:bg-red-500">Delete</button>
                                <button onClick={handleOpenModal} type="button"
                                    className="px-4 py-2 rounded-lg font-bold text-white text-sm tracking-wide bg-gray-400 hover:bg-indigo-700 active:bg-gray-200">Cancel</button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div >
    )
}

export default Todo;

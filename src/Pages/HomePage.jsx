import React, { useContext, useEffect, useState } from 'react'
import apiRequest from '../Axios';
import { data, Link } from 'react-router-dom';
import Modal from '../Component/Modal';
import { notify, notifyError, notifySuccess } from '../Component/Toaster';
import { ToastContainer } from 'react-toastify';
import deleteImg from "../assets/img/delete.png"
import roket from "../assets/img/rocket.png"
import Edit from "../assets/img/edit.png"
import add from "../assets/img/plus.png"
import { loaderContext } from '../App';




const HomePage = () => {
    const loaderCtx = useContext(loaderContext);
    const [categories, setCategories] = useState();
    // const [task, setTask] = useState(" ");
    const [newCategories, setNewCategories] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    // const [loader, setLoader] = useState(false);

    //Get All categories
    const getCategories = async () => {

        try {
            const response = await apiRequest.get("/categories");
            const data = response.data;
            setCategories(() => {
                let newarr = data.sort((a, b) => Number(a.id) - Number(b.id));
                return newarr;
            });
            if (response) {
            }
            console.log(data);
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getCategories();
    }, []);


    //categories Add
    const addCategories = async () => {
        if (newCategories.length == 0) {
            notifyError("Please add categories name first");
        }
        let data = {
            name: newCategories,
        }
        try {
            const response = await apiRequest.post("/categories", data);
            if (response.status == 201) {
                notifySuccess("New Categories added to your list!");
                setNewCategories("");
                getCategories();
            }

        } catch (error) {
            console.log(error)

        }

    }
    const [deleteId, setDeleteId] = useState({});
    // Deleted Modal show
    const handleOpenModal = (id, item) => {
        modalOpen ? setModalOpen(false) : setModalOpen(true);
        setDeleteId(id);
    }

    //Delete Categories
    const DeleteCategories = async () => {
        setModalOpen(false)
        try {
            const response = await apiRequest.delete(`/categories/${deleteId}`);
            notifyError("Categories removed from your categories list .!")
            console.log(response)
            if (response.status == 200) {
                getCategories();

            }
        }
        catch (error) {
            console.log(error)
            notifyError("Failed to delete the task. Please try again.");
        }
    }
    //Edit Categories
    const [isEdit, setIsEdit] = useState(false);
    const [editTaskId, setEditTask] = useState();
    const EditCategories = async (id, item) => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setNewCategories(item.name);
        setIsEdit(true);
        setEditTask(Number(id));
    }
    //Save Edit Categories
    const saveEditedCategories = async () => {
        let data = {
            name: newCategories,
        }
        if (newCategories.length == 0) {
            setEditTask(false);
            return;
        }
        try {
            const response = await apiRequest.patch(`/categories/${editTaskId}`, data);

            getCategories()
            if (response.status == 200) {
                setIsEdit(false)
                setNewCategories('')
                notifySuccess("Categories Save");
            }
        } catch (error) {
            console.log(error)

        }

    }


    if (!categories) {
        return (
            <div class=' shadow-lg rounded-md p-4 h-[200vh]  w-[90%] mx-auto'>
                <div class='animate-pulse my-[20%] w-[60%] mx-auto  rounded-md  shadow-lg shadow-indigo-300 flex space-x-4'>
                    <div class='rounded-full bg-slate-200 h-10 w-10'></div>
                    <div class='flex-1  space-y-6 py-1'>
                        <div class='h-2 bg-slate-200 rounded'></div>
                        <div class='space-y-3'>
                            <div class='grid grid-cols-3 gap-4'>
                                <div class='h-2 bg-slate-200 rounded col-span-2'></div>
                                <div class='h-2 bg-slate-200 rounded col-span-1'></div>
                            </div>
                            <div class='h-2 bg-slate-200 rounded'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='mx-auto z-[1000] font-serif bg-gray-800 h-[400vh]  ' >


                <div className=' bg-black  mx-auto h-[200px] w-[100%] rounded-md'>
                    <h1 className='text-center flex font-bold justify-center items-center text-[25px] sm:text-6xl md:text-6xl lg:text-6xl  py-[40px] text-indigo-500'>
                        <img src={roket} className='w-8 h-10 sm:h-14 m-2 cursor-pointer' alt="" />
                        Task Categories List </h1>
                    <div className='flex justify-center gap-2 items-center mx-auto py-9 sm:py-[18px] px-[5%] w-[95%] sm:w-[80%]'>
                        <input type="text" onKeyDown={(e) => {
                            console.log(e)
                            if (e.code === 'Enter' && isEdit == true) {
                                saveEditedCategories();
                            } else {
                                if (e.code === 'Enter') {
                                    addCategories()
                                }
                            }
                        }
                        } onChange={(e) => setNewCategories(e.target.value)} value={newCategories}
                            placeholder='Add a new Categories' className='bg-gray-700 w-full h-[40px] sm:h-[54px] shadow-md shadow-gray-600 px-4 rounded-lg outline-none ring-2
                     active:ring-indigo-500  text-white  text-[16px]' />
                        {isEdit ? <button onClick={saveEditedCategories} className='flex gap-2 rounded-lg text-white bg-indigo-500 justify-center items-center h-[44px] sm:h-[54px] w-[120px]'>Save<img src={add} className='w-4 h-4 p1 mt-2 ' alt="" />
                        </button> : <button onClick={addCategories} className='flex gap-2  rounded-lg text-white bg-indigo-500 justify-center items-center h-[44px] sm:h-[54px] w-[120px]'>Create<img src={add} className='w-4 h-4  mt-1 ' alt="" /></button>
                        }
                    </div>
                </div>

                <div className='mx-auto'>
                    {
                        categories.map((item) => {
                            return (

                                <div key={Math.random()} className="h-auto group text-[8px]  shadow-sm shadow-gray-700  font-bold sm:text-3xl justify-between mx-10 my-16 flex">
                                    <div className="justify-around items-center mx-0 sm:mx-6 gap-2 flex">
                                        {/* <span className='text-white'>{item.id}</span> */}
                                        <Link to={`/todo/${item.id}`}>

                                            <div className="text-[#4ea8de]">{item.name}</div>
                                        </Link>


                                        <div className="px-1 sm:px-2 py-0.5 bg-[#333333] rounded-[999px] flex-col justify-center items-center gap-1 inline-flex">
                                            <div className="text-[#d9d9d9] ">{item.tasks.length}</div>
                                        </div>

                                        <button onClick={() => EditCategories(item.id, item)} className=' block sm:hidden hover:bg-[#D3F1DF]  rounded-md p-1 group-hover:block'>
                                            <img className='sm:w-8 w-4 rounded-lg h-4 sm:h-8' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQy1rfuoxR2GAhqSLp_r6xJV0iThbxuld11W0WCeR6Ndz6dXYGNcVz7A&s" alt="" />
                                        </button>
                                        <button onClick={() => handleOpenModal(item.id)} className='block sm:hidden  hover:bg-[#D3F1DF] p-1 rounded-lg group-hover:block'>
                                            <img className=' w-4 sm:w-8 rounded-lg h-4 sm:h-8 ' src={deleteImg} alt="" />
                                        </button>
                                    </div>
                                    <div className="justify-start text-[8px] sm:text-2xl items-center gap-1 flex">
                                        <div className="text-[#8284fa] "> Completed</div>
                                        <div className="px-2 py-0.5 bg-[#333333] rounded-[999px] flex-col justify-center items-center gap-2.5 inline-flex">
                                            <div className="text-[#d9d9d9]">
                                                {item.tasks.filter(task => task.isCompleted).length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                {
                    modalOpen && (
                        <div
                            class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-[90%] mx-auto sm:w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                            <div class="w-full max-w-md my-5 bg-gray-100 shadow-lg rounded-lg p-6 relative">
                                <div class="my-5 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-14 fill-red-500 inline" viewBox="0 0 24 24">
                                        <path
                                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                            data-original="#000000" />
                                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                            data-original="#000000" />
                                    </svg>
                                    <h4 class="text-gray-800 text-md font-semibold mt-2  tracking-tight">Are you sure you want to delete this Categories?</h4>
                                    <p class="text-sm text-gray-600 mt-4 w-[90%] mx-4 leading-5 tracking-tighter text-justify">This action cannot be undone, and the task will be permanently removed.</p>
                                </div>

                                <div class="flex flex-col space-y-2">
                                    <button onClick={DeleteCategories} type="button"
                                        class="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-red-500 hover:bg-red-600 active:bg-red-500">Delete</button>
                                    <button onClick={handleOpenModal} type="button"
                                        class="px-4 py-2 rounded-lg text-gray-50 text-sm tracking-wide bg-gray-500 hover:bg-indigo-800 active:bg-gray-200">Cancel</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default HomePage

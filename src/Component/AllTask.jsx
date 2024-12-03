import React from 'react'

const AllTask = () => {
    const [data, setData] = React.useState([]);

    const getData = async () => {
        fetch("https://nest-todo-hgkn.onrender.com/categories")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error))
    }
    React.useEffect(() => {
        getData();
    }, []);



    return (

        <div>

            {
                data.map((item) => {
                    return (
                        <div className="task h-[72px] p-4
                    w-[90%] bg-neutral-800 rounded-lg mx-auto shadow border border-[#333333] flex items-center gap-3">

                            <div class="checkbox-container relative w-6 h-6">
                                <input type="checkbox" className="checkbox hidden" id="task-1" />
                                <label htmlFor="task-1" className="ring"></label>
                            </div>

                            <p className="text-[#f2f2f2] text-sm font-normal font-['Inter'] leading-tight">
                                dd
                            </p>

                            <button className="delete-btn w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            </button>
                        </div>
                    )
                })
            }




        </div>
    )
}

export default AllTask

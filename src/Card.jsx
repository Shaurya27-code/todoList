import React from 'react'
import { CiTrash } from "react-icons/ci";

function card({taskName,id,deleteHandler}) {
  // let [deleteStatus , setDeleteStatus] = useState(false)
  function trashHandler(){
     
      deleteHandler(id)
  }
  return (
    <div>
      <div className="mx-auto w-80 px-4 py-2 flex items-center  justify-between rounded-xl mt-16 bg-violet-300">
       <p>{taskName}</p>
       <CiTrash onClick={trashHandler} className='hover:cursor-pointer hover:text-red-500' />
      </div>
    </div>
  )
}

export default card

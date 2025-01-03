import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import Card from './card'
import Loader from './Loader'

let api = 'https://practice-3c610-default-rtdb.asia-southeast1.firebasedatabase.app/'

function App() {
  let {register , handleSubmit , reset} = useForm()
  let [todos, setTodos] = useState([])
  let [submit , setSubmit] = useState(false)

  function submitHandler(data){
    setSubmit(true)

  axios.post(`${api}todos.json`,data).then(()=>{
    console.log(data)
    setSubmit(false)
    reset()
    fetchTodos()
    
  })

  

  }

  useEffect(()=>{
    fetchTodos()
  },[])

  

  function fetchTodos(){

    axios.get(`${api}todos.json`).then((todo)=>{
      let tempTodo = [];
      console.log(todo.data)
      for(let key in todo.data){
         
       let Todos = {
         
        'id': key,
         ...todo.data[key]

       }

       tempTodo.push(Todos)
      }
      
      setTodos(tempTodo)
      console.log(tempTodo)
    })

    
   

  }

  function deleteHandler(id){
    axios.delete(`${api}todos/${id}.json`).then(()=>{
     fetchTodos()
     
    })
    console.log('deleteCalled')
  }
  

  return (
    <div>
      <div className="mx-auto mt-14 w-80">
         <h1 className='text-3xl font-black'>TODO LIST <span className='text-neutral-500'>@Shaurya</span></h1>
         <form action="" onSubmit={handleSubmit(submitHandler)}>
              <input {...register('taskName')} className='border mt-6 w-full outline-none px-2 py-1' placeholder='e.g : Learn Javascript' type="text" />
              <input  className='w-full mt-6 rounded-xl px-3 py-1 bg-black text-white' type="submit" value={submit ? <Loader></Loader> : 'Create Your Todo'} />
         </form>
      </div>
      {
        todos.map((tod)=><Card id={tod.id} deleteHandler={deleteHandler} taskName = {tod.taskName}></Card>)
      }
      
    </div>
  )
}

export default App

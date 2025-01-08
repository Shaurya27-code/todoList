import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import Card from './card'
import Loader from './Loader'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser, useAuth } from "@clerk/clerk-react";
import logo from './assets/supabaseLogo.svg'
import Intro from './Intro'

let api = 'https://practice-3c610-default-rtdb.asia-southeast1.firebasedatabase.app/'

function App() {
  let {user} = useUser()
  let {isSignedIn} = useAuth()
  let {register , handleSubmit , reset} = useForm()
  let [todos, setTodos] = useState([])
  let [submit , setSubmit] = useState(false)

  function submitHandler(data){
    setSubmit(true)
    
    const requestData = {
        ...data, 
        username: user.username 
    };

  axios.post(`${api}todos.json`,requestData).then(()=>{
    
    console.log(requestData)
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
      <div className="border-b py-3 ">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-3">
          <img className='h-8' src={logo} alt="" />
        <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
        </div>
      </div>
      <SignedIn>
      <div className="mx-auto mt-14 w-80">
         <h1 className='text-3xl font-black'>TODO LIST <span className='text-neutral-500'>@{isSignedIn ? user.firstName : ""}</span></h1>
         <form action="" onSubmit={handleSubmit(submitHandler)}>
              <input {...register('taskName')} className='border mt-6 w-full outline-none px-2 py-1' placeholder='e.g : Learn Javascript' type="text" />
              <input  className='w-full mt-6 rounded-xl px-3 py-1 bg-black text-white' type="submit" value={submit ? <Loader></Loader> : 'Create Your Todo'} />
         </form>
      </div>
      {
        todos.filter(tod=>isSignedIn ? tod.username == user.username : true).map((tod)=><Card id={tod.id} deleteHandler={deleteHandler} taskName = {tod.taskName}></Card>)
      }
      </SignedIn>
      <SignedOut>
            <Intro></Intro>
      </SignedOut>
      
    </div>
  )
}

export default App

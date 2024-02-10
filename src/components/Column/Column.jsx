import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { addTodoStart, addTodoSuccess, addTodoFailure } from '../../redux/todo/todoSlice';
import { getTodosStart, getTodosSuccess, getTodosFailure } from '../../redux/todo/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';

const Column = () => {
    const { loading, todos } = useSelector((state) => state.todo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    useEffect(() => {
      const fetchTodos = async () => {
          try {
              dispatch(getTodosStart());
              const res = await fetch(`${process.env.REACT_APP_API_URL}/api/note/getAllNotes`, {
                  method: 'GET',
                  credentials: 'include'
              });
              const data = await res.json();
              dispatch(getTodosSuccess(data));
          } catch (error) {
              dispatch(getTodosFailure(error));
          }
      };

      fetchTodos();
  }, [dispatch]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(addTodoStart());
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/note/createNote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({title})
        });
        const data = await res.json();
        if(data._id === undefined){
          dispatch(addTodoFailure(data));
          return;
        }
        dispatch(addTodoSuccess(data));
        setTitle('');
        navigate('/todo');
      } catch (error) {
        console.log(error);
        dispatch(addTodoFailure(error));
      }
    }

  return (

    <div className='p-3 max-w-lg mx-auto my-10'>
      <h1 className='text-3xl text-center font-bold my-7'>To Do</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='flex flex-col'>
      <label for="title" className="font-medium">
          Create a Task
        <strong>*</strong>
      </label>
        <input 
          type='text' 
          id='title' 
          value={title}
          className='bg-slate-100 p-3 rounded-lg' 
          onChange = {e => setTitle((e.target.value))}
        />
      </div>
        <button disabled={loading} style={{backgroundColor:"#0E2E50"}} className='text-white p-3 rounded-lg uppercase hover:opacity-80'>{loading ? 'Loading...' : 'Create'}</button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        <div className="grid grid-cols-1 gap-4">
          {todos.map(todo => (
            <Card key={todo._id} task={todo} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Column

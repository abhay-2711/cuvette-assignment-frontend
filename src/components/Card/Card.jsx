import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteTodoStart, deleteTodoSuccess, deleteTodoFailure } from '../../redux/todo/todoSlice';

const Card = ({ task }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async (e) => {
      e.preventDefault();
      try {
        dispatch(deleteTodoStart());
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/note/deleteNote/${task._id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        const data = await res.json();
        if(data.message === 'Note not found'){
          dispatch(deleteTodoFailure(data));
          return;
        }
        dispatch(deleteTodoSuccess(task._id));
        navigate('/todo');
      } catch (error) {
        console.log(error);
        dispatch(deleteTodoFailure(error));
      }
    }      

  return (
    <div className='flex bg-white shadow-md rounded-md p-4 justify-between'>
      <h2 className='text-lg font-bold'>{task.title}</h2>
      <TrashIcon onClick={handleDelete} className='h-6 w-6 text-red-500 cursor-pointer' />
    </div>
  );
}

export default Card;
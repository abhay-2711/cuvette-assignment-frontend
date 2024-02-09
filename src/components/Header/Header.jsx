import React from 'react' 
import { signOut } from '../../redux/user/userSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
const zuddlLogo = '/assets/zuddl__logo.png'
 
const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)
  const signoutHandler = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signout`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      console.log(data);
      if(data === 'Signout success!'){
        dispatch(signOut());
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header>
    <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10'>

        <div 
            className='
                absolute
                top-0
                left-0
                w-full
                h-full
                bg-gradient-to-br
                from-pink-400
                to-[#0055d1]
                rounded-md
                filter
                blur-3xl
                opacity-50
                -z-50
            '
        />
      <div className='w-16'>
      <img
        src={zuddlLogo}
        alt='Zuddl'
        width={300}
        height={150}
        className='w-44 md:w-56 pb-10 md:pb-0 object-contain'
      />
      </div>

      <div className='flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5 flex-1 justify-end w-full'>
        {currentUser && 
        <button
        onClick={signoutHandler}
        className='
          px-5
          py-2
          bg-blue-500
          text-white
          rounded-md
          hover:bg-blue-600
          transition
          duration-300
        '
      >
        Logut
      </button>
        }
      </div>
    </div>
    </header>
  )
}

export default Header

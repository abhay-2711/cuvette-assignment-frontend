import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import Column from './components/Column/Column';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function App() {
  const { currentUser } = useSelector((state) => state.user);

  const isAuthenticated = () => {
    if(currentUser){
      return true;
    }
    return false;
  };
  
  const ProtectedRoute = ({ element, ...rest }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
  
    return React.cloneElement(element, rest);
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/todo" element={<ProtectedRoute element={<Column />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

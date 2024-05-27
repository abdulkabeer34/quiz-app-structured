import { Link,Outlet } from 'react-router-dom';
import './style.scss';
import React, { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { HiBars3 } from 'react-icons/hi2';
import {Sidebar} from '../SideBar';


export const Navbar = () => {
  const [open,setOpen] = useState()
  return (
   <>
    <div>
      <Sidebar open={open} onClose={()=>setOpen(prev=>!prev)}/>
      <header className='nav-header flex align-center justify-between'>
        <Link to='/'>
          <div className='logo flex align-center justify-center'>
            <img alt='Logo'  src={require('../../../Ui_FrameWork/Assets/Images/pngwing.com (5).png')} loading='lazy' />
            <h1>My Quiz App</h1>
          </div>
        </Link>
    

        <div className='mid-section flex align-center justify-around'>
          <Link to='/quiz-history'>
            <p>History</p>
          </Link>
          <Link to='/create-quiz'>
            <p>Create Quiz</p>
          </Link>
        </div>
        <div className='notification '>
          <Link trigger='click' to='/notifications'>
            <IoNotificationsOutline className='notification' />
          </Link>
        </div>
        <div onClick={()=>setOpen(prev=>!prev)}className='cross-bar cursor-pointer'>
          <HiBars3/>
        </div>
      </header>

    </div>
    <Outlet/>
   </>
  );
};

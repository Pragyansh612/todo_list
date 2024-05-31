import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="cont">
      <div className='mx-auto bg-violet-500 flex justify-between h-14 items-center'>
        <h1 className='relative left-40 font-semibold font-serif text-2xl text-white'>ITask</h1>
        <ul className='flex m-5 p-4 gap-10 relative right-20 text-white'>
          <li className='cursor-pointer hover:font-bold transition-all duration-100'>
            <Link to={"/"}>Home</Link>
          </li>
          <li className='cursor-pointer hover:font-bold transition-all duration-100'>
            <Link to={"/about"}>About</Link>
          </li>
          <li className='cursor-pointer hover:font-bold transition-all duration-100'>
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

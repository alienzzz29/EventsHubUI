import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { LuBookMarked } from "react-icons/lu";

const Nav = () => {
    // const [user, setUser] = ([]);

//   useEffect(() => {
//     // Check for the 'user' cookie whenever the component mounts or updates
//     // const user = Cookies.get('user');
//     // setUser(user);
//   }, []);
const navigate = useNavigate();
    
const handleLogoutClick = () => {
    try {
        Cookies.remove('user')
        // console.log(Cookies.get('user'))
        navigate('/')
    } catch (err) {
        console.log('Error: '+err.message);
    }
}
  return (
    <div className="navbar bg-base-100 max-w-screen-xl m-auto">
    <div className="navbar-start">
        <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {Cookies.get('user') ?
            <>
                <li><a><Link to="/dashboard">My Events</Link></a></li>
            </>
            :
            <>
                <li><a><Link to="/">Home</Link></a></li>
            </>
            }
            
            <li><a><Link to="/events">Find Events</Link></a></li>
            <li><a><Link to="/contact">Contact</Link></a></li>
        </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">EventHub</a>
    </div>
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-base">
            {Cookies.get('user') ?
            <>
                <li className='mx-1'><a className='p-3'><Link to="/dashboard">My Events</Link></a></li>
            </>
            :
            <>
                <li className='mx-1'><a className='p-3'><Link to="/">Home</Link></a></li>
            </>
            }
            <li className='mx-1'><a className='p-3'><Link to="/events">Find Events</Link></a></li>
            <li className='mx-1'><a className='p-3'><Link to="/contact">Contact</Link></a></li>
        </ul>
    </div>
    
        {Cookies.get('user') ?
        <>
        <div className="navbar-end">
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                <li>
                    <details>
                    <summary>
                    {JSON.parse(Cookies.get('user')).user.name}
                    </summary>
                    <ul class="p-2 bg-base-100 z-10">
                        <li><a>My Events</a></li>
                        <li><a>Create Event</a></li>
                        <li><a>Account</a></li>
                        <li><a onClick={handleLogoutClick}>Logout</a></li>
                    </ul>
                    </details>
                </li>
                </ul>
            </div>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                    <LuBookMarked size={20}/>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg> */}
                    <span class="badge badge-sm indicator-item">8</span>
                    </div>
                </label>
                <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-60 bg-base-100 shadow">
                    <div class="card-body">
                    <span class="font-bold text-lg">8 Events</span>
                    {/* <span class="text-info">Subtotal: $999</span> */}
                    <div class="card-actions">
                        <button class="btn btn-primary btn-block">Add to My Events</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        :
        <>
        <div className="navbar-end">
            <a className="btn btn-primary">
                <Link to="/login">Login</Link>
            </a>
            <a className="btn">
                <Link to="/signup">Signup</Link>
            </a>
        </div>
        </>
        }
    
    </div>
  )
}

export default Nav
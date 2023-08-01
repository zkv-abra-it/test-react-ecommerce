import React, { useContext } from 'react';
import { AuthContext } from '@context/AuthContext/AuthContext';
import NavbarLink from '@components/Navbar/NavbarLink';

export default function NavLoginLink() {
    const { isAuth, userInfo, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout();
    }

    if (!isAuth) {
      return (
        <NavbarLink href='/login' title='Login' />
      )
    }

    return (
      <div className='flex flex-item'>
        <span className='px-6 py-2 text-slate-700'>{userInfo?.email}</span>
        <button 
        onClick={handleLogout}
        className='px-3 py-2 rounded-md bg-zinc-700 py-1.5 font-medium text-white hover:bg-zinc-600'>
          Logout
        </button>
      </div>
    )
}
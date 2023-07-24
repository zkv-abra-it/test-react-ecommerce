import React from 'react'
import { Link } from 'react-router-dom'

function NavbarLink({href, title}) {
  return <Link to={href} className='px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900'>{title}</Link>
}

export default NavbarLink
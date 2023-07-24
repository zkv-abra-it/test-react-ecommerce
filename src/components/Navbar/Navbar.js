import React, { useState, useEffect } from 'react';
import CartWidget from '@components/CartWidget/CartWidget';
import NavbarLink from '@components/Navbar/NavbarLink';

function Navbar() {
	const [stickyNav, setStickyNav] = useState(false);

	useEffect(() => {
		const isSticky = () => {
			const distanceFromTop = 60;
			const scrollY = document.body.scrollTop || document.documentElement.scrollTop
	
			setStickyNav(scrollY > distanceFromTop);
		};

		window.addEventListener("scroll", isSticky);
		return () => {
		  window.removeEventListener("scroll", isSticky);
		};
	  }, []);

	return (
	  <nav className={(stickyNav ? 'sticky top-0 z-50 border-b border-gray-200 dark:border-gray-600' : '') + ' bg-white px-4 lg:px-6 py-2.5 dark:bg-gray-800'}>
		<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
		  <div className="flex items-center" >
			<NavbarLink href='/' title='Home' />
			<NavbarLink href='/test' title='Catalog' />
		  </div>

		  <CartWidget />
		</div>
	  </nav>
	)
}

export default Navbar;
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/auth_context";
import ClickOutsideHandler from "@/components/common/ClickOutsideHandler";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutMobileOpen, setIsAboutMobileOpen] = useState(false);
  const [isUserMenuMobileOpen, setIsUserMenuMobileOpen] = useState(false);

  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  if (loading) return null;

  const toggleUserMenu = () => setIsUserMenuOpen(prev => !prev);
  const toggleAboutMenu = () => setIsAboutOpen(prev => !prev);
  const toggleUserMenuMobile = () => setIsUserMenuMobileOpen(prev => !prev);
  const closeMenus = () => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
    setIsAboutOpen(false);
    setIsAboutMobileOpen(false);
    setIsUserMenuMobileOpen(false);
  };

  return (
    <nav className='bg-gray-100 text-black px-4 py-5 fixed top-0 left-0 right-0 z-50 shadow-md'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-4 md:px-12 lg:px-24'>

      {/* Logo */}
        <Link href='/' className='flex items-center space-x-2'>
          <Image src='/logo_zl.png' alt='Logo' width={32} height={32} />
          <span className='text-2xl font-bold'>ZikLive</span>
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden md:flex items-center space-x-6'>
          {/* About Dropdown */}
          <li className='relative'>
            <ClickOutsideHandler onClickOutside={() => setIsAboutOpen(false)}>
              <button onClick={toggleAboutMenu} className='flex items-center space-x-1 hover:text-primary transition'>
                <span>About</span>
                <ChevronDown className='w-4 h-4' />
              </button>
              {isAboutOpen && (
                <ul className='absolute top-full mt-2 bg-white text-black rounded shadow-md w-56 z-20'>
                  <DropdownItem href='/about/join' label='Join the Platform' />
                  <DropdownItem href='/about/training' label='Training & Coaching' />
                  <DropdownItem href='/about/funding' label='Opportunities' />
                  <DropdownItem href='/about/vision' label='Our Vision' />
                  <DropdownItem href='/about/story' label='Our Story' />
                  <DropdownItem href='/about/partners' label='Partners & Network' />
                </ul>
              )}
            </ClickOutsideHandler>
          </li>

          <NavLink href='/artists' label='Artists' />
          <NavLink href='/events' label='Events' />
          <NavLink href='/tickets' label='Tickets' />
          <NavLink href='/contact' label='Contact' />
          <NavLink href='/blog' label='Blog' />

          {/* User Dropdown */}
          <li className='relative ml-4'>
            <ClickOutsideHandler onClickOutside={() => setIsUserMenuOpen(false)}>
              <button onClick={toggleUserMenu} className='hover:text-primary transition'>
                <User className='w-6 h-6' />
              </button>
              {isUserMenuOpen && (
                <ul className='absolute right-0 mt-2 bg-white text-black rounded shadow-md z-20 w-40'>
                  {isAuthenticated ? (
                    <>
                      <DropdownItem href='/profile' label='My Profile' closeMenu={closeMenus} />
                      <LogoutButton closeMenu={closeMenus} />
                    </>
                  ) : (
                    <>
                      <DropdownItem href='/login' label='Log In' closeMenu={closeMenus} />
                      <DropdownItem href='/signup' label='Sign Up' closeMenu={closeMenus} />
                    </>
                  )}
                </ul>
              )}
            </ClickOutsideHandler>

          </li>
        </ul>

        {/* Mobile menu button */}
        <button className='md:hidden focus:outline-none'
          onClick={isOpen ? closeMenus : () => setIsOpen(true)}
        >
          {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ClickOutsideHandler onClickOutside={closeMenus}>
          <ul className='md:hidden flex flex-col bg-gray-800 text-white mt-2 rounded-md p-4 space-y-3 z-10 shadow-lg max-h-[80vh] overflow-y-auto'>
            {/* About */}
            <li className=''>
              <ClickOutsideHandler onClickOutside={() => setIsAboutMobileOpen(false)}>
                <button
                  onClick={() => setIsAboutMobileOpen(prev => !prev)}
                  className='flex justify-between w-full items-center px-3 py-2 rounded hover:bg-gray-700 transition-colors duration-300 hover:text-primary'
                >
                  <span>About</span>
                  <ChevronDown className='w-4 h-4' />
                </button>
                {isAboutMobileOpen && (
                  <ul className='pl-4 mt-2 space-y-1 text-sm'>
                    <NavLinkMobile href='/about/join' label='Join the Platform' closeMenu={closeMenus} />
                    <NavLinkMobile href='/about/training' label='Training & Coaching' closeMenu={closeMenus} />
                    <NavLinkMobile href='/about/funding' label='Opportunities' closeMenu={closeMenus} />
                    <NavLinkMobile href='/about/vision' label='Our Vision' closeMenu={closeMenus} />
                    <NavLinkMobile href='/about/story' label='Our Story' closeMenu={closeMenus} />
                    <NavLinkMobile href='/about/partners' label='Partners & Network' closeMenu={closeMenus} />
                  </ul>
                )}
              </ClickOutsideHandler>
            </li>

            <NavLinkMobile href='/artists' label='Artists' closeMenu={closeMenus} />
            <NavLinkMobile href='/events' label='Events' closeMenu={closeMenus} />
            <NavLinkMobile href='/tickets' label='Tickets' closeMenu={closeMenus} />
            <NavLinkMobile href='/contact' label='Contact' closeMenu={closeMenus} />
            <NavLinkMobile href='/blog' label='Blog' closeMenu={closeMenus} />

            {/* User dropdown (mobile) */}
            <li className=''>
              <ClickOutsideHandler onClickOutside={() => setIsUserMenuMobileOpen(false)}>
                <button 
                  onClick={toggleUserMenuMobile}
                  className='flex justify-between w-full items-center px-3 py-2 rounded hover:bg-gray-700 transition-colors duration-300 hover:text-primary'
                >
                  <span>Account</span>
                  <ChevronDown className='w-4 h-4' />
                </button>
                {isUserMenuMobileOpen && (
                  <ul className='ml-4 mt-2 space-y-1 text-sm'>
                    {isAuthenticated ? (
                      <>
                        <NavLinkMobile href='/profile' label='My Profile' closeMenu={closeMenus} />
                        <LogoutButton closeMenu={closeMenus} />
                      </>
                    ) : (
                      <>
                        <NavLinkMobile href='/login' label='Log In' closeMenu={closeMenus} />
                        <NavLinkMobile href='/signup' label='Sign Up' closeMenu={closeMenus} />
                      </>
                    )}
                  </ul>
                )}
              </ClickOutsideHandler>
            </li>
          </ul>
        </ClickOutsideHandler>
      )}
    </nav>
  );
}


// Desktop NavLink
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link href={href} className='hover:text-primary transition'>
      {label}
    </Link>
  </li>
);


// Mobile NavLink
const NavLinkMobile = ({
  href,
  label,
  closeMenu,
}: {
  href: string;
  label: string;
  closeMenu: () => void;
}) => (
  <li>
    <Link
      href={href}
      onClick={closeMenu}
      className='block w-full py-2 px-3 rounded hover:text-primary hover:bg-gray-700 transition-colors duration-300'
    >
      {label}
    </Link>
  </li>
);


// Dropdown Item
const DropdownItem = ({ href, label, closeMenu }: { href: string; label: string; closeMenu?: () => void }) => (
  <li>
    <Link
      href={href}
      onClick={closeMenu}
      className='block px-4 py-2 hover:text-primary transition text-sm'
    >
      {label}
    </Link>
  </li>
);


// Logout Button
const LogoutButton = ({ closeMenu }: { closeMenu?: () => void }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    closeMenu?.();
    await logout();
  };

  return (
    <li>
      <button
        onClick={handleLogout}
        className='block w-full text-left px-3 py-2 hover:text-primary transition text-sm rounded hover:bg-gray-700 transition-colors duration-300'
      >
        Log Out
      </button>
    </li>
  );
};

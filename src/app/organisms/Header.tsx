"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../atoms/Button";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/authAtom";

const links = [
  { href: "/home", label: "Visao geral" },
  { href: "/relatorios", label: "Relatórios" },
  { href: "/limitedegastos", label: "Limite de gastos" },
  { href: "/investimentos", label: "Investimentos" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const router = useRouter();
  const navRef = useRef<HTMLUListElement>(null);
  const [showBellMenu, setShowBellMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const activeLink = document.querySelector(".active-link") as HTMLElement;
    const navContainer = navRef.current;

    if (activeLink && navContainer) {
      const activeLinkRect = activeLink.getBoundingClientRect();

      setIndicatorPosition(activeLinkRect.left);
      setIndicatorWidth(activeLink.offsetWidth + 5);
    }
  }, [router.pathname]);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const handleMouseEnterBell = () => setShowBellMenu(true);
  const handleMouseLeaveBell = () => setShowBellMenu(false);

  const handleMouseEnterProfile = () => setShowProfileMenu(true);
  const handleMouseLeaveProfile = () => setShowProfileMenu(false);

  return (
    <nav className="bg-green border-gray-200 dark:bg-gray-900 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <span className="text-white self-center text-[35px] font-light whitespace-nowrap">
          ORGANI$A
        </span>

        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
          onClick={toggleNavbar}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          <ul
            className="font-semibold text-[16px] flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-16 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-green relative"
            ref={navRef}
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 px-3 rounded ${
                    router.pathname === link.href
                      ? "text-white active-link"
                      : "text-gray-200 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className="absolute bottom-0 h-0.5 bg-white transition-all duration-100"
            style={{
              left: `${indicatorPosition}px`,
              width: `${indicatorWidth}px`,
            }}
          ></div>
        </div>

        <div className="flex gap-4 relative">
          <div ref={bellRef} className="relative">
            <button
              onMouseEnter={handleMouseEnterBell}
              onMouseLeave={handleMouseLeaveBell}
              aria-haspopup="true"
              aria-expanded={showBellMenu}
            >
              <img src="/iconBelll.svg" alt="Bell Icon" className="h-7" />
            </button>
            {showBellMenu && (
              <div className="absolute right-0 top-full mt-0 w-48 h-48 bg-white border border-gray-300 rounded-lg shadow-md">
                notifications
              </div>
            )}
          </div>

          <div ref={profileRef} className="relative">
            <button
              onMouseEnter={handleMouseEnterProfile}
              onMouseLeave={handleMouseLeaveProfile}
              aria-haspopup="true"
              aria-expanded={showProfileMenu}
            >
              <img src="/iconProfilee.svg" alt="Profile Icon" className="h-7" />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-0 w-48 bg-white border border-gray-300 rounded-lg shadow-md p-4">
                <Button
                  className="w-full text-black hover:text-green font-medium rounded-lg text-base py-2.5"
                  title="Sair"
                  onClick={() =>
                    setUser({
                      ...user,
                      isAuthenticated: false,
                    })
                  }
                  type="button"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { DarkThemeToggle } from "flowbite-react";

const links = [
  { href: "/home", label: "Visao geral" },
  { href: "/relatorios", label: "Relatorios" },
  { href: "/limitedegastos", label: "Limite de gastos" },
  { href: "/investimentos", label: "Investimentos" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Get the current route

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-green border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="text-white self-center text-2xl font-semibold whitespace-nowrap">
            Organi$a
          </span>
        </a>
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
          <ul className="font-normal flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-green">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block py-2 px-3 rounded ${
                    router.pathname === link.href
                      ? "text-white bg-gray-700 md:bg-transparent md:text-white md:p-0"
                      : "text-gray-200 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0"
                  }`}
                  aria-current={
                    router.pathname === link.href ? "page" : undefined
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <DarkThemeToggle />
      </div>
    </nav>
  );
}

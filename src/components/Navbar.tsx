"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-5 py-3 lg:px-12 lg:py-4 bg-[rgba(1,8,23,0.92)] backdrop-blur-[16px] border-b border-border-dark">
      <a
        href="#"
        className="flex items-center gap-2 font-bold text-[1.05rem] text-white"
      >
        <div className="w-8 h-8 rounded-full bg-accent text-dark flex items-center justify-center font-extrabold text-[0.85rem]">
          H
        </div>
        Agence HDS
      </a>

      {/* Desktop nav */}
      <ul className="hidden lg:flex gap-8 list-none">
        <li>
          <a
            href="#home"
            className="text-[0.88rem] font-medium text-accent transition-colors"
          >
            Accueil
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="text-[0.88rem] font-medium text-white/70 hover:text-accent transition-colors"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="text-[0.88rem] font-medium text-white/70 hover:text-accent transition-colors"
          >
            Projets
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="text-[0.88rem] font-medium text-white/70 hover:text-accent transition-colors"
          >
            À Propos
          </a>
        </li>
      </ul>

      <button className="hidden lg:block bg-accent text-dark px-[22px] py-[10px] rounded-md font-semibold text-[0.85rem] border-none hover:bg-accent-hover transition-colors cursor-pointer">
        Contactez-nous
      </button>

      {/* Hamburger */}
      <button
        className="lg:hidden bg-transparent border-none cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className="block w-[22px] h-[2px] bg-white my-[5px]" />
        <span className="block w-[22px] h-[2px] bg-white my-[5px]" />
        <span className="block w-[22px] h-[2px] bg-white my-[5px]" />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="absolute top-full left-0 right-0 flex flex-col gap-4 list-none bg-dark p-5 px-12 border-b border-border-dark lg:hidden">
          <li>
            <a
              href="#home"
              className="text-[0.88rem] font-medium text-accent"
              onClick={() => setMenuOpen(false)}
            >
              Accueil
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-[0.88rem] font-medium text-white/70 hover:text-accent transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-[0.88rem] font-medium text-white/70 hover:text-accent transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Projets
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-[0.88rem] font-medium text-white/70 hover:text-accent transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              À Propos
            </a>
          </li>
          <li>
            <button className="bg-accent text-dark px-[22px] py-[10px] rounded-md font-semibold text-[0.85rem] border-none w-full mt-2 cursor-pointer">
              Contactez-nous
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

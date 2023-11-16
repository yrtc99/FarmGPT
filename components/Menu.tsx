'use client'
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Bars3Icon } from "@heroicons/react/24/solid";

function Menu() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const burger = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (burger.current && !burger.current.contains(e.target as Node)) {
        setBurgerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="">
      {/* burger */}
      <div
        className="flex flex-col"
        ref={burger}
        onClick={() => {
          setBurgerOpen(!burgerOpen);
        }}
      >
        <div className="flex absolute w-full items-center justify-between px-2 py-1 border-2 border-transparent border-b-gray-500 bg-[#343541]">
          <Bars3Icon className="cursor-pointer h-6 w-6" />
          <div className="flex justify-center items-center">
            <img src="https://i.ibb.co/16LY4Tb/logo.png" className="h-4" alt="logo" />
            <p className="font-bold text-center m-2">FarmGPT</p>
          </div>
        </div>
      </div>

      {/* sidebar */}
      {burgerOpen && (
        <div className="absolute flex bg-gray-700 w-full bg-opacity-75 z-40">
          <Sidebar />
        </div>
      )}
    </div>
  );
}

export default Menu;

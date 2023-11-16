"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import AddNew from "./AddNew";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import Chathistory from "./Chathistory";
import Calculatehistory from "./Calculatehistory";
//import logo from "@/src/logo.png"
import Link from "next/link";

function Sidebar() {
  //pull user info to session
  const { data: session } = useSession();

  //use user email to find memory
  const [chats] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );
  //
  const [calculations, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "calculations"),
        orderBy("createdAt", "desc")
      )
  );

  

  //console.log(chats);
  return (
    <div className="flex flex-col h-screen p-2 bg-[#202123]">
      <div className="flex-1">
        <div className="flex justify-center items-center">
          <img
            src="https://i.ibb.co/16LY4Tb/logo.png" // farmgpt logo
            className="h-4"
          />
          <p className="font-bold text-center m-2">FarmGPT</p>
        </div>

        <div className="space-y-2">
          {/**click to add new function page*/}
          <AddNew />
          <div className="">
            <p className="text-[#707070] mx-2 ">Chat History</p>
            <p className="text-[#707070] mx-2">詢問-</p>
            {/**Map through the chatrows */}
            {chats?.docs.map((chat) => (
              <Chathistory key={chat.id} id={chat.id} />
            ))}
            <p className="text-[#707070] mx-2">計算-</p>
            {/**new calculation Map through */}
            {calculations?.docs.map((calculate) => (
              <Calculatehistory key={calculate.id} id={calculate.id} />
            ))}
          </div>
        </div>
      </div>

      <div
        className="flex items-center cursor-pointer justify-evenly rounded-lg hover:bg-[#343541] p-2"
        onClick={() => signOut()}
      >
        {session && (
          <img
            src={session.user?.image!}
            alt="Profile pic"
            className="flex h-8 w-8 rounded-full cursor-pointer  hover:opacity-50"
          />
        )}
        <p className="flex">sign out</p>
      </div>
    </div>
  );
}

export default Sidebar;

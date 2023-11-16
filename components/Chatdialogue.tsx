"use client";
import { useEffect, useState } from "react";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";

// vector data base
// 
type Props = {
  chatId: string;
 
};

function Chatdialogue({ chatId }: Props) {
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const [modelMessages, setModelMessages] = useState<any[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    console.log("messages : ", userMessages);
    console.log("modelMessages : ", modelMessages);
  }, [userMessages, modelMessages]);

  //從firebase抓user問題出來
  useEffect(() => {
    // 確保session和chatId的值都存在且有效
    if (!session?.user?.email || !chatId) return;
    const unsubscribe = onSnapshot(
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "userMessages"
        ),
        orderBy("createdAt")
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setUserMessages(data);
      }
    );

    return () => unsubscribe();
  }, []);

  //從firebase抓Model回答出來
  useEffect(() => {
    // 確保session和chatId的值都存在且有效
    if (!session?.user?.email || !chatId) return;
    const unsubscribe = onSnapshot(
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "modelMessages"
        ),
        orderBy("createdAt")
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setModelMessages(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className=" bg-[#444654] ">
        {userMessages.map((message, index) => (
          <>
            <div className="pt-2 pb-4 grid justify-items-center bg-[#444654] sm:pt-4 sm:pb-8">
              <div
                key={message.id}
                className="justify-items-start w-2/3 sm:w-1/2  flex items-center space-x-4 "
              >
                <img
                  src={message.avatar} // 使用者
                  className=" w-6 h-6 rounded-full mr-2 "
                />
                <p>{message.text}</p>
              </div>
            </div>

            <div className="pt-2 pb-4 grid justify-items-center bg-[#343541] sm:pt-4 sm:pb-8">
              <div
                key={message.id}
                className="justify-items-start w-2/3 sm:w-1/2 flex space-x-4 "
              >
                <img
                  src="https://i.ibb.co/16LY4Tb/logo.png" // farmgpt logo
                  className=" w-6 h-4 rounded-full mr-2"
                />
                {!modelMessages[index] ? (
                  <p className="animate-pulse">Loading</p>
                ) : !modelMessages || modelMessages.length === 0 ? (
                    <p className="">回答取得失敗，請問與農業相關性較高的問題</p>
                ) : (
                  <p>{modelMessages[index].text}</p>
                ) }
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Chatdialogue;

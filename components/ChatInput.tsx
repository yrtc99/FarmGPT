"use client";

import { db } from "@/firebase";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import { FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import models from "../src/models.json";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  // Add state to hold the model's response
  const [modelResponse, setModelResponse] = useState("");

  async function sendQuestion(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    // 儲存 userMessages 的格式
    const userMessages = {
      text: input,
      createdAt: serverTimestamp(),
      _id: session?.user?.email!,
      name: session?.user?.name!,
      avatar:
        session?.user?.image! ||
        `https"//ui-avatars.com/api/?name=${session?.user?.name}`,
    };

    //the path to save 問題 into firebase
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "userMessages"
      ),
      userMessages
    );

    //模型處理
    if (model && input) {
      
      // model選擇 which API_URL 
            let route: string='';
      if(model == 'Bloom-1b1-zh'){
        route = process.env.API_URL_BLOOM!;
      } else {
        route = process.env.API_URL_GPT4ALL!;
      }
      try {

        // wait timeout
        // const wait = (milliseconds: number) => new Promise(
        //   (res, rej) => setTimeout(
        //     () => rej(new Error(`timed out after ${milliseconds} ms`)),
        //     milliseconds
        //   )
        // );


        const response = await fetch(`${route}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: input,
            modelName: model,
          }),
        });
        
        // // now the fetch 跟 wait Promise比誰的速度快
        // const fetchOrTimeout = Promise.race([response, wait(10 * 60 * 1000)]);
        
        if (!response.ok) {
          throw new Error("回答取得失敗");
          
        }

        const data = await response.json();
        const answer = data.answer; // 假設API回應的JSON中有一個名為"answer"的屬性，存放回答內容
        // Set the model's response in the state
        setModelResponse(answer);

        //modelMessages儲存格式
        const modelMessages = {
          text: answer,
          createdAt: serverTimestamp(),
        };
        //the path to save 回答 into firebase
        await addDoc(
          collection(
            db,
            "users",
            session?.user?.email!,
            "chats",
            chatId,
            "modelMessages"
          ),
          modelMessages
        );
      } catch (error) {
        console.error(error);
        // 處理發生錯誤時的情況，例如顯示錯誤訊息給使用者
        
      }
    }

    setPrompt("");
  }

  const [isOpen, setIsOpen] = useState(false);

  //render model name when click btn

  const [model, setModel] = useState("choose a model");

  // 點擊模型選項時觸發的功能
  const changeName = (selectedmodel: string) => {
    setModel(selectedmodel); // 更新模型選擇的值
  };

  //clear input value
  const clearInput = () => {
    setPrompt("");
  };

  return (
    <div className="w-2/3 ">
      <div className="flex m-2 space-x-3 items-end">
        <div className="flex items-center space-x-3">
          <div>當前模型:</div>

          <div className="rounded-lg bg-[#4F505B]  flex relative hover:ring-2 hover:ring-[#EBEFF0] ">
            <button
              className="text-white text-sm flex items-center justify-between p-2"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {model}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="bg-[#0B755C]  rounded-lg  ">
            {models.map((item) => (
              <div key={item.model}>
                <p
                  className="block w-full p-2 hover: cursor-pointer rounded-lg hover:underline underline-offset-2 "
                  onClick={() => {
                    changeName(item.model);
                    setIsOpen((prev) => !prev);
                  }}
                >
                  {item.model}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#343541] text-white rounded-lg text-sm border-2 border-[#10E5B2] ">
        <form onSubmit={sendQuestion} className="p-3 space-x-5 flex">
          <input
            id="inputText"
            value={prompt} //prompt is piece of state
            disabled={!session} //if there's no session
            onChange={(e) => setPrompt(e.target.value)} //when types in, value update
            className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            type="text"
            placeholder="敬請發問任何農業的問題~有關作物、施肥、實作、預期成效..."
          />

          <button
            disabled={!prompt || !session || model === "choose a model"}
            type="submit"
            className=" bg-[#11a37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-4 w-4 -rotate-45"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;

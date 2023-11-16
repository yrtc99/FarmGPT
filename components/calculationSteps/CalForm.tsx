"use client";
import { db } from "@/firebase";
import { useState, ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";
import InputSteps from "./InputSteps";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { InputContext } from "@/components/calculationSteps/InputContext";
import Soil from "./parameters/Soil";
import Plants from "./parameters/Plants";
import Environments from "./parameters/Environments";

type Props = {
  calculateId: string;
};

//希望能將所有種類因子input值(calculateData)儲存到firebase
//API從這裡抓input，答案(calculateAnswer)儲存到firebase
//
function CalForm({ calculateId }: Props) {
  //設定分類因子、順序的模組-------
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userData, setUserData] = useState<any>({});
  const [finalData, setFinalData] = useState<any[]>([]);
  const stepArray: string[] = [
    "土壤因子",
    "植物因子",
    "環境因子",
    //可再增加
  ];

  const displayStep = (step: any) => {
    switch (step) {
      case 1:
        return <Soil />;
      case 2:
        return <Plants />;
      case 3:
        return <Environments />;
      default:
    }
  };

  const handleClick = (clickType: "next" | "previous") => {
    let newStep = currentStep;
    if (clickType === "next") {
      newStep++;
    } else {
      newStep--;
    }

    // Check if steps are within the boundary
    if (newStep > 0 && newStep <= stepArray.length) {
      setCurrentStep(newStep);
    }
  };
  //設定分類因子、順序的模組-------end

  const [calData, setcalData] = useState("");
  const { data: session } = useSession();
  // Add state to hold the model's response
  const [modelResponse, setModelResponse] = useState("");
  //所有種類因子input值(calculateData)儲存到firebase
  //API從這裡抓input，輸出答案calculateAnswer儲存到firebase
  async function sendData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!calData) return;
    const inputs = calData.trim();
    setcalData("");

    // 儲存 user input 的格式
    const calculateData = {
      parameters: calData,
      createdAt: serverTimestamp(),
      _id: session?.user?.email!,
    };

    //the path to save 問題 into firebase
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        calculateId,
        "calculateData"
      ),
      calculateData
    );

    //計算模型處理
    if (calData) {
      try {
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parameters: calData,
            //設定的key: value,
          }),
        });

        if (!response.ok) {
          throw new Error("回答取得失敗");
        }

        const data = await response.json();
        const answer = data.answer; // 假設API回應的JSON中有一個名為"answer"的屬性，存放回答內容
        // Set the model's response in the state
        setModelResponse(answer);
        //calculateAnswer儲存格式
        const calculateAnswer = {
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
            calculateId,
            "calculateAnswer"
          ),
          calculateAnswer
        );
      } catch (error) {
        console.error(error);
        // 處理發生錯誤時的情況，例如顯示錯誤訊息給使用者
      }
    }

    setcalData("");
  }

  return (
    <div className="mt-2">
      <div className="justify-center">
        <InputSteps steps={stepArray} currentStepNumber={currentStep} />

        {/**各個因子的計算係數 */}
        <div className="mt-2">
          <InputContext.Provider
            value={{
              userData,
              setUserData,
              finalData,
              setFinalData,
            }}
          >
            {displayStep(currentStep)}
          </InputContext.Provider>
        </div>
      </div>

      <div className="container flex space-x-4 p-2">
        <button
          onClick={() => handleClick("previous")}
          className="linerbutton "
        >
          上一步
        </button>
        <button onClick={() => handleClick("next")} className="linerbutton ">
          下一步
        </button>
      </div>

      <div className="flex justify-center m-2 items-end absolute inset-x-0 bottom-4">
        <form onSubmit={sendData} className="space-x-4">
          <button className="bg-[#4F505B] rounded-lg px-10 py-4 text-sm border-2 border-transparent hover:border-[#10E5B2]">
            重新填寫變數
          </button>
          <button
            className="bg-[#4F505B] rounded-lg px-10 py-4 text-sm border-2 border-transparent hover:border-[#10E5B2]"
            type="submit"
            
          >
            開始計算
          </button>
        </form>
      </div>
    </div>
  );
}

export default CalForm;

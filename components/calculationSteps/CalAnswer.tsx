import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

type Props = {
  calculateId: string;
};
//從firebase抓模型回應資料(calculateAnswer)出來
function CalAnswer({ calculateId }: Props) {
  const { data: session } = useSession();
  const [calculateAnswer, setcalculateAnswer] = useState<any[]>([]);

  //從firebase抓Answer出來
  useEffect(() => {
    // 確保session和chatId的值都存在且有效
    if (!session?.user?.email || !calculateId) return;
    const unsubscribe = onSnapshot(
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          calculateId,
          "calculateAnswer"
        ),
        orderBy("createdAt")
      ),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setcalculateAnswer(data);
      }
    );

    return () => unsubscribe();
  }, [session, calculateId]);

  return (
  <div className="flex-1 overflow-x-hidden overflow-y-auto w-full bg-[#444654] pt-2 pb-4 grid justify-items-center sm:pt-4 sm:pb-8">
    calanswer
    {calculateAnswer.map((message, index) => (
          <>
            

            <div className="pt-2 pb-4 grid justify-items-center bg-[#343541] sm:pt-4 sm:pb-8">
              <div
                key={message.id}
                className="justify-items-start w-2/3 sm:w-1/2 flex space-x-4 "
              >
                <img
                  src="https://i.ibb.co/16LY4Tb/logo.png" // farmgpt logo
                  className="h-4 sm:h-6 rounded-full mr-2"
                />
                {!calculateAnswer[index] ? (
                  <p className="animate-pulse">Loading</p>
                ) : (
                  <p>{calculateAnswer[index].text}</p>
                )}
              </div>
            </div>
          </>
        ))}
  </div>
  );
}

export default CalAnswer;

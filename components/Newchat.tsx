"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

function Newchat() {
  const router = useRouter(); //direct them to new screen
  const { data: session } = useSession();
  const createNewChat = async () => {
    //詢問push to firebase
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };
  


  return (
    <div
      onClick={createNewChat}
      className="border-[#10E5B2] border-2 chatRow grow m-2 py-1"
    >
      詢問
    </div>
  );
}

export default Newchat;

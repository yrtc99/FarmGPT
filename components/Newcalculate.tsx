"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

function Newcalculate() {
  const router = useRouter(); //direct them to new screen
  const { data: session } = useSession();
  const createCalculate = async () => {
    //計算push to firebase
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "calculations"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/calculate/${doc.id}`);
  };

  return (
    <div
      onClick={createCalculate}
      className="border-[#10E5B2] border-2 chatRow grow m-2 py-1"
    >
      計算
    </div>
  );
}

export default Newcalculate;

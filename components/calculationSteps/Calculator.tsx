"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import CalForm from "@/components/calculationSteps/CalForm";

type Props = {
  calculateId: string;
};

function Calculator({ calculateId }: Props) {
  return (
    <div className="p-4">
      <div className="flex">
        <img
          src="https://i.ibb.co/16LY4Tb/logo.png" // farmgpt logo
          className="h-4 sm:h-6 rounded-full mr-2"
        />
        <h2>
          請在表格中輸入您的條件，若無，不需填寫：輸入完成請按「開始計算」；若要重新計算，請按「重新填寫變數」。
        </h2>
      </div>

      {/**calculation form */}
      <CalForm calculateId={""}      />

      
    </div>
  );
}

export default Calculator;

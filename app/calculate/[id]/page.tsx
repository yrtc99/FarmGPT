"use client";
import CalAnswer from "@/components/calculationSteps/CalAnswer";
import Calculator from "@/components/calculationSteps/Calculator";

import { useState, useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};


function Calculatepage({ params: { id } }: Props) {
  
  return (
    <div className="flex flex-col h-screen overflow-hidden relative items-center pt-6">
      <Calculator calculateId={id} />
      <CalAnswer calculateId={id} />
      
    </div>
  );
}

export default Calculatepage;

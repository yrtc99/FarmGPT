import React, { useState, useEffect, useRef } from "react";

interface StepObj {
  description: string;
  completed: boolean;
  highlighted: boolean;
  selected: boolean;
}

interface InputStepsProps {
  steps: string[];
  currentStepNumber: number;
}

const InputSteps: React.FC<InputStepsProps> = ({
  steps,
  currentStepNumber,
}) => {
  const [InputStepsSteps, setStep] = useState<StepObj[]>([]);
  const stepsStateRef = useRef<StepObj[]>([]);

  useEffect(() => {
    const stepsState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0 ? true : false,
      selected: index === 0 ? true : false,
    }));
    stepsStateRef.current = stepsState;
    const currentSteps = updateStep(currentStepNumber - 1, stepsState);
    setStep(currentSteps);
  }, [steps, currentStepNumber]);

  useEffect(() => {
    const currentSteps = updateStep(
      currentStepNumber - 1,
      stepsStateRef.current
    );
    setStep(currentSteps);
  }, [currentStepNumber]);

  function updateStep(stepNumber: number, steps: StepObj[]): StepObj[] {
    const newSteps = [...steps];
    let stepCounter = 0;

    while (stepCounter < newSteps.length) {
      // current step
      if (stepCounter === stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: true,
        };
        stepCounter++;
      }
      // Past step
      else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
        };
        stepCounter++;
      }
      // Future steps
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          highlighted: false,
        };
        stepCounter++;
      }
    }
    return newSteps;
  }

  const stepsDisplay = InputStepsSteps.map((step, index) => (
    <div
      key={index}
      className={
        index !== InputStepsSteps.length - 1
          ? "flex items-center"
          : "flex items-center"
      }
    >
      <div className=" flex ">
        {/**計算因子 */}
        <div
          className={`transition duration-150 ease-in-out text-[#ECECF1] border-2 rounded-lg flex items-center justify-center top-0 text-center p-1 w-32 ${
            step.highlighted
              ? " border-transparent bg-[#4F505B] "
              : " border-[#4F505B]"
          }`}
        >
          {step.description}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex justify-center items-center pt-2 space-x-8">
      {stepsDisplay}
    </div>
  );
};

export default InputSteps;

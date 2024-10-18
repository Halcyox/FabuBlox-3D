// src/components/UI/Navigation.tsx
"use client";

import { useProcess } from '../../context/ProcessContext';

const Navigation = () => {
  const { currentStep, setCurrentStep } = useProcess();
  const totalSteps = 3; // You can set this dynamically from data.length

  return (
    <div className="navigation">
      <button
        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
        disabled={currentStep === 0}  // Disable when at first step
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
        disabled={currentStep === totalSteps - 1}  // Disable when at last step
      >
        Next
      </button>
    </div>
  );
};

export default Navigation;

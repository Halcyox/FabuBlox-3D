// src/components/UI/Navigation.tsx
"use client";

import { useProcess } from '../../context/ProcessContext';

const Navigation = () => {
  const { currentStep, setCurrentStep } = useProcess(); // Pull currentStep and setCurrentStep from context

  const totalSteps = 4; // Update this dynamically based on your total process count

  // Function to handle going to the next step
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to handle going to the previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="navigation">
      <button onClick={handlePrevious} disabled={currentStep === 0}>
        Previous
      </button>
      <button onClick={handleNext} disabled={currentStep === totalSteps - 1}>
        Next
      </button>
    </div>
  );
};

export default Navigation;

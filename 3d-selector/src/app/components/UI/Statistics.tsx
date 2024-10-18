// src/components/UI/Statistics.tsx
import { useProcess } from '../../context/ProcessContext';

const Statistics = () => {
  const { currentStep } = useProcess();

  const data = [
    { description: 'Step 1: Box', cost: 100 },
    { description: 'Step 2: Sphere', cost: 200 },
    { description: 'Step 3: Cylinder', cost: 300 },
  ];

  const stepData = data[currentStep] || { description: 'Unknown Step', cost: 0 };

  return (
    <div className="statistics">
      <h2>{stepData.description}</h2>
      <p>Cost Estimate: ${stepData.cost}</p>
    </div>
  );
};

export default Statistics;

// src/components/3D/Step.tsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface StepProps {
  shape: string;
  scale?: number;
}

const Step = ({ shape, scale = 1.5 }: StepProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotation animation using `useFrame`
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Rotate the object slowly
      meshRef.current.rotation.x += 0.005; // Add a slight rotation on x-axis
    }
  });

  return (
    <>
      <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
        {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.75, 32, 32]} />}
        {shape === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1, 32]} />}
        
        {/* High-quality material with metalness, roughness, and reflections */}
        <meshStandardMaterial
          color="orange"
          roughness={0.4}  // Makes the surface look less shiny
          metalness={0.6}  // Adds a metallic appearance
          envMapIntensity={1}  // Increase environment map intensity for better reflections
        />
      </mesh>

      {/* Orbit Controls for smooth interaction */}
      <OrbitControls
        enableZoom={true}
        zoomSpeed={0.6}
        rotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.1}
        maxDistance={10}
        minDistance={2}
      />
    </>
  );
};

export default Step;

// src/components/3D/Step.tsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap'; // Using GSAP for smooth animations
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface StepProps {
  process: string; // The current process (etching, deposition, baking, oxidation)
  scale?: number;
}

const Step = ({ process, scale = 1 }: StepProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Smooth animation using useFrame and GSAP
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Continuous rotation for visual feedback
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      const mesh = meshRef.current;

      switch (process) {
        case "etching":
          gsap.to(mesh.scale, { x: 0.7, y: 0.7, z: 0.7, duration: 1 }); // Simulate material removal
          break;
        case "deposition":
          gsap.to(mesh.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 1 }); // Add a layer
          break;
        case "baking":
          gsap.to(mesh.material.color, { r: 1, g: 0.5, b: 0.3, duration: 1 }); // Color shift to simulate heating
          gsap.to(mesh.material, { roughness: 0.8, duration: 1 }); // Increase roughness
          break;
        case "oxidation":
          gsap.to(mesh.material.color, { r: 0.9, g: 0.9, b: 0.9, duration: 1 }); // Grayish color for oxidation
          gsap.to(mesh.material, { metalness: 1, roughness: 0.2, duration: 1 }); // More metallic/reflective
          break;
        default:
          gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 1 }); // Reset size
          break;
      }
    }
  }, [process]);

  return (
    <>
      <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} /> {/* Cube geometry for simplicity */}
        <meshStandardMaterial color="orange" roughness={0.5} metalness={0.4} />
      </mesh>
      <OrbitControls enableZoom={true} zoomSpeed={0.6} rotateSpeed={0.5} />
    </>
  );
};

export default Step;

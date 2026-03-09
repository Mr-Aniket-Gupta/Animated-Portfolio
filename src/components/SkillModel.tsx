"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text } from '@react-three/drei';
import { Physics, RigidBody, CuboidCollider, InstancedRigidBodies, RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const skills = [
  "C++", "Python", "Rust", "JavaScript", "TypeScript", 
  "React", "Next.js", "Node.js", "MongoDB", "SQL",
  "Tailwind", "MERN Stack", "Figma", "Power BI", "Git"
];

const Node = ({ text, position }: { text: string, position: [number, number, number] }) => {
  const bodyRef = useRef<RapierRigidBody>(null);
  const [hovered, setHovered] = useState(false);

  // Apply a continuous force towards the center to keep them clumped together (like Matter.js attractors)
  useFrame((state) => {
    if (!bodyRef.current) return;
    const bodyPos = bodyRef.current.translation();
    const vec = new THREE.Vector3(bodyPos.x, bodyPos.y, bodyPos.z);
    
    // Attract to center (0,0,0)
    const direction = vec.clone().negate().normalize();
    // Increase attraction if they bounce too far away
    const distance = vec.length();
    const forceMagnitude = distance * 2;
    
    bodyRef.current.applyImpulse(direction.multiplyScalar(forceMagnitude * 0.01), true);
  });

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
    
    // Apply a random outward explosion/spread impulse when hovered
    if (bodyRef.current) {
      const impulse = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );
      bodyRef.current.applyImpulse(impulse, true);
      
      // Add a torque spin
      const torque = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
      bodyRef.current.applyTorqueImpulse(torque, true);
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <RigidBody 
      ref={bodyRef} 
      position={position} 
      colliders="hull" 
      restitution={0.8} 
      friction={0.2} 
      linearDamping={1} 
      angularDamping={1}
    >
      <group 
        onPointerOver={handlePointerOver} 
        onPointerOut={handlePointerOut}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[text.length * 0.45 + 0.75, 1.2, 0.45]} />
          <meshPhysicalMaterial 
            color={hovered ? "#3b82f6" : "#222222"} 
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
        <Text
          position={[0, 0, 0.23]}
          fontSize={0.6}
          color={hovered ? "#ffffff" : "#a1a1aa"}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        >
          {text}
        </Text>
      </group>
    </RigidBody>
  );
};

export default function SkillModel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full min-h-[600px] md:min-h-[80vh] relative pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#4338ca" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#3b82f6" distance={15} />

        <Physics gravity={[0, 0, 0]}>
          {skills.map((skill, index) => (
            <Node 
              key={index} 
              text={skill} 
              position={[
                (Math.random() - 0.5) * 8, 
                (Math.random() - 0.5) * 8, 
                (Math.random() - 0.5) * 8
              ]} 
            />
          ))}

          {/* Invisible boundaries to keep nodes somewhat contained */}
          <RigidBody type="fixed" position={[0, 8, 0]}>
            <CuboidCollider args={[15, 0.5, 15]} />
          </RigidBody>
          <RigidBody type="fixed" position={[0, -8, 0]}>
            <CuboidCollider args={[15, 0.5, 15]} />
          </RigidBody>
          <RigidBody type="fixed" position={[8, 0, 0]}>
            <CuboidCollider args={[0.5, 15, 15]} />
          </RigidBody>
          <RigidBody type="fixed" position={[-8, 0, 0]}>
            <CuboidCollider args={[0.5, 15, 15]} />
          </RigidBody>
          <RigidBody type="fixed" position={[0, 0, -8]}>
            <CuboidCollider args={[15, 15, 0.5]} />
          </RigidBody>
          <RigidBody type="fixed" position={[0, 0, 8]}>
            <CuboidCollider args={[15, 15, 0.5]} />
          </RigidBody>
        </Physics>
      </Canvas>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full z-[-1] pointer-events-none" />
    </div>
  );
}

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
  const [isDragging, setIsDragging] = useState(false);
  const dragPoint = useRef(new THREE.Vector3());
  const lastPos = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());

  // Handle clumping / attraction
  useFrame((state) => {
    if (!bodyRef.current || isDragging) return;
    
    const bodyPos = bodyRef.current.translation();
    const vec = new THREE.Vector3(bodyPos.x, bodyPos.y, bodyPos.z);
    
    // Attract to center (0,0,0) - Reduced attraction for more spread
    const direction = vec.clone().negate().normalize();
    const distance = vec.length();
    const forceMagnitude = distance * 1.5; 
    
    bodyRef.current.applyImpulse(direction.multiplyScalar(forceMagnitude * 0.012), true);

    // Damping to prevent infinite jitter
    bodyRef.current.setLinearDamping(0.8);
    bodyRef.current.setAngularDamping(0.8);
  });

  // Track velocity during drag
  useFrame(() => {
    if (isDragging && bodyRef.current) {
      const currentPos = bodyRef.current.translation();
      const currentVec = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z);
      velocity.current.subVectors(currentVec, lastPos.current).multiplyScalar(15);
      lastPos.current.copy(currentVec);
    }
  });

  const handlePointerOver = () => {
    if (isDragging) return;
    setHovered(true);
    document.body.style.cursor = 'grab';
    
    // Enhanced scattering impulse on hover
    if (bodyRef.current) {
      const impulse = new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      );
      bodyRef.current.applyImpulse(impulse, true);
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (!isDragging) document.body.style.cursor = 'auto';
  };

  const onPointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    document.body.style.cursor = 'grabbing';
    if (bodyRef.current) {
      bodyRef.current.setBodyType(1, true); // Set to kinematicPositionBased
      const pos = bodyRef.current.translation();
      lastPos.current.set(pos.x, pos.y, pos.z);
    }
  };

  const onPointerUp = (e: any) => {
    e.stopPropagation();
    setIsDragging(false);
    document.body.style.cursor = 'auto';
    if (bodyRef.current) {
      bodyRef.current.setBodyType(0, true); // Set back to dynamic
      // "Throw" using the tracked velocity
      bodyRef.current.applyImpulse(velocity.current.multiplyScalar(2), true);
    }
  };

  const onPointerMove = (e: any) => {
    if (isDragging && bodyRef.current) {
      // Move the kinematic body to follow the cursor at the same depth
      const z = bodyRef.current.translation().z;
      const vector = new THREE.Vector3(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(e.camera);
      const dir = vector.sub(e.camera.position).normalize();
      const distance = (z - e.camera.position.z) / dir.z;
      const newPos = e.camera.position.clone().add(dir.multiplyScalar(distance));
      
      bodyRef.current.setNextKinematicTranslation({ x: newPos.x, y: newPos.y, z: z });
    }
  };

  return (
    <RigidBody 
      ref={bodyRef} 
      position={position} 
      colliders="hull" 
      restitution={0.8} 
      friction={0.2} 
    >
      <group 
        onPointerOver={handlePointerOver} 
        onPointerOut={handlePointerOut}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[text.length * 0.45 + 0.75, 1.2, 0.45]} />
          <meshPhysicalMaterial 
            color={hovered || isDragging ? "#3b82f6" : "#222222"} 
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
          color={hovered || isDragging ? "#ffffff" : "#a1a1aa"}
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
    <div className="w-full h-full min-h-[600px] md:min-h-[80vh] relative pointer-events-auto">
      <Canvas shadows camera={{ position: [0, 0, 20], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#4338ca" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#3b82f6" distance={20} />

        <Physics gravity={[0, 0, 0]}>
          {skills.map((skill, index) => (
            <Node 
              key={index} 
              text={skill} 
              position={[
                (Math.random() - 0.5) * 12, 
                (Math.random() - 0.5) * 12, 
                (Math.random() - 0.5) * 10
              ]} 
            />
          ))}

          {/* Invisible boundaries to keep nodes somewhat contained */}
          <RigidBody type="fixed" position={[0, 12, 0]}>
            <CuboidCollider args={[20, 0.5, 20]} />
          </RigidBody>
          <RigidBody type="fixed" position={[0, -12, 0]}>
            <CuboidCollider args={[20, 0.5, 20]} />
          </RigidBody>
          <RigidBody type="fixed" position={[12, 0, 0]}>
            <CuboidCollider args={[0.5, 20, 20]} />
          </RigidBody>
          <RigidBody type="fixed" position={[-12, 0, 0]}>
            <CuboidCollider args={[0.5, 20, 20]} />
          </RigidBody>
          <RigidBody type="fixed" position={[0, 0, -10]}>
            <CuboidCollider args={[20, 20, 0.5]} />
          </RigidBody>
          <RigidBody type="fixed" position={[0, 0, 10]}>
            <CuboidCollider args={[20, 20, 0.5]} />
          </RigidBody>
        </Physics>
      </Canvas>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[180px] rounded-full z-[-1] pointer-events-none" />
    </div>
  );
}

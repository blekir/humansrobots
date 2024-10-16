import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from '@react-three/postprocessing';
import * as THREE from 'three';

import modelPath from '../assets/key1.fbx'; // Import the FBX model
import texture1 from '../assets/tarkov-woodland-01-RGB.jpg'; // Import the texture
import texture2 from '../assets/tarkov-woodland-02.jpg'; // Import the texture

import robot from '../assets/robot.png';
import human from '../assets/human.png';
import { hover } from '@testing-library/user-event/dist/hover';

const Model = ({
  onModelReady,
  pointLight,
  setModelHovered,
  setAberrationOffset,
  aberrationOffset,
}) => {
  const { camera } = useThree();

  // Set the camera position closer to the model (zoomed-in by default)
  camera.position.set(0, 0, 1.3);
  const [currentTexture, setCurrentTexture] = useState(null);
  const [rotationY, setRotationY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);

  const fbx = useLoader(FBXLoader, modelPath);
  // Load both textures
  const textures = useLoader(TextureLoader, [texture1, texture2]);

  useEffect(() => {
    // Set the initial texture
    setCurrentTexture(textures[0]);
  }, [textures]);

  // Reference to the model for animation
  const modelRef = useRef();
  const colorRef = useRef(new THREE.Color(0xff0000));

  // Apply the texture to the material
  if (fbx && currentTexture) {
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material[0].map = currentTexture;
        child.material[0].emissive = new THREE.Color('orange'); // Glow color
        child.material[0].emissiveIntensity = 1.5;
        child.material.needsUpdate = true;
      }
    });
  }
  useEffect(() => {
    console.log(hoverTime);
  }, [hoverTime]);

  // Rotate the model and track its Y rotation
  useFrame((state) => {
    if (isHovered) {
      setHoverTime((prev) => prev + 1); // Increment hover time but cap it at 3 seconds
    } else {
      setHoverTime(0);
      // Reset hover time when not hovered
    }
    if (modelRef.current) {
      // Rotate the model

      modelRef.current.rotation.x += isHovered ? 0.004 : 0.01;
      modelRef.current.rotation.y += isHovered ? 0.004 : 0.01;
      modelRef.current.rotation.z += isHovered ? 0.004 : 0.01;

      camera.rotation.z +=
        isHovered && hoverTime < 40 ? (Math.random() - 0.5) * 0.005 : 0;
      // Update rotationY state
      setRotationY((prev) => prev + 0.01);

      // Check if a full rotation (2π radians) has been completed
      if (rotationY >= Math.PI * 2) {
        // Reset rotation tracker
        setRotationY(0);

        // Toggle the texture
        setCurrentTexture((prevTexture) =>
          prevTexture === textures[0] ? textures[1] : textures[0]
        );
      }

      const time = state.clock.getElapsedTime();
      const hue = (time * 0.1) % 1; // Change hue over time
      colorRef.current.setHSL(hue, 0.6, 0.5); // Set new color in HSL (hue, saturation, lightness)\

      if (fbx) {
        fbx.traverse((child) => {
          if (child.isMesh) {
            const pulseIntensity = isHovered
              ? Math.sin(time * 4) * 0.5 + 0.5
              : 1.5;
            child.material[0].emissive = colorRef.current; // Update emissive color
            child.material[0].emissiveIntensity = pulseIntensity;
            child.material.needsUpdate = true;
          }
        });
      }
      if (pointLight.current) {
        pointLight.current.color.set(colorRef.current);
        // pointLight.current.position.set(
        //   modelRef.current.position.x,
        //   modelRef.current.position.y,
        //   modelRef.current.position.z - 1 // Move it back along the Z-axis
        // ); // Set light color to match glow
        const pulseIntensity = isHovered ? Math.sin(time * 4) * 0.5 + 0.5 : 1.5;
        pointLight.current.intensity = pulseIntensity;
      }
      if (onModelReady) onModelReady(modelRef.current.position);
      const targetScale = isHovered ? 0.012 : 0.01; // Slightly increase scale on hover
      modelRef.current.scale.setScalar(
        THREE.MathUtils.lerp(modelRef.current.scale.x, targetScale, 0.02)
      );

      if (isHovered && hoverTime < 40) {
        const shakeIntensity = 0.007; // Adjust for how strong the shake should be
        camera.position.x += (Math.random() - 0.1) * shakeIntensity;
        camera.position.y += (Math.random() - 0.1) * shakeIntensity;

        setAberrationOffset(
          THREE.MathUtils.lerp(aberrationOffset, 0.003, 0.03)
        );
      } else {
        setAberrationOffset(THREE.MathUtils.lerp(aberrationOffset, 0, 0.021));
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={fbx}
      scale={0.01}
      onPointerOver={() => {
        setIsHovered(true);
        setModelHovered(true);
      }} // Set hover state to true on hover
      onPointerOut={() => {
        setIsHovered(false);
        setModelHovered(false);
      }}
    />
  );
};

const PlaneWithImage = ({ img, position, modelHovered }) => {
  const texture = useLoader(TextureLoader, img); // Load the PNG image
  const meshRef = useRef();

  // Animate the position of the plane when hovered
  useFrame(() => {
    if (meshRef.current) {
      // Smoothly translate the plane when the model is hovered
      meshRef.current.position.z = modelHovered
        ? THREE.MathUtils.lerp(meshRef.current.position.z, -0.1, 0.02)
        : THREE.MathUtils.lerp(meshRef.current.position.z, -0.27, 0.02);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2, 1.1]} />
      <meshStandardMaterial map={texture} transparent opacity={1} />
    </mesh>
  );
};

export default function Keycap() {
  const modelPosition = useRef([0, 0, 0]);
  const pointLightRef = useRef();
  const [modelHovered, setmodelHovered] = useState(false);
  const [aberrationOffset, setAberrationOffset] = useState(0);

  return (
    <Canvas>
      {/* OrbitControls allows the user to interact with the model */}
      {/* Lighting */}
      <ambientLight intensity={1} />
      <pointLight position={[1, 2, 1]} intensity={1} />
      <pointLight
        ref={pointLightRef}
        position={modelPosition.current}
        intensity={2.5}
        decay={2}
        distance={30}
      />

      {/* Load and render the FBX model */}
      <Model
        onModelReady={(position) => {
          // Update the position of the light to follow the model
          modelPosition.current = position;
        }}
        pointLight={pointLightRef}
        setModelHovered={setmodelHovered}
        setAberrationOffset={setAberrationOffset}
        aberrationOffset={aberrationOffset}
      />
      <PlaneWithImage
        img={robot}
        position={[-1.35, -0.18, -0.25]}
        modelHovered={modelHovered}
      />
      <PlaneWithImage
        img={human}
        position={[1.25, -0.18, -0.25]}
        modelHovered={modelHovered}
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2} // Threshold for glow
          luminanceSmoothing={0.15} // Smooth the transition for glow
          intensity={1.5} // Glow intensity
        />
        <ChromaticAberration
          blendFunction={THREE.AdditiveBlending} // You can change blend modes here
          offset={[aberrationOffset, aberrationOffset]} // Chromatic aberration strength
        />
      </EffectComposer>
    </Canvas>
  );
}

"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxRotation?: number; // How far the card tilts (degrees)
  scale?: number;       // How much the card scales up on hover
}

export function TiltCard({ 
  children, 
  className, 
  maxRotation = 8, 
  scale = 1.02, 
  ...props 
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to the center of the card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert coordinates to rotation degrees
    const rotateY = ((mouseX / width) - 0.5) * (maxRotation * 2);
    const rotateX = ((mouseY / height) - 0.5) * -(maxRotation * 2); // Invert Y axis for correct perspective

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly snap back to center
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${scale}, ${scale}, ${scale})`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className={cn("will-change-transform transform-gpu", className)}
      {...props}
    >
      {children}
    </div>
  );
}
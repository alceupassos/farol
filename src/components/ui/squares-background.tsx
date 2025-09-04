import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SquaresProps {
  direction?: "up" | "down" | "left" | "right" | "diagonal";
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
}

export const Squares: React.FC<SquaresProps> = ({
  direction = "up",
  speed = 0.5,
  squareSize = 40,
  borderColor = "#333",
  hoverFillColor = "#222",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationOffset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / squareSize) + 1;
      const rows = Math.ceil(canvas.height / squareSize) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * squareSize;
          let y = j * squareSize;

          // Apply direction offset
          switch (direction) {
            case "up":
              y -= animationOffset;
              break;
            case "down":
              y += animationOffset;
              break;
            case "left":
              x -= animationOffset;
              break;
            case "right":
              x += animationOffset;
              break;
            case "diagonal":
              x -= animationOffset;
              y -= animationOffset;
              break;
          }

          // Wrap around
          x = ((x % (canvas.width + squareSize)) + canvas.width + squareSize) % (canvas.width + squareSize) - squareSize;
          y = ((y % (canvas.height + squareSize)) + canvas.height + squareSize) % (canvas.height + squareSize) - squareSize;

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      animationOffset += speed;
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [direction, speed, squareSize, borderColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  );
};
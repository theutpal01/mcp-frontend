"use client";
import React, { useEffect, useRef } from "react";

interface ContextPacket {
  trackIndex: number;
  progress: number; 
  speed: number;
  size: number;
  length: number;
}

export function MCPContextNexusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect user motion preferences — render a single static frame instead
    // of running a continuous animation loop (battery + vestibular safety)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initial resting layout state
    mouseRef.current = { x: width * 0.75, y: height * 0.5, tx: width * 0.75, ty: height * 0.5 };

    const trackCount = 16; 
    const packets: ContextPacket[] = [];
    const maxPackets = 40; 

    for (let i = 0; i < maxPackets; i++) {
      packets.push({
        trackIndex: Math.floor(Math.random() * trackCount),
        progress: Math.random(),
        speed: Math.random() * 0.002 + 0.0015, 
        size: Math.random() * 1.5 + 2.5, 
        length: Math.random() * 50 + 40, 
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    // --- HIGH PERFORMANCE RENDER PIPELINE ---
    const render = () => {
      time += 0.006; 
      ctx.clearRect(0, 0, width, height);

      // Deep Space Base Canvas Clear
      ctx.fillStyle = "#040408";
      ctx.fillRect(0, 0, width, height);

      const m = mouseRef.current;
      // Tightened dampening for highly responsive, lag-free structural tracking
      m.x += (m.tx - m.x) * 0.1;
      m.y += (m.ty - m.y) * 0.1;

      const gatewayRadius = 260;
      const radiusSq = gatewayRadius * gatewayRadius; // Optimized squared distance anchor

      // 1. GATEWAY GLOW LAYER (Buffered Alpha Matrix)
      const hubGlow = ctx.createRadialGradient(m.x, m.y, 10, m.x, m.y, gatewayRadius * 1.3);
      hubGlow.addColorStop(0, "rgba(0, 132, 255, 0.14)"); 
      hubGlow.addColorStop(0.5, "rgba(251, 235, 77, 0.03)");
      hubGlow.addColorStop(1, "transparent");
      ctx.fillStyle = hubGlow;
      ctx.beginPath();
      ctx.arc(m.x, m.y, gatewayRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // 2. GENERATE AND WARP BUS TRACK SEGMENTS
      const trackPointsCache: { x: number; y: number }[][] = [];

      for (let t = 0; t < trackCount; t++) {
        const baseTrackY = (height / (trackCount + 1)) * (t + 1); // Fixed variable leaking typo
        const segmentCount = 35; // Increstrated segment density for fluid curves
        const currentTrackPoints: { x: number; y: number }[] = [];

        for (let s = 0; s <= segmentCount; s++) {
          const currentX = (width / segmentCount) * s;
          let currentY = baseTrackY;

          // Mathematical structural ambient wave drift
          currentY += Math.sin(s * 0.22 + time + t) * 6;

          const dxM = m.x - currentX;
          const dyM = m.y - currentY;
          const distSq = dxM * dxM + dyM * dyM;

          // ULTRA SMOOTH GAUSSIAN DISPLACEMENT
          // Eliminates boundary line snapping entirely by using an exponential decay curve
          if (distSq < radiusSq) {
            const gaussianFalloff = Math.exp(-distSq / (2 * (gatewayRadius * 0.45) * (gatewayRadius * 0.45)));
            const pushDir = currentY < m.y ? -1 : 1;
            currentY += pushDir * 52 * gaussianFalloff;
          }

          currentTrackPoints.push({ x: currentX, y: currentY });
        }

        trackPointsCache.push(currentTrackPoints);

        // DRAW MATRIX BUS LINE WITH MIDPOINT INTERPOLATION
        ctx.beginPath();
        ctx.moveTo(currentTrackPoints[0].x, currentTrackPoints[0].y);

        for (let s = 0; s < currentTrackPoints.length - 1; s++) {
          const p1 = currentTrackPoints[s];
          const p2 = currentTrackPoints[s + 1];
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
        }

        // Pointers wrap tightly to ensure seamless edge-to-edge tracking paths
        const lastPt = currentTrackPoints[currentTrackPoints.length - 1];
        ctx.lineTo(lastPt.x, lastPt.y);

        const distToMouseY = Math.abs(baseTrackY - m.y);
        const trackAlpha = 0.12 + Math.sin(time * 0.4 + t) * 0.02;
        let trackColor = `rgba(0, 132, 255, ${trackAlpha})`;

        if (distToMouseY < gatewayRadius) {
          const interactionIntensity = 1 - distToMouseY / gatewayRadius;
          trackColor = `rgba(0, 170, 255, ${trackAlpha + interactionIntensity * 0.18})`;
        }

        ctx.strokeStyle = trackColor;
        ctx.lineWidth = distToMouseY < gatewayRadius ? 2.0 : 1.4;
        ctx.stroke();
      }

      // 3. PACKET ROUTING COMPUTE VECTOR STREAM
      for (let i = 0; i < packets.length; i++) {
        const p = packets[i];
        p.progress += p.speed;

        if (p.progress > 1) {
          p.progress = 0;
          p.trackIndex = Math.floor(Math.random() * trackCount);
        }

        const currentTrackPoints = trackPointsCache[p.trackIndex];
        if (!currentTrackPoints) continue;

        const totalSegments = currentTrackPoints.length - 1;
        const exactIndex = p.progress * totalSegments;
        const baseIndex = Math.floor(exactIndex);
        const nextIndex = Math.min(baseIndex + 1, totalSegments);
        const interpolator = exactIndex - baseIndex;

        const pt1 = currentTrackPoints[baseIndex];
        const pt2 = currentTrackPoints[nextIndex];

        if (!pt1 || !pt2) continue;

        // Trace packet head along coordinate matrices
        const packetX = pt1.x + (pt2.x - pt1.x) * interpolator;
        const packetY = pt1.y + (pt2.y - pt1.y) * interpolator;

        const dxM = m.x - packetX;
        const dyM = m.y - packetY;
        const distSq = dxM * dxM + dyM * dyM;

        let packetColor = "rgba(0, 140, 255, 0.55)"; 
        let activeSize = p.size;

        // Performance optimized squared check for particle color transitions
        if (distSq < radiusSq) {
          const localRatio = 1 - Math.sqrt(distSq) / gatewayRadius;
          packetColor = `rgba(251, 235, 77, ${0.65 + localRatio * 0.35})`;
          activeSize = p.size + localRatio * 3.0; 
        }

        const trailGrad = ctx.createLinearGradient(packetX - p.length, packetY, packetX, packetY);
        trailGrad.addColorStop(0, "transparent");
        trailGrad.addColorStop(0.4, `rgba(0, 132, 255, ${distSq < radiusSq ? 0.2 : 0.1})`);
        trailGrad.addColorStop(1, packetColor);

        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = activeSize;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(packetX - p.length, packetY);
        ctx.lineTo(packetX, packetY);
        ctx.stroke();

        if (distSq < radiusSq) {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(packetX, packetY, activeSize * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Reduced-motion users get a single static frame — no loop is scheduled
      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 block w-full h-full object-cover pointer-events-none"
    />
  );
}
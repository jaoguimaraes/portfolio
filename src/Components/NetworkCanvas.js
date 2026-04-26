import React, { useEffect, useRef } from "react";

export default function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H, nodes, packets, ripples;
    let mouseX = -9999, mouseY = -9999;
    let lastPkt = 0;

    const isDark = () => document.body.classList.contains("dark");

    const getColors = () =>
      isDark()
        ? { node: "0,212,255", node2: "255,107,53", line: "0,212,255", pkt: "#ff6b35", pkt2: "#00d4ff", ripple: "0,212,255" }
        : { node: "0,153,187", node2: "224,90,40",  line: "0,100,140", pkt: "#e05a28", pkt2: "#0099bb", ripple: "0,153,187" };

    const setup = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      nodes = Array.from({ length: 40 }, () => {
        const bvx = (Math.random() - 0.5) * 0.3;
        const bvy = (Math.random() - 0.5) * 0.3;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: bvx, vy: bvy,
          baseVx: bvx, baseVy: bvy,
          r: 1.5 + Math.random() * 2.5,
          phase: Math.random() * Math.PI * 2,
          alt: Math.random() > 0.75,
        };
      });
      packets = [];
      ripples = [];
    };

    const addPkt = () => {
      const D = Math.min(W, H) * 0.28;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (dx * dx + dy * dy < D * D && Math.random() < 0.06) {
            packets.push({ f: i, t: j, p: 0, sp: 0.004 + Math.random() * 0.006, alt: Math.random() > 0.5 });
            return;
          }
        }
      }
    };

    const draw = (ts) => {
      ctx.clearRect(0, 0, W, H);
      const c = getColors();
      const D = Math.min(W, H) * 0.28;

      if (ts - lastPkt > 500) { addPkt(); lastPkt = ts; }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < D) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${c.line},${(1 - d / D) * 0.1})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach(n => {
        const mdx = n.x - mouseX;
        const mdy = n.y - mouseY;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 100 && md > 0) {
          const force = (100 - md) / 100 * 0.5;
          n.vx += (mdx / md) * force;
          n.vy += (mdy / md) * force;
        }

        n.vx += (n.baseVx - n.vx) * 0.03;
        n.vy += (n.baseVy - n.vy) * 0.03;

        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd > 3.5) { n.vx = (n.vx / spd) * 3.5; n.vy = (n.vy / spd) * 3.5; }

        n.phase += 0.016;
        const a = 0.18 + Math.sin(n.phase) * 0.14;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.alt ? c.node2 : c.node},${a})`;
        ctx.fill();

        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) { n.vx *= -1; n.baseVx *= -1; }
        if (n.y < 0 || n.y > H) { n.vy *= -1; n.baseVy *= -1; }
        n.x = Math.max(0, Math.min(W, n.x));
        n.y = Math.max(0, Math.min(H, n.y));
      });

      // Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const pk = packets[i];
        pk.p += pk.sp;
        if (pk.p >= 1) { packets.splice(i, 1); continue; }
        const f = nodes[pk.f], t = nodes[pk.t];
        ctx.beginPath();
        ctx.arc(
          f.x + (t.x - f.x) * pk.p,
          f.y + (t.y - f.y) * pk.p,
          2.2, 0, Math.PI * 2
        );
        ctx.fillStyle = pk.alt ? c.pkt : c.pkt2;
        ctx.fill();
      }

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 3.5;
        rp.alpha -= 0.022;
        if (rp.alpha <= 0) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${c.ripple},${rp.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const handleMouseLeave = () => { mouseX = -9999; mouseY = -9999; };

    const handleClick = (e) => {
      const cx = e.clientX, cy = e.clientY;
      ripples.push({ x: cx, y: cy, r: 5, alpha: 0.65 });
      ripples.push({ x: cx, y: cy, r: 5, alpha: 0.35 });
      nodes.forEach(n => {
        const dx = n.x - cx, dy = n.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 180 && d > 0) {
          const force = (180 - d) / 180 * 2.8;
          n.vx += (dx / d) * force;
          n.vy += (dy / d) * force;
        }
      });
    };

    const handleTouchMove = (e) => {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => { mouseX = -9999; mouseY = -9999; };

    const handleTouchStart = (e) => {
      handleClick({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    };

    const handleResize = () => {
      cancelAnimationFrame(animId);
      setup();
      animId = requestAnimationFrame(draw);
    };

    setup();
    animId = requestAnimationFrame(draw);

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}

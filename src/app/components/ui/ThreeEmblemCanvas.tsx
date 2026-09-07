import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeEmblemCanvasProps {
  className?: string;
}

export const ThreeEmblemCanvas: React.FC<ThreeEmblemCanvasProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Sacred Gold Emblem Group
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Metallic Gold Material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x553d00,
      emissiveIntensity: 0.2,
    });

    // Outer Torus Ring
    const torusGeometry = new THREE.TorusGeometry(2.2, 0.15, 32, 100);
    const torusMesh = new THREE.Mesh(torusGeometry, goldMaterial);
    emblemGroup.add(torusMesh);

    // Inner Star / Rays Pattern (Icosahedron / Octahedron Core)
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xae8f05,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    emblemGroup.add(coreMesh);

    // Center 30th Anniversary Emblem Sphere
    const centerSphereGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const centerSphereMat = new THREE.MeshStandardMaterial({
      color: 0xfffff0,
      metalness: 0.3,
      roughness: 0.1,
      emissive: 0xf7e7ce,
      emissiveIntensity: 0.4,
    });
    const centerSphere = new THREE.Mesh(centerSphereGeo, centerSphereMat);
    emblemGroup.add(centerSphere);

    // Volumetric Glowing Particles (Sacred Dust)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf7e7ce,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xd4af37, 3, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf7e7ce, 2, 20);
    pointLight2.position.set(-5, -5, 3);
    scene.add(pointLight2);

    // Mouse Parallax Effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotation loops
      emblemGroup.rotation.y = elapsedTime * 0.4;
      emblemGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;
      coreMesh.rotation.z = -elapsedTime * 0.5;

      // Parallax smooth interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      emblemGroup.rotation.y += targetX * 0.3;
      emblemGroup.rotation.x += -targetY * 0.3;

      // Particle floating drift
      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center w-full h-full min-h-[320px] ${className}`}>
      <div ref={mountRef} className="w-full h-full min-h-[320px]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-3xl font-extrabold tracking-widest gold-gradient-text drop-shadow-md">
          30TH
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-warm-slate font-semibold mt-1">
          Anniversary
        </span>
      </div>
    </div>
  );
};

/* ============================================================
   Skills — Real 3D physics cubes (R3F + Rapier)
   Cubes fall from above. Hover = quick toss. Click+drag = grab & throw.
   ============================================================ */
import { Canvas, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import { motion, useInView } from "framer-motion";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const skills = [
  { name: "React",       category: "Frontend"  },
  { name: "TypeScript",  category: "Language"  },
  { name: "Tailwind",    category: "Styling"   },
  { name: "Node.js",     category: "Backend"   },
  { name: "Python",      category: "Language"  },
  { name: "Android",     category: "Mobile"    },
  { name: "Firebase",    category: "Backend"   },
  { name: "PostgreSQL",  category: "Database"  },
  { name: "Docker",      category: "DevOps"    },
  { name: "Git",         category: "Tools"     },
  { name: "OpenCV",      category: "Vision"    },
  { name: "C#",          category: "Language"  },
];

const CAT_COLOR: Record<string, string> = {
  Frontend: "#3b82f6",
  Backend:  "#a855f7",
  Language: "#f97316",
  Styling:  "#22c55e",
  Mobile:   "#6366f1",
  Database: "#eab308",
  DevOps:   "#64748b",
  Tools:    "#f43f5e",
  Vision:   "#14b8a6",
};

// ---------------------------------------------------------------------------
// Canvas texture factory
// ---------------------------------------------------------------------------

function makeTex(name: string, category: string, hex: string): THREE.CanvasTexture {
  const N = 256;
  const cv = document.createElement("canvas");
  cv.width = cv.height = N;
  const ctx = cv.getContext("2d")!;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const dark = `rgb(${r * .45 | 0},${g * .45 | 0},${b * .45 | 0})`;

  const grad = ctx.createLinearGradient(0, 0, N, N);
  grad.addColorStop(0, hex);
  grad.addColorStop(1, dark);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, N, N);

  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, N - 16, N - 16);

  const fs = name.length > 9 ? 28 : name.length > 6 ? 36 : 44;
  ctx.font = `700 ${fs}px sans-serif`;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name, N / 2, N / 2 - 14);

  ctx.font = `400 22px sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText(category, N / 2, N / 2 + 32);

  return new THREE.CanvasTexture(cv);
}

// ---------------------------------------------------------------------------
// SkillCube — individual physics cube
// ---------------------------------------------------------------------------

interface CubeProps {
  skill: typeof skills[0];
  position: [number, number, number];
  onRef: (rb: RapierRigidBody | null) => void;
  onDragStart: (rb: RapierRigidBody, e: any) => void;
  isDragging: React.RefObject<boolean>;
}

function SkillCube({ skill, position, onRef, onDragStart, isDragging }: CubeProps) {
  const { gl } = useThree();
  const hex = CAT_COLOR[skill.category] ?? "#888888";
  const texture = useMemo(() => makeTex(skill.name, skill.category, hex), [skill.name, skill.category, hex]);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3, metalness: 0.15 }),
    [texture],
  );
  const rbRef = useRef<RapierRigidBody | null>(null);

  const handlePointerDown = useCallback((e: any) => {
    e.stopPropagation();
    if (!rbRef.current) return;
    gl.domElement.style.cursor = "grabbing";
    onDragStart(rbRef.current, e);
  }, [onDragStart, gl]);

  const handlePointerEnter = useCallback(() => {
    if (isDragging.current) return;
    gl.domElement.style.cursor = "grab";
    const rb = rbRef.current;
    if (!rb) return;
    rb.applyImpulse(
      { x: (Math.random() - .5) * 10, y: 6 + Math.random() * 5, z: (Math.random() - .5) * 2 },
      true,
    );
    rb.applyTorqueImpulse(
      { x: (Math.random() - .5) * 10, y: (Math.random() - .5) * 10, z: (Math.random() - .5) * 10 },
      true,
    );
  }, [isDragging, gl]);

  const handlePointerLeave = useCallback(() => {
    if (!isDragging.current) gl.domElement.style.cursor = "auto";
  }, [isDragging, gl]);

  return (
    <RigidBody
      ref={(rb: RapierRigidBody | null) => {
        rbRef.current = rb;
        onRef(rb);
      }}
      position={position}
      colliders="cuboid"
      restitution={0.42}
      friction={0.65}
      linearDamping={0.3}
      angularDamping={0.55}
    >
      <mesh
        material={material}
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.0, 2.0, 2.0]} />
      </mesh>
    </RigidBody>
  );
}

// ---------------------------------------------------------------------------
// PhysicsScene — lives inside Canvas, owns drag state + event listeners
// ---------------------------------------------------------------------------

interface DragState {
  rb: RapierRigidBody;
  z: number;
  ox: number; oy: number;       // grab offset in world space
  px: number; py: number;       // prev position (for velocity)
  pt: number;                   // prev time
  vx: number; vy: number;       // estimated throw velocity
  pointerId: number;
}

interface SceneProps {
  initPos: [number, number, number][];
  onRbRef: (i: number, rb: RapierRigidBody | null) => void;
}

function PhysicsScene({ initPos, onRbRef }: SceneProps) {
  const { camera, gl } = useThree();

  const rayRef   = useRef(new THREE.Raycaster());
  const ndcRef   = useRef(new THREE.Vector2());
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1)));
  const hitRef   = useRef(new THREE.Vector3());
  const drag     = useRef<DragState | null>(null);
  const isDragging = useRef(false);

  // Convert screen pixel coords → world XY on the drag plane
  const screenToWorld = useCallback(
    (cx: number, cy: number) => {
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((cx - rect.left) / rect.width)  *  2 - 1;
      const ny = ((cy - rect.top)  / rect.height) * -2 + 1;
      ndcRef.current.set(nx, ny);
      rayRef.current.setFromCamera(ndcRef.current, camera);
      rayRef.current.ray.intersectPlane(planeRef.current, hitRef.current);
      return { x: hitRef.current.x, y: hitRef.current.y };
    },
    [camera, gl],
  );

  // Global pointermove / pointerup on the canvas element
  useEffect(() => {
    const canvas = gl.domElement;

    const onMove = (e: PointerEvent) => {
      if (!drag.current) return;
      const d = drag.current;
      planeRef.current.constant = -d.z;
      const w = screenToWorld(e.clientX, e.clientY);
      const tx = w.x - d.ox;
      const ty = w.y - d.oy;
      const now = Date.now();
      const dt = (now - d.pt) / 1000;
      if (dt > 0.001) {
        d.vx = (tx - d.px) / dt;
        d.vy = (ty - d.py) / dt;
        d.px = tx; d.py = ty; d.pt = now;
      }
      d.rb.setNextKinematicTranslation({ x: tx, y: ty, z: d.z });
    };

    const onUp = (e: PointerEvent) => {
      if (!drag.current) return;
      const d = drag.current;
      d.rb.setBodyType(0, true); // → Dynamic
      d.rb.setLinvel({ x: d.vx * 0.85, y: d.vy * 0.85, z: 0 }, true);
      d.rb.setAngvel(
        { x: (Math.random() - .5) * 10, y: (Math.random() - .5) * 10, z: (Math.random() - .5) * 10 },
        true,
      );
      canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = "auto";
      drag.current = null;
      isDragging.current = false;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [gl, screenToWorld]);

  // Called from each SkillCube's onPointerDown
  const startDrag = useCallback((rb: RapierRigidBody, e: any) => {
    const pos = rb.translation();
    planeRef.current.constant = -pos.z;
    const w = screenToWorld(e.clientX, e.clientY);

    rb.setBodyType(2, true); // → KinematicPositionBased
    gl.domElement.setPointerCapture(e.pointerId);

    drag.current = {
      rb, z: pos.z,
      ox: w.x - pos.x, oy: w.y - pos.y,
      px: pos.x, py: pos.y, pt: Date.now(),
      vx: 0, vy: 0,
      pointerId: e.pointerId,
    };
    isDragging.current = true;
  }, [gl, screenToWorld]);

  // Boundary dimensions
  const HW = 8, FY = -5, DZ = 2.4;

  return (
    <Physics gravity={[0, -24, 0]}>
      {/* Invisible floor + walls */}
      <RigidBody type="fixed"><CuboidCollider args={[HW, 0.15, DZ]} position={[0, FY, 0]} /></RigidBody>
      <RigidBody type="fixed"><CuboidCollider args={[0.15, 25, DZ]} position={[-HW, 0, 0]} /></RigidBody>
      <RigidBody type="fixed"><CuboidCollider args={[0.15, 25, DZ]} position={[ HW, 0, 0]} /></RigidBody>
      <RigidBody type="fixed"><CuboidCollider args={[HW, 25, 0.15]} position={[0, 0, -DZ]} /></RigidBody>
      <RigidBody type="fixed"><CuboidCollider args={[HW, 25, 0.15]} position={[0, 0,  DZ]} /></RigidBody>

      {skills.map((skill, i) => (
        <SkillCube
          key={skill.name}
          skill={skill}
          position={initPos[i]}
          onRef={(rb) => onRbRef(i, rb)}
          onDragStart={startDrag}
          isDragging={isDragging}
        />
      ))}
    </Physics>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function randPositions(): [number, number, number][] {
  return skills.map((_, i) => [
    (Math.random() - .5) * 12,
    8 + i * 1.5,
    (Math.random() - .5) * 3,
  ]);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  const rbRefs = useRef<(RapierRigidBody | null)[]>(skills.map(() => null));
  const [initPos] = useState<[number, number, number][]>(randPositions);

  const handleRbRef = useCallback((i: number, rb: RapierRigidBody | null) => {
    rbRefs.current[i] = rb;
  }, []);

  const handleReset = useCallback(() => {
    const newPos = randPositions();
    rbRefs.current.forEach((rb, i) => {
      if (!rb) return;
      const [x, y, z] = newPos[i];
      rb.setBodyType(0, true);
      rb.setTranslation({ x, y, z }, true);
      rb.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rb.setAngvel({ x: 0, y: 0, z: 0 }, true);
    });
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase block mb-4"
          >
            {t("skills.label")}
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-3 justify-center"
          >
            <h2
              className="text-4xl lg:text-5xl font-extrabold text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t("skills.title")}
            </h2>
            <button
              onClick={handleReset}
              title="Reset playground"
              className="text-foreground/30 hover:text-cyan-400 transition-colors mt-1"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* 3-D canvas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative w-full rounded-2xl overflow-hidden border border-white/8"
          style={{ height: 520, background: "rgba(7, 15, 28, 0.8)", touchAction: "none" }}
        >
          {inView && (
            <Canvas
              shadows
              camera={{ position: [0, 1.5, 18], fov: 52 }}
              gl={{ alpha: true, antialias: true }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[8, 14, 6]}
                intensity={1.6}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <pointLight position={[-7, 6, 5]}  color="#22d3ee" intensity={1.0} />
              <pointLight position={[ 7, 8, 3]}  color="#818cf8" intensity={0.6} />

              <Suspense fallback={null}>
                <PhysicsScene initPos={initPos} onRbRef={handleRbRef} />
              </Suspense>
            </Canvas>
          )}
        </motion.div>

        {/* Skill list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8"
        >
          <p className="text-xs font-mono text-foreground/35 uppercase tracking-widest mb-4">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-white/8 hover:border-white/16 transition-colors"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: CAT_COLOR[skill.category] ?? "#888" }}
                />
                <span
                  className="text-sm text-foreground/80 font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {skill.name}
                </span>
                <span className="text-xs text-foreground/35 font-mono">{skill.category}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

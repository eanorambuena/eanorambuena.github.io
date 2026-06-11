import { Canvas, useFrame } from '@react-three/fiber'
import { Html, ContactShadows, Edges, Float } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

const groups = [
  {
    title: 'Frontend',
    color: '#a855f7',
    skills: ['React', 'TypeScript', 'Next.js', 'Vue', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Mobile',
    color: '#3b82f6',
    skills: ['React Native', 'Tamagui', 'Expo'],
  },
  {
    title: 'Backend',
    color: '#22c55e',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'SST', 'Serverless'],
  },
  {
    title: 'DevOps',
    color: '#f97316',
    skills: ['AWS', 'Azure', 'Docker', 'Git', 'CI/CD', 'Linux'],
  },
]

const CAB_W = 1.0
const CAB_D = 0.7
const ITEM_W = 0.32
const ITEM_H = 0.1
const ITEM_D = 0.16
const ITEM_PITCH = 0.22

function SkillItem({ label, color, index, total, isOpen, cabH }) {
  const groupRef = useRef()
  const openStart = useRef(0)
  const wasOpen = useRef(false)

  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const spreadR = 0.8
  const spreadX = Math.cos(angle) * spreadR
  const spreadZ = Math.sin(angle) * spreadR * 0.4
  const spreadY = (index - (total - 1) / 2) * 0.32
  const restY = (index - (total - 1) / 2) * ITEM_PITCH

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    if (isOpen && !wasOpen.current) {
      openStart.current = clock.elapsedTime
      wasOpen.current = true
    } else if (!isOpen && wasOpen.current) {
      openStart.current = clock.elapsedTime
      wasOpen.current = false
    }
    const elapsed = clock.elapsedTime - openStart.current
    const stagger = index * 0.06
    const phase = Math.min(1, Math.max(0, (elapsed - stagger) / 0.35))
    const eased = phase * phase * (3 - 2 * phase)

    const tgtX = isOpen ? spreadX * eased : 0
    const tgtY = isOpen ? spreadY * eased : restY
    const tgtZ = isOpen ? 0.7 * eased : 0
    const tgtS = isOpen ? 1.0 : 0.6 + 0.4 * (1 - eased)

    groupRef.current.position.x = tgtX
    groupRef.current.position.y = tgtY
    groupRef.current.position.z = tgtZ
    const s = tgtS
    groupRef.current.scale.set(s, s, s)
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[ITEM_W, ITEM_H, ITEM_D]} />
        <meshStandardMaterial
          color={isOpen ? color : '#181828'}
          metalness={0.75}
          roughness={0.2}
          envMapIntensity={1.2}
        />
        <Edges
          color={isOpen ? '#ffffff' : color}
          opacity={isOpen ? 0.5 : 0.12}
          transparent
          threshold={15}
        />
      </mesh>
      <mesh position={[0, 0, ITEM_D / 2 + 0.001]}>
        <planeGeometry args={[ITEM_W - 0.06, ITEM_H - 0.03]} />
        <meshBasicMaterial color={color} transparent opacity={isOpen ? 0.25 : 0.04} />
      </mesh>
      <Html position={[0, 0, ITEM_D / 2 + 0.03]} center>
        <div style={{
          color: isOpen ? '#fff' : '#a1a1aa',
          fontSize: '8px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.02em',
          textShadow: isOpen ? `0 0 12px ${color}88` : 'none',
          transition: 'color 0.2s',
          pointerEvents: 'none',
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

function Cabinet({ group, column }) {
  const [hovered, setHovered] = useState(false)
  const n = group.skills.length
  const cabH = n * ITEM_PITCH + 0.2
  const x = (column - 1.5) * 1.5

  return (
    <Float speed={1.0 + column * 0.15} rotationIntensity={0.08} floatIntensity={0.2}>
      <group
        position={[x, 0.2, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        tabIndex={0}
        role="button"
        aria-label={`${group.title} skills`}
      >
        {/* Cabinet body */}
        <mesh>
          <boxGeometry args={[CAB_W, cabH, CAB_D]} />
          <meshPhysicalMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
        {/* Interior cavity */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[CAB_W - 0.06, cabH - 0.06, CAB_D - 0.06]} />
          <meshPhysicalMaterial
            color="#050505"
            metalness={0.95}
            roughness={0.5}
            side={THREE.BackSide}
          />
        </mesh>
        {/* Front edge glow */}
        <mesh position={[0, 0, CAB_D / 2]}>
          <planeGeometry args={[CAB_W - 0.04, cabH - 0.04]} />
          <meshBasicMaterial
            color={group.color}
            transparent
            opacity={hovered ? 0.08 : 0.02}
          />
        </mesh>
        {/* Wireframe edges */}
        <mesh>
          <boxGeometry args={[CAB_W, cabH, CAB_D]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges
            color={group.color}
            opacity={hovered ? 0.6 : 0.2}
            transparent
            threshold={15}
          />
        </mesh>

        {/* Category title above cabinet */}
        <Html position={[0, cabH / 2 + 0.35, 0]} center>
          <div style={{
            color: group.color,
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontFamily: 'Inter, sans-serif',
            textShadow: `0 0 20px ${group.color}66`,
            pointerEvents: 'none',
          }}>
            {group.title}
          </div>
        </Html>

        {/* Items */}
        {group.skills.map((skill, i) => {
          const y = (i - (n - 1) / 2) * ITEM_PITCH
          return (
            <group position={[0, y, 0]} key={skill}>
              <SkillItem
                label={skill}
                color={group.color}
                index={i}
                total={n}
                isOpen={hovered}
                cabH={cabH}
              />
            </group>
          )
        })}
      </group>
    </Float>
  )
}

function Scene() {
  const groupRef = useRef()
  const autoRotate = useRef(0)

  useFrame(({ clock, mouse }) => {
    autoRotate.current = clock.elapsedTime * 0.2
    if (groupRef.current) {
      const targetY = mouse.x * 0.15 + Math.sin(autoRotate.current) * 0.08
      const targetX = -mouse.y * 0.06 + Math.sin(autoRotate.current * 0.5) * 0.03
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, 4]} intensity={0.5} color="#a855f7" />
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#3b82f6" />
      <directionalLight position={[-2, 3, -4]} intensity={0.3} color="#a855f7" />

      <group position={[0, 0.5, 0]} ref={groupRef}>
        {groups.map((g, i) => (
          <Cabinet key={g.title} group={g} column={i} />
        ))}
      </group>

      <ContactShadows
        position={[0, -0.8, 0]}
        opacity={0.25}
        scale={12}
        blur={3}
        far={3}
      />
    </>
  )
}

export default function Skills3D() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (reduced) return null

  return (
    <div class="w-full h-[500px] md:h-[600px]" aria-label="3D skills cabinets">
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = 3
          gl.toneMappingExposure = 1.2
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

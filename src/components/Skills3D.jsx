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

const BW = 0.7
const BH = 0.45
const BD = 0.5
const WT = 0.02
const FLAP_D = 0.15
const FLAP_ANGLE = 0.5

function CardboardBox({ color }) {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 0, -BD / 2 + WT / 2]}>
        <boxGeometry args={[BW, BH, WT]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Front wall */}
      <mesh position={[0, 0, BD / 2 - WT / 2]}>
        <boxGeometry args={[BW, BH, WT]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-BW / 2 + WT / 2, 0, 0]}>
        <boxGeometry args={[WT, BH, BD - WT * 2]} />
        <meshStandardMaterial color="#151515" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Right wall */}
      <mesh position={[BW / 2 - WT / 2, 0, 0]}>
        <boxGeometry args={[WT, BH, BD - WT * 2]} />
        <meshStandardMaterial color="#151515" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -BH / 2 + WT / 2, 0]}>
        <boxGeometry args={[BW - WT * 2, WT, BD - WT * 2]} />
        <meshStandardMaterial color="#111" metalness={0.3} roughness={0.8} />
      </mesh>
      {/* Interior dark floor */}
      <mesh position={[0, -BH / 2 + WT, 0]}>
        <planeGeometry args={[BW - WT * 3, BD - WT * 3]} />
        <meshBasicMaterial color="#080808" />
      </mesh>

      {/* Front flap */}
      <group position={[0, BH / 2, BD / 2]}>
        <mesh position={[0, 0, FLAP_D / 2]} rotation={[-FLAP_ANGLE, 0, 0]}>
          <boxGeometry args={[BW - WT * 2, WT, FLAP_D]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
      {/* Back flap */}
      <group position={[0, BH / 2, -BD / 2]}>
        <mesh position={[0, 0, -FLAP_D / 2]} rotation={[FLAP_ANGLE, 0, 0]}>
          <boxGeometry args={[BW - WT * 2, WT, FLAP_D]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
      {/* Left flap */}
      <group position={[-BW / 2, BH / 2, 0]}>
        <mesh position={[-FLAP_D / 2, 0, 0]} rotation={[0, 0, FLAP_ANGLE]}>
          <boxGeometry args={[FLAP_D, WT, BD - WT * 2]} />
          <meshStandardMaterial color="#151515" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>
      {/* Right flap */}
      <group position={[BW / 2, BH / 2, 0]}>
        <mesh position={[FLAP_D / 2, 0, 0]} rotation={[0, 0, -FLAP_ANGLE]}>
          <boxGeometry args={[FLAP_D, WT, BD - WT * 2]} />
          <meshStandardMaterial color="#151515" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>

      {/* Edge lines */}
      <mesh>
        <boxGeometry args={[BW, BH, BD]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={color} opacity={0.3} transparent threshold={15} />
      </mesh>
    </group>
  )
}

function SkillItem({ label, color, index, total, isOpen }) {
  const groupRef = useRef()
  const openStart = useRef(0)
  const wasOpen = useRef(false)

  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const spreadR = 0.6
  const spreadX = Math.cos(angle) * spreadR
  const spreadZ = Math.sin(angle) * spreadR * 0.3
  const spreadY = (index - (total - 1) / 2) * 0.25
  const restY = (index - (total - 1) / 2) * 0.14

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    if (isOpen && !wasOpen.current) { openStart.current = clock.elapsedTime; wasOpen.current = true }
    else if (!isOpen && wasOpen.current) { openStart.current = clock.elapsedTime; wasOpen.current = false }

    const elapsed = clock.elapsedTime - openStart.current
    const stagger = index * 0.05
    const phase = Math.min(1, Math.max(0, (elapsed - stagger) / 0.3))
    const eased = phase * phase * (3 - 2 * phase)

    groupRef.current.position.x = isOpen ? spreadX * eased : 0
    groupRef.current.position.y = isOpen ? spreadY * eased : restY
    groupRef.current.position.z = isOpen ? 0.5 * eased : 0
    const s = isOpen ? 1.0 : 0.5 + 0.5 * (1 - eased)
    groupRef.current.scale.set(s, s, s)
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.22, 0.08, 0.12]} />
        <meshStandardMaterial
          color={isOpen ? color : '#181828'}
          metalness={0.7}
          roughness={0.25}
          envMapIntensity={1.2}
        />
        <Edges
          color={isOpen ? '#ffffff' : color}
          opacity={isOpen ? 0.5 : 0.1}
          transparent
          threshold={15}
        />
      </mesh>
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[0.17, 0.05]} />
        <meshBasicMaterial color={color} transparent opacity={isOpen ? 0.25 : 0.04} />
      </mesh>
      <Html position={[0, 0, 0.075]} center>
        <div style={{
          color: isOpen ? '#fff' : '#a1a1aa',
          fontSize: '6px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.02em',
          textShadow: isOpen ? `0 0 10px ${color}88` : 'none',
          transition: 'color 0.2s',
          pointerEvents: 'none',
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

function BoxGroup({ group, column }) {
  const [hovered, setHovered] = useState(false)
  const n = group.skills.length
  const x = (column - 1.5) * 1.2

  return (
    <Float speed={1.0 + column * 0.1} rotationIntensity={0.05} floatIntensity={0.15}>
      <group
        position={[x, 0.1, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        tabIndex={0}
        role="button"
        aria-label={`${group.title} skills`}
      >
        <CardboardBox color={group.color} />

        <Html position={[0, BH / 2 + 0.35, 0]} center>
          <div style={{
            color: group.color,
            fontSize: '9px',
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

        {group.skills.map((skill, i) => (
          <group key={skill} position={[0, (i - (n - 1) / 2) * 0.14, -0.03]}>
            <SkillItem label={skill} color={group.color} index={i} total={n} isOpen={hovered} />
          </group>
        ))}
      </group>
    </Float>
  )
}

function Scene() {
  const groupRef = useRef()
  const autoRotate = useRef(0)

  useFrame(({ clock, mouse }) => {
    autoRotate.current = clock.elapsedTime * 0.18
    if (groupRef.current) {
      const targetY = mouse.x * 0.12 + Math.sin(autoRotate.current) * 0.06
      const targetX = -mouse.y * 0.05 + Math.sin(autoRotate.current * 0.5) * 0.02
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

      <group position={[0, 0.4, 0]} ref={groupRef}>
        {groups.map((g, i) => (
          <BoxGroup key={g.title} group={g} column={i} />
        ))}
      </group>

      <ContactShadows
        position={[0, -0.4, 0]}
        opacity={0.2}
        scale={10}
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
    <div class="w-full h-[500px] md:h-[600px]" aria-label="3D skills boxes">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45 }}
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

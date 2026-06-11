import { Canvas, useFrame } from '@react-three/fiber'
import { Html, ContactShadows, Float, Clone, useGLTF } from '@react-three/drei'
import { useRef, useState, useEffect, useMemo } from 'react'

useGLTF.preload('/models/box.glb')

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

function SkillItem({ label, color, index, total, isOpen }) {
  const groupRef = useRef()
  const openStart = useRef(0)
  const wasOpen = useRef(false)

  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const spreadR = 0.7
  const spreadX = Math.cos(angle) * spreadR
  const spreadZ = Math.sin(angle) * spreadR * 0.35
  const spreadY = (index - (total - 1) / 2) * 0.3
  const restY = (index - (total - 1) / 2) * 0.18

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
    groupRef.current.position.z = isOpen ? 0.6 * eased : 0
    const s = isOpen ? 1.0 : 0.5 + 0.5 * (1 - eased)
    groupRef.current.scale.set(s, s, s)
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.3, 0.1, 0.16]} />
        <meshStandardMaterial
          color={isOpen ? color : '#1e1e2e'}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      <Html position={[0, 0, 0.09]} center>
        <div style={{
          color: isOpen ? '#fff' : '#c4c4c7',
          fontSize: '10px',
          fontWeight: 700,
          whiteSpace: 'nowrap',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.03em',
          textShadow: isOpen ? `0 0 14px ${color}aa` : '0 0 4px rgba(0,0,0,0.9)',
          pointerEvents: 'none',
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

function BoxSkillGroup({ group, column }) {
  const [hovered, setHovered] = useState(false)
  const n = group.skills.length
  const x = (column - 1.5) * 1.4
  const { scene } = useGLTF('/models/box.glb')

  const coloredScene = useMemo(() => {
    const s = scene.clone()
    s.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone()
        child.material.color.set(group.color)
        child.material.metalness = 0.1
        child.material.roughness = 0.6
        child.material.needsUpdate = true
      }
    })
    return s
  }, [scene, group.color])

  return (
    <Float speed={0.8 + column * 0.1} rotationIntensity={0.04} floatIntensity={0.12}>
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
        <primitive object={coloredScene} scale={2.5} />

        <Html position={[0, 0.72, 0]} center>
          <div style={{
            color: group.color,
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            fontFamily: 'Inter, sans-serif',
            textShadow: `0 0 24px ${group.color}88`,
            pointerEvents: 'none',
          }}>
            {group.title}
          </div>
        </Html>

        {group.skills.map((skill, i) => (
          <group key={skill} position={[0, (i - (n - 1) / 2) * 0.18, 0]}>
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
    autoRotate.current = clock.elapsedTime * 0.15
    if (groupRef.current) {
      const targetY = mouse.x * 0.1 + Math.sin(autoRotate.current) * 0.05
      const targetX = -mouse.y * 0.04 + Math.sin(autoRotate.current * 0.5) * 0.02
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-3, 2, 4]} intensity={0.6} color="#a855f7" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#3b82f6" />

      <group position={[0, 0.3, 0]} ref={groupRef}>
        {groups.map((g, i) => (
          <BoxSkillGroup key={g.title} group={g} column={i} />
        ))}
      </group>

      <ContactShadows
        position={[0, -0.4, 0]}
        opacity={0.25}
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
        camera={{ position: [0, 0.5, 6.5], fov: 45 }}
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

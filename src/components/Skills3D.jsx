import { useState, useEffect } from 'react'
import { Package, PackageOpen } from 'lucide-react'

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

function SkillTag({ label, color, index, total, isOpen }) {
  const n = total
  const spread = 2.0
  const startAngle = -spread / 2 + Math.PI / 2
  const step = n > 1 ? spread / (n - 1) : 0
  const angle = startAngle + index * step
  const r = 60
  const tx = Math.cos(angle) * r
  const ty = Math.sin(angle) * r

  return (
    <span
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        fontSize: '12px',
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: '9999px',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        transitionProperty: 'transform, opacity, background-color, border-color',
        transitionDuration: '350ms',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDelay: isOpen ? `${index * 35}ms` : `${(total - 1 - index) * 25}ms`,
        color: isOpen ? '#e4e4e7' : 'transparent',
        backgroundColor: isOpen ? `${color}18` : 'transparent',
        border: isOpen ? `1px solid ${color}44` : '1px solid transparent',
        transform: isOpen
          ? `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`
          : 'translate(-50%, -50%) scale(0.3)',
        opacity: isOpen ? 1 : 0,
      }}
    >
      {label}
    </span>
  )
}

function BoxCard({ group }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      class="relative flex flex-col items-center py-6 px-3 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-purple-500/20 transition-all duration-300 cursor-pointer select-none min-h-[200px]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
      tabIndex={0}
      role="button"
      aria-label={`${group.title} skills`}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div
        class="flex items-center justify-center mb-2 transition-all duration-300"
        style={{
          transform: open ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        {open ? (
          <PackageOpen size={64} strokeWidth={1.5} color={group.color} />
        ) : (
          <Package size={64} strokeWidth={1.5} color={group.color} />
        )}
      </div>
      <div class="relative w-full flex-1">
        {group.skills.map((s, i) => (
          <SkillTag
            key={s}
            label={s}
            color={group.color}
            index={i}
            total={group.skills.length}
            isOpen={open}
          />
        ))}
      </div>
      <span
        class="text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 mt-auto"
        style={{
          color: open ? group.color : '#71717a',
          textShadow: open ? `0 0 20px ${group.color}44` : 'none',
        }}
      >
        {group.title}
      </span>
    </div>
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

  return (
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
      {groups.map((g) => (
        <BoxCard key={g.title} group={g} />
      ))}
    </div>
  )
}

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

function BoxCard({ group, reduced }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      class={`relative flex flex-col items-center py-5 px-3 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-purple-500/20 transition-all duration-300 cursor-pointer select-none ${reduced ? '' : 'skill-pulse'}`}
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
        class="flex items-center justify-center mb-1 transition-all duration-500"
        style={{
          transform: open ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        {open ? (
          <PackageOpen size={56} strokeWidth={1.5} color={group.color} />
        ) : (
          <Package size={56} strokeWidth={1.5} color={group.color} />
        )}
      </div>

      <span
        class="text-xs font-bold uppercase tracking-[0.18em] transition-all duration-500 mb-2"
        style={{
          color: open ? group.color : '#71717a',
          textShadow: open ? `0 0 20px ${group.color}44` : 'none',
        }}
      >
        {group.title}
      </span>

      <div class="flex flex-wrap justify-center gap-1.5 min-h-[52px]">
        {group.skills.map((s, i) => (
          <span
            key={s}
            class="text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all duration-500"
            style={{
              color: open ? '#e4e4e7' : 'transparent',
              backgroundColor: open ? `${group.color}18` : 'transparent',
              border: `1px solid ${open ? `${group.color}44` : 'transparent'}`,
              transform: open ? 'translateY(0)' : 'translateY(-8px)',
              opacity: open ? 1 : 0,
              transitionDelay: open ? `${i * 60}ms` : `${(group.skills.length - 1 - i) * 40}ms`,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {s}
          </span>
        ))}
      </div>
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
        <BoxCard key={g.title} group={g} reduced={reduced} />
      ))}
      <style>{`
        @keyframes skill-pulse-key {
          0%, 100% { transform: scale(1); box-shadow: 0 0 4px rgba(168,85,247,0.05), inset 0 0 4px rgba(168,85,247,0.02); }
          50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(168,85,247,0.2), inset 0 0 10px rgba(168,85,247,0.08); }
        }
        .skill-pulse {
          animation: skill-pulse-key 2.5s ease-in-out infinite;
        }
        .skill-pulse:hover {
          animation: none;
        }
      `}</style>
    </div>
  )
}

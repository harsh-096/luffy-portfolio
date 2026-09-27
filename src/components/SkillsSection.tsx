import React from 'react'
import { portfolioData } from '../data/portfolioData'

export const SkillsSection: React.FC = () => {
  const { skills } = portfolioData

  return (
    <section id="skills" className="screen-line-before screen-line-after border-x border-edge">
      <header className="screen-line-after px-4 py-3">
        <h2 className="font-pixel text-2xl sm:text-3xl font-semibold text-foreground">
          Skills & Technologies
        </h2>
      </header>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-border/80 bg-card/70 p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md border border-border bg-zinc-50 dark:bg-zinc-900/80 px-2 py-1 font-mono text-xs text-foreground/90 transition-colors hover:border-foreground/30 hover:bg-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

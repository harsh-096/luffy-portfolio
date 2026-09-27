import React, { useState } from 'react'
import { CodeXml, ChevronDown } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export const ExperienceSection: React.FC = () => {
  const { experiences } = portfolioData
  // Default first experience opened
  const [openId, setOpenId] = useState<string | null>('sprouto')

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="experience" className="screen-line-before screen-line-after border-x border-edge">
      <header className="screen-line-after px-4 py-3">
        <h2 className="font-pixel text-2xl sm:text-3xl font-semibold text-foreground">
          Experience
        </h2>
      </header>

      <div className="pr-2 pl-4 py-2">
        {experiences.map((exp) => {
          const isOpen = openId === exp.id
          return (
            <div key={exp.id} className="screen-line-after space-y-3 py-4">
              {/* Company Header Row */}
              <div className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center select-none">
                  <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
                </div>
                <h3 className="text-base sm:text-lg leading-snug font-medium text-foreground">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </h3>
              </div>

              {/* Connected Timeline Line & Collapsible Card */}
              <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
                <div className="relative">
                  {/* Collapsible Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleOpen(exp.id)}
                    className="block w-full text-left relative before:absolute before:-top-1.5 before:-right-1.5 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-xl before:transition-colors before:ease-out hover:before:bg-accent/60 cursor-pointer"
                  >
                    <div className="relative z-1 mb-1.5 flex items-center gap-3">
                      <div
                        className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background"
                        aria-hidden="true"
                      >
                        <CodeXml className="size-3.5" />
                      </div>
                      <h4 className="flex-1 font-medium text-sm sm:text-base text-foreground">
                        {exp.role}
                      </h4>
                      <div className="shrink-0 text-muted-foreground mr-2">
                        <ChevronDown
                          className={`size-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-9 text-xs sm:text-sm text-muted-foreground">
                      <span>{exp.type}</span>
                      <div className="h-3.5 w-px bg-border"></div>
                      <span className="font-mono text-xs">{exp.period}</span>
                    </div>
                  </button>

                  {/* Collapsible Content */}
                  {isOpen && (
                    <div className="pl-9 pt-3 space-y-2.5 text-xs sm:text-sm font-mono text-muted-foreground animate-in fade-in-50 duration-200">
                      {exp.description.map((bullet, idx) => (
                        <p key={idx} className="flex gap-2 text-foreground/80">
                          <span className="text-muted-foreground select-none">›</span>
                          <span>{bullet}</span>
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
                    {exp.tags.map((tag) => (
                      <li key={tag} className="flex">
                        <span className="inline-flex items-center rounded-md border border-border bg-zinc-50 dark:bg-zinc-900/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

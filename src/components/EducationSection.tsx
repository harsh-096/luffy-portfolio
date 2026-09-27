import React, { useState } from 'react'
import { GraduationCap, Award, ChevronDown } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export const EducationSection: React.FC = () => {
  const { education } = portfolioData
  const [openId, setOpenId] = useState<string | null>('svit')

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="education" className="screen-line-before screen-line-after border-x border-edge">
      <header className="screen-line-after px-4 py-3">
        <h2 className="font-pixel text-2xl sm:text-3xl font-semibold text-foreground">
          Education
        </h2>
      </header>

      <div className="pr-2 pl-4 py-2">
        {education.map((item) => {
          const isOpen = openId === item.id
          return (
            <div key={item.id} className="screen-line-after space-y-3 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center select-none">
                  <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
                </div>
                <h3 className="flex-1 text-base sm:text-lg leading-snug font-medium text-foreground">
                  {item.institutionUrl ? (
                    <a
                      href={item.institutionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {item.institution}
                    </a>
                  ) : (
                    item.institution
                  )}
                </h3>
              </div>

              <div className="relative space-y-2 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleOpen(item.id)}
                    className="block w-full text-left relative before:absolute before:-top-1.5 before:-right-1.5 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-xl before:transition-colors before:ease-out hover:before:bg-accent/60 cursor-pointer"
                  >
                    <div className="relative z-1 mb-1.5 flex items-center gap-3">
                      <div
                        className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background"
                        aria-hidden="true"
                      >
                        {item.id === 'certs' ? (
                          <Award className="size-3.5" />
                        ) : (
                          <GraduationCap className="size-3.5" />
                        )}
                      </div>
                      <h4 className="flex-1 font-medium text-sm sm:text-base text-foreground">
                        {item.degree}
                      </h4>
                      <div className="shrink-0 text-muted-foreground mr-2">
                        <ChevronDown
                          className={`size-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 pl-9 text-xs sm:text-sm text-muted-foreground font-mono">
                      <span>{item.period}</span>
                    </div>
                  </button>

                  {isOpen && item.details && (
                    <div className="pl-9 pt-2 text-xs sm:text-sm font-mono text-muted-foreground whitespace-pre-line leading-relaxed animate-in fade-in-50 duration-200">
                      {item.details}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

import React, { useState } from 'react'
import { ExternalLink, Github, Cpu, Sparkles } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export const ProjectsSection: React.FC = () => {
  const { projects, skills } = portfolioData
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'fullstack' | 'ml'>('all')

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true
    return p.category === activeFilter
  })

  return (
    <section id="projects" className="screen-line-before screen-line-after border-x border-edge">
      {/* Page Header */}
      <header className="screen-line-after px-4 py-3">
        <h1 className="font-pixel text-2xl sm:text-3xl font-semibold text-foreground">
          Projects &amp; Technologies
        </h1>
      </header>

      {/* Intro line */}
      <div className="px-4 py-3 border-b border-edge/60">
        <p className="font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Systems and products I’ve built across AI agents, RAG pipelines, and full-stack software. Engineered for real utility, production traffic, and clean architecture.
        </p>
      </div>

      {/* Included Skills & Tech Stack Section */}
      <div className="p-4 sm:p-5 border-b border-edge/60 bg-muted/20">
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="size-4 text-emerald-500" />
          <h2 className="font-pixel text-base sm:text-lg font-semibold text-foreground">
            Core Technical Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-border/80 bg-card/80 p-3.5 space-y-2 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-emerald-500/80"></span>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-foreground/90 transition-colors hover:border-foreground/30 hover:bg-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs Header */}
      <div className="px-4 py-3 border-b border-edge/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-info" />
          <span className="font-mono text-xs font-medium text-foreground">
            Featured Systems ({filteredProjects.length})
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {(
            [
              { id: 'all', label: 'All Projects' },
              { id: 'ai', label: 'AI Systems' },
              { id: 'fullstack', label: 'Full-Stack' },
              { id: 'ml', label: 'Data / ML' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group/card relative flex flex-col justify-between overflow-hidden rounded-xl border border-dashed border-border bg-card/60 p-2.5 shadow-xs transition-all duration-200 hover:bg-accent/40 hover:border-foreground/30"
            >
              <div className="relative flex flex-col gap-2">
                {/* Project Image */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-lg bg-zinc-950 border border-border/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="size-full object-cover object-top transition-transform duration-300 group-hover/card:scale-103"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none"></div>
                </div>

                {/* Title & Date */}
                <div className="flex items-center justify-between px-1 pt-1">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground line-clamp-1">
                    {project.title}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground pl-2">
                    {project.date}
                  </span>
                </div>

                {/* Description */}
                <p className="px-1 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 px-1 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-border bg-background/90 px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Split Action Links */}
              <div className="mt-3 flex items-center border-t border-dashed border-border pt-2 text-xs font-mono">
                {project.liveUrl ? (
                  <>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-muted-foreground hover:text-foreground transition-colors py-1 flex items-center justify-center gap-1.5"
                      style={{ borderRight: '1px dashed var(--border)' }}
                    >
                      <span>Live link</span>
                      <ExternalLink className="size-3" />
                    </a>

                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-muted-foreground hover:text-foreground transition-colors py-1 flex items-center justify-center gap-1.5"
                      >
                        <Github className="size-3.5" />
                        <span>GitHub</span>
                      </a>
                    ) : (
                      <span className="flex-1 text-center text-muted-foreground/60 py-1">
                        Proprietary
                      </span>
                    )}
                  </>
                ) : (
                  project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center text-muted-foreground hover:text-foreground transition-colors py-1 flex items-center justify-center gap-1.5"
                    >
                      <Github className="size-3.5" />
                      <span>View on GitHub</span>
                    </a>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

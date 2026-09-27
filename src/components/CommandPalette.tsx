import React, { useState, useEffect, useRef } from 'react'
import {
  Search,
  User,
  FolderGit2,
  Heart,
  Briefcase,
  GraduationCap,
  BookOpen,
  Copy,
  Check,
  Sun,
  Github,
  Twitter,
  Linkedin,
  FileText,
  CornerDownLeft,
} from 'lucide-react'
import { ActiveTab } from './Header'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onSwitchTab: (tab: ActiveTab) => void
}

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: 'Navigation' | 'Actions' | 'Social'
  icon: React.ReactNode
  action: () => void
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSwitchTab,
}) => {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else setQuery('')
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    }
  }, [isOpen])

  const copyEmail = () => {
    navigator.clipboard.writeText('hpparmar8899@gmail.com')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      onClose()
    }, 1200)
  }

  const toggleTheme = () => {
    const root = document.documentElement
    const isDark = root.classList.contains('dark')
    if (isDark) {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    onClose()
  }

  const items: CommandItem[] = [
    {
      id: 'home',
      title: 'Home',
      subtitle: 'About, Connect, Live GitHub Activity & Quote',
      category: 'Navigation',
      icon: <User className="size-4" />,
      action: () => {
        onSwitchTab('home')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'projects',
      title: 'Projects & Tech Stack',
      subtitle: 'View AI Systems, RAG pipelines & Skills',
      category: 'Navigation',
      icon: <FolderGit2 className="size-4" />,
      action: () => {
        onSwitchTab('projects')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'favourites',
      title: 'Favourites',
      subtitle: 'Anime & Series library',
      category: 'Navigation',
      icon: <Heart className="size-4 text-pink-500" />,
      action: () => {
        onSwitchTab('favourites')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'blog',
      title: 'Blog',
      subtitle: 'Technical articles, system architecture & AI engineering',
      category: 'Navigation',
      icon: <BookOpen className="size-4 text-blue-500" />,
      action: () => {
        onSwitchTab('blog')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'experience',
      title: 'Experience',
      subtitle: 'Work history at Sprouto, Codetta, etc.',
      category: 'Navigation',
      icon: <Briefcase className="size-4" />,
      action: () => {
        onSwitchTab('experience')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'education',
      title: 'Education & Certifications',
      subtitle: 'SVIT Anand & SAP credentials',
      category: 'Navigation',
      icon: <GraduationCap className="size-4" />,
      action: () => {
        onSwitchTab('education')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        onClose()
      },
    },
    {
      id: 'copy-email',
      title: copied ? 'Email Copied!' : 'Copy Email Address',
      subtitle: 'hpparmar8899@gmail.com',
      category: 'Actions',
      icon: copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />,
      action: copyEmail,
    },
    {
      id: 'resume',
      title: 'Download Resume (PDF)',
      subtitle: 'Harsh Parmar — Resume',
      category: 'Actions',
      icon: <FileText className="size-4" />,
      action: () => {
        window.open('/Resume.pdf', '_blank')
        onClose()
      },
    },
    {
      id: 'toggle-theme',
      title: 'Toggle Theme',
      subtitle: 'Switch Light / Dark mode',
      category: 'Actions',
      icon: <Sun className="size-4" />,
      action: toggleTheme,
    },
    {
      id: 'github',
      title: 'GitHub',
      subtitle: 'github.com/harsh-096',
      category: 'Social',
      icon: <Github className="size-4" />,
      action: () => {
        window.open('https://github.com/harsh-096', '_blank')
        onClose()
      },
    },
    {
      id: 'twitter',
      title: 'Twitter / X',
      subtitle: 'x.com/Pharsh_096',
      category: 'Social',
      icon: <Twitter className="size-4" />,
      action: () => {
        window.open('https://x.com/Pharsh_096', '_blank')
        onClose()
      },
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      subtitle: 'linkedin.com/in/harshparmar096',
      category: 'Social',
      icon: <Linkedin className="size-4" />,
      action: () => {
        window.open('https://www.linkedin.com/in/harshparmar096/', '_blank')
        onClose()
      },
    },
  ]

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-2xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-2.5 px-3 py-2 border-b border-zinc-100 dark:border-zinc-800/80">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono"
          />
          <kbd className="hidden sm:inline-block rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground bg-muted">
            ESC
          </kbd>
        </div>

        {/* Command Items List */}
        <div className="max-h-72 overflow-y-auto p-1.5 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-muted-foreground">
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-muted-foreground">{item.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-sans">{item.title}</span>
                      {item.subtitle && (
                        <span className="text-[11px] font-mono text-muted-foreground/80">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 hidden sm:inline">
                      {item.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="size-3 text-muted-foreground" />
                    )}
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

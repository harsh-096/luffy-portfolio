import React from 'react'
import { Quote } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export const QuoteSection: React.FC = () => {
  const { quote } = portfolioData

  return (
    <div className="relative flex flex-col items-center justify-center border-x border-edge px-6 py-12 text-center before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] before:bg-edge after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-edge">
      <Quote className="mb-5 size-9 fill-current text-zinc-300 dark:text-zinc-700" />

      <blockquote className="mb-5 max-w-2xl text-lg sm:text-2xl font-medium text-zinc-700 italic dark:text-zinc-200 leading-snug">
        &ldquo;{quote.text}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-700"></div>
        <span className="text-xs font-semibold tracking-wider text-red-500 dark:text-red-400 uppercase font-mono">
          {quote.author}
        </span>
        <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-700"></div>
      </div>
    </div>
  )
}

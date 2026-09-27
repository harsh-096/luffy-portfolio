import React, { useState } from 'react'
import { BookOpen, ArrowLeft, Clock, Calendar, Tag, Share2, Check } from 'lucide-react'
import { portfolioData, BlogPost } from '../data/portfolioData'

export const BlogSection: React.FC = () => {
  const { blogs } = portfolioData
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [copied, setCopied] = useState(false)

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Full In-Depth Article Reader View
  if (selectedPost) {
    return (
      <article className="screen-line-before screen-line-after border-x border-edge min-h-[70vh] bg-background animate-in fade-in-50 duration-200">
        {/* Navigation Bar */}
        <div className="screen-line-after px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to all blogs</span>
          </button>

          <button
            onClick={() => handleShare(selectedPost)}
            className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Share article"
          >
            {copied ? <Check className="size-3.5 text-emerald-500" /> : <Share2 className="size-3.5" />}
            <span>{copied ? 'Copied Link' : 'Share'}</span>
          </button>
        </div>

        {/* Hero Cover */}
        <div className="relative aspect-21/9 w-full overflow-hidden border-b border-edge bg-muted">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>

        {/* Article Header */}
        <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5 text-muted-foreground" />
              {selectedPost.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-muted-foreground" />
              {selectedPost.readTime}
            </span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              By Harsh Parmar
            </span>
          </div>

          <h1 className="font-pixel text-2xl sm:text-4xl font-bold leading-tight text-foreground">
            {selectedPost.title}
          </h1>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md border border-border bg-zinc-50 dark:bg-zinc-900/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Article Body */}
          <div className="pt-6 space-y-6 font-mono text-xs sm:text-sm text-foreground/90 leading-relaxed border-t border-edge/60">
            <p className="text-base text-foreground font-medium leading-relaxed">
              When most teams start building with Large Language Models, the architecture follows an almost universal trajectory: a quick Python prototype with naive RAG, chunks stored in a vector DB, and a prompt asking the model to answer based on top-k cosine similarity.
            </p>

            <p>
              It works miraculously on demo day. But within two weeks of deployment to production users, the edge cases surface: hallucinations on ambiguous queries, catastrophic context poisoning from unrelated retrieved chunks, and high latency loops.
            </p>

            {/* Architecture Highlight Box */}
            <div className="rounded-xl border border-edge bg-muted/30 p-4 sm:p-5 space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-500 font-semibold">
                Core Engineering Insight
              </span>
              <p className="text-xs sm:text-sm font-sans font-medium text-foreground">
                "Production AI reliability is not achieved by prompting better models; it is achieved by bounding non-deterministic LLMs inside deterministic state machines and strict semantic routers."
              </p>
            </div>

            <h2 className="font-pixel text-lg sm:text-xl font-semibold text-foreground pt-4">
              1. The Breakdown of Naive Vector Similarity
            </h2>
            <p>
              Cosine similarity in embedding space is fundamentally unequipped for multi-hop questions. When a user asks: <em>"How does our 2026 refund clause compare to the 2024 policy for enterprise tier customers?"</em>, semantic search retrieves chunks discussing 2026 refunds or 2024 enterprise tiers, but rarely both in coherent relation.
            </p>
            <p>
              In our production systems at Robofy and while engineering autonomous financial trading agents (KIRAN), we resolved this by replacing single-step retrieval with <strong>Hybrid Hierarchical Retrieval</strong>:
            </p>
            <ul className="space-y-2 pl-4 list-disc marker:text-muted-foreground">
              <li><strong>Intent Decoupling:</strong> An ultra-fast, quantized router classifies the intent into structured execution paths.</li>
              <li><strong>BM25 + Dense Re-Ranking:</strong> Combining sparse keyword precision with dense cross-encoders for zero-compromise precision.</li>
              <li><strong>Self-Correction Loops:</strong> If the retrieved context confidence falls below a threshold, the agent prompts a search refinement rather than hallucinating an answer.</li>
            </ul>

            <h2 className="font-pixel text-lg sm:text-xl font-semibold text-foreground pt-4">
              2. Multi-Agent Reasoning: Lessons from Autonomous Trading
            </h2>
            <p>
              In autonomous algorithmic trading, a hallucination isn't just an embarrassing chatbot reply—it's actual capital loss. Building the KIRAN and ARJUN agent systems taught me that reasoning agents require strict separation of concerns:
            </p>
            <div className="rounded-lg bg-zinc-950 p-4 text-emerald-400 font-mono text-xs overflow-x-auto border border-zinc-800">
              <code>
                {`[Signal Detection Agent] ---> [Risk & Margin Verification Engine]
                                    |
                                    v
[Execution State Machine] <--- [Critic / Adversarial Agent]`}
              </code>
            </div>
            <p>
              By pitting an adversarial agent against the primary reasoning agent, false positive signals drop dramatically. The critic looks specifically for market trap patterns, slippage risks, and conflicting indicators before any trade is verified.
            </p>

            <h2 className="font-pixel text-lg sm:text-xl font-semibold text-foreground pt-4">
              3. The Bottom Line
            </h2>
            <p>
              The industry is shifting rapidly away from single-prompt wrappers toward robust compound AI systems. The developers who win will not be those who memorize prompt tricks, but those who design resilient data pipelines, rigorous evaluation suites, and self-healing multi-agent workflows.
            </p>
          </div>

          {/* Footer Back */}
          <div className="pt-8 border-t border-edge/60 flex justify-between items-center">
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-mono font-medium hover:bg-accent transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to all articles</span>
            </button>
          </div>
        </div>
      </article>
    )
  }

  // Blog Directory Listing View
  return (
    <section id="blog" className="screen-line-before screen-line-after border-x border-edge min-h-[60vh]">
      {/* Title Header */}
      <header className="screen-line-after px-4 py-3">
        <h1 className="font-pixel text-2xl sm:text-3xl font-semibold text-foreground">
          Blogs
        </h1>
      </header>

      {/* Description */}
      <div className="p-4 border-b border-edge/60">
        <p className="font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Articles by Harsh Parmar on AI systems, software architecture, autonomous reasoning agents, and lessons from building real production software.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="relative pt-4">
        {/* Engineering vertical grid lines */}
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-4 sm:p-5">
          {blogs.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group block cursor-pointer"
            >
              <div className="group/card relative flex flex-col gap-2 overflow-hidden rounded-xl border border-dashed border-border bg-card/60 p-2.5 shadow-xs transition-all duration-200 hover:bg-accent/40 hover:border-foreground/30 hover:shadow-md">
                {/* Thumbnail Image */}
                <div className="relative aspect-16/9 w-full overflow-hidden rounded-lg bg-muted select-none">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset dark:ring-white/10"></div>
                </div>

                {/* Content Details */}
                <div className="flex flex-1 flex-col gap-1.5 px-1 py-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug underline-offset-4 group-hover:underline">
                    {post.title}
                  </h3>

                  <p className="text-xs font-mono text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-2 mt-auto">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md border border-border bg-zinc-50 dark:bg-zinc-900/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

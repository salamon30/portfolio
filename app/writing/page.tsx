"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { POSTS } from "@/lib/posts";

export default function WritingPage() {
  return (
    <div className="container-page py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 max-w-2xl"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-faint">Writing</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          Notes and articles.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Technical notes, project write-ups and things I learned the hard way.
        </p>
      </motion.div>

      <div className="flex flex-col gap-px border-t border-default">
        {POSTS.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link
              href={`/writing/${post.slug}`}
              className="group flex flex-col gap-1 border-b border-default py-7 transition-colors hover:bg-subtle md:flex-row md:items-baseline md:gap-8 md:px-2"
            >
              <span className="num shrink-0 text-xs text-faint md:w-24">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <div className="flex flex-1 flex-col gap-1.5">
                <span className="text-base font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-lg">
                  {post.title}
                </span>
                <span className="text-sm leading-relaxed text-muted">
                  {post.summary}
                </span>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-default bg-subtle px-2 py-0.5 text-[11px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-[11px] text-faint">
                    {post.readingTime} min read
                  </span>
                </div>
              </div>
              <span className="hidden text-[var(--fg-muted)] transition-transform group-hover:translate-x-1 md:block">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

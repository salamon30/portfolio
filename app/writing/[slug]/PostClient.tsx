"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/posts";

export default function PostClient({ post }: { post: Post }) {
  return (
    <div className="container-page py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/writing"
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-[var(--fg)]"
        >
          ← Writing
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-faint">
          <span className="num">
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-default bg-subtle px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{post.summary}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="prose-custom mt-14 border-t border-default pt-14"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </div>
  );
}

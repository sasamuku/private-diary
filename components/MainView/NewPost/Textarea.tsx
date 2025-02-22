'use client'

export function Textarea() {
  return (
    <textarea
      id="post-body"
      name="body"
      rows={1}
      onInput={(e) => {
        const textarea = e.currentTarget
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }}
      className="w-full resize-none bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm
                 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3
                 text-lg leading-relaxed placeholder-slate-400 dark:placeholder-slate-500
                 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-all"
      placeholder="What's on your mind today?"
      required
    />
  )
}

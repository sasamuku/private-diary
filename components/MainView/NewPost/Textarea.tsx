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
      className="bg-inherit w-full resize-none border border-gray-700 rounded p-4 text-lg
                 leading-relaxed placeholder-gray-500 focus:border-blue-500 focus:ring-1
                 focus:ring-blue-500 outline-none transition-colors"
      placeholder="What's good today?"
      required
    />
  )
}

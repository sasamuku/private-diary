'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Textarea } from './Textarea'

type AddPostResult = { success: boolean; error?: string }

interface NewPostFormProps {
  addPost: (formData: FormData) => Promise<AddPostResult>
  today: string
}

export function NewPostForm({ addPost, today }: NewPostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formRef.current) return

    setIsSubmitting(true)

    try {
      const formData = new FormData(formRef.current)
      const result = await addPost(formData)

      if (result.success) {
        formRef.current.reset()

        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'
        }

        router.refresh()
      } else {
        console.error('Failed to post:', result.error)
      }
    } catch (error) {
      console.error('Error occurred during posting:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      ref={formRef}
      className="rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-lg p-6"
      onSubmit={handleFormSubmit}
    >
      <div className="space-y-4">
        <input
          id="happened_at"
          type="date"
          name="happened_at"
          defaultValue={today}
          className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700
                    rounded-lg px-4 py-2 text-sm w-48 outline-none
                    focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
          required
        />

        <Textarea ref={textareaRef} />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600
                       text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200
                       focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900
                       ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </form>
  )
}

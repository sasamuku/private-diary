import { Calendar, Lock } from 'lucide-react'

export default async function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-3xl" />
        </div>

        <div className="container max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Your Secret Garden
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
            A private space to capture your daily moments, thoughts, and
            feelings. Reflect on your journey with our thoughtfully designed
            digital diary.
          </p>

          <div className="grid md:grid-cols-2 gap-6 pt-12">
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/20 dark:border-slate-800/20">
              <Lock className="h-6 w-6 text-purple-500 mb-4" />
              <h3 className="font-semibold mb-2">Private & Secure</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your thoughts are yours alone. Everything stays private and
                secure.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/20 dark:border-slate-800/20">
              <Calendar className="h-6 w-6 text-cyan-500 mb-4" />
              <h3 className="font-semibold mb-2">Daily Reflections</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Look back on your memories from last week and last month.
              </p>
            </div>
          </div>

          <div className="pt-8">
            <a
              href="/login"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white
                         bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600
                         rounded-lg shadow-lg transition-all duration-200
                         focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

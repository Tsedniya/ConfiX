import ApplyOrganizerForm from "@/components/organizer/ApplyOrganizerForm";

export default function ApplyOrganizerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f630_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-800 rounded-full px-4 py-1.5 border border-gray-200 dark:border-zinc-700 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Open Applications
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
            Become an <span className="text-blue-600">Organizer</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            Help shape the future of events on ConfiX. 
            Host conferences, build community, and make an impact.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-black/5 border border-gray-100 dark:border-zinc-800 p-2">
          <ApplyOrganizerForm />
        </div>

        {/* Trust Signals */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Quick Review</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Community Focused</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Full Support</span>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8">
          All applications are manually reviewed by our team
        </p>
      </div>
    </div>
  );
}
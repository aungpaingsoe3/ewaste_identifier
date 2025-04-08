"use client"

export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute -bottom-16 -right-16 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-green-200/20 to-blue-200/20 blur-3xl dark:from-green-900/20 dark:to-blue-900/20"></div>
      <div className="absolute -top-16 -left-16 w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-blue-200/20 to-green-200/20 blur-3xl dark:from-blue-900/20 dark:to-green-900/20"></div>
    </div>
  )
}

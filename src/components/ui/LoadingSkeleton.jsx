export const CardSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4 animate-pulse"
        >
          <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
          <div className="space-y-2">
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded flex-1" />
            <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded flex-1" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const LoadingSkeleton = ({ count = 1, height = 'h-12' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-slate-200 rounded-lg animate-pulse ${height} mb-4`}
        />
      ))}
    </>
  )
}

export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-soft p-6 space-y-4 animate-pulse"
        >
          <div className="h-48 bg-slate-200 rounded-lg" />
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
          <div className="flex gap-2 pt-2">
            <div className="h-8 bg-slate-200 rounded flex-1" />
            <div className="h-8 bg-slate-200 rounded flex-1" />
          </div>
        </div>
      ))}
    </>
  )
}

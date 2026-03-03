export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-carbon-800" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-racing-600 animate-spin" />
        </div>
        <p className="text-carbon-500 text-sm font-medium tracking-wider uppercase">Loading</p>
      </div>
    </div>
  )
}
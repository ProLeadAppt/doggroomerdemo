export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pw-cream">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-pw-sage/20 border-t-pw-sage animate-spin" />
        <span className="text-xs text-pw-muted tracking-wider">Loading...</span>
      </div>
    </div>
  );
}

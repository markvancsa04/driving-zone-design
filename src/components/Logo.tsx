export function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <img
      src="/api/public/media/logo.png"
      alt="Driving Zone"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}

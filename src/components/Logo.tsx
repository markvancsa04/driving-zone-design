import logoAsset from "@/assets/logo.png.asset.json";

export function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="Driving Zone"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}

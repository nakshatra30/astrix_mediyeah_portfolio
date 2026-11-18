import { cn } from "@/lib/utils";

export function ResponsiveVideo({
  src,
  poster,
  title,
  className,
}: {
  src: string;
  poster?: string | null;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-black",
        className,
      )}
    >
      <video
        controls
        playsInline
        preload="metadata"
        poster={poster ?? undefined}
        className="aspect-video w-full object-cover"
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video element.
      </video>
    </div>
  );
}

import { cn } from "@/lib/utils";

function getReelEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname !== "instagram.com" && !url.hostname.endsWith(".instagram.com")) {
      return null;
    }
    const match = url.pathname.match(/^\/(reel|p|tv)\/([^/]+)\/?$/);
    if (!match) return null;
    return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
  } catch {
    return null;
  }
}

export function InstagramReel({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const embedUrl = getReelEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-black",
        className,
      )}
    >
      <iframe
        src={embedUrl}
        title={`${title} — Instagram Reel`}
        loading="lazy"
        allow="encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-[9/16] w-full"
      />
    </div>
  );
}

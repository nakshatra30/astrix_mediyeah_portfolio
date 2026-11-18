import {
  Code2,
  Megaphone,
  Palette,
  PenTool,
  Search,
  Share2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  share: Share2,
  code: Code2,
  palette: Palette,
  search: Search,
  pen: PenTool,
  sparkles: Sparkles,
};

export const SERVICE_ICON_KEYS = Object.keys(icons);

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}

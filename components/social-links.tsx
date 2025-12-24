import Link from "next/link";
import { Github, Linkedin, X, LucideIcon } from "lucide-react";
import siteSettings from "@/data/siteSettings.json";
import { cn } from "@/lib/utils";

// Discord icon component (official Discord logo)
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

interface SocialLinksProps {
  /** Optional title to display above the links */
  title?: string;
  /** Limit the number of social links to display */
  limit?: number;
  /** Style variant for the social links */
  variant?: "circular" | "rounded";
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for individual link buttons */
  linkClassName?: string;
  /** Whether to show the title */
  showTitle?: boolean;
}

/**
 * Reusable social links component that pulls data from siteSettings.json
 * Can be customized with different styles and layouts
 */
export function SocialLinks({
  title = "Connect",
  limit,
  variant = "circular",
  className,
  linkClassName,
  showTitle = true,
}: SocialLinksProps) {
  const { social } = siteSettings;

  // Limit the number of social links if specified
  const displayedSocial = limit ? social.slice(0, limit) : social;

  // Get the appropriate icon component based on the icon name
  const getIconComponent = (iconName: string): React.ReactNode => {
    const iconProps = { className: "h-5 w-5" };

    switch (iconName) {
      case "Github":
        return <Github {...iconProps} />;
      case "Linkedin":
        return <Linkedin {...iconProps} />;
      case "X":
        return <X {...iconProps} />;
      case "MessageSquare":
        return <DiscordIcon {...iconProps} />;
      default:
        return null;
    }
  };

  // Determine the border radius based on variant
  const borderRadius = variant === "circular" ? "rounded-full" : "rounded-lg";

  return (
    <div className={cn("space-y-4", className)}>
      {showTitle && <h3 className="text-sm font-semibold">{title}</h3>}
      <div className="flex flex-wrap gap-3">
        {displayedSocial.map((item) => (
          <Link
            key={item.platform}
            href={item.url}
            className={cn(
              "w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110",
              borderRadius,
              linkClassName
            )}
            aria-label={item.platform}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIconComponent(item.icon)}
          </Link>
        ))}
      </div>
    </div>
  );
}

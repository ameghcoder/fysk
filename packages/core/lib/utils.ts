import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom tailwind-merge instance that understands our  token system.
 * This prevents 'text-xs' (size) from overriding 'text-primary-fg' (color).
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"],
        },
      ],
      "text-color": [
        {
          text: [
            "primary",
            "primary-fg",
            "secondary",
            "secondary-fg",
            "muted",
            "muted-foreground",
            "accent",
            "accent-foreground",
            "destructive",
            "destructive-foreground",
            "success",
            "success-foreground",
            "warning",
            "warning-foreground",
            "info",
            "info-foreground",
            "foreground",
            "background",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

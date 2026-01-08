import dynamic from "next/dynamic";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exampleRegistry: Record<string, any> = {
  "avatar-example-default-01": dynamic(
    () => import("./avatar-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "avatar-example-states-01": dynamic(
    () => import("./avatar-example-states-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "avatar-example-variants-01": dynamic(
    () => import("./avatar-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "badge-example-default-01": dynamic(
    () => import("./badge-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "badge-example-dots-01": dynamic(() => import("./badge-example-dots-01"), {
    loading: () =>
      React.createElement("div", {
        className: "h-20 w-full animate-pulse bg-muted rounded-lg",
      }),
  }),
  "badge-example-modern-01": dynamic(
    () => import("./badge-example-modern-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "badge-example-variants-01": dynamic(
    () => import("./badge-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "button-example-as-child-01": dynamic(
    () => import("./button-example-as-child-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "button-example-icons-01": dynamic(
    () => import("./button-example-icons-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "button-example-sizes-01": dynamic(
    () => import("./button-example-sizes-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "button-example-states-01": dynamic(
    () => import("./button-example-states-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "button-example-variants-01": dynamic(
    () => import("./button-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "empty-example-default-01": dynamic(
    () => import("./empty-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "empty-example-variants-01": dynamic(
    () => import("./empty-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "form-example-default-01": dynamic(
    () => import("./form-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "input-example-default-01": dynamic(
    () => import("./input-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "input-example-icons-01": dynamic(() => import("./input-example-icons-01"), {
    loading: () =>
      React.createElement("div", {
        className: "h-20 w-full animate-pulse bg-muted rounded-lg",
      }),
  }),
  "input-example-states-01": dynamic(
    () => import("./input-example-states-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "input-example-variants-01": dynamic(
    () => import("./input-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "input-otp-example-default-01": dynamic(
    () => import("./input-otp-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "input-otp-example-variants-01": dynamic(
    () => import("./input-otp-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "kbd-example-default-01": dynamic(() => import("./kbd-example-default-01"), {
    loading: () =>
      React.createElement("div", {
        className: "h-20 w-full animate-pulse bg-muted rounded-lg",
      }),
  }),
  "kbd-example-variants-01": dynamic(
    () => import("./kbd-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "pagination-example-default-01": dynamic(
    () => import("./pagination-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "pagination-example-smart-01": dynamic(
    () => import("./pagination-example-smart-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "progress-example-default-01": dynamic(
    () => import("./progress-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "progress-example-segments-01": dynamic(
    () => import("./progress-example-segments-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "progress-example-variants-01": dynamic(
    () => import("./progress-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "select-example-default-01": dynamic(
    () => import("./select-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "select-example-multi-01": dynamic(
    () => import("./select-example-multi-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "sidebar-example-default-01": dynamic(
    () => import("./sidebar-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "sidebar-example-floating-01": dynamic(
    () => import("./sidebar-example-floating-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "switch-example-default-01": dynamic(
    () => import("./switch-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "switch-example-variants-01": dynamic(
    () => import("./switch-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "tabs-example-default-01": dynamic(
    () => import("./tabs-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "tabs-example-variants-01": dynamic(
    () => import("./tabs-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "textarea-example-autosize-01": dynamic(
    () => import("./textarea-example-autosize-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "textarea-example-default-01": dynamic(
    () => import("./textarea-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "textarea-example-toolbar-01": dynamic(
    () => import("./textarea-example-toolbar-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "tooltip-example-default-01": dynamic(
    () => import("./tooltip-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "tooltip-example-rich-01": dynamic(
    () => import("./tooltip-example-rich-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "tooltip-example-variants-01": dynamic(
    () => import("./tooltip-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "typography-example-default-01": dynamic(
    () => import("./typography-example-default-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
  "typography-example-variants-01": dynamic(
    () => import("./typography-example-variants-01"),
    {
      loading: () =>
        React.createElement("div", {
          className: "h-20 w-full animate-pulse bg-muted rounded-lg",
        }),
    }
  ),
};

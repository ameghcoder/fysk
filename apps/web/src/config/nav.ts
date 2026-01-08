export interface LinkGroups {
  heading: string;
  items: {
    label: string;
    href: string;
  }[];
}

export const headerNavLinks: LinkGroups = {
  heading: "Menu Links",
  items: [
    {
      label: "docs",
      href: "/docs",
    },
    {
      label: "Atoms",
      href: "/docs/explore",
    },
  ],
};

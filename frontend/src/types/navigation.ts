export interface NavLink {
  href: string;
  label: string;
}

export interface NavLinkWithDescription extends NavLink {
  description: string;
}

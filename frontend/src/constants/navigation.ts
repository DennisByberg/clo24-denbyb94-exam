import type { NavLink, NavLinkWithDescription } from '@/types/navigation';

export const mainLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
] as const;

export const bookingLinks: NavLinkWithDescription[] = [
  {
    href: '/bookings/dining',
    label: 'Dining & Drinking',
    description: 'Reserve a table at our restaurants',
  },
  {
    href: '/bookings/spa',
    label: 'Pool Club & Spa',
    description: 'Book spa treatments and pool access',
  },
  {
    href: '/bookings/events',
    label: 'Conference & Events',
    description: 'Book spaces for events',
  },
] as const;

export const adminLinks: NavLinkWithDescription[] = [
  {
    href: '/admin/health',
    label: 'Health Checks',
    description: 'Monitor system health status',
  },
] as const;

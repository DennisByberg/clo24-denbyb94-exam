import { PageHeading } from '@/components/PageHeading/PageHeading';
import { Stack } from '@mantine/core';
import { TeamMember } from '@/components/TeamMember/TeamMember';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | ACE Group',
  description: 'Learn more about ACE Group - Our story, mission, and values',
};

export default function AboutPage() {
  return (
    <Stack gap={'xl'}>
      <PageHeading
        order={1}
        title={'The Legends Behind The Cards'}
        description={`Discover the story behind ACE Group. We are dedicated to providing exceptional 
      experiences across our luxury restaurants, premium spa facilities, and exclusive event spaces. 
      Our commitment to excellence and attention to detail sets us apart.`}
      />

      <PageHeading
        order={2}
        title={'Seamless Online Booking'}
        description={`Book tables at our restaurants with just a few clicks. 
        Our real-time booking system ensures instant confirmation and lets you manage all your 
        reservations in one place.`}
      />

      <PageHeading
        order={2}
        title={'Multiple Dining Venues'}
        description={`Choose from our diverse portfolio of restaurants, each offering 
        a unique culinary experience crafted by award-winning chefs.`}
      />

      <PageHeading
        order={2}
        title={'Flexible Guest Management'}
        description={`Whether you're planning an intimate dinner or a larger celebration, 
        our booking system accommodates parties of all sizes with various seating options 
        available across our venues.`}
      />

      <PageHeading
        order={2}
        title={'Smart Scheduling System'}
        description={`View available time slots in real-time and plan your visits in advance. 
        Our intelligent system prevents double bookings and helps you find the perfect time for 
        your dining experience.`}
      />

      <PageHeading
        order={2}
        title={'Personal Booking Dashboard'}
        description={`Track all your upcoming reservations and review your dining history through 
        your personal dashboard. Manage bookings across different venues with ease 
        and receive instant confirmation for every reservation.`}
      />

      <PageHeading order={2} title={'Meet Our Team'} />
      <TeamMember
        avatarSrc={'https://avatars.githubusercontent.com/u/89915088?v=4'}
        name={'Dennis Byberg'}
        role={'Founder & Developer'}
        githubUrl={'https://github.com/DennisByberg'}
      />
    </Stack>
  );
}

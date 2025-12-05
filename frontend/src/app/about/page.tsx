import { PageHeading } from '@/components/PageHeading/PageHeading';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | ACE Group',
  description: 'Learn more about ACE Group - Our story, mission, and values',
};

export default function AboutPage() {
  return (
    // NOTE: Fragment wrapper for future content additions
    <>
      <PageHeading
        order={1}
        title={'The Legends Behind The Cards'}
        description={`Discover the story behind ACE Group. We are dedicated to providing exceptional 
      experiences across our luxury restaurants, premium spa facilities, and exclusive event spaces. 
      Our commitment to excellence and attention to detail sets us apart.`}
      />
    </>
  );
}

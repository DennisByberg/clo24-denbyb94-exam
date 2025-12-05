import { PageHeading } from '@/components/PageHeading/PageHeading';

export default function Home() {
  return (
    // NOTE: Fragment wrapper for future content additions
    <>
      <PageHeading
        order={1}
        title={'Welcome To The House Of Aces'}
        description={`Welcome to ACE Group - Experience luxury dining at our world-class restaurants, 
        rejuvenate at our premium spa facilities, and celebrate unforgettable moments at our exclusive 
        event spaces. Discover the perfect blend of elegance, comfort, and exceptional service across 
        all our locations.`}
      />
    </>
  );
}

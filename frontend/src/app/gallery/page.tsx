import { PageHeading } from '@/components/PageHeading/PageHeading';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | ACE Group',
  description: 'Explore our gallery of luxury venues and experiences',
};

export default function GalleryPage() {
  return (
    // NOTE: Fragment wrapper for future content additions
    <>
      <PageHeading
        order={1}
        title={'A Royal Flush Of Memories'}
        description={`Explore our stunning collection of venues, events, and experiences. Browse through 
      our gallery to see the elegance and sophistication that defines ACE Group.`}
      />
    </>
  );
}

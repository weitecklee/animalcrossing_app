'use client';

import dynamic from 'next/dynamic';

const TimelineComponent = dynamic(() => import('./timelineComponent'), {
  ssr: false,
});

const Page = () => {
  return <TimelineComponent />;
};

export default Page;

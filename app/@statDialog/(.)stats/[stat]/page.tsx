import { StatParams } from '@/types';
import StatDialog from './statDialog';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { stat: 'lengthOfStay' },
    { stat: 'species' },
    { stat: 'personality' },
    { stat: 'gender' },
    { stat: 'photos' },
    { stat: 'islandmates' },
  ];
}

export default function Page({ params }: { params: StatParams }) {
  return <StatDialog params={params} />;
}

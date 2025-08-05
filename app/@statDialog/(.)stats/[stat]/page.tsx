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

type Params = Promise<{ stat: string }>;

export default function Page({ params }: { params: Params }) {
  return <StatDialog params={params} />;
}

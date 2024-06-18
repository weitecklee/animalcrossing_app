import StatBreakdown from './statBreakdown';

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

export default function Page({ params }: { params: { stat: string } }) {
  return <StatBreakdown params={params} />;
}

import nookipediaData from '@/lib/nookipediaData';

export async function GET() {
  const res = await fetch(
    'https://api.nookipedia.com/villagers?nhdetails=true',
    {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.nookipedia_api_key,
      },
    },
  );
  const data: any[] = await res.json();
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    const villager = data[i];
    if (!nookipediaData.has(villager.name) || !villager.nh_details) {
      continue;
    }
    const nookipediaVillager = nookipediaData.get(villager.name)!;
    villager.ja_name = nookipediaVillager.ja_name;
    villager.ja_phrase = nookipediaVillager.ja_phrase;
    newData.push(villager);
  }
  return Response.json(newData);
}

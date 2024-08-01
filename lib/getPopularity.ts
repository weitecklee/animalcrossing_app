'use server';

import { load } from 'cheerio';

export default async function getPopularity() {
  const url =
    'https://www.animalcrossingportal.com/tier-lists/new-horizons/all-villagers/';

  const res = await fetch(url);
  const html = await res.text();

  const $ = load(html);
  const villagers: string[] = [];

  $('p.c-candidate-name').each((i, el) => {
    villagers.push($(el).text());
  });

  const popularity: Map<string, number> = new Map();

  villagers.forEach((v, i) => {
    popularity.set(v, i + 1);
  });

  console.log(popularity);
}

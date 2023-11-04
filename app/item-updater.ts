import axios from 'axios';
import fs from 'fs';
import { GildedRose, Item } from './gilded-rose';

const url = 'https://yesno.wtf/api';

interface ApiResponse {
  answer: string;
  forced: boolean;
  image: string;
}

const fetchAnswer = async (): Promise<string> => {
  try {
    const response = await axios.get<ApiResponse>(url);
    return response.data.answer;
  } catch {
    throw new Error('Failed to fetch the answer');
  }
};

export const bundleAnswers = async (count: number) => {
  let positiveCount = 0;
  const promises: Promise<string>[] = [];

  for (let i = 0; i < count; i++) {
    promises.push(fetchAnswer());
  }

  const results = await Promise.all(promises);
  results.forEach((answer) => {
    if (answer === 'yes') positiveCount++;
  });

  fs.appendFileSync('./app/log.txt', `Positive responses: ${positiveCount}\n`);
  return positiveCount;
};

export const updateShop = async (updateCount: number, startRequests: number) => {
  const gildedRose = new GildedRose([new Item('foo', 0, 0), new Item('bar', 2, 3)]);
  for (let i = 0; i < updateCount; i++) {
    let resultCount = startRequests;
    do {
      resultCount = await bundleAnswers(resultCount);
    } while (resultCount > 0);
    gildedRose.updateQuality();
    fs.appendFileSync('./app/log.txt', `Updated Items: ${JSON.stringify(gildedRose.items)}\n`);
  }
};

const updateCount = parseInt(process.argv[2], 10);
const startRequests = parseInt(process.argv[3], 10);

updateShop(updateCount, startRequests);

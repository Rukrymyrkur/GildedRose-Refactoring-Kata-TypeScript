import { bundleAnswers, updateShop } from '@/item-updater';
import axios from 'axios';
import fs from 'fs';

jest.mock('axios');
jest.mock('fs');

describe('Item Updader', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should log the correct count of positive responses', async () => {
    (axios.get as jest.Mock)
      .mockResolvedValueOnce({ data: { answer: 'yes' } })
      .mockResolvedValueOnce({ data: { answer: 'no' } })
      .mockResolvedValueOnce({ data: { answer: 'yes' } })
      .mockResolvedValueOnce({ data: { answer: 'no' } })
      .mockResolvedValueOnce({ data: { answer: 'yes' } });

    const positiveCount = await bundleAnswers(5);

    expect(positiveCount).toBe(3);
  });

  it('should update cycle as many times as passed in the second argument', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { answer: 'no' } });

    const logSpy = jest.spyOn(fs, 'appendFileSync');
    logSpy.mockImplementation(() => {});

    await updateShop(2, 5);
    expect(logSpy).toHaveBeenCalledTimes(5);
  });

  it('should log correctly to the file', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { answer: 'yes' } });

    const logSpy = jest.spyOn(fs, 'appendFileSync');
    logSpy.mockImplementation(() => {});

    await bundleAnswers(1);

    expect(logSpy).toHaveBeenCalledWith('./app/log.txt', expect.stringContaining('Positive responses: 1\n'));
  });
});

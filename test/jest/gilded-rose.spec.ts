import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].name).toBe('foo');
  });

  it('should decrease Quality by 1 and SellIn by 1 for general items with each day', () => {
    const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 10, 20)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(9);
    expect(updatedItems[0].quality).toBe(19);
  });

  it('should degrade Quality twice as fast after sell-by date has passed for general items', () => {
    const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 0, 20)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(-1);
    expect(updatedItems[0].quality).toBe(18);
  });

  it('should not have a negative Quality for general items', () => {
    const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 10, 0)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).not.toBeLessThan(0);
  });

  it('should not have a Quality over 50 for Aged Brie', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 50)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBeLessThanOrEqual(50);
  });

  it('should increase Quality by 1 for Aged Brie with each day', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(1);
    expect(updatedItems[0].quality).toBe(1);
  });

  it('should decrease Quality by 1 and SellIn by 1 for Elixir of the Mongoose for each day before sell-by date', () => {
    const gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 5, 7)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(4);
    expect(updatedItems[0].quality).toBe(6);
  });

  it('should never change the Quality and SellIn for Sulfuras', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(0);
    expect(updatedItems[0].quality).toBe(80);
  });

  it('should never ever change the Quality and SellIn for Sulfuras', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 80)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(-1);
    expect(updatedItems[0].quality).toBe(80);
  });

  it('should increase Quality by 1 for Backstage passes when the concert is more than 10 days away', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(14);
    expect(updatedItems[0].quality).toBe(21);
  });

  it('should increase Quality by 2 for Backstage passes when the concert is 10 days or less away', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(9);
    expect(updatedItems[0].quality).toBe(50);
  });

  it('should increase Quality by 3 for Backstage passes when there are 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(4);
    expect(updatedItems[0].quality).toBe(50);
  });

  it('should drop Quality to 0 for Backstage passes after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 49)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(0);
  });

  it.skip('should decrease Quality twice as fast for Conjured items', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 6)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(2);
    expect(updatedItems[0].quality).toBe(4); // decrease by 2 ?
  });
});

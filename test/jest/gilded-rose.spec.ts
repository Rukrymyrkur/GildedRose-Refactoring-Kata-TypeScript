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

  it('should not set less than 0 Quality to 0 for general items', () => {
    const gildedRose = new GildedRose([new Item('+5 Dexterity Vest', 10, -1)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(0);
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

  it('should not allow Quality to get higher than 50 when updating more than once', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 2, 49)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
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

  it('should not let change Backstage passes Quality over 50', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
  });

  it('should pick up any item starting with "Conjured"', () => {
    const gildedRose = new GildedRose([new Item('Conjured Health Donut', 3, 6)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(2);
    expect(updatedItems[0].quality).toBe(4);
  });

  it('should decrease Quality twice as fast for Conjured items', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 6)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(2);
    expect(updatedItems[0].quality).toBe(4);
  });

  it('should decrease Quality by 4 for Conjured items when SellIn date has passed', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 6)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].sellIn).toBe(-1);
    expect(updatedItems[0].quality).toBe(2);
  });

  it('should not decrease Quality below 0 for Conjured items', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 1)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(0);
  });

  it('should not decrease Quality below 0 for Conjured items even after SellIn date', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 3)]);
    const updatedItems = gildedRose.updateQuality();

    expect(updatedItems[0].quality).toBe(0);
  });

  it('should decrease Quality for Conjured items by 2 before sell by date and by 4 after the sell by date', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 1, 6)]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it('should update item with a random name as a general item', () => {
    const gildedRose = new GildedRose([new Item('Another Item', 10, 20)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });
});

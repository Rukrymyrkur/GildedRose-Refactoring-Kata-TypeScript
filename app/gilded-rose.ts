export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateConjuredItem(item: Item) {}

  updateAgedBrie(item: Item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  updateSulfuras(item: Item) {} // do nothing

  updateBackstagePass(item: Item) {
    if (item.sellIn < 1) {
      // drop to 0 quality after concert passes
      item.quality = 0;
    } else {
      if (item.quality < 50) {
        // increase quality the first time
        item.quality += 1;

        if (item.sellIn < 11) {
          if (item.quality < 50) {
            // increase quality second time
            item.quality += 1;
          }
        }
        if (item.sellIn < 6) {
          if (item.quality < 50) {
            // increase quality third time
            item.quality += 1;
          }
        }
      }
    }

    // every other time decrease sellIn
    item.sellIn -= 1;
  }

  updateGeneralItem(item: Item) {
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
          item.quality = item.quality - 1;
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn = item.sellIn - 1;
    }
    if (item.sellIn < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
              item.quality = item.quality - 1;
            }
          }
        } else {
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  }

  updateQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case 'Aged Brie':
          this.updateAgedBrie(item);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          this.updateSulfuras(item);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.updateBackstagePass(item);
          break;
        default:
          this.updateGeneralItem(item);
          break;
      }
      // });
    });

    return this.items;
  }
}

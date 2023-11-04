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

  updateConjuredItem(item: Item) {
    // quality decreases twice as fast
    if (item.quality > 0) {
      item.quality -= 2;
    }

    item.sellIn -= 1;

    // when the sellIn, quality decreases twice as fast
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 2;
    }

    // quality will not be negative
    if (item.quality < 0) {
      item.quality = 0;
    }
  }

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

    // every other times decrease sellIn
    item.sellIn -= 1;
  }

  updateGeneralItem(item: Item) {
    // decrease quality by 1
    if (item.quality > 0) {
      item.quality -= 1;
    }

    // decrease sellIn by 1
    item.sellIn -= 1;

    // when the sellIn passes, quality decreases twice as fast
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 1;
    }

    if (item.quality < 0) {
      item.quality = 0;
    }
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === 'Aged Brie') {
        this.updateAgedBrie(item);
      } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
        this.updateSulfuras(item);
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateBackstagePass(item);
      } else if (item.name.startsWith('Conjured')) {
        this.updateConjuredItem(item);
      } else {
        this.updateGeneralItem(item);
      }
    });

    return this.items;
  }
}

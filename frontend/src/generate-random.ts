import Chance from "chance";
import randomColor from "randomcolor";
import moment from "moment";

export interface Group {
  id: string;
  title: string;
  rightTitle: string;
  bgColor: string;
}

export interface Item {
  id: string;
  group: string;
  title: string;
  start: number;
  end: number;
  canMove: boolean;
  canResize: "both" | "left" | "right" | false;
  className: string;
  bgColor: string;
  selectedBgColor: string;
  color: string;
  itemProps: {
    [key: string]: string;
  };
}

export interface Data {
  groups: Group[];
  items: Item[];
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function (groupCount = 30, itemCount = 1000, daysInPast = 30) {
  const chance = new Chance();
  let randomSeed = Math.floor(Math.random() * 1000);
  let groups:Group[] = [];
  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: `${i + 1}`,
      title: chance.first(),
      rightTitle: chance.last(),
      bgColor: randomColor({ luminosity: "light", seed: randomSeed + i }),
    });
  }

  let items:Item[] = [];
  for (let i = 0; i < itemCount; i++) {
    const startDate = new Date(
      new Date().getTime() - daysInPast * 86400 * 1000
    ).valueOf();
    const startValue = Math.floor(startDate / 10000000) * 10000000;
    const endValue = moment(
      startDate + chance.integer({ min: 2, max: 20 }) * 15 * 60 * 1000
    ).valueOf();

    items.push({
      id: i + "",
      group: chance.integer({ min: 1, max: groups.length }) + "",
      title: chance.sentence({ words: 3 }),
      start: startValue,
      end: endValue,
      canMove: startValue > new Date().getTime(),
      canResize:
        startValue > new Date().getTime()
          ? endValue > new Date().getTime()
            ? "both"
            : "left"
          : endValue > new Date().getTime()
          ? "right"
          : false,
      className:
        moment(startDate).day() === 6 || moment(startDate).day() === 0
          ? "item-weekend"
          : "",
      bgColor: randomColor({
        luminosity: "light",
        seed: randomSeed + i,
        format: "rgba",
        alpha: 0.6,
      }),
      selectedBgColor: randomColor({
        luminosity: "light",
        seed: randomSeed + i,
        format: "rgba",
        alpha: 1,
      }),
      color: randomColor({ luminosity: "dark", seed: randomSeed + i }),
      itemProps: {
        "data-tip": chance.sentence({ words: 6 }),
      },
    });
  }

  items = items.sort((a, b) => Number(b) - Number(a));

  return { groups, items };
}


import randomColor from "randomcolor";
import moment from "moment";
import { faker } from '@faker-js/faker';

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

export default function generateData(groupCount = 30, itemCount = 1000, daysInPast = 30): Data {
  let randomSeed = Math.floor(Math.random() * 1000);
  let groups: Group[] = [];
  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: `${i + 1}`,
      title: faker.name.firstName(),
      rightTitle: faker.name.lastName(),
      bgColor: randomColor({ luminosity: "light", seed: randomSeed + i })
    });
  }

  let items: Item[] = [];
//   for (let i = 0; i < itemCount; i++) {
//     const startDate =
//       faker.date.recent(daysInPast).valueOf() + daysInPast * 0.3 * 86400 * 1000;
//     const startValue =
//       Math.floor(moment(startDate).valueOf() / 10000000) * 10000000;
//     const endValue = moment(
//       startDate + faker.random.number({ min: 2, max: 20 }) * 15 * 60 * 1000
//     ).valueOf();

//     items.push({
//       id: i + "",
//       group: faker.random.number({ min: 1, max: groups.length }) + "",
//       title: faker.hacker.phrase(),
//       start: startValue,
//       end: endValue,
//       canMove: startValue > new Date().getTime(),
//       canResize:
//         startValue > new Date().getTime()
//           ? endValue > new Date().getTime()
//             ? "both"
//             : "left"
//           : endValue > new Date().getTime()
//             ? "right"
//             : false,
//       className:
//         moment(startDate).day() === 6 || moment(startDate).day() === 0
//           ? "item-weekend"
//           : "",
//       bgColor: randomColor({
//         luminosity: "light",
//         seed: randomSeed + i,
//         format: "rgba",
//         alpha: 0.6
//       }),
//       selectedBgColor: randomColor({
//         luminosity: "light",
//         seed: randomSeed + i,
//         format: "rgba",
//         alpha: 1
//       }),
//       color: randomColor({ luminosity: "dark", seed: randomSeed + i }),
//       itemProps: {
//         "data-tip": faker.hacker.phrase()
//       }
//     });
//   }

//   items = items.sort((a, b) => b - a);

  return { groups, items };
}

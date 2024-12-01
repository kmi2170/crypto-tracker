import { ValueOf } from "next/dist/shared/lib/constants";

export const chartDays = [
  {
    label: "24 H",
    value: 1,
  },
  {
    label: "7 D",
    value: 7,
  },
  {
    label: "30 D",
    value: 30,
  },
  {
    label: "3 M",
    value: 90,
  },
  {
    label: "1 Y",
    value: 365,
  },
];

export const dataItems = [
  { label: "Price", value: "prices" },
  { label: "Market Cap", value: "market_caps" },
  { label: "Total Volume", value: "total_volumes" },
] as const;

export type ItemType = (typeof dataItems)[number];
export type DataItemsType = ItemType["value"];

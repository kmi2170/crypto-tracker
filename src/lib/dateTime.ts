import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";

// dayjs.extend(utc);
// dayjs.extend(timezone);

export const getTime = (time: number) => {
  return dayjs(time).format("h:mm A");
};

export const getDayTime = (time: number) => {
  return dayjs(time).format("D h:mm A");
};

export const getDate = (time: number) => {
  return dayjs(time).format("MMM D");
};

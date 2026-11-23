import dayjs from "dayjs";

import "dayjs/locale/id.js";

import
relativeTime from "dayjs/plugin/relativeTime.js";



dayjs.extend(relativeTime);

dayjs.locale("id");



const
    t = dayjs("2026-11-23T09:30:00");

console.log(t.format("dddd, D MMMM YYYY HH: mm"));

console.log(t.add(7, "day").format("DD/MM/YYYY"));

console.log(dayjs("2027-01-05").diff(t, "day"), "hari menuju Ulang tahunmu");

console.log(t.subtract(3, "hour").from(t));

console.log(dayjs("2026-11-18").isBefore("2026-12-01"));
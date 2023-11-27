const currDate = new Date("2023-11-18");
const endDate = new Date("2023-11-19");
if (currDate.getDay() !== 0) {
  endDate.setDate(endDate.getDate() + (7 - currDate.getDay()));
}

console.log(endDate);

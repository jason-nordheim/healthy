import { internet, name, date, datatype } from "faker";

const dateRegex = new RegExp(
  /(19\d{2}|20\d{2})-(0?1{1}[1-2]{1}|\d{1})-(0?[1-2]{1}[0-9]{1}|[3]{1}[0,1]{1}|[1-9]{1})/
);

const getRandomDateString = () => {
  const yearsOld = datatype.number({ min: 17, max: 80, precision: 1 });
  const randDate = date.past(yearsOld);
  const year = randDate.getFullYear(),
    month = randDate.getMonth(),
    day = randDate.getDay();
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${monthStr}-${dayStr}`;
};

const createTestUser = () => ({
  first: name.firstName(),
  last: name.lastName(),
  username: internet.userName(),
  email: internet.email(),
  password: internet.password(),
  birthday: getRandomDateString(),
});
export { createTestUser };

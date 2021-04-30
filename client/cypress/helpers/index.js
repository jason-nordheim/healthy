import { internet, name, date, datatype } from "faker";
import { convertDateToString } from "../../src/helpers";

const dateRegex = new RegExp(
  /(19\d{2}|20\d{2})-(0?1{1}[1-2]{1}|\d{1})-(0?[1-2]{1}[0-9]{1}|[3]{1}[0,1]{1}|[1-9]{1})/
);

const getRandomDateString = () => {
  const yearsOld = datatype.number({ min: 17, max: 80, precision: 1 });
  const randDate = date.past(yearsOld);
  return convertDateToString(randDate);
};

const createTestUser = () => {
  const first = name.firstName();
  const last = name.lastName();
  return {
    first,
    last,
    username: internet.userName(first, last),
    email: internet.email(),
    password: internet.password(),
    birthday: getRandomDateString(),
  };
};
export { createTestUser };

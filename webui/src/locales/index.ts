import userZh from "./user/zh.json";
import userEn from "./user/en.json";

const en = {
  ...userEn,
};

const zh = {
  ...userZh,
};

 const locales = {
  en,
  zh,
};
export default locales;
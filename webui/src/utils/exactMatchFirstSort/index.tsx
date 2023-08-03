import _ from "lodash";

/**
 * @param arr 需要排序的数组
 * @param query 搜索的关键字
 * @param key 排序的key值
 * @returns 排序的数组
 */
export const exactMatchFirstSort = (
  arr: any[],
  query: string,
  key?: string
) => {
  const result = _.sortBy(arr, (item) => {
    let searchValue = "";
    if (_.isString(item)) {
      searchValue = item;
    } else if (_.isObject(item) && key && item.hasOwnProperty(key)) {
      // 使用类型断言明确告诉类型检查器item是一个对象类型
      searchValue = (item as Record<string, any>)[key];
    }

    const formattedName = _.deburr(searchValue.toLowerCase());
    const keywordIndex = formattedName.indexOf(_.deburr(query.toLowerCase()));

    return keywordIndex === 0 ? 0 : keywordIndex > 0 ? 1 : 2;
  });
  return result;
};

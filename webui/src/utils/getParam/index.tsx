import _ from 'lodash'
export const getParam = (keys: string | string[])=> {
  const searchParams = new URLSearchParams(window.location.search);
  const result: Record<string, any> = {};
  if(_.isString(keys)) return searchParams.get(keys);

  _.forEach(keys, (key) => {
    const value = searchParams.get(key);
    if (value !== null) {
      result[key] = value;
    }
  });

  return result;
}

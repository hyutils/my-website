/**
 * 基本数据类型：number, string, boolean, null, undefined, symbol
 * 引用数据类型：object（数组、对象、函数、正则等）
 *
 * ### 基本数据类型和引用数据类型的区别
 * - 存储方式
 *   基本类型：基本数据类型的值直接存储在改变量所分配的内存空间中，它们是简单数据类型，占用的空间小
 *   引用类型：引用数据类型的值存储在堆内存中，变量存储的是对象在堆内存的地址，而不是实际的值，所以引用数据的大小不固定， 可以包含大量数据。
 * - 赋值行为
 *   基本类型：将一个基本数据类型赋值给另一个变量，直接将该值的副本赋值给新的变量
 *   引用类型：而将引用数据类型的变量赋值给另一个变量，是将该引用类型的地址给另一个变量，不是直接的值，两个变量指向同一个数据，当修改另一个变量时，此变量的值也会跟着变。
 * - 比较方式
 *   基本数据类型：基本数据类型的值通过它们的实际值进行比较。
 *    引用数据类型：引用数据类型的值比较的是它们在内存中的地址（引用），而不是实际的值。因此，即使两个对象具有相同的属性和值，它们在内存中是不同的对象，比较结果会是 false。
 *
 */

/**
 * @param 要判断类型的值
 * @returns 数据类型
 */
export const getDataType = (value: any) => {
  if (typeof value === "object") {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return "object";
  }
  return typeof value;
};

export const getDataType2 = (value: any) => {
  const type = Object.prototype.toString.call(value);
  if (type === "[object String]") return "string";
  if (type === "[object Number]") return "number";
  if (type === "[object Boolean]") return "boolean";
  if (type === "[object Undefined]") return "undefined";
  if (type === "[object Null]") return "null";
  if (type === "[object Array]") return "array";
  if (type === "[object Object]") return "object";
  if (type === "[object Function]") return "function";
  if (type === "[Object Date]") return "date";
};

// @ts-nocheck
import iconfont from '@/assets/font/iconfont.js'
import { createFromIconfontCN } from '@ant-design/icons'
export const fun = ()=>{
 // 使用正则表达式匹配包含SVG图标的字符串

const {values, key} = findValueByPrefix(window, '_iconfont_svg_string_')

if (values) {
  // 创建一个DOM元素以解析SVG字符串
  var parser = new DOMParser();
  var doc = parser.parseFromString(values, 'image/svg+xml');
  var svgElement = doc.querySelector('svg');

  // 获取所有路径元素
  var pathElements = svgElement.querySelectorAll('path');

  // 移除所有路径元素的fill属性
  pathElements.forEach(function(pathElement) {
    pathElement.removeAttribute('fill');
  });

  // 获取更新后的SVG字符串
  var updatedSvgString = new XMLSerializer().serializeToString(doc);
  console.log("updatedSvgString", updatedSvgString);
  window[key] = updatedSvgString;

  
 }
}

function findValueByPrefix(obj, prefix) {
  for (const key in obj) {
    if (key.startsWith(prefix)) {
      return {key, value :obj[key]} ;
    }
  }
  return undefined; // 如果找不到匹配的属性，可以返回默认值或其他值
}

 const IconFont =createFromIconfontCN({
 scriptUrl: iconfont
});
export default IconFont;
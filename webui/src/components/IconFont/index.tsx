// @ts-nocheck
import iconfontScriptUrl from '@/assets/font/iconfont.js'
import { createFromIconfontCN } from '@ant-design/icons'
import { fun } from '../IconFontColor/index';
fun();
 const IconFont =createFromIconfontCN({
 scriptUrl: iconfontScriptUrl
});
export default IconFont;
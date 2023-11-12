// @ts-nocheck
import iconfontScriptUrl from '@/assets/font/iconfont.js'
import { createFromIconfontCN } from '@ant-design/icons'

const IconFont = createFromIconfontCN({
    scriptUrl: iconfontScriptUrl,
    defaultColor: 'red'
});
export default IconFont;
/**
 * 将驼峰字符串转换为小写，并用分隔符连接
 * @param {string} key - 需要转换的驼峰字符串
 * @returns {string} 转换后的字符串
 */
export function toLowercaseSeparator(key) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * 将样式对象转换为内联样式字符串
 * @param {object} style - 样式对象
 * @returns {string} 转换后的样式字符串
 */
export function getStyleStr(style) {
  return Object.keys(style)
    .map(key => `${toLowercaseSeparator(key)}: ${style[key]};`)
    .join(' ')
}

/**
 * 返回设备的物理像素分辨率与 CSS 像素分辨率的比率
 * @returns {number} 像素比率
 */
export function getPixelRatio() {
  return window.devicePixelRatio || 1
}

/**
 * 检查是否需要重新渲染水印
 * @param {MutationRecord} mutation - MutationObserver 观察到的变化记录
 * @param {function} isWatermarkEle - 检查是否是水印元素的函数
 * @returns {boolean} 是否需要重新渲染
 */
export const reRendering = (mutation, isWatermarkEle) => {
  let flag = false
  // 是否删除了水印节点
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).some(node => isWatermarkEle(node))
  }
  // 水印 DOM 属性值是否被修改
  if (mutation.type === 'attributes' && isWatermarkEle(mutation.target)) {
    flag = true
  }
  return flag
}

export function deepMerge(target, source) {
  for (let key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]))
    }
  }
  Object.assign(target || {}, source)
  return target
}

export function checkHasChinese(str) {
  return /[\u4e00-\u9fa5]/.test(str)
}

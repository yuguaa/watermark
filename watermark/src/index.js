import { getStyleStr, getPixelRatio, deepMerge } from './utils.js'
import renderClips, { getFontGap } from './renderCanvas.js'
class Watermark {
  static DEFAULT_WATERMARK_OPTIONS = {
    zIndex: 9,
    content: ['菠萝吹雪'],
    gap: [100, 100],
    offset: [0, 0],
    rotate: -22,
    globalAlpha: 0.15,
    isDebug: false,
    // image: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original',
    font: {
      color: '#333',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }
  }
  constructor(options) {
    this.options = deepMerge({ ...Watermark.DEFAULT_WATERMARK_OPTIONS }, options)
    if (!this.options.container) {
      throw new Error('container is required')
    }
    if (!this.options.container instanceof HTMLElement) {
      throw new Error('container must be a HTMLElement')
    }
    // 判断是否是相对定位
    if (getComputedStyle(this.options.container).position === 'static') {
      this.options.container.style.position = 'relative'
    }
    this.markStyle = this.getMarkStyle()
    this.watermarkMap = new Map()
    this.renderWatermark()
  }
  getMarkStyle() {
    const { zIndex, gap, offset } = this.options
    const [gapX, gapY] = gap
    const gapXCenter = gapX / 2
    const gapYCenter = gapY / 2
    const offsetLeft = offset?.[0] ?? gapXCenter
    const offsetTop = offset?.[1] ?? gapYCenter
    let positionLeft = offsetLeft - gapXCenter
    let positionTop = offsetTop - gapYCenter
    const markStyle = {
      zIndex,
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      backgroundRepeat: 'repeat',
      backgroundPosition: `${positionLeft > 0 ? positionLeft : 0}px ${positionTop > 0 ? positionTop : 0}px`
    }
    if (positionLeft > 0) {
      markStyle.left = `${positionLeft}px`
      markStyle.width = `calc(100% - ${positionLeft}px)`
    }
    if (positionTop > 0) {
      markStyle.top = `${positionTop}px`
      markStyle.height = `calc(100% - ${positionTop}px)`
    }
    return markStyle
  }

  getMarkSize(ctx) {
    const { image, content, font = {}, width, height } = this.options
    let defaultWidth = 120
    let defaultHeight = 64
    if (!image && ctx.measureText) {
      ctx.font = `${Number(font.fontSize || 16)}px ${font.fontFamily || 'Microsoft YaHei'}`
      const contents = Array.isArray(content) ? content : [content]
      const sizes = contents.map(item => {
        const metrics = ctx.measureText(item)
        return [
          metrics.width,
          metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent + metrics.ideographicBaseline
        ]
      })

      defaultWidth = Math.ceil(Math.max(...sizes.map(size => size[0])))
      defaultHeight =
        Math.floor(Math.max(...sizes.map(size => size[1]))) * contents.length + (contents.length - 1) * getFontGap()
    }
    return [width ?? defaultWidth, height ?? defaultHeight]
  }

  appendWatermark(base64Url, markWidth, container) {
    if (container) {
      const attssr = getStyleStr({
        ...this.markStyle,
        backgroundImage: `url('${base64Url}')`,
        backgroundSize: `${Math.floor(markWidth)}px`,
        visibility: 'visible !important',
      })

      if (!this.watermarkMap.get(container)) {
        const newWatermarkEle = document.createElement('div')
        this.watermarkMap.set(container, newWatermarkEle)
        const MutationObserver = globalThis.MutationObserver || globalThis.WebKitMutationObserver
        // 检查浏览器是否支持这个API
        if (MutationObserver) {
          let mo = new MutationObserver(() => {
            if (
              !container.contains(this.watermarkMap.get(container)) ||
              newWatermarkEle.getAttribute('style') !== attssr
            ) {
              // 避免一直触发
              this.removeWatermark(container)
              this.watermarkMap.delete(container)
              mo.disconnect()
              mo = null
              this.renderWatermark()
            }
          })
          mo.observe(container, {
            attributes: true, // 观察目标节点的属性节点
            subtree: true, // 观察目标节点的所有后代节点
            childList: true // 观察目标节点的子节点
          })
        }
      }
      const watermarkEle = this.watermarkMap.get(container)
      watermarkEle.setAttribute('style', attssr)
      container.append(watermarkEle)
    }
  }
  removeWatermark(container) {
    const watermarkEle = this.watermarkMap.get(container)
    if (watermarkEle && container) {
      if (container.contains(watermarkEle)) {
        container.removeChild(watermarkEle)
      }
    }
    this.watermarkMap.delete(container)
  }

  renderWatermark() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const ratio = getPixelRatio()
      const [markWidth, markHeight] = this.getMarkSize(ctx)
      const drawCanvas = drawContent => {
        const [nextClips, clipWidth] = renderClips(
          drawContent,
          this.options.rotate,
          ratio,
          drawContent.width || markWidth,
          drawContent.height || markHeight,
          {
            color: this.options.font.color,
            fontSize: this.options.font.fontSize,
            fontStyle: this.options.font.fontStyle,
            fontWeight: this.options.font.fontWeight,
            fontFamily: this.options.font.fontFamily,
            textAlign: this.options.font.textAlign
          },
          this.options.gap[0],
          this.options.gap[1],
          this.options.globalAlpha,
          this.options.isDebug
        )
        this.appendWatermark(nextClips, clipWidth, this.options.container)
      }

      if (this.options.image) {
        const img = new Image()
        img.onload = () => {
          drawCanvas(img)
        }
        img.onerror = () => {
          drawCanvas(this.options.content)
        }
        img.crossOrigin = 'anonymous'
        img.referrerPolicy = 'no-referrer'
        img.src = this.options.image
      } else {
        drawCanvas(this.options.content)
      }
    }
  }
  updateWatermark(options) {
    this.options = deepMerge({ ...this.options }, options)
    this.markStyle = this.getMarkStyle()
    this.renderWatermark()
  }
}

export default Watermark

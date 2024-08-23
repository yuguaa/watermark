## Watermark 类

> - 通用 js 生成水印类，给页面的某个区域加上水印。
> - 页面需要添加水印标识版权时使用。
> - 适用于防止信息盗用。

#### 注意：该类会给传入的水印容器添加`position:relative;`样式，请注意处理。由于汉字和英文书写展示方式不同，多行展示并旋转时可能导致边缘被切割。

#### 该类参考 Ant Design React 项目中 Watermark 组件改写，属性可参考[Watermark](https://ant.design/components/watermark-cn#watermark-demo-custom)

### Watermark

| 参数        | 说明                                                        | 类型               | 默认值        |
| ----------- | ----------------------------------------------------------- | ------------------ | ------------- |
| width       | 水印的宽度，`content` 的默认值为自身的宽度                  | number             | 120           |
| height      | 水印的高度，`content` 的默认值为自身的高度                  | number             | 64            |
| inherit     | 是否将水印传导给弹出组件如 Modal、Drawer                    | boolean            | true          |
| rotate      | 水印绘制时，旋转的角度，单位 `°`                            | number             | -22           |
| zIndex      | 追加的水印元素的 z-index                                    | number             | 9             |
| globalAlpha | 水印透明度 0-1                                              | number             | 0.15          |
| image       | 图片源，建议导出 2 倍或 3 倍图，优先级高 (支持 base64 格式) | string             | -             |
| content     | 水印文字内容                                                | string \| string[] | '菠萝吹雪'    |
| font        | 文字样式                                                    | [Font](#Font)      | [Font](#Font) |
| gap         | 水印之间的间距                                              | \[number, number\] | \[100, 100\]  |
| offset      | 水印距离容器左上角的偏移量，默认为 `0`                      | \[number, number\] | \[0, 0\]      |
| isDebug     | 开启调试，给 canvas clip 添加背景色                         | boolean            | false         |

### API

| 方法            | 说明                                    |
| --------------- | --------------------------------------- |
| updateWatermark | 更新水印，传入值可选，为 watermark 参数 |

### Font

| 参数       | 说明             | 类型                                                                                                              | 默认值     |
| ---------- | ---------------- | ----------------------------------------------------------------------------------------------------------------- | ---------- |
| color      | 字体颜色         | [CanvasFillStrokeStyles.fillStyle](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/fillStyle) | #333       |
| fontSize   | 字体大小         | number                                                                                                            | 16         |
| fontWeight | 字体粗细         | `normal` \| `light` \| `weight` \| number                                                                         | normal     |
| fontFamily | 字体类型         | string                                                                                                            | sans-serif |
| fontStyle  | 字体样式         | `none` \| `normal` \| `italic` \| `oblique`                                                                       | normal     |
| textAlign  | 指定文本对齐方向 | [CanvasTextAlign](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/textAlign)                  |

### 使用示例

[在线示例，点击进入](https://watermark-playground.vercel.app/)

```js
  import Watermark from '@yugu/watermark'
  const watermark = new Watermark({
    container:'your-dom',
    font:{
      fontSize:22
    },
    ...
  })
  watermark.updateWatermark({
    rotate:0,
    font:{
      fontSize:12
    }
  })
```

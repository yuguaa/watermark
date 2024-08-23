## Watermark 类

> * 通用 js 生成水印类，给页面的某个区域加上水印。
> * 页面需要添加水印标识版权时使用。
> * 适用于防止信息盗用。

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

### 示例
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="../watermark/dist/index.umd.js"></script>
  <title>Document</title>
  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
    }

    #watermark-container {
      border: 1px solid red;
      height: 1000px;
    }
  </style>
</head>

<body>
  <div>
    <label>水印内容</label>
    <input type="text" id="input">
  </div>
  <div id="watermark-container">
  </div>
  <script>
    const Watermark = globalThis.Watermark;
    // 获取要添加水印的 DOM 容器元素
    const container = document.getElementById('watermark-container');

    // 实例化 Watermark 类，传入配置选项
    const watermark = new Watermark({
      container,  // 目标容器元素
    });

    const input = document.getElementById('input');
    input.addEventListener('input', (e) => {
      const content = e.target.value;
      watermark.updateWatermark({
        content,
      });
    });
  </script>
</body>

</html>
```


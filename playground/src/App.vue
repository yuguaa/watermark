<template>
  <div class="watermark">
    <n-card title="水印预览">
      <div id="watermark-container">
        <n-image
          class="watermark-image"
          width="100"
          src="https://avatars.githubusercontent.com/u/58333667?v=4&size=100"
          :preview-disabled="true"
        />
        <div class="watermark-text">
          有时候，我们忙碌于生活的琐碎，忽略了内心真正的感受。愿你在每一个平凡的日子里，都能找到片刻的宁静，与自己对话，倾听内心的声音。无论前方的路多么崎岖，记得初心不改，保持善良与真诚，因为这些才是我们前行的力量。生活或许不总是完美，但你在努力追求梦想的过程中，已经足够美丽。
        </div>
        <iframe class="watermark-iframe" src="https://h5player.bytedance.com/" frameborder="0"></iframe>
      </div>
    </n-card>

    <div>
      <n-card title="配置">
        <n-form ref="formRef" inline :label-width="80" :model="options">
          <n-card title="水印">
            <n-form-item label="水印调试">
              <n-switch v-model:value="options.isDebug" clearable />
            </n-form-item>
            <n-form-item label="水印宽度">
              <n-input-number v-model:value="options.width" clearable />
            </n-form-item>
            <n-form-item label="水印高度">
              <n-input-number v-model:value="options.height" clearable />
            </n-form-item>
            <n-form-item label="水印角度">
              <n-input-number v-model:value="options.rotate" clearable />
            </n-form-item>
            <n-form-item label="水印层级">
              <n-input-number v-model:value="options.zIndex" clearable />
            </n-form-item>
            <n-form-item label="水印透明度">
              <n-input-number
                v-model:value="options.globalAlpha"
                :max="1"
                :min="0"
                :step="0.01"
                :precision="2"
                clearable
              />
            </n-form-item>
            <n-form-item label="水印图片">
              <n-input v-model:value="options.image" clearable />
            </n-form-item>
            <n-form-item label="水印文本">
              <n-input v-model:value="options.content" clearable />
            </n-form-item>
          </n-card>
          <n-card title="水印移动">
            <n-form-item label="水印间距X">
              <n-input-number v-model:value="options.gap[0]" clearable />
            </n-form-item>
            <n-form-item label="水印间距Y">
              <n-input-number v-model:value="options.gap[1]" clearable />
            </n-form-item>
            <n-form-item label="水印偏移X">
              <n-input-number v-model:value="options.offset[0]" clearable />
            </n-form-item>
            <n-form-item label="水印偏移Y">
              <n-input-number v-model:value="options.offset[1]" clearable />
            </n-form-item>
          </n-card>
          <n-card title="文本">
            <n-form-item label="颜色">
              <n-color-picker v-model:value="options.font.color" clearable />
            </n-form-item>
            <n-form-item label="大小">
              <n-input-number v-model:value="options.font.fontSize" clearable />
            </n-form-item>
            <n-form-item label="字体">
              <n-input v-model:value="options.font.fontFamily" clearable />
            </n-form-item>
            <n-form-item label="字重">
              <n-select v-model:value="options.font.fontWeight" :options="fontWeightOptions" clearable />
            </n-form-item>
            <n-form-item label="风格">
              <n-select v-model:value="options.font.fontStyle" :options="fontStyleOptions" clearable />
            </n-form-item>
            <n-form-item label="位置">
              <n-select v-model:value="options.font.textAlign" :options="fontAlignOptions" clearable />
            </n-form-item>
          </n-card>
        </n-form>
      </n-card>
    </div>
  </div>
</template>
<script setup>
import Watermark from '@yugu/watermark'
console.log(`🚀 ~ Watermark:`, Watermark)

import { onMounted, reactive, watchEffect } from 'vue'
const watermark = reactive({
  instance: null
})
const options = reactive({
  isDebug: false,
  width: null,
  height: null,
  rotate: -22,
  zIndex: 9,
  globalAlpha: 0.15,
  image: null,
  content: '菠萝吹雪',
  gap: [100, 100],
  offset: [0, 0],
  font: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center'
  }
})
const fontWeightOptions = [
  { label: 'normal', value: 'normal' },
  { label: 'light', value: 'light' },
  { label: 'weight', value: 'weight' },
  { label: '100', value: '100' },
  { label: '200', value: '200' },
  { label: '300', value: '300' },
  { label: '400', value: '400' },
  { label: '500', value: '500' },
  { label: '600', value: '600' },
  { label: '700', value: '700' },
  { label: '800', value: '800' },
  { label: '900', value: '900' }
]
const fontStyleOptions = [
  { label: 'none', value: 'none' },
  { label: 'normal', value: 'normal' },
  { label: 'italic', value: 'italic' },
  { label: 'oblique', value: 'oblique' }
]
const fontAlignOptions = [
  { label: 'left', value: 'left' },
  { label: 'center', value: 'center' },
  { label: 'right', value: 'right' },
  { label: 'start', value: 'start' },
  { label: 'end', value: 'end' }
]
onMounted(() => {
  const container = document.getElementById('watermark-container')
  watermark.instance = new Watermark({ container })
  console.log(`🚀 ~ watermark:`, watermark)
})
watchEffect(() => {
  if (watermark.instance) {
    watermark.instance.updateWatermark(options)
  }
})
</script>
<style scoped>
.watermark {
  display: flex;
  height: 100%;

  & > div {
    flex: 1;
    height: 100%;
    overflow: auto;
  }
}
#watermark-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .watermark-text {
    position: relative;
    font-size: 14px;
    z-index: 10;
    color: rgb(26, 5, 252);
    text-indent: 2em;
    padding: 10px 80px;
  }
  .watermark-image {
    position: relative;
    z-index: 10;
    border: 10px solid rgb(232, 105, 166);
  }
  .watermark-iframe {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
  }
}
</style>

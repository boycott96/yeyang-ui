<template>
  <div class="browser">
    <div class="left">
      <div class="h1-explain-title" id="export-explain">一、导出浏览器书签</div>
      <div class="h1-body" :style="{ 'max-height': height }">
        <div class="h2-explain-title" id="open-bookmark">1. 打开书签管理器</div>
        <div class="h3-explain-title">
          方法1: 通过快捷键方式 <span class="key-symbol">{{ getKeyBoard(os) }}</span> 打开书签管理器
        </div>
        <div class="h3-explain-title">
          方法2: 通过下列截图的方式进行打开书签管理器
        </div>
        <div class="explain-line">在主页面，点击【自定义及控制】图标。</div>
        <div class="explain-image">
          <img src="@/assets/images/chrome/step_1.png" />
        </div>
        <div class="explain-line">在列表中，点击【书签】→【书签管理器】</div>
        <div class="explain-image">
          <img src="@/assets/images/chrome/step_2.png" />
        </div>
        <div class="h2-explain-title" id="export-bookmark">2. 导出书签</div>
        <div class="explain-line">在书签页面，点击右上角的【整理】→【导出书签】</div>
        <div class="explain-image">
          <img src="@/assets/images/chrome/step_3.png" />
        </div>
        <div class="explain-line">在另存为页面，选择【文件夹】位置，点击【保存】即可</div>
        <div class="explain-image">
          <img src="@/assets/images/chrome/step_4.png" />
        </div>
      </div>
      <div v-if="height == '250px'" class="read-whole-mask">
        <div class="exp-mask"></div>
        <div class="read-whole" @click="expandClick">
          <span>展开阅读全部</span>
          <svg-icon icon-class="arrow" />
        </div>
      </div>
      <div class="h1-explain-title" id="import-explain">二、导入书签</div>
      <div class="h1-body">
        <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange" @drop="handleDrop">
          <p class="ant-upload-drag-icon">
            <svg-icon style="width: 50px; height: 50px" icon-class="upload" />
          </p>
          <p class="ant-upload-text">单击或拖动文件到此区域进行上传</p>
          <p class="ant-upload-hint">
            支持单个或批量上传浏览器的书签
          </p>
        </a-upload-dragger>
      </div>
    </div>
    <div class="right">
      <a-anchor :target-offset="targetOffset" style="position: absolute">
        <a-anchor-link href="#export-explain" title="导出">
          <a-anchor-link href="#open-bookmark" title="打开书签管理器" />
          <a-anchor-link href="#export-bookmark" title="导出书签" />
        </a-anchor-link>
        <a-anchor-link href="#import-explain" title="导入" />
      </a-anchor>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import platform from "platform";

export default {
  setup() {
    // 获取浏览器信息
    const os = ref(platform.os.family);
    console.log(platform.os);
    const targetOffset = ref(undefined);
    const height = ref('250px');
    onMounted(() => {
      targetOffset.value = window.innerHeight / 2;
    });
    function expandClick() {
      height.value = "unset";
    }
    const handleChange = (info) => {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
    function getKeyBoard(systemOs) {
      if (systemOs == 'OS X') {
        return '⌥ + ⌘ + B';
      }
    }
    return {
      targetOffset, height, expandClick, fileList: ref([]),
      handleChange, handleDrop: (e) => {
        console.log(e);
      },
      os, getKeyBoard
    }
  }
}
</script>
<style lang="less" scoped>
.browser {
  display: flex;

  .left {
    width: calc(100% - 150px);

    .read-whole-mask {
      width: 100%;
      height: 50px;
      top: -20px;
      position: relative;
      border-bottom: 9px solid #fff;
      box-sizing: content-box;

      .exp-mask {
        position: relative;
        width: 100%;
        height: 50px;
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 13%, #fff 63%);
      }

      .read-whole {
        position: relative;
        text-align: center;
        color: #4DB93B;
        width: 100%;
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        box-sizing: border-box;
        cursor: pointer;

        .svg-icon {
          width: 14px;
          height: 14px;
        }
      }
    }

    .h1-explain-title {
      font-size: 22px;
      font-weight: 600;
      line-height: 1.5;
      margin-bottom: 8px;
      margin-top: 22px;
    }

    .h1-body {
      overflow: hidden;

      .h2-explain-title {
        font-size: 20px;
        font-weight: 500;
        line-height: 1.5;
        margin-bottom: 8px;
        margin-top: 22px;
      }

      .h3-explain-title {
        font-size: 18px;
        font-weight: 500;
        line-height: 1.5;
        margin-bottom: 8px;
        margin-top: 22px;
      }

      .key-symbol {
        border: 1px solid;
        border-radius: 5px;
        background-color: rgba(31, 45, 51, 0.08);
      }

      .explain-line {
        -webkit-font-smoothing: antialiased;
        font-size: 16px;
        line-height: 1.625;
        outline: none;
        overflow-wrap: break-word;
        position: relative;
        white-space: pre-wrap;
      }

      .explain-image {
        border: 2px solid transparent;
        display: inline-block;
        line-height: 0;
        position: relative;
        padding: 4px;
        align-items: center;
        background-color: #fff;
        border: 1px solid #dee0e3;
        border-radius: 8px;
        box-shadow: 0 3px 12px 0 rgba(31, 35, 41, .1);
        color: #8f959e;
        margin: 8px 12px;

        img {
          width: 100%;
          height: 100%;
          -webkit-user-drag: none;
          display: block;
          max-width: 100%;
        }
      }
    }
  }

  .right {
    width: 150px
  }
}
</style>
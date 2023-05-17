<template>
  <div class="browser">
    <div class="left" :class="{ 'full-width': size === 'default' }">
      <div class="h1-explain-title" id="export-explain">一、PC端导出浏览器书签</div>
      <div class="h1-body" :style="{ 'max-height': height }">
        <div class="h2-explain-title" id="open-bookmark">1. 打开书签管理器</div>
        <div v-if="getKeyBoard(os) != null" class="h3-explain-title">
          方法1: 通过快捷键方式 <span class="key-symbol">{{ getKeyBoard(os) }}</span> 打开书签管理器
        </div>
        <div class="h3-explain-title">
          <template v-if="getKeyBoard(os) != null">方法2: </template>
          通过下列截图的方式进行打开书签管理器
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
        <a-upload-dragger v-model:fileList="fileList" name="file" :customRequest="handleUpload" @change="handleChange"
          @drop="handleDrop">
          <p class="ant-upload-drag-icon">
            <svg-icon style="width: 50px; height: 50px" icon-class="upload" />
          </p>
          <p class="ant-upload-text">单击或拖动文件到此区域进行上传</p>
          <p class="ant-upload-hint">
            仅支持上传单个浏览器的书签
          </p>
        </a-upload-dragger>
      </div>
    </div>
    <div v-if="size === 'large'" class="right">
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
  props: {
    size: {
      default: 'large',
      type: String
    }
  },
  setup(_props, ctx) {
    // 获取浏览器信息
    const fileList = ref([]);
    const os = ref(platform.os.family);
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
      } else if (systemOs == 'Windows') {
        return 'ctrl + shift + O'
      } else {
        return null
      }
    }
    function handleUpload(info) {
      // 处理自定义上传书签数据
      const { file } = info;
      const reader = new FileReader();
      reader.onload = function (e) {
        var htmlContent = e.target.result;
        // 解析 HTML 内容为 JSON
        var parser = new DOMParser();
        var doc = parser.parseFromString(htmlContent, 'text/html');

        var bookmarks = processFolder(doc);

        // 将树形json结构，转换为数组结构
        var arrayBookmarks = flattenTree(bookmarks);

        // 过滤空书签的文件夹
        const result = [];
        arrayBookmarks.forEach(item => {
          if (item.children.length > 0) {
            var children = appendSuffixToDuplicate(item.children);
            result.push({ key: item.key, title: item.title, children: children })
          }
        })
        // 进行文件夹重复名称追加后缀
        ctx.emit('load:bookmarks', appendSuffixToDuplicate(result));
        clearUpload();
      }
      reader.readAsText(file);
    }
    function clearUpload() {
      fileList.value = [];
    }
    // 解析 HTML 内容为 JSON 的函数
    function processFolder(doc) {
      // 获取书签根元素并遍历所有子元素
      var rootElement = doc.querySelector('body');
      var childNodes = rootElement.childNodes;
      var bookmarks = {
        key: `folder_书签`,
        title: '书签',
        children: [],
        folders: []
      };
      for (var i = 0; i < childNodes.length; i++) {
        // eslint-disable-next-line no-debugger
        processBookmark(childNodes[i], bookmarks);
      }

      // 返回书签根对象作为 JSON 数据
      return bookmarks;
    }

    // 递归函数用于处理文件夹和书签元素
    function processBookmark(node, parentFolder) {
      // 判断下面的结构中是否还存在H3的标签，若不存在，则为一个文件夹下
      if (node != null && node.nodeName != '#text') {
        var h3 = node.querySelector('h3');
        if (h3) {
          var folder = { key: `folder_` + h3.textContent, title: h3.textContent, createDate: h3.getAttribute('add_date'), children: [], folders: [] };
          var childNodes = node.childNodes;
          for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeName === 'DL' || childNodes[i].nodeName === 'DT') {
              processBookmark(childNodes[i], folder);
            }
          }
          parentFolder.folders.push(folder);
        } else {
          if (node.nodeName === 'DT') {
            var a = node.querySelector('a');
            parentFolder.children.push({ key: `url_` + a.textContent, title: a.textContent, createDate: a.getAttribute('add_date'), icon: a.getAttribute('icon'), href: a.getAttribute('href') })
          } else if (node.nodeName === 'DL') {
            var childNodes1 = node.childNodes;
            for (var j = 0; j < childNodes1.length; j++) {
              if (childNodes1[j].nodeName === 'DT') {
                var a1 = childNodes1[j].querySelector('a');
                parentFolder.children.push({ key: `url_` + a1.textContent, title: a1.textContent, createDate: a1.getAttribute('add_date'), icon: a1.getAttribute('icon'), href: a1.getAttribute('href') })
              }
            }
          }
        }
      }
    }

    function flattenTree(tree) {
      var result = [];
      function traverse(node) {
        result.push(node);
        if (Array.isArray(node.folders)) {
          node.folders.forEach(function (folder) {
            traverse(folder);
          })
        }
      }
      traverse(tree);
      return result;
    }
    /**
     * 对具有相同名称，进行追加后缀
     * @param {title, key} arr 参数
     */
    function appendSuffixToDuplicate(arr) {
      const nameCounts = {};

      for (let i = 0; i < arr.length; i++) {
        const name = arr[i].key;

        if (nameCounts[name]) {
          const count = nameCounts[name];
          const suffixedName = `${name}_${count}`;
          arr[i].key = suffixedName;
          nameCounts[name] += 1;
        } else {
          nameCounts[name] = 1;
        }
      }
      return arr;
    }

    return {
      targetOffset, height, expandClick, fileList,
      handleChange, handleDrop: (e) => {
        console.log(e);
      },
      os, getKeyBoard, handleUpload
    }
  }
}
</script>
<style lang="less" scoped>
.browser {
  display: flex;

  .full-width {
    width: 100% !important;
  }

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
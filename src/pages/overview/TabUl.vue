<template>
  <div v-if="folders.length > 0" class="yeyang-tab">
    <div class="tab-ul">
      <div ref="ulScrollbar" class="tab-wrapper no-scrollbar" v-on:scroll="checkExpandClick">
        <div v-for="(item, index) in folders" :key="item.id" class="tab-li" :class="{ active: activeKey == item.id }"
          @mouseover="tabHover(index)" @mouseleave="tabLeave(index)" @click="tabClick(item, index)">
          <svg-icon icon-class="tab-angle" class="tab-angle tab-angle-left" />
          <i class="li-icon">
            <span class="yy-icon">
              <svg-icon icon-class="folder" />
            </span>
          </i>
          <div class="li-title">
            <a-input :ref="el => refEvent(el, index)" style="width: 100px" v-if="item.edit" v-model:value="item.name"
              v-on:blur="onblur(item)" @pressEnter="onblur(item)" />
            <span v-else>{{ item.name }}</span>
          </div>
          <a-popover v-model:visible="item.visible" placement="bottom" trigger="click">
            <template #content>
              <div class="folder-button" @click="editClick(item, index)">
                <span class="yy-icon">
                  <svg-icon icon-class="edit" />
                </span>
                <span>重命名</span>
              </div>
              <div class="folder-button" @click="deleteClick(item, index)">
                <span class="yy-icon">
                  <svg-icon icon-class="delete" />
                </span>
                <span>删除文件夹</span>
              </div>
            </template>
            <div v-if="activeKey == item.id" class="li-operation">
              <span class="yy-icon">
                <svg-icon icon-class="more" />
              </span>
            </div>
          </a-popover>
          <span v-if="activeKey != item.id && index != (folders.length - 1)" class="tab-line"
            :class="{ 'tab-line-hide': item.lineHide }"></span>
          <svg-icon icon-class="tab-angle" class="tab-angle tab-angle-right" />
        </div>
      </div>
      <div v-if="leftShow" class="tab-bar-scroll-button left">
        <div class="tab-bar-scroll-button__icon" @click="leftClick">
          <span class="universe-icon">
            <svg-icon icon-class="expand-left" />
          </span>
        </div>
      </div>
      <div v-if="rightShow" class="tab-bar-scroll-button right">
        <div class="tab-bar-scroll-button__icon" @click="rightClick">
          <span class="universe-icon">
            <svg-icon icon-class="expand-right" />
          </span>
        </div>
      </div>
    </div>
    <div class="all-view-button">
      <span class="tab-line"></span>
      <a-popover v-model:visible="allViewVisible" placement="bottom" trigger="click">
        <template #content>
          <div class="search-foler">
            <a-input v-model:value="folderName" @pressEnter="enterClick" placeholder="搜索">
              <template #prefix>
                <svg-icon icon-class="search" />
              </template>
            </a-input>
          </div>
          <div class="all-view">
            <div v-for="(item, index) in searchFolderName()" :key="index" class="li-folder"
              :class="{ active: activeKey == item.id }" @click="tabClick(item, index)">
              <div class="li-left">
                <div class="drag">
                  <svg-icon icon-class="drag" />
                </div>
                <div class="icon">
                  <svg-icon icon-class="folder" />
                </div>
                <div class="name">
                  <a-input :ref="el => refEvent1(el, index)" style="width: 100%" v-if="item.edit1"
                    v-model:value="item.name" v-on:blur="onblur(item)" />
                  <span v-else>{{ item.name }}</span>
                </div>
              </div>
              <div class="li-right">
                <a-popover v-model:visible="item.visible1" placement="bottom" trigger="click">
                  <template #content>
                    <div class="folder-button" @click="editClick1(item, index)">
                      <span class="yy-icon">
                        <svg-icon icon-class="edit" />
                      </span>
                      <span>重命名</span>
                    </div>
                    <div class="folder-button" @click="deleteClick(item, index)">
                      <span class="yy-icon">
                        <svg-icon icon-class="delete" />
                      </span>
                      <span>删除视图</span>
                    </div>
                  </template>
                  <div class="li-operation">
                    <span class="yy-icon">
                      <svg-icon icon-class="more" />
                    </span>
                  </div>
                </a-popover>
              </div>
            </div>
          </div>
        </template>
        <div class="tab-bar-all-view">
          <span class="text">全部</span>
          <i class="all-view-icon">
            <span class="universe-icon">
              <svg-icon icon-class="down-outlined" />
            </span>
          </i>
        </div>
      </a-popover>
    </div>
    <div class="tab-add">
      <span class="tab-line"></span>
      <button class="yy-button-text" @click="addFolder">
        <svg-icon icon-class="add" />
      </button>
    </div>
  </div>
</template>
<script>
import { nextTick, ref, watchEffect } from "vue";
import { Modal, message } from 'ant-design-vue';
import { deleteFolder, editFolder } from "@/api/folder";

export default {
  props: {
    activeKey: {
      type: String,
    },
    folders: {
      type: Array,
    }
  },
  setup(props, ctx) {
    const folderName = ref('');
    const allViewVisible = ref(false);
    const ulScrollbar = ref();
    const viewFolders = ref();
    // created
    watchEffect(() => {
      if (props.folders.length > 0) {
        if (ulScrollbar.value != undefined) {
          checkExpandClick();
          getAllChildrenWidth();
        }
      }
    })
    const scrollLocation = ref(0);
    const rightShow = ref(false);
    const leftShow = ref(false);
    const totalWidth = ref(0);
    const domRef = ref([]);
    const domRef1 = ref([]);

    function tabHover(index) {
      const folderArr = props.folders
      if (index > 0) {
        folderArr[index - 1].lineHide = true;
      }
      folderArr[index].lineHide = true;
    }
    function tabClick(item, index) {
      const folderArr = props.folders;
      if (index > 0) {
        folderArr[index - 1].lineHide = true;
      }
      allViewVisible.value = false;
      ctx.emit('update:folders', folderArr);
      ctx.emit('update:active-key', item.id);
    }
    function tabLeave(index) {
      const folderArr = props.folders
      if (folderArr[index].id != props.activeKey) {
        if (index > 0) {
          folderArr[index - 1].lineHide = false;
        }
        if (index + 1 < folderArr.length && folderArr[index + 1].id != props.activeKey) {
          folderArr[index].lineHide = false;
        }
        ctx.emit('update:folders', folderArr);
      }
    }
    async function rightClick() {
      await nextTick();
      const width = ulScrollbar.value.clientWidth - 56;
      let leftWidth;
      if (scrollLocation.value < totalWidth.value - width) {
        leftWidth = scrollLocation.value + width;
      } else {
        leftWidth = totalWidth.value;
      }
      ulScrollbar.value.scrollTo({ left: leftWidth, behavior: "smooth" })
      checkExpandClick();
    }
    async function leftClick() {
      await nextTick();
      const width = ulScrollbar.value.clientWidth - 56;
      let leftWidth;
      if (scrollLocation.value > width) {
        leftWidth = scrollLocation.value - width;
      } else {
        leftWidth = 0;
      }
      ulScrollbar.value.scrollTo({ left: leftWidth, behavior: "smooth" })
      checkExpandClick();
    }
    async function checkExpandClick() {
      await nextTick();
      const width = ulScrollbar.value.clientWidth;
      scrollLocation.value = ulScrollbar.value.scrollLeft;
      if (scrollLocation.value <= 0) {
        rightShow.value = (width < ulScrollbar.value.scrollWidth)
        leftShow.value = false;
      } else {
        leftShow.value = true;
        rightShow.value = scrollLocation.value < ulScrollbar.value.scrollWidth - width;
      }
    }
    async function getAllChildrenWidth() {
      await nextTick();
      const childElements = ulScrollbar.value.children; // 获取所有子元素
      // 遍历所有子元素，累加它们的宽度
      for (let i = 0; i < childElements.length; i++) {
        totalWidth.value += childElements[i].offsetWidth;
      }
    }
    async function editClick(item, index) {
      item.edit = true;
      item.visible = false;
      await nextTick();
      domRef.value[index].focus();
      domRef.value[index].select();
    }
    async function editClick1(item, index) {
      item.edit1 = true;
      item.visible1 = false;
      await nextTick();
      domRef1.value[index].focus();
      domRef1.value[index].select();
    }
    function onblur(item) {
      item.edit = false;
      item.edit1 = false;
      updateFolderName(item);
    }
    function refEvent(el, index) {
      domRef.value[index] = el;
    }
    function refEvent1(el, index) {
      domRef1.value[index] = el;
    }
    function deleteClick(item, index) {
      item.visible = false;
      Modal.confirm({
        title: '删除文件夹',
        content: `确认要删除文件夹“${item.name}”吗?`,
        onOk() {

          deleteFolder(item.id).then(res => {
            if (res.code !== 200) {
              message.error(res.message);
            }
            const folderArr = props.folders;
            folderArr.splice(index, 1);
            if (folderArr.length > 0) {
              ctx.emit('update:active-key', folderArr[index - 1].id)
            }
            ctx.emit('update:folders', folderArr);
            checkExpandClick();
          });
        },
        cancelText: '取消',
        okText: '删除',
      });
    }
    function updateFolderName(val) {
      editFolder({ id: val.id, name: val.name }).then(res => {
        console.log(res);
      })
    }
    function addFolder() {
      ctx.emit('add-folder')
    }
    function searchFolderName() {
      if (folderName.value != '') {
        return props.folders.filter(item => {
          return item.name.includes(folderName.value)
        });
      } else {
        return props.folders;
      }
    }
    function enterClick() {
      const arr = searchFolderName();
      tabClick(arr[0], 0);
    }
    return {
      // 变量
      viewFolders,
      tabHover, tabLeave, tabClick, allViewVisible, ulScrollbar,
      rightClick, rightShow, leftShow, leftClick, checkExpandClick,
      editClick, onblur, domRef, refEvent, deleteClick, editClick1, refEvent1,
      folderName,
      // 方法
      updateFolderName,
      addFolder,
      searchFolderName,
      enterClick
    };
  },
};
</script>
<style lang="less" scoped>
.yeyang-tab {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
  width: 100%;

  .tab-line-hide {
    height: 0 !important;
  }

  .tab-line {
    background: #d0d3d6;
    height: 16px;
    margin-left: 12px;
    width: 1px;
  }

  .tab-ul {
    max-width: calc(100% - 160px);
    display: flex;
    align-items: center;
    position: relative;

    .tab-bar-scroll-button.left {
      background: linear-gradient(90deg, #f5f6f7 58%, rgba(245, 246, 247, 0));
      padding-right: 34px;
      left: 0;
    }

    .tab-bar-scroll-button.right {
      background: linear-gradient(270deg, #f5f6f7 58%, rgba(245, 246, 247, 0));
      padding-left: 34px;
      right: 0;
    }

    .tab-bar-scroll-button {
      height: 40px;
      display: flex;
      align-items: center;
      position: absolute !important;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .tab-bar-scroll-button__icon:hover {
      background-color: rgba(31, 35, 41, 0.08);
      cursor: pointer;
    }

    .tab-bar-scroll-button__icon {
      border-radius: 4px;
      color: #646a73;
      cursor: pointer;
      font-size: 12px;
      padding: 6px;
      display: flex;
      align-items: center;

      .universe-icon {
        display: inline-block;
        font-style: normal;
        line-height: 0;
        text-align: center;
        text-transform: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;

        .svg-icon {
          width: 16px;
          height: 16px;
          color: #646a73;
        }
      }
    }

    .tab-wrapper {
      overflow-x: overlay;
      overflow-y: hidden;
      padding-right: 8px;
      border-top-right-radius: 8px;
      scroll-behavior: smooth;
      scrollbar-width: none;
      display: flex;
      flex-direction: row;
    }

    .tab-li.active {
      background-color: #ffffff;

      .tab-line {
        display: none !important;
      }

      .tab-angle {
        display: block !important;
        color: #ffffff !important;
      }

      .li-icon {
        .svg-icon {
          color: #3370ff !important;
        }
      }
    }

    .tab-li.active:hover {
      background-color: #ffffff;
    }

    .tab-li.active+.tab-li:hover {
      border-bottom-left-radius: 8px;

      .tab-angle-left {
        display: none !important;
      }
    }

    .tab-li:hover {
      background-color: rgba(31, 35, 41, 0.05);

      .tab-angle {
        display: block !important;
        color: rgba(31, 35, 41, 0.05);
      }
    }

    .tab-li {
      display: flex;
      position: relative;
      align-items: center;
      cursor: pointer;
      padding-left: 12px;
      height: 40px;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;

      .tab-angle {
        bottom: 0;
        display: none;
        height: 8px;
        position: absolute;
        width: 8px;
      }

      .tab-angle-left {
        left: -8px;
        transform: rotate(-90deg);
      }

      .tab-angle-right {
        right: -8px;
      }

      .li-icon {
        align-items: center;
        display: flex;
        height: 36px;
        margin-right: 4px;
        padding-right: 2px;

        .svg-icon {
          color: #646a73;
          width: 16px;
          height: 16px;
        }
      }

      .li-title {
        color: #1f2329;
        margin-right: 8px;
        line-height: 36px;
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .all-view-button {
    display: flex;
    align-items: center;

    .tab-bar-all-view:hover {
      background-color: rgba(31, 35, 41, 0.08);
    }

    .tab-bar-all-view {
      margin-left: 8px;
      -webkit-box-align: center;
      align-content: center;
      display: flex;
      align-items: center;
      border-radius: 4px;
      color: #646a73;
      cursor: pointer;
      font-size: 14px;
      height: 32px;
      justify-content: center;
      margin-right: 8px;
      padding-left: 8px;
      padding-right: 8px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      .text {
        line-height: 32px;
        color: #1f2329;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        vertical-align: middle;
        white-space: nowrap;
      }

      .all-view-icon {
        margin-left: 6px;

        .svg-icon {
          color: #646a73;
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .tab-add {
    display: flex;
    align-items: center;
    margin-right: 4px;

    .tab-line {
      margin-left: 0;
    }

    .yy-button-text {
      border: 0;
      background-color: transparent;
      cursor: pointer;
      padding: 4px;
      margin-left: 12px;
      display: flex;
      align-items: center;

      .svg-icon {
        width: 16px;
        height: 16px;
        color: #646a73;
      }
    }

    .yy-button-text:hover {
      background-color: rgba(31, 35, 41, 0.05);
      border-radius: 4px;
    }
  }
}

.folder-button {
  display: flex;
  align-items: center;
  border-radius: 4px;
  width: 170px;
  font-size: 14px;
  height: 32px;
  line-height: 22px;
  padding: 5px 8px !important;
  cursor: pointer;

  .yy-icon {
    margin-right: 8px;
  }
}

.folder-button:hover {
  background-color: rgba(31, 35, 41, 0.08);
}

.search-foler {
  padding-top: 12px;
  margin: 0 12px;
  width: 286px;

  .svg-icon {
    width: 18px;
    height: 18px;
    color: #8f959e;
  }
}

.li-operation {
  height: 22px;
  margin-right: 8px;
  min-width: 22px;
  width: 22px;
  text-align: center;
  border-radius: 6px;
  padding: 0 4px;

  .svg-icon {
    color: #646a73;
    width: 14px !important;
    height: 14px !important;
  }
}

.li-operation:hover {
  background: rgba(31, 35, 41, 0.08);
}

.all-view {
  margin-top: 2px;
  padding: 4px 0;

  .li-folder:hover {
    background-color: rgba(31, 35, 41, 0.08);
    border-radius: 4px;

    .drag {
      visibility: visible;
    }

    .li-operation {
      visibility: visible !important;
    }
  }

  .li-folder.active {
    background-color: rgba(51, 112, 255, 0.08);
    color: #3370ff;

    .li-operation {
      visibility: visible !important;
    }
  }

  .li-folder {
    display: flex;
    width: 302px;
    height: 36px;
    justify-content: space-between;
    cursor: pointer;
    margin: 0 4px 2px;
    border-radius: 4px;

    .icon {
      margin-right: 4px;
    }

    .drag {
      visibility: hidden;
      color: #8f959e;
      cursor: grab;
    }

    .svg-icon {
      width: 18px;
      height: 18px;
    }

    .li-left {
      display: flex;

      div {
        display: flex;
        align-items: center;
      }
    }

    .li-right {
      display: flex;
      align-items: center;

      .li-operation {
        visibility: hidden;
        color: #8f959e;
      }

      div {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

<template>
  <div class="yeyang-tab">
    <div class="tab-ul">
      <div class="tab-wrapper no-scrollbar">
        <div v-for="(item, index) in folders" :key="item.id" class="tab-li" :class="{ 'active': activeKey == item.id }"
          @mouseover="tabHover(index)" @mouseleave="tabLeave(index)" @click="tabClick(item)">
          <svg-icon icon-class="tab-angle" class="tab-angle tab-angle-left" />
          <i class="li-icon">
            <span class="yy-icon">
              <svg-icon icon-class="folder" />
            </span>
          </i>
          <div class="li-title">
            {{ item.name }}
          </div>
          <div v-if="activeKey == item.id" class="li-operation">
            <span class="yy-icon">
              <svg-icon icon-class="more" />
            </span>
          </div>
          <span v-if="activeKey != item.id" class="tab-line" :class="{ 'tab-line-hide': item.lineHide }"></span>
          <svg-icon icon-class="tab-angle" class="tab-angle tab-angle-right" />
        </div>
      </div>
      <div class="tab-bar-scroll-button right">
        <div class="tab-bar-scroll-button__icon">
          <span class="universe-icon">
            <svg-icon icon-class="expand-right" />
          </span>
        </div>
      </div>
    </div>
    <div class="all-view-button">
      <span class="tab-line"></span>
      <a-popover v-model:visible="allViewVisible" placement="bottomRight" trigger="click">
        <template #content>
          123231
        </template>
        <div class="tab-bar-all-view">
          <span class="text">全部视图</span>
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
      <button class="yy-button-text">
        <svg-icon icon-class="add" />
      </button>
    </div>
  </div>
  <div class="url-list" :class="{ 'first-view': activeKey == folders[0].id }">
    <div class="yy-row">
      <template v-for="(urlItem, index) in urlList" :key="index">
        <div class="url-card">
          <div class="top">
            <div class="icon">
              <img :src="urlItem.url + `/favicon.ico`" />
            </div>
            <div class="title">
              <a :href="urlItem.url" target="_blank">{{ urlItem.name }}({{ urlItem.url }})</a>
            </div>
          </div>
          <div class="bottom">
            <ActionBar :data="urlItem" @update:data="updateData($event, index)" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import ActionBar from "@/components/ActionBar.vue";
import { ref } from "vue";

export default {
  components: {
    ActionBar,
  },
  emits: ['add:folder'],
  setup(props, context) {
    const folders = ref([
      { id: 1, name: '搜索引擎' },
      { id: 2, name: '搜索引擎' },
      { id: 3, name: '搜索引擎' },
      { id: 4, name: '搜索引擎' },
      { id: 5, name: '搜索引擎搜索引擎搜索引擎搜索引擎' },
      { id: 6, name: '搜索引擎搜索引擎搜索引擎搜索引擎' },
      { id: 7, name: '搜索引擎搜索引擎搜索引擎搜索引擎' }]);
    const urlList = [
      {
        name: "百度",
        url: "https://www.baidu.com",
        like: { value: 9898, active: 0 },
        share: { value: 91, active: 0 },
        star: { value: 675, active: 1 },
        comment: { value: 898, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },

    ];
    const activeKey = ref(folders.value[0].id || '');
    const allViewVisible = ref(false);
    function updateData(params, index) {
      urlList[index] = params
    }
    function editFolder(targetKey, action) {
      if (action === 'add') {
        context.emit('add:folder')
      } else {
        remove(targetKey);
      }
    }
    function remove(targetKey) {
      let lastIndex = 0;
      folders.value.forEach((item, i) => {
        if (item.id === targetKey) {
          lastIndex = i - 1;
        }
      });
      folders.value = folders.value.filter(item => item.id !== targetKey);
      if (folders.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
          activeKey.value = folders.value[lastIndex].id;
        } else {
          activeKey.value = folders.value[0].id;
        }
      }
    }
    function tabHover(index) {
      if (index > 0) {
        folders.value[index - 1].lineHide = true;
      }
      folders.value[index].lineHide = true;
    }
    function tabLeave(index) {
      if (index > 0) {
        folders.value[index - 1].lineHide = false;
      }
      folders.value[index].lineHide = false;
    }


    return { folders, urlList, activeKey, updateData, editFolder, remove, tabHover, tabLeave, allViewVisible };
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
        color: #ffffff;
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

      .li-operation {
        height: 22px;
        margin-right: 8px;
        min-width: 22px;
        width: 22px;
        text-align: center;
        border-radius: 6px;

        .svg-icon {
          color: #646a73;
          width: 14px;
          height: 14px;
        }
      }

      .li-operation:hover {
        background: rgba(31, 35, 41, 0.08);
      }
    }
  }

  .all-view-button {
    display: flex;
    align-items: center;
    width: 126px;

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

.url-list {
  background-color: #ffffff;
  border-radius: 8px 8px 0 0;
  padding: 16px 6px 6px 16px;
}

.url-list.first-view {
  border-top-left-radius: 0;
}

.url-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
  text-indent: 0;
  max-height: 148px;
  max-width: 100%;
  overflow: hidden;
  border-radius: 8px;
  font-weight: 400;
  border: 1px solid #dee0e3;
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
  margin-right: 10px;
  margin-bottom: 10px;

  @media screen and (max-width: 410px) {
    width: 100%;
  }

  .top {
    display: flex;
    background-color: #f5f6f7;
    width: 100%;
    padding: 8px 12px;

    .icon {
      padding: 5px;
      border-radius: 50%;
      background: #ffffff;

      img {
        border-radius: 50%;
        height: 24px;
        width: 24px;
      }
    }

    .title {
      font-size: 16px;
      margin: 0 8px;
      line-height: 34px;

      a {
        display: block;
        width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .bottom {
    padding: 8px 10px;
  }
}
</style>

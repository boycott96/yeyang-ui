<template>
  <TabUl :active-key="activeKey" :folders="folders" @update:active-key="updateActiveKey"
    @update:folders="updateFolders" />
  <div v-if="folders.length == 0">
    <a-result status="404" title="暂无数据" sub-title="无数据，请新建文件夹和新建导航标签.">
      <template #extra>
        <a-button type="primary">新建文件夹</a-button>
        <a-button type="primary">新建书签</a-button>
        <a-button type="primary" @click="importBrowser">导入浏览器标签</a-button>
      </template>
    </a-result>
  </div>
  <div v-else class="url-list" :class="{ 'first-view': folders.length > 0 ? activeKey == folders[0].id : false }">
    <OperationTab />
    <div class="content">
      <HightUrl :url-list="urlList" />
    </div>
  </div>
  <ExpandDrawer :visible="expandVisible" @close:drawer="closeExpand" />
</template>
<script>
import ExpandDrawer from '@/components/expand/ExpandDrawer.vue';
import TabUl from './TabUl.vue';
import { ref } from "vue";
import HightUrl from './HightUrl.vue';
import OperationTab from './OperationTab.vue';

export default {
  components: {
    TabUl,
    ExpandDrawer,
    HightUrl,
    OperationTab
  },
  setup() {
    const folders = ref([
      { id: 1, name: "搜索引擎1" },
      { id: 2, name: "搜索引擎2" },
    ]);
    const expandVisible = ref(false);
    const activeKey = ref(folders.value.length > 0 ? folders.value[0].id : undefined);
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
    ];
    function updateData(params, index) {
      urlList[index] = params
    }
    function updateActiveKey(e) {
      activeKey.value = e;
    }
    function updateFolders(arr) {
      folders.value = arr;
    }
    function importBrowser() {
      expandVisible.value = true;
    }
    function closeExpand() {
      expandVisible.value = false;
    }
    return {
      urlList, updateData, folders, activeKey,
      updateActiveKey, updateFolders, importBrowser, expandVisible, closeExpand
    };
  },
};
</script>
<style lang="less" scoped>
.url-list {
  background-color: #ffffff;
  border-radius: 8px 8px 0 0;
  padding: 16px 6px 6px 16px;
}

.url-list.first-view {
  border-top-left-radius: 0;
}
</style>

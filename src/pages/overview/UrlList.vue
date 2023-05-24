<template>
  <TabUl :active-key="activeKey" :folders="folders" @update:active-key="updateActiveKey"
    @update:folders="updateFolders" @add-folder="updateFolderVisible(true)"/>
  <div v-if="folders.length == 0" class="not-data">
    <a-result status="404" title="暂无数据" sub-title="无数据，请新建文件夹或通过PC端浏览器导入书签.">
      <template #extra>
        <a-button type="primary" @click="createFolder">
          <span class="icon">
            <svg-icon icon-class="folder" />
          </span>
          <span>新建文件夹</span>
        </a-button>
        <a-button type="primary" @click="createUrl">
          <span class="icon">
            <svg-icon icon-class="bookmark" />
          </span>
          <span>新建书签</span>
        </a-button>
        <a-button type="primary" @click="importBrowser">
          <span class="icon">
            <svg-icon icon-class="upload" />
          </span>
          <span>导入浏览器标签</span>
        </a-button>
      </template>
    </a-result>
  </div>
  <div v-else class="url-list" :class="{ 'first-view': folders.length > 0 ? activeKey == folders[0].id : false }">
    <OperationTab @add-website="onAddWebsite" />
    <div class="content">
      <HightUrl :url-list="urlList" />
    </div>
  </div>
  <UrlModal :visible="urlVisible" :title="urlTitle" @update-visible="updateUrlVisible" />
  <FolderModal :visible="folderVisible" :title="folderTitle" @update-visible="updateFolderVisible" />
  <ExpandDrawer :visible="expandVisible" @close:drawer="closeExpand" @load:bookmarks="loadBookmarks" />
  <BookmarksModal :visible="bookmarksVisible" :bookmarks="bookmarks" @update:visible="updateBookmarksModal" />
</template>
<script>
import ExpandDrawer from '@/components/expand/ExpandDrawer.vue';
import BookmarksModal from '@/components/modal/BookmarksModal.vue';
import FolderModal from '@/components/modal/FolderModal.vue';
import UrlModal from '@/components/modal/UrlModal.vue';
import TabUl from './TabUl.vue';
import { ref } from "vue";
import HightUrl from './HightUrl.vue';
import OperationTab from './OperationTab.vue';
import { listFolder } from '@/api/folder';
import { message } from 'ant-design-vue';
export default {
  components: {
    ExpandDrawer, BookmarksModal, FolderModal, UrlModal, TabUl, HightUrl, OperationTab
  },
  setup() {
    const folderTitle = ref('新建文件夹');
    const folderVisible = ref(false);
    const urlTitle = ref('新建书签');
    const urlVisible = ref(false);

    const folders = ref([]);
    const expandVisible = ref(false);
    const activeKey = ref(folders.value.length > 0 ? folders.value[0].id : undefined);
    const urlList = [];
    const bookmarksVisible = ref(false);
    const bookmarks = ref([]);
    initData();
    function initData() {
      listFolder().then(res => {
        folders.value = res.data;
        updateActiveKey(folders.value[0].id);
      }).catch(error => {
        message.error(error.response.data.message);
      })
    }
    function updateActiveKey(e) {
      console.log(e);
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
    function loadBookmarks(val) {
      bookmarksVisible.value = true;
      bookmarks.value = val;
    }
    function updateBookmarksModal(e) {
      console.log(e);
      bookmarksVisible.value = e;
    }
    function createFolder() {
      folderVisible.value = true;
    }
    function createUrl() {
      urlVisible.value = true;
    }
    function updateFolderVisible(e) {
      initData();
      folderVisible.value = e;
    }
    function updateUrlVisible(e) {
      urlVisible.value = e;
    }
    function onAddWebsite() {
      urlVisible.value = true;
    }
    return {
      // 参数
      folderTitle,
      urlTitle,
      urlList,
      activeKey,
      folders,
      urlVisible,
      folderVisible,
      expandVisible,
      bookmarksVisible,
      bookmarks,

      // 方法
      updateActiveKey,
      updateFolders,
      importBrowser,
      closeExpand,
      loadBookmarks,
      updateBookmarksModal,
      createFolder,
      createUrl,
      updateFolderVisible,
      updateUrlVisible,
      onAddWebsite
    }
  }
}

</script >
<style lang="less" scoped>
.not-data {
  .icon {
    margin-right: 4px;

    .svg-icon {
      width: 16px;
      height: 16px;
    }
  }

  .ant-btn {
    @media screen and (max-width: 518px) {
      margin-bottom: 10px;
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
</style>

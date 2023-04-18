<template>
  <div class="overview">
    <div class="yy-row view">
      <div v-if="likeUrlList.length > 0" class="view-left">
        <div class="used-website">
          <a-tag v-for="(item, index) in likeUrlList" :key="index" class="tag" color="#55acee">
            <template #icon>
              <img height="11" :src="item.favicon" />
            </template>
            {{ item.name }}
          </a-tag>
        </div>
      </div>
      <div class="view-right" :style="{ width: likeUrlList.length > 0 ? 'calc(100% - 350px)' : '100%' }">
        <UrlList />
      </div>
    </div>
  </div>
  <UrlModal :visible="urlVisible" :title="urlTitle" @update:visible="updateUrlVisible" />
  <FolderModal :visible="folderVisible" :title="folderTitle" @update:visible="updateFolderVisible" />
</template>
<script>
import FolderModal from "@/components/modal/FolderModal.vue";
import UrlModal from "@/components/modal/UrlModal.vue";
import { ref } from "vue";
import UrlList from "./UrlList.vue";

export default {
  components: { UrlList, UrlModal, FolderModal },
  setup() {
    const likeUrlList = ref([
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
    ]);
    const urlVisible = ref(false);
    const urlTitle = ref('新建书签');
    const folderVisible = ref(false);
    const folderTitle = ref('新建文件夹');

    function updateUrlVisible(e) {
      urlVisible.value = e;
    }
    function addUrlClick() {
      urlVisible.value = true;
    }
    function updateFolderVisible(e) {
      folderVisible.value = e;
    }
    function addFolderClick() {
      folderVisible.value = true;
      folderTitle.value = '新建文件夹';
    }
    return {
      likeUrlList,
      urlVisible, urlTitle, updateUrlVisible, addUrlClick,
      folderVisible, updateFolderVisible, addFolderClick, folderTitle
    };
  },
};
</script>
<style lang="less">
.overview {
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    padding: 0 20px;

    .yy-row.view {
      display: block;
    }
  }

  .view-left {
    width: 350px;

    .yy-avatar {
      margin-left: 20px;
    }

    @media screen and (max-width: 1024px) {
      padding-top: 0;
      width: 100%;

      .yy-avatar {
        display: none;
      }
    }

    .used-website {
      background: #fff;
      padding: 12px;
      height: 100%;

      .tag {
        margin-bottom: 8px;
        cursor: pointer;
      }
    }
  }

  .view-right {
    padding: 0 16px;
    padding-top: 12px;

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }
}
</style>

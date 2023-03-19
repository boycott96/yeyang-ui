<template>
  <div class="overview">
    <div class="yy-row view">
      <OperationBar class="operation-top" />
      <div class="view-left">
        <!-- 头像 -->
        <a-avatar class="yy-avatar" :size="256">huaisun </a-avatar>
        <div class="used-website">
          <a-tag v-for="(item, index) in likeUrlList" :key="index" class="tag" color="#55acee">
            <template #icon>
              <img height="11" :src="item.favicon" />
            </template>
            {{ item.name }}
          </a-tag>
        </div>
      </div>
      <div class="view-right">
        <OperationBar class="operation" />
        <UrlList />
      </div>
    </div>
  </div>
</template>
<script>
import OperationBar from "@/components/OperationBar.vue";
import { ref } from "vue";
import UrlList from "./UrlList.vue";

export default {
  components: { UrlList, OperationBar },
  setup() {
    const likeUrlList = ref([
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
      { name: '百度', url: 'https://www.baidu.com', favicon: 'https://www.baidu.com/favicon.ico' },
    ]);

    const change = (affixed) => {
      console.log(affixed);
    };

    return { likeUrlList, change };
  },
};
</script>
<style lang="less">
.overview {
  max-width: 1280px;
  margin: 0 auto;
  .view {
    .operation-top {
      display: none;
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 0 10px 0 20px;

    .yy-row.view {
      display: block;
      .operation-top {
        display: block;
        margin-bottom: 10px;
      }
    }
  }

  .view-left {
    padding-top: 24px;
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
      padding-top: 16px;

      .tag {
        margin-bottom: 8px;
        cursor: pointer;
      }
    }
  }

  .view-right {
    width: calc(100% - 350px);
    padding-top: 16px;

    .operation {
      margin-bottom: 10px;
    }
    @media screen and (max-width: 1024px) {
      width: 100%;
      .operation {
        display: none;
      }
    }
  }
}
</style>

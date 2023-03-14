<template>
  <div class="overview">
    <a-row type="flex" justify="center">
      <a-col :span="8">
        <div class="view-left">
          <!-- 头像 -->
          <a-avatar :size="256">huaisun </a-avatar>
          <div class="used-website">
            <a-tag class="tag" color="#55acee">
              <template #icon>
                <img height="11" src="https://www.baidu.com/favicon.ico" />
              </template>
              百度
            </a-tag>
          </div>
        </div>
      </a-col>
      <a-col :span="16">
        <div class="view-right">
          <UrlList />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ref } from "vue";
import UrlList from "./UrlList.vue";

export default {
  components: { UrlList },
  setup() {
    const activeKey = ref("1");
    const likes = ref(0);
    const dislikes = ref(0);
    const action = ref("");

    const like = () => {
      likes.value = 1;
      dislikes.value = 0;
      action.value = "liked";
    };

    const dislike = () => {
      likes.value = 0;
      dislikes.value = 1;
      action.value = "disliked";
      console.log(action);
    };
    return { activeKey, likes, dislikes, like, dislike };
  },
};
</script>
<style lang="less">
.overview {
  width: 1280px;
  margin: 0 auto;
  .view-left {
    padding-top: 24px;
    .used-website {
      padding-top: 16px;
      .tag {
        margin-bottom: 8px;
        cursor: pointer;
      }
    }
  }
  .view-right {
    padding-top: 16px;
  }
}
</style>

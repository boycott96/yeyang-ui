<template>
  <a-input-search v-model:value="searchValue" placeholder="请输入搜索内容" class="top-search" :class="{ large: isSearch }"
    @search="onSearch" @focus="focus" @blur="blur" />
  <div class="mobile-search" @click="searchClick()">
    <svg-icon icon-class="search" />
  </div>
  <a-drawer ref="searchDrawer" height="80px" placement="top" :closable="false" :visible="visible" @close="visible = false"
    forceRender>
    <a-input-search ref="mobileSearch" v-model:value="searchValue" placeholder="请输入搜索内容" enter-button
      @search="onSearch" />
  </a-drawer>
</template>
<script>
import { ref, nextTick } from "vue";
import { focusAndOpenKeyboard } from '@/utils/common'

export default {
  setup() {
    /**
     * 变量
     */
    let searchValue = ref("");
    let isSearch = ref(false);
    let visible = ref(false);
    let mobileSearch = ref(null);

    /**
     * 事件触发
     */
    // 聚焦
    const focus = () => {
      isSearch.value = true;
    };
    // 失焦
    const blur = () => {
      isSearch.value = false;
    };
    // 搜索
    const onSearch = () => {
      console.log(121);
    };
    const searchClick = () => {
      visible.value = true;
      nextTick(() => {
        focusAndOpenKeyboard(mobileSearch.value, 300);
      })
    };

    return {
      searchValue,
      focus,
      isSearch,
      onSearch,
      blur,
      visible,
      searchClick,
      mobileSearch,
    };
  },
};
</script>
<style lang="less">
.top-search {
  display: block;
  align-items: center;
  transition: width .3s ease 0s;
  width: 200px;
}

.mobile-search {
  display: none;
  color: #ffffff;
}

.mobile-search:hover {
  color: #ffffff;
}

@media screen and (min-width: 768px) {
  .top-search.large {
    width: 400px;
  }
}

@media screen and (max-width: 420px) {
  .top-search {
    display: none;
  }

  .mobile-search {
    display: flex;
    justify-items: center;
  }
}
</style>

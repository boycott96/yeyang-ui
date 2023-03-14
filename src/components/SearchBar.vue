<template>
  <a-input-search
    v-model:value="searchValue"
    placeholder="请输入搜索内容"
    class="top-search"
    :class="{ normal: !isSearch, large: isSearch }"
    @search="onSearch"
    @focus="focus"
    @blur="blur"
  />
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    /**
     * 变量
     */
    let searchValue = ref("");
    let isSearch = ref(false);

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
    return {
      searchValue,
      focus,
      isSearch,
      onSearch,
      blur,
    };
  },
};
</script>
<style lang="less">
.top-search{
  display: block;
  align-items: center;
  transition: width .3s ease 0s;
}
.top-search.normal {
  width: 200px;
}

.top-search.large {
  width: 400px;
}
</style>

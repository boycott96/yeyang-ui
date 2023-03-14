<template>
  <a-result status="404" title="404" sub-title="对不起，您访问的页面不存在。">
    <template #extra>
      <a-button type="primary" @click="backHome">返回首页</a-button>
    </template>
  </a-result>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const backHome = () => {
      router.push("/" + "huaisun");
    };
    return {
      backHome,
    };
  },
};
</script>

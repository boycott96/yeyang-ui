<template>
  <a-layout>
    <a-layout-header class="yeyang-top">
      <yy-header />
    </a-layout-header>
    <a-layout-content class="yeyang-content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>
<script lang="js">
import YyHeader from './YyHeader.vue';

export default {
  components: {
    YyHeader
  }
};
</script>
<style lang="less">
.yeyang-top {
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: #24292f;

  @media screen and (max-width: 420px) {
    padding: 0 16px !important;
  }
}

.yeyang-content {
  margin-top: 64px;
  background-color: #fff;
}
</style>

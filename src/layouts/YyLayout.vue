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
<style>
.yeyang-top {
  background-color: #24292f;
}
.yeyang-content {
  background-color: #fff;
}
</style>

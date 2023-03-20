<template>
  <div class="operation-bar">
    <a-affix :offset-top="80">
      <a-dropdown-button @click="addUrl">
        新建书签
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1">
              新建文件夹
            </a-menu-item>
          </a-menu>
        </template>
        <template #icon>
          <svg-icon icon-class="arrow" />
        </template>
      </a-dropdown-button>
    </a-affix>
  </div>
</template>
<script>
export default {
  emits: ['add:url', 'add:folder'],
  setup(props, context) {
    function addUrl() {
      context.emit('add:url');
    }
    function handleMenuClick(e) {
      if (e.key === '1') {
        context.emit('add:folder');
      }
    }
    return {
      addUrl,
      handleMenuClick,
    };
  },
};
</script>
<style lang="less" scoped>
.operation-bar {
  text-align: right;

  .svg-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
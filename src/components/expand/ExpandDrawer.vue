<template>
  <a-drawer title="导入书签说明" placement="right" size="large" :visible="visible" @close="onClose">
    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
      <a-button type="primary" @click="onClose">提交</a-button>
    </template>
    <BrowserExpand />
  </a-drawer>
</template>
<script>
import BrowserExpand from './BrowserExpand.vue';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    function onClose() {
      ctx.emit("close:drawer");
    }
    return { onClose };
  },
  components: { BrowserExpand }
}
</script>
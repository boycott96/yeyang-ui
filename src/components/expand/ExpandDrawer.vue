<template>
  <a-drawer title="导入书签说明" placement="right" :size="size" :visible="visible" @close="onClose">
    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
    </template>
    <BrowserExpand :size="size" @load:bookmarks="loadBookmarks" />
  </a-drawer>
</template>
<script>
import { getScreenWidth } from '@/utils/common';
import BrowserExpand from './BrowserExpand.vue';
import { ref } from 'vue'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(_props, ctx) {
    const size = ref('large');
    initSize();
    function initSize() {
      if (getScreenWidth() < 736) {
        size.value = 'default';
      }
    }

    function onClose() {
      ctx.emit("close:drawer");
    }
    function loadBookmarks(bookmarks) {
      onClose();
      ctx.emit('load:bookmarks', bookmarks)
    }
    return { onClose, size, loadBookmarks };
  },
  components: { BrowserExpand }
}
</script>
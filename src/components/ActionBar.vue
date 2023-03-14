<template>
  <div class="action-bar">
    <template v-for="(item, index) in actionBar" :key="index">
      <a-button type="link" @click="triggerClick(item)" :class="['yy-icon', { 'is-active': item.active === 1 }]">
        <svg-icon :icon-class="item.icon"></svg-icon>
        <span>{{ item.value }}</span>
      </a-button>
    </template>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  components: {},
  props: ['data'],
  emits: ['update:data'],
  setup(props, context) {
    const actionBar = ref([
      { icon: 'thumb-up', fieldCode: 'like', ...props.data.like },
      { icon: 'comment', fieldCode: 'comment', ...props.data.comment },
      { icon: 'share', fieldCode: 'share', ...props.data.share },
      { icon: 'star', fieldCode: 'star', ...props.data.star }
    ]);
    const triggerClick = (data) => {
      if (data.active === 0) {
        data.active = 1;
        data.value += 1;
      } else {
        data.active = 0;
        data.value -= 1;
      }
      context.emit('update:data', data)
    }
    return { actionBar, triggerClick };
  },
};
</script>
<style lang="less">
.action-bar {
  text-align: right;

  .yy-icon {
    color: #dee0e3;
    padding: 4px 8px;

    .svg-icon {
      width: 14px;
      height: 14px;
    }
  }

  .yy-icon.is-active {
    color: #1890ff;
  }
}
</style>
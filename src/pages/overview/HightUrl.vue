<template>
  <a-list item-layout="vertical" size="large" :data-source="urlList">
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <div>
            <span><svg-icon icon-class="thumb-up" />100</span>
          </div>
          <div>
            <span><svg-icon icon-class="lightning" />200</span>
          </div>
          <div>
            <span><svg-icon icon-class="comment" />300</span>
          </div>
        </template>
        <template #extra>
          <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="item.url">{{ item.name }}</a>
          </template>
          <template #avatar><a-avatar :src="item.favicon" /></template>
        </a-list-item-meta>
        {{ item.url }}
      </a-list-item>
    </template>
  </a-list>
</template>
<script>
export default {
  props: {
    urlList: {
      type: Array,
      default: undefined
    }
  },
  setup() {

  }
}
</script>
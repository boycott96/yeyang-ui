<template>
  <a-tabs v-model:activeKey="activeKey" type="editable-card" :tab-position="mode" @tabScroll="callback"
    @edit="editFolder">
    <a-tab-pane v-for="item in folders" :key="item.id" :tab="item.name">
      <div class="yy-row">
        <template v-for="(item, index) in urlList" :key="index">
          <div class="url-card">
            <div class="top">
              <div class="icon">
                <img :src="item.url + `/favicon.ico`" />
              </div>
              <a-divider />
              <div class="title">
                <a :href="item.url" target="_blank">{{ item.name }}({{ item.url }})</a>
              </div>
            </div>
            <div class="bottom">
              <ActionBar :data="item" @update:data="updateData($event, index)" />
            </div>
          </div>
        </template>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import ActionBar from "@/components/ActionBar.vue";
import { ref } from "vue";

export default {
  components: {
    ActionBar,
  },
  setup() {
    const folders = ref([{ id: 1, name: '搜索引擎' }]);
    const urlList = [
      {
        name: "百度",
        url: "https://www.baidu.com",
        like: { value: 9898, active: 0 },
        share: { value: 91, active: 0 },
        star: { value: 675, active: 1 },
        comment: { value: 898, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
      {
        name: "必应",
        url: "https://www.bing.com",
        like: { value: 1000, active: 0 },
        share: { value: 100, active: 0 },
        star: { value: 10, active: 1 },
        comment: { value: 1, active: 1 },
      },
    ];
    const activeKey = ref(folders.value[0].id);
    function updateData(params, index) {
      urlList[index] = params
    }
    function editFolder(targetKey, action) {
      if (action === 'add') {
        folders.value.push({ id: 2, name: '搜索引擎2' })
      } else {
        remove(targetKey);
      }
    }
    function remove(targetKey) {
      let lastIndex = 0;
      folders.value.forEach((item, i) => {
        if (item.id === targetKey) {
          lastIndex = i - 1;
        }
      });
      folders.value = folders.value.filter(item => item.id !== targetKey);
      if (folders.value.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
          activeKey.value = folders.value[lastIndex].id;
        } else {
          activeKey.value = folders.value[0].id;
        }
      }
    }

    return { folders, urlList, updateData, editFolder, remove };
  },
};
</script>
<style lang="less">
.url-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 274px;
  text-indent: 0;
  max-height: 148px;
  max-width: 100%;
  overflow: hidden;
  border-radius: 8px;
  font-weight: 400;
  border: 1px solid #dee0e3;
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
  margin-right: 10px;
  margin-bottom: 10px;

  .top {
    display: flex;
    background-color: #f5f6f7;
    width: 100%;
    padding: 8px 12px;

    .icon {
      padding: 5px;
      border-radius: 50%;
      background: #ffffff;

      img {
        border-radius: 50%;
        height: 24px;
        width: 24px;
      }
    }

    .title {
      font-size: 16px;
      margin: 0 8px;
      line-height: 34px;

      a {
        display: block;
        width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .bottom {
    padding: 8px 10px;
  }
}
</style>

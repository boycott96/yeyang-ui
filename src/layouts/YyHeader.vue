<template>
  <div class="header">
    <div>
      <a-space>
        <SearchBar />
        <a-menu
          v-model:selectedKeys="current"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
          @select="selectMenu"
        >
          <a-menu-item v-for="item in menus" :key="item.key">
            <template #icon>
              <icon-font :type="`icon-` + item.icon" />
            </template>
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-space>
    </div>
    <div>
      <a-dropdown trigger="click">
        <a-space @click.prevent class="yy-avatar">
          <a-avatar size="32"> huaisun </a-avatar>
          <icon-font class="icon" type="icon-arrow" />
        </a-space>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0"> 个人主页 </a-menu-item>
            <a-menu-item key="1"> 修改资料 </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="2"> 退出登录 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
import SearchBar from "@/components/SearchBar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const menus = [
      { name: "首页", key: "overview", icon: "book" },
      { name: "发现", key: "explore", icon: "rocket" },
    ];
    const current = ref(["overview"]);
    const selectMenu = (data) => {
      if (data.key === "overview") {
        router.push("/" + "huaisun");
      } else {
        router.push("/" + data.key);
      }
    };
    return {
      menus,
      current,
      selectMenu,
    };
  },
  components: { SearchBar },
};
</script>

<style lang="less">
.header {
  display: flex;
  justify-content: space-between;
  .ant-menu.ant-menu-dark {
    background-color: #24292f;
    .ant-menu-item {
      font-weight: 900;
      color: white;
    }
    .ant-menu-item-selected {
      background-color: unset;
      span {
        color: #ff9800;
      }
    }
  }

  .ant-menu-horizontal > .ant-menu-item:hover {
    background-color: unset;
    color: #ffffffb3;
  }
  .yy-avatar {
    cursor: pointer;
    .icon {
      color: #ffffff;
      font-size: 12px;
    }
  }

  .yy-avatar:hover {
    .icon {
      color: #ffffffb3;
    }
  }
}
</style>

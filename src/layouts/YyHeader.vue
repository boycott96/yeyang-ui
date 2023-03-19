<template>
  <div class="header">
    <div class="top-left">
      <a-space>
        <SearchBar />
        <a-menu v-model:selectedKeys="current" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }"
          @select="selectMenu">
          <a-menu-item v-for="item in menus" :key="item.key">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-space>
    </div>
    <div class="top-right">
      <a-dropdown trigger="click" placement="bottomRight">
        <a-space @click.prevent class="yy-avatar">
          <a-avatar size="32"> huaisun </a-avatar>
          <div class="yy-arrow">
            <svg-icon icon-class="arrow" />
          </div>
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
      { name: "首页", key: "overview", icon: "overview" },
      { name: "发现", key: "explore", icon: "explore" },
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

<style lang="less" scoped>
.header {
  height: 64px;
  display: flex;

  .top-left {
    width: calc(100% - 60px);

    :deep(.ant-space) {
      width: 100%;

      .ant-space-item:nth-child(2) {
        width: 100%;
      }
    }

    :deep(.ant-menu.ant-menu-dark) {
      background-color: #24292f;

      .ant-menu-overflow {
        overflow: hidden;
      }

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

    :deep(.ant-menu-horizontal>.ant-menu-item:hover) {
      background-color: unset;
      color: #ffffffb3;
    }

  }

  .top-right {
    display: flex;

    .url-add {
      justify-items: center;
      margin-right: 10px;
      margin-top: 3px;

      .svg-icon {
        color: #ffffff;
      }
    }

    .yy-avatar {
      cursor: pointer;
    }

    .yy-avatar:hover {
      .svg-icon {
        color: #ffffffb3;
      }
    }

    .yy-arrow {
      display: flex;
      justify-items: center;
      cursor: pointer;

      .svg-icon {
        color: #ffffff;
        font-size: 12px;
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>

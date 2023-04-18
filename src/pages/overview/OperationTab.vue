<template>
  <div class="operate-tab">
    <div class="group">
      <div class="primary text-button">
        <span class="universe-icon"><svg-icon icon-class="add-circle" /></span>
        <span class="text">添加记录</span>
      </div>
    </div>
    <div class="group">
      <div class="button-row">
        <div class="text-button">
          <span class="universe-icon"><svg-icon icon-class="filter" /></span>
          <span class="text">筛选</span>
        </div>
        <div class="text-button">
          <span class="universe-icon"><svg-icon icon-class="layout" /></span>
          <span class="text">布局</span>
        </div>
      </div>
    </div>
    <div class="group">
      <div class="button-row">
        <div class="text-button">
          <span class="universe-icon"><svg-icon icon-class="thumb-up" /></span>
          <span class="text">1000</span>
        </div>
        <div class="text-button">
          <span class="universe-icon"><svg-icon icon-class="star" /></span>
          <span class="text">1000</span>
        </div>
        <div class="text-button">
          <span class="universe-icon"><svg-icon icon-class="share" /></span>
          <span class="text">1000</span>
        </div>
        <div class="text-button">
          <span class="universe-icon"><svg-icon icon-class="comment" /></span>
          <span class="text">1000</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {

  }
}
</script>
<style lang="less" scoped>
.operate-tab {
  display: flex;

  .group+.group::before {
    background-color: rgba(31, 35, 41, 0.15);
    content: "";
    height: 16px;
    width: 1px;
    margin-top: 4px;
  }

  .group {
    display: flex;

    .universe-icon {
      padding: 4px;
    }

    .text-button {
      border-radius: 6px;
      height: auto;
      line-height: 24px;
      margin-right: 0;
      padding: 0;
      height: 24px;
      cursor: pointer;

      .text {
        padding-right: 4px;
      }
    }

    .text-button+.text-button {
      margin-left: 12px;
    }

    .text-button:hover {
      background-color: rgba(31, 35, 41, 0.08);
    }

    .svg-icon {
      width: 16px;
      height: 16px;
      color: #646a73;
    }

    .primary {
      color: #3370ff !important;

      .svg-icon {
        color: #3370ff !important;
      }
    }

    .button-row {
      display: flex;
      margin-left: 12px;
    }
  }

  .group+.group {
    margin-left: 12px;
  }
}
</style>
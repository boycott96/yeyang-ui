<template>
  <div class="sign-left">
    <div class="title">{{ title }}</div>
    <div class="root">
      <span class="wrapper">
        <img src="../../assets/images/illustration_dashboard.png" />
      </span>
    </div>
    <div class="left-backgroud"></div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "椰羊"
    }
  }
}
</script>
<style lang="less" scoped>
.sign-left {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 1020px) {
    display: none;
  }

  .left-backgroud {
    top: 0px;
    left: 0px;
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    transform: scaleX(-1);
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)) center center / cover no-repeat, url(../../assets/images/overlay_2.jpeg);
    background-repeat: no-repeat;
    background-position: center center;
  }

  .title {
    font-size: 2rem;
    margin: 0px 0px 80px;
    font-weight: 700;
    line-height: 1.5;
    font-size: 1.5rem;
    font-family: "Public Sans", sans-serif;
    max-width: 480px;
    text-align: center;
  }

  .root {
    line-height: 1;
    display: block;
    overflow: hidden;
    position: relative;
    max-width: 720px;

    .wrapper {
      color: transparent;
      display: inline-block;
      width: 100%;
      height: 100%;
      background-size: cover !important;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
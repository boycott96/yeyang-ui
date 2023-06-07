<template>
  <div>
    <p v-for="i in 36" :key="i"></p>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup() { },
};
</script>
<style lang="less" scoped>
body {
  background: #292b37;
}

div {
  position: relative;
  width: 70px;
  height: 34px;
  margin: 50px auto;
  transform: scale(1.3);
}

@time: 1.5s;
.path {
  offset-path: path('M67.3,17.8c0-9.3-4.8-14.5-13.8-14.5C41.9,3.2,35.7,17,35.7,17s-6.2,13.8-17.8,13.8C10,30.8,4,25.5,4,17.7 C4, 9.6, 10, 3.2, 17.8, 3.2C29.4, 3.2, 35.7, 17, 35.7, 17s6.2, 13.8, 17.8, 13.8C61.4, 30.8, 67.3, 24.8, 67.3, 17.8z');
  position: absolute;
}

span {
  color: #fff;
  font-size: 12px;
  animation: path 1.4s linear infinite;
  &:extend(.path);
}

p {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  opacity: 0;
  motion-rotation: auto 45deg; // reverse
  background: #fff;
  animation: path 1.4s linear infinite, dot linear forwards;
  &:extend(.path);
  .generate-styles();
}

.generate-styles() {
  .looping(@i) when (@i > 0) {
    &:nth-of-type(@{i}) {
      @color: (unit((@i - 1) * 10, deg) * 1);
      background: hsl(@color, 50%, 50%);
      animation-delay: (@time / 100 * @i);
    }
    .looping(@i - 1);
  }
  .looping(35);
}

@keyframes path {
  to {
    offset-distance: 100%;
  }
}

@keyframes dot {
  to {
    opacity: 1;
  }
}

@supports not (offset-rotate: 0deg) {
  body:before {
    content: 'Sorry! your browser does not support this feature!';
    background: #dc3b3b;
    padding: 10px 0;
    text-align: center;
    display: block;
    color: #fff;
  }
}
</style>
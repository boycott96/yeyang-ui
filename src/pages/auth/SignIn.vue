<template>
  <div class="sign">
    <SignLeft title="主人，欢迎回家！"/>
    <div class="sign-right">
      <div class="form">
        <div class="title">登录</div>
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item name="username" :rules="[{ required: true, message: '请输入您的账号!' }]">
            <a-input placeholder="账号" v-model:value="formState.username" />
          </a-form-item>
          <a-form-item name="password" :rules="[{ required: true, message: '请输入您的密码!' }]">
            <a-input-password placeholder="密码" v-model:value="formState.password" />
          </a-form-item>
          <a-form-item name="remember">
            <a-checkbox v-model:checked="formState.remember">保持登录</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button style="width: 100%" type="primary" html-type="submit">登 录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';
import SignLeft from './SignLeft.vue';


export default {
    setup() {
        const formState = reactive({
            username: "",
            password: "",
            remember: true,
        });
        const onFinish = (values) => {
            console.log("Success:", values);
        };
        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };
        return {
            formState,
            onFinish,
            onFinishFailed,
            labelCol: { style: { width: "1px" } },
        };
    },
    components: { SignLeft }
};
</script>
<style lang="less" scoped>
.sign {
  height: 100%;
  display: flex;
  position: relative;

  .sign-right {
    width: 480px;
    margin: auto;
    display: flex;
    min-height: 100vh;
    justify-content: center;

    .form {
      width: 100%;
      padding: 240px 64px 0px;

      .title {
        font-weight: 700;
        line-height: 1.5;
        font-size: 1.25rem;
        font-family: "Public Sans", sans-serif;
        margin-bottom: 40px;
      }
    }
  }
}
</style>

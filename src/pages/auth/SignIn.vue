<template>
  <div class="sign">
    <SignLeft title="主人，欢迎回家！" />
    <div class="sign-right">
      <div class="form">
        <div class="title">登录</div>
        <div class="subtitle">
          <span class="desc">新用户？</span>
          <router-link class="add" to="/register">创建一个账号</router-link>
        </div>
        <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item name="username" :rules="[{ required: true, message: '请输入您的账号!' }]">
            <a-input placeholder="账号" v-model:value="formState.username" />
          </a-form-item>
          <a-form-item name="password" :rules="[{ required: true, message: '请输入您的密码!' }]">
            <a-input-password placeholder="密码" v-model:value="formState.password" />
          </a-form-item>
          <a-form-item name="remember">
            <a-checkbox v-model:checked="formState.remember">保持15天内免登录</a-checkbox>
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
import { login, getUserInfo } from '@/api/auth'
import md5 from 'md5';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

export default {
  setup() {
    const formState = reactive({
      username: "",
      password: "",
      remember: true,
    });
    const router = useRouter();

    initAccount();
    function initAccount() {
      if (Cookies.get('Authorization')) {
        getUserInfo().then(res => {
          router.push('/' + res.data.username);
        })
      }
    }

    const onFinish = (values) => {
      const data = {
        username: values.username,
        password: md5(values.password),
      }
      login(data).then(res => {
        if (res.code === 200) {
          if (values.remember) {
            Cookies.set('Authorization', res.data.accessToken, { expires: 15 });
          } else {
            Cookies.remove('Authorization');
          }
          const user = res.data.user;
          if (user) {
            router.push('/' + user.username);
          }
        }
      }).catch(error => {
        if (error.response.status === 412) {
          message.error(error.response.data.message);
        }
      })
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
      }

      .subtitle {
        margin-top: 16px;
        margin-bottom: 40px;

        .desc {
          margin: 0px;
          line-height: 1.57143;
          font-size: 0.875rem;
          font-family: "Public Sans", sans-serif;
          font-weight: 400;
        }

        .add {
          margin-left: 4px;
          font-weight: 600;
          line-height: 1.57143;
          font-size: 0.875rem;
          font-family: "Public Sans", sans-serif;
          color: rgb(0, 171, 85);
          text-decoration: none;
          cursor: pointer;
        }

        .add:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

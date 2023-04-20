<template>
  <div class="verify">
    <div class="code-card">
      <div class="title">
        <span class="text">查看邮箱中的验证码</span>
        <router-link class="button" to="/register">>>返回注册</router-link>
      </div>
      <div class="subtitle">
        <span>当前邮箱:</span>
        <span style="margin-left: 4px">{{ route.query.email }}</span>
      </div>
      <a-form :model="form" :rules="rules">
        <a-form-item name="verifyCode">
          <a-input v-model:value="form.verifyCode" placeholder="输入6位验证码" :maxlength="6" />
        </a-form-item>
      </a-form>
      <div class="footer">
        <span class="button" @click="resendCode()">未收到验证码？重新发送</span>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { verify, resend } from '@/api/auth';
import { message } from 'ant-design-vue';

export default {
  setup() {
    const form = reactive({
      verifyCode: '',
    })
    const route = useRoute();
    const router = useRouter();
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validateCode = async (rule, value) => {
      console.log(value.length);
      if (value === '') {
        return Promise.reject('请输入邮件中的验证码!')
      } else if (value.length === 6) {
        await verify({ email: route.query.email, verifyCode: value }).then(res => {
          if (res.data.code === 200) {
            message.success('注册成功');
            router.push('/login');
            return Promise.resolve();
          }
        }).catch(error => {
          if (error.response.data != null) {
            return Promise.reject(error.response.data.message);
          }
        })
      }
    }

    const rules = {
      verifyCode: [
        { required: true, validator: validateCode, trigger: 'change' }
      ]
    }
    function resendCode() {
      const email = route.query.email;
      if (new String(email).toLowerCase().match(emailReg)) {
        resend({ email }).then(() => {
          message.success("已发送，请查收!");
        }).catch(res => {
          message.error(res.response.data.message + ". 3秒后自动跳转注册页面");
          setTimeout(() => {
            router.push('/register')
          }, 3000);
        })
      }
    }

    return { form, route, resendCode, rules }
  },
};
</script>
<style lang="less" scoped>
.verify {
  background-color: #fafafc;
  min-height: 100vh;
  display: flex;

  .code-card {
    background: #fff;
    margin: auto;
    width: 570px;
    box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
    border-radius: 10px;
    padding: 35px;

    .footer,
    .title {
      .button {
        margin-left: 4px;
        font-weight: 600;
        line-height: 1.57143;
        font-size: 0.875rem;
        font-family: "Public Sans", sans-serif;
        color: rgb(0, 171, 85);
        text-decoration: none;
        cursor: pointer;
      }

      .button:hover {
        text-decoration: underline;
      }
    }

    .footer {
      margin-top: 12px;
      text-align: right;
    }

    .title {
      font-weight: 600;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;

      span {
        display: block;
      }
    }

    .subtitle {
      margin-bottom: 20px;
      color: rgba(31, 45, 54, 0.3)
    }
  }
}
</style>
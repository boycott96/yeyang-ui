<template>
  <div class="sign">
    <SignLeft title="" />
    <div class="sign-right">
      <div class="form">
        <div class="title">注册</div>
        <div class="subtitle">
          <span class="desc">已有账号?</span>
          <router-link class="add" to="/login">进行登录</router-link>
        </div>
        <a-form ref="registerForm" :model="formState" name="basic" autocomplete="off" @finish="onFinish"
          :rules="rulesRef">
          <a-form-item name="email">
            <a-input placeholder="邮箱" v-model:value="formState.email" />
          </a-form-item>
          <a-form-item name="username">
            <a-input placeholder="用户名" v-model:value="formState.username" />
          </a-form-item>
          <a-form-item name="password">
            <a-input-password placeholder="请输入密码" v-model:value="formState.password" />
          </a-form-item>
          <a-form-item name="repassword">
            <a-input-password placeholder="请再次输入密码" v-model:value="formState.repassword" />
          </a-form-item>
          <a-form-item>
            <a-button style="width: 100%" type="primary" html-type="submit" :loading="registerLoading">注 册</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import SignLeft from "./SignLeft.vue";
import { Form, message } from 'ant-design-vue';
import md5 from 'md5'
import { register, checkUnique } from '@/api/auth';
import { useRouter } from "vue-router";

const useForm = Form.useForm;
export default {
  setup() {
    const registerForm = ref();
    const formState = reactive({
      email: "",
      username: "",
      password: "",
      repassword: "",
    });
    const notUsername = ['register', 'login'];
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validateEmail = async (_rule, value) => {
      if (value != '') {
        if (!String(value).toLowerCase().match(emailReg)) {
          return Promise.reject('邮箱格式错误');
        } else {
          try {
            await checkUnique({ value, type: 1 });
            return Promise.resolve();
          } catch (error) {
            return Promise.reject(error.response.data.message);
          }
        }
      }
    }
    const validateUsername = async (_rule, value) => {
      if (value !== '') {
        if (value.length < 3 || value.length > 12) {
          return Promise.reject('用户名长度限制3-12位');
        }
        if (notUsername.indexOf(value) >= 0) {
          return Promise.reject('用户名不合法');
        } else {
          try {
            await checkUnique({ value, type: 2 });
            return Promise.resolve();
          } catch (error) {
            return Promise.reject(error.response.data.message);
          }
        }
      }
    }
    const validatePass = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请输入密码');
      } else {
        if (formState.repassword !== '') {
          registerForm.value.validateFields('repassword');
        }
        return Promise.resolve();
      }
    }
    const validateRePass = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请再次输入密码');
      } else if (value != formState.password) {
        return Promise.reject('两次密码输入不匹配');
      } else {
        return Promise.resolve();
      }
    }
    const rulesRef = reactive({
      email: [
        {
          required: true,
          validator: validateEmail,
          trigger: 'change'
        }
      ],
      username: [
        {
          required: true,
          message: '请输入用户名',
        },
        {
          min: 3,
          max: 12,
          message: '用户名长度限制3-12位',
          trigger: 'change'
        },
        {
          validator: validateUsername,
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          validator: validatePass,
          trigger: 'change'
        },
      ],
      repassword: [
        {
          validator: validateRePass,
          trigger: 'channge'
        }
      ],
    });
    const router = useRouter();
    const registerLoading = ref(false);
    const onFinish = (values) => {
      const data = {
        email: values.email,
        username: values.username,
        stageName: values.username,
        password: md5(values.password)
      }
      registerLoading.value = true;
      register(data).then(res => {
        if (res.code === 200) {
          registerLoading.value = false;
          router.push({
            path: "/verify/code", query: { email: data.email }
          });
        }
      }).catch(error => {
        message.error(error.response.data.message);
        registerLoading.value = false;
      })
    };
    const timeNum = ref(0);
    const { validateInfos } = useForm(formState, rulesRef);

    return {
      formState,
      onFinish,
      labelCol: { style: { width: "1px" } },
      timeNum,
      validateInfos,
      rulesRef,
      registerForm,
      registerLoading
    };
  },
  components: { SignLeft },
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

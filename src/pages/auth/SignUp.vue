<template>
  <div class="sign">
    <SignLeft title="使用Yy更有效的处理您的网址" />
    <div class="sign-right">
      <div class="form">
        <div class="title">注册</div>
        <a-form ref="registerForm" :model="formState" name="basic" autocomplete="off" @finish="onFinish"
          @finishFailed="onFinishFailed" :rules="rulesRef" @validate="validateForm">
          <a-form-item name="email">
            <a-input placeholder="请输入邮箱!" v-model:value="formState.email" />
          </a-form-item>
          <a-form-item name="username">
            <a-input placeholder="请输入账号!" v-model:value="formState.username" />
          </a-form-item>
          <a-form-item name="password">
            <a-input-password placeholder="请输入密码!" v-model:value="formState.password" />
          </a-form-item>
          <a-form-item name="repassword">
            <a-input-password placeholder="请重复输入密码!" v-model:value="formState.repassword" />
          </a-form-item>
          <a-form-item name="verificationCode">
            <a-input style="width: 120px" placeholder="请输入验证码!" v-model:value="formState.verificationCode" />
            <a-button style="margin-left: 20px" :disabled="timeNum != 0" type="primary" @click="sendCode()">
              <span v-if="timeNum != 0">{{ timeNum }}已发送</span>
              <span v-else>发送验证码</span>
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-button :disabled="isSubmit" style="width: 100%" type="primary" html-type="submit">注 册</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import SignLeft from "./SignLeft.vue";
import { Form } from 'ant-design-vue';

const useForm = Form.useForm;
export default {
  setup() {
    const registerForm = ref();
    const formState = reactive({
      email: "",
      username: "",
      password: "",
      repassword: "",
      verificationCode: ""
    });
    const rulesRef = reactive({
      email: [
        {
          required: true,
          message: '请输入邮箱',
          type: 'email'
        }
      ],
      username: [
        {
          required: true,
          message: '请输入账号',
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
        }
      ],
      repassword: [
        {
          required: true,
          message: '请重复输入密码',
        }
      ],
      verificationCode: [
        {
          required: true,
          message: '请输入验证码',
        }
      ],
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const timeNum = ref(0);
    let timer = null;
    const isSubmit = ref(true);
    const { validate, validateInfos } = useForm(formState, rulesRef);
    const sendCode = async () => {
      await registerForm.value.validateFields(['email']).then(() => {
        timeNum.value = 60;
        timer = setInterval(() => {
          if (timeNum.value > 0) {
            timeNum.value = timeNum.value - 1;
          } else {
            clearInterval(timer);
          }
        }, 1000);
      }).catch(() => { })
    }
    const validateForm = () => {
      validate().then(() => {
        isSubmit.value = false;
      }).catch(() => { })
    }

    return {
      formState,
      onFinish,
      onFinishFailed,
      labelCol: { style: { width: "1px" } },
      sendCode,
      timeNum,
      isSubmit,
      validateForm,
      validateInfos,
      rulesRef,
      registerForm
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
        margin-bottom: 40px;
      }
    }
  }
}
</style>

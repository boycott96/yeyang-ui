<template>
  <a-modal :visible="visible" @update:visible="updateVisible" :title="title" :confirm-loading="confirmLoading"
    @ok="handleOk" okText="确定" cancelText="取消">
    <a-form :modal="folderForm" name="folderForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="名称" name="name" :rules="[{ required: true, message: '请输入文件夹名称!' }]">
        <a-input v-model:value="folderForm.name" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { ref, reactive } from 'vue';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '文件夹'
    }
  },
  setup(props, context) {
    const confirmLoading = ref(false);
    const folderForm = reactive({
      name: '',
    })

    function handleOk() {
      confirmLoading.value = true;
      setTimeout(() => {
        confirmLoading.value = false;
      }, 2000);
    }
    function updateVisible(e) {
      context.emit('update:visible', e)
    }
    function onFinish(values) {
      console.log(values);
    }
    function onFinishFailed(errorInfo) {
      console.log(errorInfo);
    }

    return {
      confirmLoading, folderForm, handleOk, updateVisible, onFinish, onFinishFailed
    }
  },
};
</script>

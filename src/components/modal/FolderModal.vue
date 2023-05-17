<template>
  <a-modal :visible="visible" @update:visible="updateVisible" :title="title" :confirm-loading="confirmLoading"
    @ok="handleOk" okText="确定" cancelText="取消">
    <a-form ref="formRef" :model="folderForm" name="folderForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
      autocomplete="off">
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
      default: '新建文件夹'
    }
  },
  setup(_props, ctx) {
    const confirmLoading = ref(false);
    const folderForm = reactive({
      name: '',
    });
    const formRef = ref();

    function handleOk() {
      console.log(formRef.value);
      formRef.value.validateFields('name').then(res => {
        console.log(res);
      })
      confirmLoading.value = true;
      setTimeout(() => {
        confirmLoading.value = false;
      }, 2000);
    }
    function updateVisible(e) {
      ctx.emit('update-visible', e)
    }

    return {
      confirmLoading, folderForm, handleOk, updateVisible, formRef
    }
  },
};
</script>

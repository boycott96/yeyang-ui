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
import { addFolder } from '@/api/folder';
import { message } from 'ant-design-vue';
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
      formRef.value.validateFields('name').then(form => {
        confirmLoading.value = true;
        var formData = new FormData();
        formData.append('name', form.name)
        addFolder(formData).then(res => {
          if (res.code === 200) {
            updateVisible(false);
          } else {
            message.error(res.message);
          }
          confirmLoading.value = false;
        }).catch(error => {
          message.error(error.response.data.message);
          confirmLoading.value = false;
        })
      })
    }
    function updateVisible(e) {
      ctx.emit('update-visible', e);
      formRef.value.resetFields();
    }

    return {
      confirmLoading, folderForm, handleOk, updateVisible, formRef
    }
  },
};
</script>

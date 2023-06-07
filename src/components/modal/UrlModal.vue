<template>
  <a-modal :visible="visible" @update:visible="updateVisible" :title="title" :confirm-loading="confirmLoading"
    @ok="handleOk" okText="确定" cancelText="取消" :maskClosable="false">
    <a-form ref="formRef" :model="formState" name="urlForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
      autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="书签" name="url" :rules="[{ required: true, message: '请输入书签!' }]">
        <a-input ref="inputBookmark" v-model:value="formState.url" @change="urlChange" />
      </a-form-item>
      <a-form-item label="文件夹" name="folder" :rules="[{ required: true, message: '请选择文件夹!' }]">
        <a-select v-model:value="formState.folder" style="width: 100%" placeholder="请选择文件夹" :options="options"></a-select>
      </a-form-item>
      <a-form-item label="名称" name="title" :rules="[{ required: true, message: '请输入书签名称!' }]">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item v-if="formState.icon && formState.thumbnail" label="图标" name="icon">
        <a-avatar :size="32" :src="formState.icon" />
      </a-form-item>
      <a-form-item v-if="formState.icon && formState.thumbnail" label="缩略图" name="thumbnail">
        <a-image :width="120" :height="80" :src="formState.thumbnail" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { ref, reactive, watchEffect } from "vue";
import { selectFolder } from "@/api/folder";
// import { urlInfo } from "@/api/action"

import { focusAndOpenKeyboard, debounce, isValidURL, fetchHTML } from "@/utils/common";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "书签",
    },
    folder: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const options = ref([]);
    const inputBookmark = ref(null);
    watchEffect(() => {
      if (props.visible && inputBookmark.value) {
        focusAndOpenKeyboard(inputBookmark.value)
      }
    })

    const formRef = ref();
    /** constant var */
    const confirmLoading = ref(false);
    // form
    const formState = reactive({
      url: "",
      icon: "",
      title: "",
      thumbnail: "",
    });
    watchEffect(() => {
      if (props.visible) {
        getFolderSelect();
      }
    })
    /** method */
    function getFolderSelect() {
      selectFolder().then(res => {
        options.value = res.data;
      })
    }
    const urlChange = debounce(() => {
      if (isValidURL(formState.url)) {

        fetchHTML(formState.url);
      }
    }, 500)
    function handleOk() {
      confirmLoading.value = true;
      setTimeout(() => {
        confirmLoading.value = false;
      }, 2000);
    }
    function updateVisible(e) {
      formRef.value.resetFields();
      ctx.emit("update-visible", e);
    }
    function onFinish(values) {
      console.log(values);
    }
    function onFinishFailed(errorInfo) {
      console.log(errorInfo);
    }


    return {
      // 参数
      options,
      formRef,
      formState,
      confirmLoading,
      inputBookmark,
      // 方法
      handleOk,
      updateVisible,
      onFinish,
      onFinishFailed,
      urlChange,
    };
  },
};
</script>

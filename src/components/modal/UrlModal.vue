<template>
    <a-modal :visible="visible" @update:visible="updateVisible" :title="title" :confirm-loading="confirmLoading"
        @ok="handleOk" okText="确定" cancelText="取消">
        <a-form ref="formRef" :model="formState" name="urlForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
            autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="书签" name="url" :rules="[{ required: true, message: '请输入书签!' }]">
                <a-input v-model:value="formState.url" />
            </a-form-item>
            <a-form-item label="文件夹" name="folder" :rules="[{ required: true, message: '请选择文件夹!' }]">
                <a-select v-model:value="formState.folder" style="width: 100%" placeholder="Tags Mode" :options="options"
                    @change="handleChange"></a-select>
            </a-form-item>
            <a-form-item label="名称" name="urlName" :rules="[{ required: true, message: '请输入书签名称!' }]">
                <a-input v-model:value="formState.urlName" />
            </a-form-item>
            <a-form-item label="图标" name="icon">
                <a-upload v-model:file-list="fileList" name="icon" list-type="picture-card" class="avatar-uploader"
                    :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :before-upload="beforeUpload" @change="handleChange">
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div class="ant-upload-text">上传</div>
                    </div>
                </a-upload>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '书签'
    }
})
const emit = defineEmits(['update-visible']);
const options = [];
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
const formRef = ref();
/** constant var */
const confirmLoading = ref(false);
// form
const formState = reactive({
    url: '',
    icon: '',
    name: '',
})
const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref('');

/** method */
function handleOk() {
    confirmLoading.value = true;
    setTimeout(() => {
        confirmLoading.value = false;
    }, 2000);
}
function updateVisible(e) {
    emit('update-visible', e)
}
function onFinish(values) {
    console.log(values);
}
function onFinishFailed(errorInfo) {
    console.log(errorInfo);
}
function handleChange(info) {
    if (info.file.status === 'uploading') {
        loading.value = true;
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url) => {
            imageUrl.value = base64Url;
            loading.value = false;
        });
    }
    if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
    }
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
</script >
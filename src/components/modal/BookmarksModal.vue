<template>
    <a-modal :visible="visible" @update:visible="updateVisible" title="选择需要导入的书签" :confirm-loading="confirmLoading"
        @ok="handleOk" okText="确定" cancelText="取消">
        <a-tree v-model:checkedKeys="checkedKeys" checkable :tree-data="bookmarks">
            <template #title="{ title, key }">
                <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ name }}</span>
                <template v-else>{{ title }}</template>
            </template>
        </a-tree>
    </a-modal>
</template>
<script>
import { ref } from 'vue';

export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        bookmarks: {
            type: Array,
            defualt: []
        }
    },
    setup(_props, ctx) {
        const confirmLoading = ref(false);
        function handleOk() {
            // 获取已经勾选的文件夹
            var a = checkedKeys.value.filter(item => item.indexOf('folder_') === 0);
            var url = checkedKeys.value.filter(item => item.indexOf('url_') === 0);
            var folders = _props.bookmarks.filter(item => a.includes(item.key) || item.children.findIndex(item1 => url.includes(item1.key)) >= 0);
            folders.forEach(item => {
                item.children = item.children.filter(item1 => url.includes(item1.key))
            })
            console.log(folders);
            // 初始化数据
            checkedKeys.value = [];
            updateVisible(false);
        }
        function updateVisible(e) {
            ctx.emit('update:visible', e)
        }
        const checkedKeys = ref([]);
        return {
            confirmLoading, handleOk, updateVisible,
            checkedKeys
        };
    }
}
</script>
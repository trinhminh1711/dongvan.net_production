<template>
    <div class="editor-wrapper">
        <QuillEditor v-model:content="content" contentType="html" :options="editorOptions" class="editor" />
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
const content = defineModel('content');
const previewContent = ref("");
import { QuillEditor } from '@vueup/vue-quill'

import Quill from "quill";
// Cấu hình toolbar
const editorOptions = {
    theme: "snow",
    placeholder: "Nội dung (Tối đa 50.000 ký tự).",
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'header': [1, 2, 3, 4, 5, 6] }],
            [{ 'size': ['small', 'normal', 'large', 'huge'] }], // dùng mặc định
            [{ 'font': [] }],
            [{ 'color': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'align': [] }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],

        ],
    },
};
</script>

<style>
.editor {
    min-height: 200px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before {
  content: "13px" !important;  /* chữ hiển thị trên toolbar */
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before, .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before {
  content: "10px" !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="normal"]::before, .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=nomal]::before {
   content: "13px" !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before , .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before {
  content: "18px" !important;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before , .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before {
  content: "32px"!important;
}

/* Đổi label dropdown hiện tại khi chưa chọn gì */
.ql-snow .ql-picker.ql-size .ql-picker-label::before {
  content: attr(data-value);
}
</style>
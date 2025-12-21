<template>
    <div>
        <h4 class="text-20 fw-bold"> Đăng bài mới</h4>
        <p class="text-14">Chia sẻ những câu chuyện thú vị và tương tác với các độc giả khác trên diễn đàn!</p>

        <div class="py-2">
            <p class="mb-1 fw-semibold text-md">Tiêu đề</p>
            <el-input v-model="postData.title" placeholder="Nhập nội dung..." />
        </div>
        <div class="py-2">
            <p class="mb-1 fw-semibold text-md">Chuyên mục</p>
            <el-select v-model="postData.topic_id" placeholder="Chọn loại chuyên mục bài đăng">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div class="mt-2">
            <p class="mb-1 fw-semibold text-md">Nội dung</p>
            <QuillEditor v-model:content="postData.content" contentType="html" :options="editorOptions"
                class="editor" />
        </div>
        <button @click="upPost()" style="width: 100%;" class="btn-alert mt-3 text-mb-16 btn-mb-alert"> Đăng bài </button>
    </div>
</template>


<script setup>
import { ref, reactive } from "vue";
import { toast } from "vue3-toastify";
const content = ref("");
const previewContent = ref("");
import { useRouter } from "vue-router";
const router = useRouter()
import Quill from "quill";
import { useAuthStore } from "@/stores/auth";
import { createPost } from "@/api/forum";
const Size = Quill.import('attributors/style/size');
const auth = useAuthStore();
const postData = ref({
    title: '',
    topic_id: '',
    user_id: '',
    content: ''
});
Size.whitelist = [
    '8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
];
Quill.register(Size, true);
// Cấu hình toolbar
const editorOptions = {
    theme: "snow",
    placeholder: "Mô tả về chủ đề bạn muốn thảo luận ở đây ...",
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'header': [1, 2, 3, 4, 5, 6] }],
            [{ size: ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'] }],
            [{ 'color': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'align': [] }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['blockquote', 'code-block'],


        ],
    },
};

const text = ref("")
const selected = ref("")
const options = [
    { value: "1", label: "Thể loại khác" },
    { value: "2", label: "Ngôn Đề cử và Review truyện" },
    { value: "3", label: "Nhập môn sáng tác" },
    { value: "4", label: "Tìm bạn đồng sáng tác" },
    { value: "5", label: "Tin tức và sự kiện" },
    { value: "6", label: "Hỏi đáp cùng tác giả" },

]
async function upPost() {
    const toastAddChapter = toast.loading("Đang xử lý...");
    const userId = auth.userId
    postData.value.user_id = userId
    const res = await createPost(postData.value)
    if (res.success) {
        setTimeout(() => {
            toast.remove(toastAddChapter);
            toast.success("Đăng bài thành công");
            router.push({
                name: "list-post", // đúng route name của Component A
            });
        }, 2000);
    }

}
</script>

<style>
.editor-wrapper {
    border-radius: 8px;
    width: 100%;
    overflow: hidden;
}

.editor {
    min-height: 200px;
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="8px"]::before {
    content: "8";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
    content: "10";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
    content: "12";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
    content: "14";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
    content: "16";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
    content: "18";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
    content: "20";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
    content: "24";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
    content: "28";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
    content: "32";
}

.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
    content: "36";
}


</style>
<template>
  <div class="editor-wrapper">
    <QuillEditor
      v-model:content="content"
      contentType="html"
      :options="editorOptions"
      class="editor"
    />

    <!-- thông báo nhỏ -->
    <div v-if="isUploading" class="uploading-hint">
      Ảnh đang được tải lên...
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue"
import { QuillEditor, Quill } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"
const content = defineModel("content")
import axios from "axios"

// Cấu hình toolbar
const isUploading = ref(false)
const editorOptions = {
  theme: "snow",
  placeholder: "Nội dung (Tối đa 50.000 ký tự).",
  modules: {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ header: [1, 2, 3, 4, 5, 6] }],
        [{ size: ["small", "normal", "large", "huge"] }],
        [{ font: [] }],
        [{ color: [] }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ align: [] }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote", "code-block"],
        ["link", "image", "video", "formula"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  },
}
async function imageHandler() {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"
  input.click()

  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return

    const quill = this.quill
    const range = quill.getSelection(true)

    // ✅ 1️⃣ Hiển thị ảnh tạm (base64)
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const localImage = reader.result
      quill.insertEmbed(range.index, "image", localImage)
      quill.setSelection(range.index + 1)

      // ảnh đang upload → gắn class “uploading”
      const insertedImage = quill.root.querySelector(`img[src="${localImage}"]`)
      if (insertedImage) insertedImage.classList.add("uploading")

      // ✅ 2️⃣ Bắt đầu upload thật
      isUploading.value = true
      const formData = new FormData()
      formData.append("image", file)

      try {
        const res = await axios.post("http://localhost:5000/api/upload/chapter", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        if (res.data.success && insertedImage) {
          // ✅ 3️⃣ Upload xong → đổi link thật
          insertedImage.setAttribute("src", res.data.url)
          insertedImage.classList.remove("uploading")
        }
      } catch (err) {
        console.error("Lỗi upload ảnh:", err)
      } finally {
        // ✅ 4️⃣ Tắt trạng thái upload
        isUploading.value = false
      }
    }
  }
}

/**
 * ✅ Hàm kiểm tra xem còn ảnh chưa upload không
 *  → Dùng cho component cha hoặc validate khi lưu
 */
function hasUploadingImages() {
  const div = document.createElement("div")
  div.innerHTML = content.value || ""
  return div.querySelector("img.uploading") !== null
}

// 👇 expose cho component cha nếu cần (optional)
defineExpose({ hasUploadingImages, isUploading })


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
img.uploading {
  opacity: 0.5;
  filter: blur(1px);
  pointer-events: none;
}
.uploading-hint {
  font-size: 13px;
  color: #888;
  margin-top: 5px;
}
.ql-editor img {
  max-width: 500px !important;   /* hoặc 50% tùy bạn chọn */
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;     /* căn giữa ảnh */
}
</style>
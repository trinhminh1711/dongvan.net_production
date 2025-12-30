<template>
    <div class="container">
        <el-form class="form-createstory" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
            <!-- Tên truyện -->
            <el-form-item prop="storyName">
                <template #label>
                    <span class="form-createstory__label">Tên truyện</span>
                    <el-tooltip :content="'Liên hệ admin để đổi tên truyện '" placement="top">
                        <el-icon>
                            <InfoFilled />
                        </el-icon>
                    </el-tooltip>
                </template>
                <el-input disabled placeholder="Viết hoa chữ đầu mỗi từ" size="large" v-model="ruleForm.storyName" />
            </el-form-item>

            <!-- Tác giả (disabled) -->
            <el-form-item prop="storyAuthor">
                <template #label>
                    <span class="form-createstory__label">Tác giả</span>
                </template>
                <el-input size="large" :value="ruleForm.storyAuthorName" disabled />
            </el-form-item>

            <!-- Thể loại -->
            <el-form-item prop="storyGenre">
                <template #label>
                    <span class="form-createstory__label">Thể loại</span>
                </template>
                <el-select-v2 size="large" v-model="ruleForm.storyGenre" placeholder="Chọn thể loại"
                    :options="options" />
            </el-form-item>

            <!-- Giới thiệu -->
            <el-form-item class="custom-textarea" prop="storyDesc">
                <template #label>
                    <span class="form-createstory__label">Giới thiệu</span>
                </template>
                <el-mention
                    placeholder="Phần giới thiệu truyện là ấn tượng đầu tiên mà bạn tạo ra với người đọc – hãy tận dụng cơ hội này để truyền tải nội dung cốt lõi, điểm hấp dẫn và phong cách riêng của bạn. Giới thiệu càng rõ ràng, mạch lạc và thu hút thì càng có nhiều người muốn theo dõi truyện!"
                    v-model="ruleForm.storyDesc" type="textarea" />
            </el-form-item>

            <el-form-item class="list-imageupload">
                <template #label>
                    <span class="form-createstory__label">Ảnh bìa</span>
                </template>

                <div>
                    <!-- Upload ảnh -->
                    <div class="d-flex align-items-end gap-2 upload-demo-mobile">
                        <!-- Preview ảnh hiện tại -->
                        <img v-if="fileList.length === 0 && dialogImageUrl" :src="dialogImageUrl"
                            class="el-upload-list__item-thumbnail" alt="Preview" />

                        <!-- Upload mới -->
                        <el-upload :on-change="handleFileChange" class="upload-demo" action="#" :limit="1"
                            :auto-upload="false" list-type="picture-card" accept=".jpg,.png"
                            v-model:file-list="fileList">
                            <template #trigger>
                                <div>
                                    <button v-if="fileList.length === 0" class="btn-selectfile" type="button">
                                        Chọn tệp
                                    </button>
                                    <p v-if="fileList.length === 0" class="ps-2">
                                        Chọn để thay ảnh bìa khác
                                    </p>
                                </div>
                            </template>
                        </el-upload>
                    </div>

                    <!-- Preset ảnh -->
                    <div>
                        <p class="my-3">Hoặc chọn một poster dưới đây</p>
                        <div class="preset-images">
                            <!-- Desktop: Carousel -->
                            <el-carousel class="d-none d-md-block" :autoplay="false" arrow="always">
                                <el-carousel-item v-for="(carosel, index) in presetImages" :key="index">
                                    <img v-for="imgUrl in carosel" :key="imgUrl" :src="imgUrl" class="preset-img mx-2"
                                        :class="{ active: selectedImage === imgUrl }" @click="selectPreset(imgUrl)" />
                                </el-carousel-item>
                            </el-carousel>

                            <!-- Mobile: Swiper -->
                            <div class="d-block d-md-none preset-swiper">
                                <div class="mobile-swiper-wrapper">
                                    <Swiper :slides-per-view="1" :space-between="20" :grab-cursor="true"
                                        class="mobile-swiper">
                                        <SwiperSlide v-for="(group, index) in presetImagesFlat" :key="index">
                                            <div class="slide-row">
                                                <img v-for="imgUrl in group" :key="imgUrl" :src="imgUrl"
                                                    class="preset-img" :class="{ active: selectedImage === imgUrl }"
                                                    @click="selectPreset(imgUrl)" />
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-form-item>

            <!-- Link forum -->
            <el-form-item prop="storyLinkForum">
                <template #label>
                    <span class="form-createstory__label">Link Forum</span>
                </template>
                <el-input size="large" placeholder="Link thảo luận forum (nếu có)" v-model="ruleForm.storyLinkForum" />
            </el-form-item>
        </el-form>

        <button type="button" @click="submitForm()" style="display: block; margin-left: auto;"
            class="btn-alert my-4 fw-semibold">
            Cập nhật truyện
        </button>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { toast } from "vue3-toastify"
import { getStoryById, updateStory } from "@/api/stories"
import type { UploadRawFile, UploadFile } from "element-plus"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import { genFileId } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const storyId = Number(route.params.id)

// form setup
interface RuleForm {
    storyName: string
    storyGenre: number | null
    storyAuthor: number | null
    storyAuthorName: string,
    storyDesc: string
    storyLinkForum: string
    cover: UploadRawFile | null
}

const ruleFormRef = ref<FormInstance>()
const fileList = ref<UploadFile[]>([])
const dialogImageUrl = ref("")
const selectedImage = ref<string | null>(null)

const ruleForm = reactive<RuleForm>({
    storyName: "",
    storyGenre: null,
    storyAuthor: Number(auth.userId) || null,
    storyAuthorName: "",
    storyDesc: "",
    storyLinkForum: "",
    cover: null,
})

const rules = reactive<FormRules<RuleForm>>({
    storyName: [{ required: true, message: "Thông tin là bắt buộc", trigger: "blur" }],
    storyGenre: [{ required: true, message: "Thông tin là bắt buộc", trigger: "blur" }],
})

// preset images + options thể loại (giữ nguyên từ CreateStory)
const presetImages = {
    slide1: [
        new URL('@/assets/image/image 16.png', import.meta.url).href,
        new URL('@/assets/image/image 17.png', import.meta.url).href,
        new URL('@/assets/image/image 18.png', import.meta.url).href,
        new URL('@/assets/image/image 19.png', import.meta.url).href,
        new URL('@/assets/image/image 23.png', import.meta.url).href,
        new URL('@/assets/image/image 22.png', import.meta.url).href,
    ],
    slide2: [
        new URL('@/assets/image/image 17.png', import.meta.url).href,
        new URL('@/assets/image/image 19.png', import.meta.url).href,
        new URL('@/assets/image/image 16.png', import.meta.url).href,
        new URL('@/assets/image/image 22.png', import.meta.url).href,
        new URL('@/assets/image/image 23.png', import.meta.url).href,
        new URL('@/assets/image/image 18.png', import.meta.url).href,
    ],
}

const options = [
    { label: "Linh dị", value: 1 },
    { label: "Trinh thám", value: 2 },
    { label: "Lịch sử", value: 3 },
    { label: "Ngôn tình", value: 4 },
    { label: "Truyện ngắn", value: 5 },
    { label: "Thơ", value: 6 },
    { label: "Huyền ảo", value: 7 },
    { label: "Viễn tưởng", value: 8 },
    { label: "Cổ đại", value: 9 },
    { label: "Hiện thực", value: 10 },
    { label: "Tản văn", value: 11 },
]

// --- Load dữ liệu cũ ---
onMounted(async () => {
    if (storyId) {
        const res = await getStoryById(storyId)
        if (res) {
            const data = res
            dialogImageUrl.value = data.urlImg
            ruleForm.storyName = data.title
            ruleForm.storyDesc = data.description
            ruleForm.storyAuthorName = data.pen_name
            ruleForm.storyGenre = data.genres_id
            ruleForm.storyAuthor = data.author_id
            ruleForm.storyLinkForum = data.link_forum
        }
    }
})

// --- handle file ---
const handleFileChange = (file: UploadFile) => {
    if (file.raw) {
        ruleForm.cover = file.raw as UploadRawFile
    }
}
const presetImagesFlat = computed(() => {
    const flat = Object.values(presetImages).flat()
    const result: string[][] = []
    const groupSize = 4
    for (let i = 0; i < flat.length; i += groupSize) {
        result.push(flat.slice(i, i + groupSize))
    }
    return result
})
// --- select preset image ---
const selectPreset = async (imgUrl: string) => {
    selectedImage.value = imgUrl
    fileList.value = []
    ruleForm.cover = null
    dialogImageUrl.value = imgUrl
    const res = await fetch(imgUrl)
    const blob = await res.blob()
    const file = Object.assign(
        new File([blob], "preset-image.png", { type: blob.type }),
        { uid: genFileId() }
    ) as UploadRawFile
    ruleForm.cover = file
}

// --- submit form ---
const submitForm = async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid) => {
        if (!valid) {
            toast.error("Thông tin truyện không hợp lệ")
            return
        }
        const toastId = toast.loading("Đang xử lý...")
        const res = await updateStory(ruleForm, storyId)
        toast.remove(toastId)
        if (res.success) {
            toast.success(res.message)
        } else {
            toast.error(res.message || "Lỗi server")
        }
    })
}
</script>

<style>
/* Giữ nguyên style của CreateStory */
.form-createstory .custom-textarea .el-textarea__inner {
    height: 100px;
    line-height: 20px;
}

.form-createstory .el-form-item__label-wrap {
    text-align: left !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100px;
}

.form-createstory label::before {
    display: none;
}

.form-createstory .form-createstory__label {
    font-weight: 500;
    color: #344054;
}

.btn-selectfile {
    background: none;
    border: solid 1px #AEAEAE;
    border-radius: 20px;
    color: #344054;
    font-weight: 400;
    padding: 7px 17px;
}

.el-upload-list__item-thumbnail {
    width: 150px;
}

.preset-img.active {
    border: solid 6px #bf2c24;
}

@media (max-width: 768px) {
    .form-createstory .el-form-item {
        display: flex;
        flex-direction: column;
    }

    .list-imageupload .el-carousel__item img {
        width: 100%;
        max-width: 100%;
    }

    .upload-demo-mobile {
        flex-wrap: wrap;
    }

    .w-mb-full {
        width: 100%;
    }

    .mobile-swiper-wrapper {
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }

    /* Một hàng 4 ảnh, không chồng nhau */
    .slide-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        width: 100%;
    }

    /* Ảnh căn đều trong 1 slide */
    .preset-img {
        width: 27%;
        /* 4 ảnh x 24% = 96% */
        border-radius: 4px;
        object-fit: cover;
        flex-shrink: 0;
        cursor: pointer;
        transition: transform 0.2s ease, outline 0.2s ease;
    }

    .preset-img.active {
        border: solid 2px #bf2c24 !important;

    }

    .form-createstory .custom-textarea .el-textarea__inner {
        min-height: 300px !important;
        max-height: 100% !important;
        line-height: 20px;
    }
}
</style>

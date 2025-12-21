<template>
    <div v-show="!showCommitPage" class="container">
        <el-form class="form-createstory mt-5" :model="newChapForm" :rules="rules" ref="ruleFormRef" label-width="auto">
            <el-form-item prop="chapNumber">
                <template #label><span class="form-createstory__label align-middle">Chương thứ
                        <el-tooltip :content="'Hiện tại đã xuất bản đến chương ' + (newChapForm.chapNumber - 1)"
                            placement="top">
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                        </el-tooltip></span></template>
                <el-input v-model="newChapForm.chapNumber" size="large" disabled />
            </el-form-item>

            <el-form-item>
                <template #label><span class="form-createstory__label align-middle">Xác nhận
                        <el-tooltip :content="'Chọn để xác nhận đã đăng đến chương cuối'" placement="top">
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                        </el-tooltip></span></template>
                <el-checkbox v-model="newChapForm.isfinal" :true-label="1" :false-label="0" class="ms-2">Chương
                    cuối</el-checkbox>
            </el-form-item>

            <el-form-item prop="chapName">
                <template #label><span class="form-createstory__label">Tên chương</span></template>
                <el-input v-model="newChapForm.chapName" size="large" placeholder="Tên chương" />
            </el-form-item>

            <el-form-item prop="isVip">
                <template #label><span class="form-createstory__label">Hình thức</span></template>
                <el-select-v2 @change="checkCondition" v-model="newChapForm.isVip" size="large"
                    placeholder="Chọn hình thức" :options="options" />
            </el-form-item>

            <el-form-item class="custom-textarea" prop="chapContent">
                <template #label><span class="form-createstory__label">Nội dung</span></template>
                <EditorUI v-model:content="newChapForm.chapContent" />
            </el-form-item>

            <el-form-item class="custom-textarea" prop="chapAdsContent">
                <template #label><span class="form-createstory__label">Quảng cáo</span></template>
                <el-input v-model="newChapForm.chapAdsContent" type="textarea" placeholder="Giới thiệu ngắn" />
            </el-form-item>
        </el-form>
        <!-- Button submit -->
        <div class="d-flex gap-4 justify-content-end btn-create-chap">
            <button class="btn-outline-primary my-4 align-middle" @click="goBack">
                <img src="@/assets/icon/back-icon.svg" alt=""><span class="fw-semibold ms-1 text-16">Quay lại</span>
            </button>
            <button :disabled="isEmptyHtml(newChapForm.chapContent)"  :class="{'btn-alert': !isEmptyHtml(newChapForm.chapContent)}" @click="validateForm()" style="display: block;" class="my-4 fw-semibold lh-2 text-16">
                Đăng chương
            </button>
        </div>
        <el-dialog v-model="isCreateChapVip" width="500">
            <template #title>
                <h3 class="text-color_primary fw-bold">Bạn chưa đủ điều kiện đăng chương VIP!</h3>
            </template>
            <div>
                <p>Bạn chỉ đủ điều kiện bật thu phí cho truyện nếu:</p>
                <ul class="lh-base mt-1">
                    <li>Tác phẩm đó phải có trên 15.000 chữ.</li>
                    <li>Đã đăng ít nhất 10 chương.</li>
                    <li>Đạt tối thiểu 1.000 lượt đọc hợp lệ.</li>
                </ul>
                <p @click="isCreateChapVip = false" class="btn-alert mt-3 lh-1 text-center">OK</p>
            </div>
        </el-dialog>
    </div>
    <div v-show="showCommitPage" class="container">
        <h2 class="text-center fw-bold">Cam kết</h2>
        <div style="line-height: 2;">
            <p>
                Tôi. [Tên tác giả/Bút danh], chủ tài khoản [Tên tài khoản tác giả] tại Đông Văn, xin cam kết tuân thủ
                các quy định và chính sách nội dung của nền tảng như sau:
            </p>
            <p class="fw-semibold">
                1. Mọi tác phẩm đăng tải là nguyên bản, do chính tôi sáng tác và thuộc quyền sở hữu hợp pháp của
                tôi.<br></br>
                2.Tôi cam kết không sao chép, sử dụng trái phép, hay vi phạm bản quyền nội dung của cá nhân/tổ chức
                khác.<br></br>
                3. Tôi cam kết không đăng tải nội dung chống phá nhà nước, xuyên tạc lịch sử.<br></br>
                4. Tôi cam kết không kỳ thị, miệt thị, bôi nhọ, xúc phạm, chia rẽ liên quan đến sắc tộc, giới Tôi cam
                kết
                không đăng tải nội dung khiêu dâm, đồi trụy, mô tả chi tiết hành vi tình dục phản cảm.<br></br>
                5. Tôi cam kết không cổ súy, hướng dẫn các hành vi vi phạm pháp luật, tệ nạn xã hội (ma túy, cờ bạc, mại
                dâm, bạo lực...), không xuyên tạc giá trị văn hóa, lịch sử, hoặc xúc phạm danh nhân. <br></br>6. Mọi nội
                dung đăng
                tải phải tuân thủ pháp luật Việt Nam về quản lý thông tin
                trên mạng.
                Bằng việc nhấn nút "Đồng ý", tôi xác nhận đã đọc, hiểu và đồng ý hoàn toàn với các điều khoản nêu trên.
                Tôi
                chịu trách nhiệm hoàn toàn về nội dung mà tôi đăng tải trên nền tảng Đông Văn.</p>
        </div>
        <div class="d-flex gap-4 justify-content-end btn-create-chap">
            <button class="btn-outline-primary my-4 align-middle" @click="goBack">
                <img src="@/assets/icon/back-icon.svg" alt=""><span class="fw-semibold ms-1 text-16">Quay lại</span>
            </button>
            <button @click="submitForm()" style="display: block;" class="btn-alert my-4 fw-semibold text-16">
                Xác nhận
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import EditorUI from '../text-editor/EditorUI.vue'
import { getLastChapter, postNewChapter } from "@/api/chapter"
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from "vue-router";
const isCreateChapVip = ref(false)
const ruleFormRef = ref<FormInstance>()
const emit = defineEmits(["created-success"])
const router = useRouter();
const showCommitPage = ref(false)
const route = useRoute();
interface chapData {
    chapNumber: number,
    chapName: string,
    isVip: number,
    chapContent: String,
    chapAdsContent: String,
    story_id: number,
    countWords: number,
    price: number,
    isfinal: Number,
}
const newChapForm = reactive<chapData>({
    chapNumber: undefined,
    chapName: '',
    isVip: undefined,
    countWords: undefined,
    chapContent: '',
    chapAdsContent: '',
    story_id: undefined,
    price: 5,
    isfinal: 0

})
function isEmptyHtml(html) {
  if (!html) return true
  return html.replace(/<[^>]*>/g, '').trim() === ''
}
function goBack() {
    if (window.history.length > 1) {
        router.push({
            name: "create-story", // đúng route name của Component A
            query: { tab: "second" } // mở tab2
        });
    } else {
        router.push({ name: "home" });
    }
}
const options = [
    { label: 'Miễn phí', value: 0 },
    { label: 'Chương Vip', value: 1 },
]
const rules = reactive<FormRules<chapData>>({
    chapNumber: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],
    chapName: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],
    chapContent: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],

})
const checkCondition = (value) => {
    if (newChapForm.chapNumber < 10 && value == 1) {
        isCreateChapVip.value = true
        newChapForm.isVip = 0
    }

}
const validateForm = () => {
    if (!ruleFormRef.value) return 0
    ruleFormRef.value.validate(async (valid, fields) => {
        if (valid) {
            showCommitPage.value = true
        } else {
            toast.error("Vui lòng điền đầy đủ thông tin", fields);
        }
    })
}
const submitForm = async () => {
    const toastAddChapter = toast.loading("Đang xử lý...");
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate(async (valid, fields) => {
        if (valid) {
            newChapForm.story_id = Number(route.params.storyId)
            newChapForm.countWords = countWordsFromHtml(newChapForm.chapContent)
            const res = await postNewChapter(newChapForm);
            if (res.success) {
                toast.remove(toastAddChapter);
                toast.success("Thêm chương mới thành công");
                setTimeout(() => {
                    router.push({
                        name: "create-story", // đúng route name của Component A
                        query: { tab: "second" } // mở tab2
                    });
                }, 2000);
            }

        } else {
            console.log("❌ Lỗi validate:", fields)
        }
    })
}

function countWordsFromHtml(html) {
    const text = html.replace(/<[^>]+>/g, '').trim()
    if (!text) return 0
    return text.split(/\s+/).length
}

onMounted(
    async () => {
        const res = await getLastChapter(route.params.storyId)

        if (res.status == 404) {
            newChapForm.chapNumber = 1;
        }
        else {
            newChapForm.chapNumber = res.chap_number + 1
        }
    })
</script>
<style scoped>
.btn-create-chap button {
    padding: 15px 30px;
    border-radius: 50px;
    border: solid 1px #E4E7EC;
    display: flex;
    gap: 5px
}

.btn-create-chap .btn-outline-primary:hover img {
    filter: invert(92%) sepia(80%) saturate(500%) hue-rotate(10deg);
}
</style>
<style>
.el-form-item.is-required:not(.is-no-asterisk).asterisk-left>.el-form-item__label-wrap>.el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk).asterisk-left>.el-form-item__label:before {
    display: none;
}
</style>
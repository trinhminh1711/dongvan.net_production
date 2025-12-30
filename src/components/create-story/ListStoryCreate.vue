<template>
    <el-form class="form-createstory" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
        <el-form-item prop="storyName">
            <template #label>
                <span class="form-createstory__label">
                    Tên truyện
                </span>
            </template>
            <el-input placeholder="Viết hoa chữ đầu mỗi từ" size="large" v-model="ruleForm.storyName" />
        </el-form-item>
        <el-form-item prop="storyAuthor">
            <template #label>
                <span class="form-createstory__label">
                    Tác giả
                </span>
            </template>
            <el-input placeholder="Nhập tên tác giả" size="large" v-model="ruleForm.storyAuthor" />
        </el-form-item>
        <el-form-item prop="storyGenre">
            <template #label>
                <span class="form-createstory__label">
                    Thể loại
                </span>
            </template>
            <el-select-v2 size="large" v-model="ruleForm.storyGenre" placeholder="Chọn thể loại" :options="options" />
        </el-form-item>
        <el-form-item class="custom-textarea" prop="storyDesc">
            <template #label>
                <span class="form-createstory__label">
                    Giới thiệu
                </span>
            </template>
            <el-mention placeholder="Giới thiệu ngắn" v-model="ruleForm.storyDesc" type="textarea" />
        </el-form-item>
        <el-form-item prop="storyLinkForum">
            <template #label>
                <span class="form-createstory__label">
                    Link Forum
                </span>
            </template>
            <el-input size="large" placeholder="Link thảo luận forum (nếu có)" v-model="ruleForm.storyLinkForum" />
        </el-form-item>
    </el-form>
      <button style="display: block; margin-left: auto;" class="btn-alert my-4 fw-semibold">Đăng truyện</button>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
    storyName: string,
    storyGenre: string,
    storyAuthor: string,
    storyDesc: string,
    storyLinkForum: string
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    storyName: '',
    storyGenre: '',
    storyAuthor: '',
    storyDesc: '',
    storyLinkForum: ''

})

const rules = reactive<FormRules<RuleForm>>({
    storyName: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],
    storyGenre: [
        { required: true, message: 'Thông tin là bắt buộc', trigger: 'blur' },
    ],
})

</script>
<style>

</style>
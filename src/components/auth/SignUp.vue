<template>
    <el-form ref="ruleFormRef" style="max-width: 800px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item prop="userName">
            <el-input :style="{ height: '40px' }" v-model="ruleForm.userName" placeholder="Tên tài khoản" type="text"
                autocomplete="off">
                <template #prefix>
                    <img src="@/assets/icon/icon-user-2.svg" alt="">
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="email">
            <el-input :style="{ height: '40px' }" v-model="ruleForm.email" placeholder="Email">
                <template #prefix>
                    <img src="@/assets/icon/icon-email.svg" alt="" /></template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="ruleForm.password" :type="showPassword ? 'text' : 'password'" placeholder="Mật khẩu"
                autocomplete="off" :style="{ height: '40px' }">
                <!-- Icon đầu -->
                <template #prefix>
                    <img src="@/assets/icon/icon-password.svg" alt="" />
                </template>
                <!-- Icon cuối toggle -->
                <template #suffix>
                    <img :src="showPassword ? iconEye : iconEyeOff" alt="" @click="togglePassword"
                        style="cursor: pointer;" />
                </template>
            </el-input>
        </el-form-item>

        <!-- Input xác nhận mật khẩu -->
        <el-form-item prop="retypePassword">
            <el-input v-model="ruleForm.retypePassword" :type="showRetypePassword ? 'text' : 'password'"
                placeholder="Xác nhận Mật khẩu" autocomplete="off" :style="{ height: '40px' }">
                <template #prefix>
                    <img src="@/assets/icon/icon-password.svg" alt="" />
                </template>
                <template #suffix>
                    <img :src="showRetypePassword ? iconEye : iconEyeOff" alt="" @click="toggleRetypePassword"
                        style="cursor: pointer;" />
                </template>
            </el-input>
        </el-form-item>
        <el-button class="btn-login" type="primary" @click="submitForm(ruleFormRef)">
            Đăng ký
        </el-button>
    </el-form>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
const router = useRouter()
import authService from "@/api/authService";
import { reactive, ref, nextTick } from 'vue'
import { toast } from "vue3-toastify"
import { useAuthStore } from "@/stores/auth";
import iconEyeOff from "@/assets/icon/icon-user.svg";
import iconEye from "@/assets/icon/icon-eye-off.svg";
import type { FormInstance, FormRules } from 'element-plus'
const auth = useAuthStore()
const success = ref();
const error = ref("");
const errorMsg = ref("");

const showPassword = ref(false);
const showRetypePassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}
function toggleRetypePassword() {
  showRetypePassword.value = !showRetypePassword.value;
}
const ruleFormRef = ref<FormInstance>()

const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Vui lòng nhập tên đăng nhập'))
    }
    callback()

}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Vui lòng nhập mật khẩu'))
    } else if (value.length < 6) {
        callback(new Error("Mật khẩu phải có ít nhất 6 ký tự"));
    } else {
        callback();
    }
}
const validateRetypePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error("Vui lòng nhập lại mật khẩu"));
    } else if (value !== ruleForm.password) {
        callback(new Error("Mật khẩu nhập lại không khớp"));
    } else {
        callback();
    }
};
const ruleForm = reactive({
    userName: '',
    email: '',
    pass: '',
    password: '',
    retypePassword: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    userName: [{ validator: validateUsername, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }],
    retypePassword: [{ validator: validateRetypePassword, trigger: "blur" }],
    email: [
        { required: true, message: 'Email không được để trống', trigger: 'blur' },
        {
            type: 'email',
            message: 'Email không hợp lệ',
            trigger: ['blur', 'change']
        }
    ]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            handleRegister();
        } else {
            console.log('error submit!')
        }
    })
}
const handleRegister = async () => {
    try {
        const res = await authService.register({
            username: ruleForm.userName,
            email: ruleForm.email,
            password: ruleForm.password
        });

        success.value = res.data.success; // ví dụ backend trả "Registered successfully"
        toast.success("Đăng ký thành công 🎉")
        const loginRes = await authService.login(
            {
                email: ruleForm.email,
                password: ruleForm.password
            })
        auth.setAuth(loginRes.data.token, loginRes.data.user.user_id);
        await auth.fetchProfile();
        setTimeout(() => {
            router.push({ name: "Home" }).then(() => {
                window.location.reload(); // reload sau khi điều hướng
            });
        }, 2000); // đợi toast chạy xong
    } catch (err) {
        success.value = false;
        if (err.response) {
            // Server trả lỗi với status code
            if (err.response.status === 400) {
                errorMsg.value = " Dữ liệu không hợp lệ";
            } else if (err.response.status === 409) {
                errorMsg.value = " Email đã tồn tại";
            } else if (err.response.status === 500) {
                errorMsg.value = " Lỗi server, vui lòng thử lại sau";
            } else {
                errorMsg.value = err.response.data.error || "Có lỗi xảy ra";
            }
        } else if (err.request) {
            // Request đã gửi nhưng không có phản hồi
            errorMsg.value = " Không thể kết nối đến server";
        } else {
            // Lỗi khác (setup Axios, v.v.)
            errorMsg.value = ` Lỗi: ${err.message}`;
        }
        toast.error(errorMsg.value)
    }
};
</script>
<style>
.btn-login {
    background: linear-gradient(to right, #E60000, #FF6114);
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
}

.d-block {
    display: block;
}
</style>
<template>
    <loading-spiner v-if="loadding" />
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
    <el-dialog v-model="showVerifyDialog" title="Xác thực địa chỉ email" width="400px">
        <p class="mb-2">
            Để xác minh email của bạn, chúng tôi đã gửi mật khẩu dùng một lần (OTP) đến địa chỉ <b>{{ ruleForm.email
            }}</b>
        </p>
        <p>Nhập mã bảo mật</p>
        <el-input v-model="verifyCode" maxlength="6" style="margin-bottom: 12px"></el-input>

        <div class="flex items-center justify-between text-sm mb-2">
            <span v-if="countdown > 0">
                Mã sẽ hết hạn sau: <b>{{ countdown }}s</b>
            </span>
        </div>

        <div class="flex justify-end gap-2 mt-2">
            <el-button type="primary" class="btn-login" @click="handleVerify">Xác nhận</el-button>
            <el-button class="btn-huy" type="primary" link @click="resendCode">
                Gửi lại mã
            </el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
const router = useRouter()
import authService from "@/api/authService";
import { reactive, ref, onUnmounted } from 'vue'
import { toast } from "vue3-toastify"
import { useAuthStore } from "@/stores/auth";
import iconEyeOff from "@/assets/icon/icon-user.svg";
import iconEye from "@/assets/icon/icon-eye-off.svg";
import type { FormInstance, FormRules } from 'element-plus'
import LoadingSpiner from "../loadding/LoadingSpiner.vue";
const auth = useAuthStore()
const loadding = ref(false);
const success = ref();
const error = ref("");
const errorMsg = ref("");
const showVerifyDialog = ref(false);
const verifyCode = ref("");
const showPassword = ref(false);
const showRetypePassword = ref(false);
const countdown = ref(0);
let countdownTimer: any = null;

// Khi mở dialog xác nhận
const startCountdown = (seconds = 60) => {
    countdown.value = seconds;
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) clearInterval(countdownTimer);
    }, 1000);
};
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
     const loadingToast = toast.loading("⏳ Đang xử lý, vui lòng đợi...");
    try {
        const res = await authService.register({
            username: ruleForm.userName,
            email: ruleForm.email,
            password: ruleForm.password,
        });

        if (res.data.success) {
             toast.remove(loadingToast);
            toast.success("Đăng ký thành công! Vui lòng kiểm tra email để lấy mã xác nhận 🔐");
            showVerifyDialog.value = true;
            startCountdown(60); // bắt đầu đếm 60s
        }
    } catch (err) {
        toast.remove(loadingToast);
        if (err.response) {
            const status = err.response.status;

            if (status === 400) {
                toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại.");
            } else if (status === 409) {
                toast.error("Email đã tồn tại trong hệ thống. Vui lòng đăng nhập hoặc dùng email khác.");
            } else if (status === 500) {
                toast.error("Lỗi server, vui lòng thử lại sau.");
            } else {
                toast.error(err.response.data?.error || "Đăng ký thất bại!");
            }

        } else if (err.request) {
            // Gửi request nhưng server không phản hồi
            toast.error("Không thể kết nối đến server.");
        } else {
            // Lỗi khác (ví dụ lỗi cú pháp, axios, v.v.)
            toast.error(`Lỗi: ${err.message}`);
        }
    }
};

// Gửi lại mã khi countdown = 0
const resendCode = async () => {
    try {
        const res = await authService.resendCode({
            email: ruleForm.email
        });
        if (res.data.success) {
            toast.success("Đã gửi lại mã xác nhận mới!");
            startCountdown(60);
        }
    } catch (err) {
        toast.error("Gửi lại mã thất bại");
    }
};
const handleVerify = async () => {
    try {
        const res = await authService.verifyEmail({
            email: ruleForm.email,
            code: verifyCode.value
        });

        if (res.data.success) {
            toast.success("Xác nhận email thành công 🎉");
            showVerifyDialog.value = false;

            // ✅ Tự động đăng nhập sau khi xác thực xong
            const loginRes = await authService.login({
                email: ruleForm.email,
                password: ruleForm.password
            });

            auth.setAuth(loginRes.data.token, loginRes.data.user.user_id);
            await auth.fetchProfile();
            window.location.reload()
        }
    } catch (err) {
        toast.error(
            err.response?.data?.message || "Mã xác nhận không hợp lệ hoặc đã hết hạn"
        );
    }
};
onUnmounted(() => clearInterval(countdownTimer)); // tránh leak timer
</script>
<style>
.btn-login {
    background: linear-gradient(to right, #E60000, #FF6114);
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
}

.btn-huy {
    border: solid 1px #D0D5DD;
    height: 40px;
    margin: 0;
    width: 100%;
}

.d-block {
    display: block;
}
</style>
<template>
    <el-form ref="ruleFormRef" style="max-width: 800px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        class="demo-ruleForm mt-2">
        <el-form-item prop="email">
            <el-input :style="{ height: '40px' }" v-model="ruleForm.email" placeholder="Email" type="text"
                autocomplete="off">
                <template #prefix>
                    <img src="@/assets/icon/icon-user-2.svg" alt="">
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input :style="{ height: '40px' }" v-model="ruleForm.password" placeholder="Mật khẩu"
                :type="showPassword ? 'text' : 'password'" autocomplete="off">
                <template #prefix>
                    <img src="@/assets/icon/icon-password.svg" alt="">
                </template>
                <template #suffix>
                    <img @click="togglePassword" :src="showPassword ? iconEye : iconEyeOff" alt=""
                        style="cursor: pointer;" />

                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="d-block" prop="type">
            <el-row justify="space-between" align="middle">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox value="Online activities" name="type">
                        Nhớ tài khoản
                    </el-checkbox>
                </el-checkbox-group>
                <el-link type="primary" :underline="false">Quên mật khẩu</el-link>
            </el-row>
        </el-form-item>
        <el-button class="btn-login" type="primary" @click="submitForm(ruleFormRef)">
            Đăng nhập
        </el-button>
        <div id="googleBtn"></div>

    </el-form>
</template>

<script lang="ts" setup>
declare const google: any;
import { reactive, ref, onMounted } from 'vue'
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify"
import type { FormInstance, FormRules } from 'element-plus'
import authService from "@/api/authService";
import iconEyeOff from "@/assets/icon/icon-user.svg";
import iconEye from "@/assets/icon/icon-eye-off.svg";
const ruleFormRef = ref<FormInstance>()
const router = useRouter();
const auth = useAuthStore();
const showPassword = ref(false);
const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Vui lòng nhập tên đăng nhập'))
    }
    callback()

}
function togglePassword() {
    showPassword.value = !showPassword.value;
}
const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Vui lòng nhập mật khẩu'))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    email: '',
    password: '',
})
const handleGoogleLogin = () => {
    google.accounts.id.initialize({
        client_id: "838745549366-bh964pq8dc6888q0g1ker5bcl0ctcgl8.apps.googleusercontent.com", // 🔹 Thay bằng client ID bạn lấy ở Google Cloud
        callback: handleCredentialResponse,
        ux_mode: "popup" // tạm thời
    });

    google.accounts.id.prompt((notification) => {
    });
};

const handleCredentialResponse = async (response: any) => {
    if (!response?.credential) {
        console.error("No credential returned!");
        return;
    }
    try {
        const res = await authService.loginGoogle({ token: response.credential });
        auth.setAuth(res.data.token, res.data.user.user_id);
        await auth.fetchProfile();
        toast.success("Đăng nhập Google thành công!");
        window.location.reload()
    } catch (err) {
        console.error(err);
        toast.error("Đăng nhập Google thất bại!");
    }
};
const rules = reactive<FormRules<typeof ruleForm>>({
    email: [
        { required: true, message: 'Email không được để trống', trigger: 'blur' },
        {
            type: 'email',
            message: 'Email không hợp lệ',
            trigger: ['blur', 'change']
        }
    ],
    password: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            handleLogin()
        } else {
            console.log('error submit!')
        }
    })
}
const handleLogin = async () => {
    try {
        const res = await authService.login(
            {
                email: ruleForm.email,
                password: ruleForm.password
            })

        // Lưu token + userId vào store (và localStorage)
        auth.setAuth(res.data.token, res.data.user.user_id);
        // fetch lại user info
        await auth.fetchProfile();
        toast.loading("Đang xử lý...");
        setTimeout(() => {
            router.push({ name: "Home" }).then(() => {
                window.location.reload(); // reload sau khi điều hướng
            });
        }, 2000); // đợi toast chạy xong
    } catch (err) {
        toast.error(err.response.data.error);

    }
};
onMounted(() => {
    google.accounts.id.initialize({
        client_id: "838745549366-bh964pq8dc6888q0g1ker5bcl0ctcgl8.apps.googleusercontent.com",
        callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt(); // gợi ý đăng nhập
});
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

.d-block .el-form-item__content {
    display: block;
}
</style>
<style>
.demo-tabs .el-input__validateIcon {
    display: none !important;
}
</style>
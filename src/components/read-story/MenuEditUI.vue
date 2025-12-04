<template>
    <div class="">
        <!-- Menu chức năng -->
        <div class="d-flex gap-3">
            <!-- Nút đổi màu nền -->
            <div class="edit-background">
                <p class="fw-bold">Nền</p>
                <div class="d-flex gap-2 mt-3">
                    <button class="btn-edit-ui" :class="{ active: selectedTheme === 'white' }"
                        @click="selectTheme('white', 'black')"
                        style="background-color: white; border: solid 1px #E4E7EC;">
                        <img width="24px" src="@/assets/icon/check-select.png" alt="">
                    </button>

                    <button class="btn-edit-ui" :class="{ active: selectedTheme === 'black' }"
                        @click="selectTheme('black', 'white')" style="background-color: black">
                        <img width="24px" src="@/assets/icon/check-select.png" alt="">
                    </button>

                    <button class="btn-edit-ui" :class="{ active: selectedTheme === '#E0E0E0' }"
                        @click="selectTheme('#E0E0E0', '#f5f5f5')" style="background-color: #E0E0E0">
                        <img width="24px" src="@/assets/icon/check-select.png" alt="">
                    </button>

                    <button class="btn-edit-ui" :class="{ active: selectedTheme === '#FFF3D3' }"
                        @click="selectTheme('#FFF3D3', '#333')" style="background-color: #FFF3D3">
                        <img width="24px" src="@/assets/icon/check-select.png" alt="">
                    </button>
                </div>
            </div>
        </div>

        <div class="edit-ui mt-5">
            <p class="fw-bold">Dàn trang</p>
            <div class="d-flex gap-2 align-items-center justify-content-between">
                <div @click="setLayout(false)" class="ui-dantrang" :class="{ active: selectedLayout === false }">
                    <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9H25M1 1H25M1 17H25" stroke="#344054" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>

                <!-- layout 2 cột -->
                <div @click="setLayout(true)" class="ui-dantrang" :class="{ active: selectedLayout === true }">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 16H14M2 8H14M2 24H14" stroke="#344054" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M18 16H30M18 8H30M18 24H30" stroke="#344054" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="edit-font__style mt-5">
            <p class="fw-bold mb-3">Cỡ và kiểu chữ</p>
            <div class="edit-fontsize d-flex gap-3 mb-3">
                <button @click="adjustFontSize('decrease')" class="fw-bold">A-</button>
                <button @click="adjustFontSize('increase')" class="fw-bold">A+</button>
            </div>
            <div class="edit-font-style d-flex flex-column">
                <button class="" @click="selectFont('')" :class="{ active: selectedFont === '' }">
                    Mặc định
                </button>

                <button style="font-family: 'Times New Roman', Times, serif;"
                    @click="selectFont('Times New Roman, serif')"
                    :class="{ active: selectedFont === 'Times New Roman, serif' }">
                    Times New Roman
                </button>

                <button style="font-family: Arial, Helvetica, sans-serif;" @click="selectFont('Arial, sans-serif')"
                    :class="{ active: selectedFont === 'Arial, sans-serif' }">
                    Arial
                </button>

                <button style="font-family: Georgia, 'Times New Roman', Times, serif;"
                    @click="selectFont('Georgia, Times New Roman, serif')"
                    :class="{ active: selectedFont === 'Georgia, Times New Roman, serif' }">
                    Georgia
                </button>

                <button style="font-family: 'Courier New', Courier, monospace;"
                    @click="selectFont('Courier New, Courier, monospace')"
                    :class="{ active: selectedFont === 'Courier New, Courier, monospace' }">
                    Courier
                </button>

                <button style="font-family: 'Playfair Display', serif;" @click="selectFont('Playfair Display, serif')"
                    :class="{ active: selectedFont === 'Playfair Display, serif' }">
                    Playfair Display
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(["changeFont", "changeFontSize", "changeTheme", "set-layout"]);
const backgroundColor = ref("white");
const fontSize = ref("16px");
const fontFamily = ref("Arial");
const value1 = ref(false)
const selectedLayout = ref(false)
const selectedTheme = ref('white')
const selectedFont = ref('')
function handleChange(val) {
    // val = true nếu bật, false nếu tắt
    emit('set-layout', val)
}
const changeBackground = (color) => {
    backgroundColor.value = color;
};
function selectFont(font) {
    emit("changeFont", font);
    selectedFont.value = font
}
function adjustFontSize(action) {
    emit("changeFontSize", action); // action = "increase" hoặc "decrease"
}
function selectTheme(bg, color) {
    selectedTheme.value = bg
    emit("changeTheme", { background: bg, text: color });
}
function setLayout(value) {
    selectedLayout.value = value     // cập nhật active
    emit('set-layout', value)        // emit ra ngoài
}
// Đổi kích thước chữ (toggle nhỏ ↔ to)
const toggleFontSize = () => {
    fontSize.value = fontSize.value === "16px" ? "22px" : "16px";
};
</script>
<style scoped>
.edit-fontsize button {
    width: 50%;
    height: 50px;
    display: flex;
    align-items: center;
}

.edit-background button {
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 20px;
}

.edit-font__style {
    display: flex;
    flex-direction: column;
}

.edit-font__style button {
    background: none;
    border: solid 1px rgb(231, 229, 229);
    padding: 15px 20px;
    border-radius: 20px;
    text-align: left;
    font-weight: bold;
    color: #344054;
    margin: 5px 0;
}

.ui-dantrang {
    width: 50%;
    display: flex;
    margin-top: 20px;
    border: solid 1px #E4E7EC;
    border-radius: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
}

.btn-edit-ui {
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-edit-ui img {
    display: none;
}

.btn-edit-ui.active img {
    display: block;
}
.edit-font-style button
{
    font-size: 18px;
}
.edit-font-style button.active
{
 border: 2px solid #0CA876 !important;
}
.btn-edit-ui.active,
.ui-dantrang.active
{
    border: 2px solid #0CA876 !important;


}
</style>

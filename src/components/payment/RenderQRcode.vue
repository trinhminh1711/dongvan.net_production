<template>
  <div>
    <img style="max-width: 70%; display:block ; margin: 0 auto;" :src="qrSrc" alt="VietQR" />
    <p class="text-center fw-semibold text-lg text-secondary">Sử dụng ứng dụng ngân hàng để quét mã QR và thanh toán</p>
    <p class="text-center mt-3">
      <button @click="downloadQR" class="btn-outline__alert text-center text-24"> <el-icon>
          <Download />
        </el-icon> Tải mã QR
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
const props = defineProps({
  amount: { // Số tiền
    type: Number,
    default: 0
  },
  addInfo: { // Nội dung chuyển khoản
    type: String,
    default: ''
  }
})
const bin = '970441'                 // Vietcombank
const account = '003488097'         // STK nhận
const accountName = encodeURIComponent('TRỊNH QUANG MINH')
const qrSrc = ref("")
onMounted(() => {
  qrSrc.value = `https://img.vietqr.io/image/${bin}-${account}-compact.png?amount=${props.amount}&addInfo=${props.addInfo}&accountName=${accountName}`
})
const downloadQR = async () => {
  const response = await fetch(qrSrc.value, { mode: "cors" })
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = "Mua-tam-diep.png"   // tên file tải về
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
</script>

<template>
        <div class="box-shadow px-3 pb-2 pt-3 mt-3">
        <div class="post-main__info d-flex align-items-center justify-content-between gap-1">
            <div class="d-flex align-items-center">
                <img style="width: 50px; height:50px ;"  alt="">
                <p class="ms-3 fw-bold">{{ props.commentReplies }}</p>
            </div>
            <div class="date-comment">
                <p class="text-14 pe-3"></p>
            </div>
        </div>
        <div class="post-main__content text-sm ps-5 pe-3">
         
            <div class="post-comment">
                <p class="like-share d-flex gap-4 py-2">
                    <span @click="" class="d-flex align-items-center gap-2 text-md">
                        <svg :class="!isLiked ? 'heart-icon-unliked' : 'heart-icon-liked'" width="22" height="20"
                            viewBox="0 0 20 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.99431 3.27985C8.32819 1.332 5.54981 0.808035 3.46227 2.59168C1.37472 4.37532 1.08083 7.35748 2.72019 9.467C4.0832 11.2209 8.20816 14.9201 9.5601 16.1174C9.71136 16.2513 9.78698 16.3183 9.8752 16.3446C9.95219 16.3676 10.0364 16.3676 10.1134 16.3446C10.2016 16.3183 10.2773 16.2513 10.4285 16.1174C11.7805 14.9201 15.9054 11.2209 17.2684 9.467C18.9078 7.35748 18.6498 4.35656 16.5264 2.59168C14.4029 0.826798 11.6604 1.332 9.99431 3.27985Z" />
                        </svg>
                   
                    </span>

                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    commentReplies: {
        type: Object,
    },
})
function timeAgo(dateString: string): string {
    const inputDate = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - inputDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) {
        return `${diffSec} giây trước`;
    } else if (diffMin < 60) {
        return `${diffMin} phút trước`;
    } else if (diffHours < 24) {
        return `${diffHours} giờ trước`;
    } else if (diffDays <= 30) {
        return `${diffDays} ngày trước`;
    } else {
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths} tháng trước`;
    }
}
</script>

<style>

</style>
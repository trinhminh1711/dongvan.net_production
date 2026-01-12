import ArticleCategoryList from '@/components/article-category/ArticleCategoryList.vue'
import CreateNewTrapForm from '@/components/create-story/CreateNewTrapForm.vue'
import ListPost from '@/components/forum-page/ListPost.vue'
import PostCard from '@/components/forum-page/PostCard.vue'
import PostCategory from '@/components/forum-page/PostCategory.vue'
import PostComment from '@/components/forum-page/PostComment.vue'
import PostDetail from '@/components/forum-page/PostDetail.vue'
import LibraryPage from '@/components/library-page/LibraryPage.vue'
import CreateStory from '@/pages/CreateStory.vue'
import ForumPage from '@/pages/ForumPage.vue'
import HomePage from '@/pages/HomePage.vue'
import PaymentHistory from '@/admin/PaymentHistory.vue'
import CommitCreate from '@/components/create-story/CommitCreate.vue'
import InstructPage from '@/pages/InstructPage.vue'
import PaymentPage from '@/pages/PaymentPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import Forbidden from '@/pages/Forbiden.vue'
import ReadStory from '@/pages/ReadStory.vue'
import StoryDetail from '@/pages/StoryDetail.vue'
import { requireAuth } from "@/middleware/auth";
import UserPage from '@/components/user/UserPage.vue'
import { checkAdminAuth } from "@/middleware/auth";
import TransactionHistory from '@/pages/TransactionHistory.vue'
import ListChap from "@/components/create-story/ListStoryUpdateChap.vue"
import SupportPage from '@/pages/SupportPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EditStory from '@/components/create-story/EditStory.vue'
import NotFound from '@/pages/NotFound.vue'
import adminRoutes from "./admin"; // 👈 Import admin routes
import { checkStoryOwner } from '@/api/stories'
import { useAuthStore } from "@/stores/auth";
import { toast } from 'vue3-toastify';
import { useLoginModal } from '@/stores/useLoginModal'
const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/library-page', name: 'library', component: LibraryPage },
    { path: '/payment', name: 'payment', component: PaymentPage },
    {
        path: '/forum', name: 'forum', component: ForumPage, children: [
            {
                path: "list-post/:id",
                name: "list-post",
                component: ListPost
            },
            {
                path: "post-detail/:id",
                name: "post-detail",
                component: PostDetail
            },
            {
                path: "post-card",
                name: "post-card",
                component: PostCategory
            },
        ]
    },
    { path: '/terms-of-service', name: 'commit-create', component: CommitCreate },
    { path: '/transaction-history', name: 'transaction-history', component: TransactionHistory },
    { path: '/instruct-page', name: 'instruct', component: InstructPage },
    { path: '/support', name: 'support', component: SupportPage },
{
  path: '/story-detail/:id',
  name: 'story',
  component: StoryDetail,
  pathToRegexpOptions: { end: true }, // chặn match đường dài hơn
},
{
  path: '/story-detail/:id/chap/:chapId',
  name: 'chap-detail',
  component: ReadStory
},
    {
        path: '/create-story', name: 'create-story', component: CreateStory, children:
            [{
                path: "list-chap/:id",
                name: "list-chap",
                component: ListChap
            }]
    },
    {
        path: '/edit-story/:id',
        name: 'edit-story',
        component: EditStory, // hoặc EditStory nếu bạn tách riêng file
        props: true,
        beforeEnter: async (to, from, next) => {
            const auth = useAuthStore();
            // 1. Nếu chưa login
            if (!auth.userId) {
                toast.info("Bạn cần đăng nhập để chỉnh sửa truyện");
                return next({ name: 'create-story' });
            }

            // 2. Gọi API check owner
            const storyId = Number(to.params.id);
            const res = await checkStoryOwner(storyId);

            if (res.success && res.isOwner) {
                next(); // được phép vào trang
            } else {
                toast.error("Bạn không có quyền chỉnh sửa truyện này");
                next({ name: 'create-story' }); // redirect về trang khác
            }
        }
    },
    { path: '/profile', name: 'profile', component: ProfilePage, beforeEnter: requireAuth },
    { path: '/create-story/new-chap/:storyId', name: 'create-newchap', component: CreateNewTrapForm },
    { path: '/forbidden', name: 'forbidden', component: Forbidden },
    {
        path: '/article-page/:id', name: 'article', component: ArticleCategoryList, children: [

        ]
    },
    { path: '/user/:id', name: 'user', component: UserPage },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
    adminRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 👇 Quay lại trang trước sẽ giữ đúng vị trí cuộn
      return savedPosition
    } else {
      // 👇 Nếu là trang mới, cuộn lên đầu
      return { top: 0 }
    }
  },
})
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const loginModal = useLoginModal()

  if (to.name === 'payment') {
    if (!auth.userId) {    // chưa đăng nhập
      loginModal.open()   // mở modal
      return next(false)  // ngăn không cho chuyển route
    }
  }

  next()
})
export default router

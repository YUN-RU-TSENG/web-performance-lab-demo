import { createRouter, createWebHashHistory } from "vue-router"
import { useUserStore } from "@/stores/user"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/HomeView.vue"),
            meta: { requiresAuth: true }, // 設置需要登錄才能訪問
        },
        {
            path: "/a",
            name: "a",
            component: () => import("./views/PageAView.vue"),
            meta: { requiresAuth: true }, // 設置需要登錄才能訪問
        },
        {
            path: "/b",
            name: "b",
            component: () => import("./views/PageBView.vue"),
            meta: { requiresAuth: true }, // 設置需要登錄才能訪問
        },
        {
            path: "/c",
            name: "c",
            component: () => import("./views/PageCView.vue"),
            meta: { requiresAuth: true }, // 設置需要登錄才能訪問
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./views/LoginView.vue"),
            meta: { requiresGuest: true }, // 設置需要登錄才能訪問
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notFound",
            component: () => import("./views/NotFoundView.vue"),
        },
    ],
})

router.beforeEach((to, from, next) => {
    // 檢查目標路由是否需要登錄
    const userStore = useUserStore()

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // 檢查用戶是否已登錄
        // 未登錄，跳轉到登錄頁面
        if (!userStore.isLoggedIn) return next({ name: "login" })
    } else if (to.matched.some((record) => record.meta.requiresGuest)) {
        // 檢查用戶是否已登錄
        // 未登錄，跳轉到登錄頁面
        if (userStore.isLoggedIn) return next({ name: "home" })
    }

    return next()
})

export default router

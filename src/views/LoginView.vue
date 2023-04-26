<script setup>
    import { ref } from "vue"
    import { useUserStore } from "@/stores/user"
    import { useRouter } from "vue-router"

    // 用戶資料
    const user = ref({
        username: "",
        password: "",
    })

    // 登入
    const userStore = useUserStore()
    const { login } = userStore
    const router = useRouter()

    async function handleSubmit(user) {
        await login({ ...user })
        if (!userStore.error) router.push({ name: "home" })
    }
</script>

<template>
    <div>
        <div>Login</div>
        <section>
            <template v-if="userStore.isLoading">
                <div>Loading...</div>
            </template>
            <template v-else>
                <form
                    id="login-form"
                    @submit.prevent="() => handleSubmit({ ...user })"
                >
                    <input
                        id="username"
                        v-model="user.username"
                        type="text"
                        placeholder="kminchelle"
                        required
                    />
                    <input
                        id="password"
                        v-model="user.password"
                        placeholder="0lelplR"
                        type="password"
                        required
                    />
                    <input id="login-button" type="submit" />
                </form>
            </template>
        </section>
    </div>
</template>

<style scoped></style>

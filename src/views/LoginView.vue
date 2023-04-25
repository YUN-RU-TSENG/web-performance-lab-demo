<script setup>
    import { ref } from "vue"
    import { useUserStore } from "@/stores/user"
    import { useRouter } from "vue-router"

    // 用戶資料
    const user = ref({
        username: "kminchelle",
        password: "0lelplR",
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
                <form @click.prevent="() => handleSubmit({ ...user })">
                    <input v-model="user.username" type="text" required />
                    <input v-model="user.password" type="password" required />
                    <input type="submit" />
                </form>
            </template>
        </section>
    </div>
</template>

<style scoped></style>

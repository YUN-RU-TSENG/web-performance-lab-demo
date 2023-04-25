<script setup>
    import { useUserStore } from "@/stores/user"
    import { useRouter } from "vue-router"

    const userStore = useUserStore()
    const { logout } = userStore
    const router = useRouter()

    async function handleSubmit() {
        await logout()
        router.push({ name: "login" })
    }
</script>

<template>
    <div>
        <h2>Home</h2>
        <section>
            <form @click="() => handleSubmit()">
                <input type="submit" value="logout" />
            </form>
            <ul>
                <li>
                    <a href @click.prevent="$router.push({ name: 'login' })"
                        >Login</a
                    >
                </li>
                <li>
                    <a href @click.prevent="$router.push({ name: 'a' })"
                        >PageA</a
                    >
                </li>
                <li>
                    <a href @click.prevent="$router.push({ name: 'b' })"
                        >PageB</a
                    >
                </li>
            </ul>
        </section>
    </div>
</template>

<style scoped></style>

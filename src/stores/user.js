import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
    state() {
        return {
            user: JSON.parse(localStorage.getItem("user")),
            isLoading: false,
            error: null,
        }
    },
    getters: {
        isLoggedIn() {
            return !!this.user?.token
        },
    },
    actions: {
        async login({ password, username }) {
            try {
                this.error = null
                this.isLoading = true
                const data = await fetch("https://dummyjson.com/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                })

                this.isLoading = false
                const result = await data.json()
                this.user = result
                localStorage.setItem("user", JSON.stringify(this.user))
            } catch (error) {
                this.isLoading = false
                this.error = error
                console.error(error)
            }
        },
        logout() {
            this.error = null
            this.isLoading = true
            this.user = null
            localStorage.removeItem("user")
            this.isLoading = false
        },
    },
})

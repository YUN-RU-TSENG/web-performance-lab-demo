<script setup>
    import { ref } from "vue"
    import _ from "@/utils/lodash"

    const testData = ref([1, 2, 3, 4, 5, 6, 7])

    function reverseTestData() {
        const data = testData.value.slice()
        testData.value = _.reverse(data)
    }
</script>

<template>
    <div>
        <h2>PageA</h2>
        <section>
            <button @click="reverseTestData">reverse by lodash</button>
            <ul>
                <li v-for="item of testData" :key="item">{{ item }}</li>
            </ul>
        </section>
    </div>
</template>

<style scoped></style>

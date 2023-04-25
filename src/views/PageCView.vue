<script setup>
    import dayjs from "dayjs"
</script>

<template>
    <div>
        <h2>PageB</h2>
        <section>
            <p>今天日期是：</p>
            <p>{{ dayjs().format("YYYY/MM/DD") }}</p>
        </section>
    </div>
</template>

<style scoped></style>

<script setup>
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale,
        PointElement,
    } from "chart.js"
    import { Bar, Bubble } from "vue-chartjs"
    import { ref } from "vue"

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        PointElement
    )

    const barData = ref({
        data: {
            labels: ["January", "February", "March"],
            datasets: [{ data: [40, 20, 12] }],
        },
        options: {
            responsive: true,
        },
    })

    const bubbleData = ref({
        data: {
            datasets: [
                {
                    label: "Data One",
                    backgroundColor: "#f87979",
                    data: [
                        {
                            x: 20,
                            y: 25,
                            r: 5,
                        },
                        {
                            x: 40,
                            y: 10,
                            r: 10,
                        },
                        {
                            x: 30,
                            y: 22,
                            r: 30,
                        },
                    ],
                },
                {
                    label: "Data Two",
                    backgroundColor: "#7C8CF8",
                    data: [
                        {
                            x: 10,
                            y: 30,
                            r: 15,
                        },
                        {
                            x: 20,
                            y: 20,
                            r: 10,
                        },
                        {
                            x: 15,
                            y: 8,
                            r: 30,
                        },
                    ],
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    })

    const isShowBubble = ref(false)
    function toggleIsShowBubble() {
        isShowBubble.value = !isShowBubble.value
    }
</script>

<template>
    <div>
        <h2>PageC</h2>
        <section>
            <Bar :data="barData.data" :options="barData.options" />
            <div>
                <button @click="toggleIsShowBubble">toggle</button>
                <div v-if="isShowBubble">
                    <Bubble
                        :data="bubbleData.data"
                        :options="bubbleData.options"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped></style>

<script>
import { Line } from 'vue-chartjs';

export default {
    extends: Line,
    props: {
        prices: Array,
    },
    mounted() {
        this.drawChart(); 
    },
    updated() {
        this.drawChart(); 
    },
    methods: {
        drawChart() {
            if (!this.prices.length) return;

            this.renderChart(
                {
                    labels: this.prices.map((entry) => entry[0]),
                    datasets: [
                        {
                            label: 'Price Trend',
                            data: this.prices.map((entry) => entry[1]),
                            borderColor: '#42A5F5',
                            backgroundColor: 'rgba(66, 165, 245, 0.2)',
                            fill: true,
                        },
                    ],
                },
                {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                type: 'time',
                                time: {
                                    unit: 'month',
                                    displayFormats: {
                                        month: 'MMM YYYY',
                                    },
                                    tooltipFormat: 'MMM',
                                },
                                scaleLabel: {
                                    display: false,
                                    labelString: 'Date',
                                },
                            },
                        ],
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Цена (₽)',
                                },
                                ticks: {
                                    beginAtZero: false,
                                },
                            },
                        ],
                    },
                    legend: {
                        display: false,
                    },
                }
            );
        },
    },
};
</script>

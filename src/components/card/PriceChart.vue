<script>
import { Line } from 'vue-chartjs';
import 'chartjs-plugin-annotation';

export default {
    extends: Line,
    props: {
        prices: Array,
        bookings: Array,
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

            const labels = this.prices.map((entry) => entry[0]);
            const priceData = this.prices.map((entry) => entry[1]);

            const annotations = this.bookings.map((period) => ({
                type: 'box',
                xScaleID: 'x-axis-0',
                xMin: period[0],
                xMax: period[1],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 0.8)',
                borderWidth: 3,
            }));

            this.renderChart(
                {
                    labels,
                    datasets: [
                        {
                            label: 'Стоимость',
                            data: priceData,
                            borderColor: '#42A5F5',
                            backgroundColor: 'rgba(66, 165, 245, 0.2)',
                            fill: true,
                        },
                        {
                            label: 'Даты бронирования',
                            data: new Array(priceData.length).fill(null),
                            borderColor: 'rgba(255, 99, 132, 0.8)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 1,
                            pointRadius: 0,
                            fill: false,
                        },
                    ],
                },
                {
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                        callbacks: {
                            title: function (tooltipItems) {
                                return tooltipItems[0].label;
                            },
                            label: function (tooltipItem) {
                                let value = tooltipItem.value;
                                if (!value) return '';

                                return (value / 1000000).toFixed(1) + ' млн ₽';
                            },
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                type: 'time',
                                time: {
                                    unit: 'month',
                                    displayFormats: { month: 'MMM YYYY' },
                                    tooltipFormat: 'DD MMM YYYY',
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
                                    labelString: 'Стоимость (₽)',
                                },
                                ticks: {
                                    beginAtZero: false,
                                    callback: function (value) {
                                        if (value >= 1000000) {
                                            return (
                                                (value / 1000000).toFixed(1) +
                                                'млн'
                                            );
                                        }
                                        return value;
                                    },
                                },
                            },
                        ],
                    },
                    legend: {
                        onClick: () => {},
                        /*  labels: {
                            filter: function (legendItem) {
                                return legendItem.text !== ''; 
                            },
                        }, */
                    },
                    annotation: { annotations },
                }
            );
        },
    },
};
</script>

<script>
import { Line } from "vue-chartjs";
import "chartjs-plugin-annotation"; // ✅ Import annotation plugin

export default {
    extends: Line,
    props: {
        prices: Array,
        bookings: Array
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

            const annotations = this.bookings.map((period, index) => ({
                type: "box",
                xScaleID: "x-axis-0",
                xMin: period[0],
                xMax: period[1],
                backgroundColor: "rgba(255, 99, 132, 0.2)", 
                borderColor: "rgba(255, 99, 132, 0.8)",
                borderWidth: 1
            }));

            this.renderChart(
                {
                    labels,
                    datasets: [
                        {
                            label: "График цены",
                            data: priceData,
                            borderColor: "#42A5F5",
                            backgroundColor: "rgba(66, 165, 245, 0.2)",
                            fill: true
                        }
                    ]
                },
                {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                type: "time",
                                time: {
                                    unit: "month",
                                    displayFormats: {
                                        month: "MMM YYYY"
                                    },
                                    tooltipFormat: "MMM"
                                },
                                scaleLabel: {
                                    display: false,
                                    labelString: "Date"
                                }
                            }
                        ],
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Стоимость (₽)"
                                },
                                ticks: {
                                    beginAtZero: false
                                }
                            }
                        ]
                    },
                    legend: {
                        display: true
                    },
                    annotation: {
                        annotations 
                    }
                }
            );
        }
    }
};

</script>
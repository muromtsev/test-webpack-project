import Chart from 'chart.js';

let ctx = document.querySelector('.js-ctx-chart').getContext('2d');

let myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [130, 130, 260],
            backgroundColor: [
                'red',
                'orange',
                'blue',
            ],
            // weight: 1
        }],
        labels: ['Red', 'Orange', 'Blue']
    },
    options: {
        responsive: true,
        tooltips: {
            enabled: false
        },
        
    }
});
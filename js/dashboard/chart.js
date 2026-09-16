function initDashboardCharts() {
    const ctxEmp = document.getElementById('chart-employment-cohort');
    if (ctxEmp) {
        window.chartInstances.empCohort = new Chart(ctxEmp, {
            type: 'line',
            data: {
                labels: ['Spring 2022', 'Fall 2022', 'Spring 2023', 'Fall 2023', 'Spring 2024', 'Fall 2024', 'Spring 2025', 'Spring 2026'],
                datasets: [
                    { label: 'Full-time', data: [80, 140, 115, 150, 160, 190, 220, 240], borderColor: '#2563eb', backgroundColor: 'rgba(37, 99, 235, 0.1)', fill: true, tension: 0.35, borderWidth: 3, pointRadius: 3 },
                    { label: 'Internship', data: [75, 50, 95, 75, 110, 120, 110, 185], borderColor: '#d97706', borderDash: [4, 4], backgroundColor: 'transparent', tension: 0.35, borderWidth: 2, pointRadius: 2 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 8 } } }, x: { grid: { display: false }, ticks: { font: { size: 8 } } } } }
        });
    }

    const ctxOpt = document.getElementById('chart-opt-cohort');
    if (ctxOpt) {
        window.chartInstances.optCohort = new Chart(ctxOpt, {
            type: 'line',
            data: {
                labels: ['F22', 'SP23', 'SU23', 'F23', 'SP24', 'SU24', 'F24', 'SP25', 'SU25', 'F25', 'SP26'],
                datasets: [{ data: [43, 56, 58, 57, 64, 63, 71, 72, 62, 63, 65], borderColor: '#0d9488', backgroundColor: 'rgba(13, 148, 136, 0.1)', fill: true, tension: 0.3, borderWidth: 2.5, pointRadius: 3 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 30, max: 90, grid: { color: '#f1f5f9' }, ticks: { font: { size: 8 } } }, x: { grid: { display: false }, ticks: { font: { size: 8 } } } } }
        });
    }

    const ctxOptDonut = document.getElementById('chart-opt-donut');
    if (ctxOptDonut) {
        window.chartInstances.optDonut = new Chart(ctxOptDonut, {
            type: 'doughnut',
            data: { labels: ['Yes', 'No'], datasets: [{ data: [65, 35], backgroundColor: ['#0d9488', '#cbd5e1'], borderWidth: 0 }] },
            options: { cutout: '65%', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } }
        });
    }

    const ctxEmpDonut = document.getElementById('chart-emp-donut');
    if (ctxEmpDonut) {
        const total = window.dbState.placementData.length || 1;
        const employed = window.dbState.placementData.filter(d => (d.status || '').toLowerCase().includes('employ')).length;
        const pct = Math.round((employed / total) * 100) || 88;

        window.chartInstances.empDonut = new Chart(ctxEmpDonut, {
            type: 'doughnut',
            data: { labels: ['Yes', 'No'], datasets: [{ data: [pct, 100 - pct], backgroundColor: ['#4f46e5', '#cbd5e1'], borderWidth: 0 }] },
            options: { cutout: '65%', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } }
        });
        const label = document.getElementById('label-emp-yes');
        if (label) label.innerText = `${pct}% Yes`;
    }

    const ctxGauge = document.getElementById('chart-satisfaction-gauge');
    if (ctxGauge) {
        window.chartInstances.gauge = new Chart(ctxGauge, {
            type: 'doughnut',
            data: { labels: ['Satisfaction', 'Remaining'], datasets: [{ data: [98, 2], backgroundColor: ['#10b981', '#e2e8f0'], borderWidth: 0 }] },
            options: { rotation: -90, circumference: 180, cutout: '75%', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } }
        });
    }

    const ctxEventInfo = document.getElementById('chart-event-info');
    if (ctxEventInfo) {
        window.chartInstances.eventInfo = new Chart(ctxEventInfo, {
            type: 'bar',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    { label: 'Boot Camp', data: [2, 2, 1, 2, 2], backgroundColor: '#475569' },
                    { label: 'Career Talk', data: [3, 5, 7, 5, 4], backgroundColor: '#38bdf8' },
                    { label: 'Info Session', data: [5, 3, 5, 6, 3], backgroundColor: '#0284c7' },
                    { label: 'Other', data: [3, 2, 2, 2, 6], backgroundColor: '#2563eb' },
                    { label: 'Volunteer', data: [1, 1, 1, 1, 6], backgroundColor: '#f472b6' },
                    { label: 'Workshop', data: [1, 3, 2, 2, 2], backgroundColor: '#fef08a' },
                    { label: 'Total', data: [19, 15, 15, 15, 21], backgroundColor: '#eab308' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, pointStyle: 'circle', font: { size: 9, weight: 'bold' }, padding: 8 } } }, scales: { x: { stacked: true, grid: { display: false }, ticks: { font: { size: 9, weight: 'bold' } } }, y: { stacked: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 9 } } } } }
        });
    }
}
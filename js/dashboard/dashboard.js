window.onload = function() {
    // 현재 열려있는 HTML 파일에 맞는 기능들만 알아서 실행 (에러 방지)
    if(document.getElementById('chart-employment-cohort')) {
        initDashboardCharts();
        recalculateDashboardMetrics();
    }
    if(document.getElementById('company-logos-grid')) renderCompanyLogos();
    if(document.getElementById('excel-table-head')) renderExcelTable();
    if(document.getElementById('career-roster-body')) renderCareerRoster();
    if(document.getElementById('event-items-list')) {
        renderEventList();
        renderCurrentEvent();
        updateFeedbackDisplay();
    }
};

function recalculateDashboardMetrics() {
    const gradEl = document.getElementById('stat-total-graduates');
    if (gradEl) gradEl.innerText = (window.dbState.placementData.length > 0 ? 1248 + window.dbState.placementData.length : 1248).toLocaleString();

    if (window.chartInstances.empDonut) {
        const total = Math.max(window.dbState.placementData.length, 1);
        const employedCount = window.dbState.placementData.filter(d => (d.status || d.Status || '').toLowerCase().includes('employ')).length;
        const pct = Math.round((employedCount / total) * 100);
        
        window.chartInstances.empDonut.data.datasets[0].data = [pct, 100 - pct];
        window.chartInstances.empDonut.update();
        
        const label = document.getElementById('label-emp-yes');
        if (label) label.innerText = `${pct}% Yes`;
    }
}

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
        window.chartInstances.empDonut = new Chart(ctxEmpDonut, {
            type: 'doughnut',
            data: { labels: ['Yes', 'No'], datasets: [{ data: [35, 65], backgroundColor: ['#4f46e5', '#cbd5e1'], borderWidth: 0 }] },
            options: { cutout: '65%', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } }
        });
    }
}

function renderCompanyLogos() {
    const grid = document.getElementById('company-logos-grid');
    if (!grid) return;
    const companies = [
        { name: 'Apple', logo: 'fa-apple', color: 'text-slate-900', count: '56K' }, { name: 'Google', logo: 'fa-google', color: 'text-blue-500', count: '27K' },
        { name: 'Microsoft', logo: 'fa-microsoft', color: 'text-sky-600', count: '33K' }, { name: 'Amazon', logo: 'fa-amazon', color: 'text-amber-500', count: '17K' },
        { name: 'Meta', logo: 'fa-meta', color: 'text-blue-600', count: '13K' }, { name: 'GitHub', logo: 'fa-github', color: 'text-slate-800', count: '13K' },
        { name: 'Slack', logo: 'fa-slack', color: 'text-emerald-500', count: '12K' }, { name: 'Spotify', logo: 'fa-spotify', color: 'text-emerald-600', count: '5K' }
    ];
    grid.innerHTML = companies.map(c => `
        <div class="exec-sub-card p-3 flex flex-col items-center justify-center text-center hover:shadow-md transition-all group">
            <i class="fa-brands ${c.logo} ${c.color} text-3xl mb-1.5 group-hover:scale-110 transition-transform"></i>
            <span class="text-[11px] font-black text-slate-800">${c.count}</span>
        </div>
    `).join('');
}
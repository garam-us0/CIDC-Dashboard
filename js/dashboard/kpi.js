function recalculateDashboardMetrics() {
    const gradEl = document.getElementById('stat-total-graduates');
    if (gradEl) {
        gradEl.innerText = (window.dbState.placementData.length > 0 ? 1248 + window.dbState.placementData.length : 1248).toLocaleString();
    }

    if (window.chartInstances && window.chartInstances.empDonut) {
        const total = Math.max(window.dbState.placementData.length, 1);
        const employedCount = window.dbState.placementData.filter(d => (d.status || d.Status || '').toLowerCase().includes('employ')).length;
        const pct = Math.round((employedCount / total) * 100);
        
        window.chartInstances.empDonut.data.datasets[0].data = [pct, 100 - pct];
        window.chartInstances.empDonut.update();
        
        const label = document.getElementById('label-emp-yes');
        if (label) label.innerText = `${pct}% Yes`;
    }
    recalculateConsultationCount();
}

function selectCohortFilter(cohortName) { recalculateDashboardMetrics(); }

function resetToCurrentCohort() {
    const cohortSelect = document.getElementById('select-cohort-filter');
    if (cohortSelect) cohortSelect.value = 'All Cohorts';
    recalculateDashboardMetrics();
    
    const toast = document.getElementById('sync-toast');
    if (toast) {
        toast.querySelector('span').innerHTML = '<i class="fa-solid fa-circle-check mr-2 text-emerald-600"></i> Reset view to Current Cohort (Spring 2026)!';
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    }
}

function recalculateConsultationCount() {
    const yr = document.getElementById('select-consult-year')?.value || '2026';
    const season = document.getElementById('select-consult-season')?.value || 'Spring';
    const countMap = {
        '2026-Spring': '1,420 Sessions', '2026-Summer': '980 Sessions', '2026-Fall': '1,250 Sessions',
        '2025-Spring': '1,380 Sessions', '2025-Summer': '890 Sessions', '2025-Fall': '1,190 Sessions'
    };
    const key = `${yr}-${season}`;
    const countEl = document.getElementById('stat-consultation-count');
    if (countEl) countEl.innerText = countMap[key] || '1,200 Sessions';
}
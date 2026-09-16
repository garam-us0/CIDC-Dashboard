function renderCompanyLogos() {
    const grid = document.getElementById('company-logos-grid');
    if (!grid) return;
    const companies = [
        { name: 'Apple', logo: 'fa-apple', color: 'text-slate-900', count: '56K' },
        { name: 'Google', logo: 'fa-google', color: 'text-blue-500', count: '27K' },
        { name: 'Microsoft', logo: 'fa-microsoft', color: 'text-sky-600', count: '33K' },
        { name: 'Amazon', logo: 'fa-amazon', color: 'text-amber-500', count: '17K' },
        { name: 'Meta', logo: 'fa-meta', color: 'text-blue-600', count: '13K' },
        { name: 'GitHub', logo: 'fa-github', color: 'text-slate-800', count: '13K' },
        { name: 'Slack', logo: 'fa-slack', color: 'text-emerald-500', count: '12K' },
        { name: 'Spotify', logo: 'fa-spotify', color: 'text-emerald-600', count: '5K' }
    ];
    grid.innerHTML = companies.map(c => `
        <div class="exec-sub-card p-3 flex flex-col items-center justify-center text-center hover:shadow-md transition-all group">
            <i class="fa-brands ${c.logo} ${c.color} text-3xl mb-1.5 group-hover:scale-110 transition-transform"></i>
            <span class="text-[11px] font-black text-slate-800">${c.count}</span>
        </div>
    `).join('');
}

window.addEventListener('DOMContentLoaded', () => {
    if (typeof renderCompanyLogos === 'function') renderCompanyLogos();
    if (typeof renderEventList === 'function') renderEventList();
    if (typeof renderCurrentEvent === 'function') renderCurrentEvent();
    if (typeof initDashboardCharts === 'function') initDashboardCharts();
    if (typeof updateFeedbackDisplay === 'function') updateFeedbackDisplay();
    if (typeof recalculateDashboardMetrics === 'function') recalculateDashboardMetrics();
});
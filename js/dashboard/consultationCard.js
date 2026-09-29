// 대시보드 "Satisfaction & Consultation" 카드: Consultation 시트의 실제 기록으로 계산
let consultReviews = [];
let consultReviewIdx = 0;

function populateConsultYears(records) {
    const select = document.getElementById('select-consult-year');
    if (!select) return;
    const years = getConsultationYears(records);
    const prev = select.value;
    select.innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join('');
    select.value = years.includes(prev) ? prev : years[0];
}

function renderConsultationCard() {
    const records = getConsultationRecords();
    populateConsultYears(records);

    const year = document.getElementById('select-consult-year')?.value;
    const season = document.getElementById('select-consult-season')?.value || 'All';
    const filtered = filterConsultations(records, year, season);
    const stats = consultationStats(filtered);

    const countEl = document.getElementById('stat-consultation-count');
    if (countEl) countEl.innerText = `${stats.sessions.toLocaleString()} Sessions`;

    const pctEl = document.getElementById('stat-satisfaction-pct');
    if (pctEl) pctEl.innerText = stats.highPct === null ? 'No data' : `${Math.round(stats.highPct)}%`;
    const avgEl = document.getElementById('stat-satisfaction-avg');
    if (avgEl) avgEl.innerText = stats.avg === null ? '' : `Avg ${stats.avg.toFixed(1)} / 5.0 · ${stats.ratedCount} ratings`;
    const gauge = window.chartInstances.gauge;
    if (gauge) {
        const pct = stats.highPct === null ? 0 : stats.highPct;
        gauge.data.datasets[0].data = [pct, 100 - pct];
        gauge.update();
    }

    consultReviews = filtered
        .filter(r => r.review)
        .sort((a, b) => (b.sessionDate || '').localeCompare(a.sessionDate || ''));
    if (consultReviewIdx >= consultReviews.length) consultReviewIdx = 0;
    updateFeedbackDisplay();
}

function updateFeedbackDisplay() {
    const topicEl = document.getElementById('feedback-topic');
    const textEl = document.getElementById('feedback-text-container');
    const metaEl = document.getElementById('feedback-meta');
    const dots = document.getElementById('feedback-dots');
    if (!textEl) return;

    if (consultReviews.length === 0) {
        textEl.innerText = 'No reviews for this period yet.';
        [topicEl, metaEl, dots].forEach(el => { if (el) el.innerHTML = ''; });
        return;
    }

    const rec = consultReviews[consultReviewIdx];
    const rating = toRating(rec.rating);
    const stars = rating === null ? '' : '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
    textEl.innerText = `"${rec.review}"`;
    if (topicEl) topicEl.innerText = rec.topic || '';
    if (metaEl) metaEl.innerText = [rec.sessionDate, rec.counselor, stars].filter(Boolean).join(' · ');

    if (dots) {
        dots.innerHTML = consultReviews.length > 10
            ? `<span class="text-[9px] font-bold text-slate-400">${consultReviewIdx + 1} / ${consultReviews.length}</span>`
            : consultReviews.map((_, i) => `<span class="w-2 h-2 rounded-full ${i === consultReviewIdx ? 'bg-blue-600' : 'bg-slate-300'}"></span>`).join('');
    }
}

function prevFeedback() {
    if (!consultReviews.length) return;
    consultReviewIdx = (consultReviewIdx - 1 + consultReviews.length) % consultReviews.length;
    updateFeedbackDisplay();
}

function nextFeedback() {
    if (!consultReviews.length) return;
    consultReviewIdx = (consultReviewIdx + 1) % consultReviews.length;
    updateFeedbackDisplay();
}

// 상단 KPI "STUDENT SATISFACTION": 전체 상담 기록 기준
function renderSatisfactionKpi() {
    const stats = consultationStats(getConsultationRecords());
    const pctEl = document.getElementById('kpi-satisfaction-pct');
    const avgEl = document.getElementById('kpi-satisfaction-avg');
    const subEl = document.getElementById('kpi-satisfaction-sub');
    if (pctEl) pctEl.innerText = stats.highPct === null ? '-' : `${stats.highPct.toFixed(1)}%`;
    if (avgEl) avgEl.innerText = stats.avg === null ? '-' : `${stats.avg.toFixed(1)}/5.0`;
    if (subEl) subEl.innerText = stats.ratedCount
        ? `Based on ${stats.ratedCount.toLocaleString()} rated consultations`
        : 'No ratings yet — add records to the Consultation sheet';
}

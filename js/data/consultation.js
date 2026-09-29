// 상담 기록(Consultation 시트) 표준 형식 & 집계
// 한 행 = 상담 1건: { sessionDate, student, counselor, topic, rating, review }
const CONSULT_FIELDS = ['sessionDate', 'student', 'counselor', 'topic', 'rating', 'review'];

const CONSULT_FIELD_LABELS = {
    sessionDate: 'Session Date',
    student: 'Student',
    counselor: 'Counselor',
    topic: 'Topic',
    rating: 'Rating (1–5)',
    review: 'Review'
};

// 엑셀 헤더(대소문자·공백 무시) -> 표준 필드명
const CONSULT_HEADER_ALIASES = {
    sessionDate: ['sessiondate', 'date', 'consultationdate'],
    student: ['student', 'studentname', 'name'],
    counselor: ['counselor', 'counsellor', 'advisor', 'consultant'],
    topic: ['topic', 'subject', 'category'],
    rating: ['rating', 'score', 'satisfaction', 'stars'],
    review: ['review', 'feedback', 'comment', 'comments']
};

const normalizeHeader = h => String(h).toLowerCase().replace(/[\s_\-()]/g, '');
const CONSULT_HEADER_LOOKUP = {};
Object.entries(CONSULT_HEADER_ALIASES).forEach(([field, aliases]) => {
    aliases.forEach(a => { CONSULT_HEADER_LOOKUP[normalizeHeader(a)] = field; });
});

// 엑셀 날짜(Date 객체, 일련번호, '2026.03.15', '2026/3/5' 등) -> 'YYYY-MM-DD'
function toIsoDate(value) {
    if (value === undefined || value === null || value === '') return '';
    let d = null;
    if (value instanceof Date) d = value;
    else if (typeof value === 'number' && value > 20000 && value < 80000) d = new Date(Math.round((value - 25569) * 86400000));
    else {
        const m = /^(\d{4})[.\-/\s]+(\d{1,2})[.\-/\s]+(\d{1,2})/.exec(String(value).trim());
        if (m) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
        const parsed = new Date(value);
        if (!isNaN(parsed)) d = parsed;
    }
    if (!d || isNaN(d)) return String(value);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// '5', '4.5', '4/5', '★★★★' -> 숫자 (1~5 밖이면 null)
function toRating(value) {
    if (value === undefined || value === null || value === '') return null;
    const stars = (String(value).match(/★/g) || []).length;
    const n = stars || parseFloat(String(value).replace(',', '.'));
    return n >= 1 && n <= 5 ? n : null;
}

function normalizeConsultationRecord(raw) {
    const rec = {};
    Object.entries(raw).forEach(([key, value]) => {
        const field = CONSULT_HEADER_LOOKUP[normalizeHeader(key)] || key;
        rec[field] = typeof value === 'string' ? value.trim() : value;
    });
    rec.sessionDate = toIsoDate(rec.sessionDate);
    const rating = toRating(rec.rating);
    rec.rating = rating === null ? '' : rating;
    CONSULT_FIELDS.forEach(f => { if (rec[f] === undefined) rec[f] = ''; });
    return rec;
}

function normalizeConsultationData(rows) {
    return rows.map(normalizeConsultationRecord).filter(r => r.sessionDate || r.student || r.review);
}

// Spring = Jan–May, Summer = Jun–Aug, Fall = Sep–Dec
function seasonOfDate(iso) {
    const month = Number((iso || '').slice(5, 7));
    if (!month) return '';
    if (month <= 5) return 'Spring';
    if (month <= 8) return 'Summer';
    return 'Fall';
}

function getConsultationYears(records) {
    const years = new Set(records.map(r => (r.sessionDate || '').slice(0, 4)).filter(y => /^\d{4}$/.test(y)));
    if (years.size === 0) years.add(String(new Date().getFullYear()));
    return [...years].sort((a, b) => b - a);
}

function filterConsultations(records, year, season) {
    return records.filter(r => {
        if (year && year !== 'All' && (r.sessionDate || '').slice(0, 4) !== year) return false;
        if (season && season !== 'All' && seasonOfDate(r.sessionDate) !== season) return false;
        return true;
    });
}

function consultationStats(records) {
    const ratings = records.map(r => toRating(r.rating)).filter(n => n !== null);
    const high = ratings.filter(n => n >= 4).length;
    return {
        sessions: records.length,
        ratedCount: ratings.length,
        highPct: ratings.length ? (high / ratings.length) * 100 : null,
        avg: ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null
    };
}

function getConsultationRecords() {
    return normalizeConsultationData(window.dbState.consultationData || []);
}

// 실제 기록 입력용 엑셀 양식 (헤더 + 예시 1행)
function downloadConsultationTemplate() {
    const rows = [{
        'Session Date': '2026-03-15', 'Student': 'Jane Doe', 'Counselor': 'Dr. Robert Carter',
        'Topic': 'OPT Filing & Resume Review', 'Rating': 5, 'Review': 'The session made the OPT application process clear.'
    }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), 'Consultation');
    XLSX.writeFile(wb, 'CIDC_Consultation_Template.xlsx');
}

// 파일 위치: js/data/dbState.js

const defaultState = {
    activeExcelSheet: 'Placement',
    currentEventIdx: 0,
    currentFeedbackIdx: 0,
    placementData: [
        { id: 'STU-101', studentName: 'Alex Johnson', cohort: 'Spring 2024', major: 'Computer Science', company: 'Apple', role: 'Software Engineer', status: 'Employed' },
        { id: 'STU-102', studentName: 'Sarah Smith', cohort: 'Fall 2023', major: 'Data Science', company: 'Google', role: 'Data Analyst', status: 'Employed' },
        { id: 'STU-103', studentName: 'Michael Brown', cohort: 'Spring 2025', major: 'UX Design', company: 'Microsoft', role: 'Product Designer', status: 'Employed' },
        { id: 'STU-104', studentName: 'Emily Davis', cohort: 'Spring 2024', major: 'Business Analytics', company: 'Amazon', role: 'Financial Analyst', status: 'Employed' }
    ],
    optData: [],
    consultationData: [],
    eventData: [
        { title: 'OPT Workshop & Legal Seminar', date: '2026-02-15', attendance: 220, photo: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80', desc: 'Comprehensive visa & STEM OPT guidance.' }
    ],
    feedbackList: [
        '"The Career Fair organized by CIDC was directly responsible for my full-time offer at Microsoft!"'
    ]
};

// 브라우저 저장소에서 데이터 불러오기 (새로고침/페이지 이동 시 데이터 증발 방지)
function loadState() {
    const saved = localStorage.getItem('cidc_dashboard_data');
    if (saved) {
        return JSON.parse(saved);
    }
    return defaultState;
}

window.dbState = loadState();
window.chartInstances = {};

// 엑셀 업로드 시 이 함수를 호출하여 데이터를 영구 저장
window.saveState = function() {
    localStorage.setItem('cidc_dashboard_data', JSON.stringify(window.dbState));
};
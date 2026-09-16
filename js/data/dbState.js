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
    optData: [
        { studentId: 'STU-101', name: 'Alex Johnson', optType: 'STEM 24-Mo', status: 'Approved', startDate: '2024-06-01', employer: 'Apple' }
    ],
    consultationData: [
        { sessionDate: '2026-03-15', student: 'Alex Johnson', counselor: 'Dr. Robert Carter', topic: 'OPT Legal Filing & Resume Review', rating: 5 }
    ],
    eventData: [
        { title: 'OPT Workshop & Legal Seminar', date: '2026-02-15', attendance: 220, photo: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80', desc: 'Comprehensive visa & STEM OPT guidance with certified immigration attorneys.' },
        { title: 'Annual Spring Career Fair 2026', date: '2026-03-10', attendance: 450, photo: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80', desc: 'Over 50 global tech and finance corporations recruiting on-campus.' },
        { title: 'Tech Alumni Networking Night', date: '2026-02-28', attendance: 180, photo: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1000&auto=format&fit=crop&q=80', desc: 'Direct 1-on-1 mentorship with senior engineers from Silicon Valley.' },
        { title: 'Resume & Portfolio Review Blitz', date: '2026-01-20', attendance: 310, photo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80', desc: 'Personalized feedback sessions with top corporate recruiters.' }
    ],
    feedbackList: [
        '"The Career Fair organized by CIDC was directly responsible for my full-time offer at Microsoft!"',
        '"10/10 mock interview sessions. I felt 100% prepared for tech screen questions at Apple!"',
        '"The OPT legal seminar clarified all my F1 visa questions and streamlined my EAD application."'
    ]
};

// 페이지 이동 시 데이터 증발을 막기 위한 로컬스토리지 로딩
function loadState() {
    const saved = localStorage.getItem('cidc_dashboard_data_v2');
    if (saved) return JSON.parse(saved);
    return defaultState;
}

window.dbState = loadState();
window.chartInstances = {};

// 엑셀 업로드 시 이 함수가 호출되어 브라우저에 데이터를 영구 저장함
window.saveStateToStorage = function() {
    localStorage.setItem('cidc_dashboard_data_v2', JSON.stringify(window.dbState));
};

// 현재 탭에 맞는 데이터 배열을 반환하는 함수 (모든 파일에서 공유됨)
window.getActiveSheetData = function() {
    if (window.dbState.activeExcelSheet === 'Placement') return window.dbState.placementData;
    if (window.dbState.activeExcelSheet === 'OPT') return window.dbState.optData;
    if (window.dbState.activeExcelSheet === 'Consultation') return window.dbState.consultationData;
    if (window.dbState.activeExcelSheet === 'Event') return window.dbState.eventData;
    return [];
};
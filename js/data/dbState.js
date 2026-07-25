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
        { sessionDate: '2026-03-15', student: 'Alex Johnson', counselor: 'Dr. Robert Carter', topic: 'OPT Legal Filing', rating: 5 }
    ],
    eventData: [
        { title: 'OPT Workshop & Legal Seminar', date: '2026-02-15', attendance: 220, photo: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80', desc: 'Comprehensive visa & STEM OPT guidance with certified immigration attorneys.' },
        { title: 'Annual Spring Career Fair 2026', date: '2026-03-10', attendance: 450, photo: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80', desc: 'Over 50 global tech and finance corporations recruiting on-campus.' }
    ],
    feedbackList: [
        '"The Career Fair organized by CIDC was directly responsible for my full-time offer at Microsoft!"',
        '"10/10 mock interview sessions. I felt 100% prepared for tech screen questions at Apple!"'
    ]
};

// 브라우저 캐시(로컬 스토리지)에서 데이터 불러오기
function loadState() {
    const saved = localStorage.getItem('cidc_db');
    return saved ? JSON.parse(saved) : defaultState;
}

window.dbState = loadState();
window.chartInstances = {};

// 엑셀 업로드 시 데이터를 영구 저장하는 함수
window.saveState = function() {
    localStorage.setItem('cidc_db', JSON.stringify(window.dbState));
};
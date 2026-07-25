// 전역 데이터 객체. 다른 모든 JS 파일들이 이 데이터를 공유해서 사용해.
window.dbState = {
    activeExcelSheet: 'Placement',
    placementData: [
        { id: 'STU-101', studentName: 'Alex Johnson', cohort: 'Spring 2024', major: 'Computer Science', company: 'Apple', status: 'Employed' },
        { id: 'STU-102', studentName: 'Sarah Smith', cohort: 'Fall 2023', major: 'Data Science', company: 'Google', status: 'Employed' }
    ]
};

// Chart.js 그래프들을 담아둘 빈 객체
window.chartInstances = {};
// HTML 문서가 전부 로드되면 실행되는 메인 함수
window.onload = function() {
    if(typeof initDashboardCharts === 'function') initDashboardCharts();
    if(typeof recalculateDashboardMetrics === 'function') recalculateDashboardMetrics();
    
    // 만약 데이터 관리 페이지에서 테이블 렌더링 함수가 있다면 실행
    if(typeof renderExcelTable === 'function') renderExcelTable();
};

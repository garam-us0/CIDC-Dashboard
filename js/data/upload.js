// 파일 위치: js/data/upload.js

function handleFileUpload(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        
        if (json.length > 0) {
            // 파싱된 엑셀 데이터를 전역 상태에 덮어씌움
            window.dbState.placementData = json;
            
            // ★ 핵심: 로컬 스토리지에 데이터 영구 저장
            window.saveState();
            
            // 화면의 테이블 리렌더링
            if(typeof renderExcelTable === 'function') renderExcelTable();
            
            alert(`총 ${json.length}개의 데이터가 성공적으로 업로드 및 저장되었습니다! Dashboard 탭에서 확인하세요.`);
        } else {
            alert("업로드 실패: 엑셀 파일이 비어있거나 형식이 맞지 않습니다.");
        }
    };
    
    reader.readAsArrayBuffer(file);
}

function renderExcelTable() {
    const data = window.dbState.placementData;
    const head = document.getElementById('excel-table-head');
    const body = document.getElementById('excel-table-body');
    if (!head || !body) return;

    if (!data || data.length === 0) {
        head.innerHTML = '<tr><th class="p-3">No Records Available</th></tr>';
        body.innerHTML = '';
        return;
    }

    const keys = Object.keys(data[0]);
    head.innerHTML = `<tr>${keys.map(k => `<th class="p-3">${k}</th>`).join('')}</tr>`;
    body.innerHTML = data.map(row => `
        <tr class="hover:bg-slate-50 transition-colors border-t border-slate-200">
            ${keys.map(k => `<td class="p-3">${row[k]}</td>`).join('')}
        </tr>
    `).join('');
}
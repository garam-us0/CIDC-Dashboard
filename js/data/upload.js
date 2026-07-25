function handleFileUpload(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        
        if (json.length > 0) {
            window.dbState.placementData = json;
            renderExcelTable();
            alert("데이터 변환 및 업로드가 완료되었습니다!");
        }
    };
    reader.readAsArrayBuffer(file);
}

function renderExcelTable() {
    const data = window.dbState.placementData;
    const head = document.getElementById('excel-table-head');
    const body = document.getElementById('excel-table-body');
    if (!head || !body) return;

    if (data.length === 0) {
        head.innerHTML = '<tr><th class="p-3">No Records Available</th></tr>';
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
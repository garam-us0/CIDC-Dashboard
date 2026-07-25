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
            window.saveState(); // 엑셀 데이터 저장
            renderExcelTable();
            
            const toast = document.getElementById('sync-toast');
            if (toast) {
                toast.classList.remove('hidden');
                setTimeout(() => toast.classList.add('hidden'), 4000);
            }
        }
    };
    reader.readAsArrayBuffer(file);
}

function renderExcelTable() {
    const data = window.dbState.placementData;
    const head = document.getElementById('excel-table-head');
    const body = document.getElementById('excel-table-body');
    const info = document.getElementById('table-row-info');
    if (!head || !body) return;

    if (data.length === 0) {
        head.innerHTML = '<tr><th class="p-3">No Records Available</th></tr>';
        body.innerHTML = '';
        if(info) info.innerText = '0 Records';
        return;
    }

    const keys = Object.keys(data[0]);
    head.innerHTML = `<tr>${keys.map(k => `<th class="p-3">${k}</th>`).join('')}<th class="p-3 text-center">Action</th></tr>`;
    body.innerHTML = data.map((row, rIdx) => `
        <tr class="hover:bg-slate-50 transition-colors">
            ${keys.map(k => `<td class="p-3 border-t border-slate-200">${row[k]}</td>`).join('')}
            <td class="p-3 border-t border-slate-200 text-center">
                <button onclick="deleteRow(${rIdx})" class="text-rose-600 hover:text-rose-800 p-1"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
    `).join('');
    if(info) info.innerText = `Showing ${data.length} records`;
}

function deleteRow(idx) {
    window.dbState.placementData.splice(idx, 1);
    window.saveState();
    renderExcelTable();
}

function switchExcelSheet(sheetName) {
    window.dbState.activeExcelSheet = sheetName;
    ['Placement', 'OPT', 'Consultation', 'Event'].forEach(s => {
        const btn = document.getElementById(`sheet-btn-${s}`);
        if (btn) btn.className = s === sheetName ? 'px-4 py-1.5 rounded-lg font-extrabold text-[10px] bg-blue-600 text-white shadow-sm' : 'px-4 py-1.5 rounded-lg font-extrabold text-[10px] bg-slate-100 text-slate-700 hover:bg-slate-200';
    });
}
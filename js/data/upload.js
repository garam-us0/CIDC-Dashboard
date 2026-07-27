function handleFileUpload(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        if (json.length > 0) {
            if (window.dbState.activeExcelSheet === 'Placement') window.dbState.placementData = json;
            else if (window.dbState.activeExcelSheet === 'OPT') window.dbState.optData = json;
            else if (window.dbState.activeExcelSheet === 'Consultation') window.dbState.consultationData = json;
            else if (window.dbState.activeExcelSheet === 'Event') window.dbState.eventData = json;
            
            window.saveStateToStorage();
            
            if (typeof updateTabCounts === 'function') updateTabCounts();
            renderExcelTable();
            if (typeof showSyncToast === 'function') showSyncToast();
        }
    };
    reader.readAsArrayBuffer(file);
}

function renderExcelTable() {
    const data = window.getActiveSheetData();
    const head = document.getElementById('excel-table-head');
    const body = document.getElementById('excel-table-body');
    const info = document.getElementById('table-row-info');
    if (!head || !body || !info) return;

    if (data.length === 0) {
        head.innerHTML = '<tr><th class="p-3">No Records Available</th></tr>';
        body.innerHTML = '';
        info.innerText = '0 Records';
        return;
    }

    const keys = Object.keys(data[0]);
    head.innerHTML = `<tr>${keys.map(k => `<th class="p-3">${k}</th>`).join('')}<th class="p-3 text-center">Action</th></tr>`;
    body.innerHTML = data.map((row, rIdx) => `
        <tr class="hover:bg-slate-50 transition-colors">
            ${keys.map(k => `<td class="p-3 border-t border-slate-200">${row[k]}</td>`).join('')}
            <td class="p-3 border-t border-slate-200 text-center">
                <button onclick="deleteRow(${rIdx})" class="text-rose-600 hover:text-rose-800 p-1" title="Delete Row">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        </tr>
    `).join('');
    info.innerText = `Showing ${data.length} records in ${window.dbState.activeExcelSheet} Sheet`;
}

function filterExcelTable() {
    const query = document.getElementById('excel-search-input')?.value.toLowerCase();
    if (query === undefined) return;
    document.querySelectorAll('#excel-table-body tr').forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
}

function deleteRow(idx) {
    window.getActiveSheetData().splice(idx, 1);
    window.saveStateToStorage();
    if (typeof updateTabCounts === 'function') updateTabCounts();
    renderExcelTable();
    if (typeof showSyncToast === 'function') showSyncToast();
}

function switchExcelSheet(sheetName) {
    window.dbState.activeExcelSheet = sheetName;
    window.saveStateToStorage();
    ['Placement', 'OPT', 'Consultation', 'Event'].forEach(s => {
        const btn = document.getElementById(`sheet-btn-${s}`);
        if (btn) btn.className = s === sheetName ? 'px-4 py-1.5 rounded-lg font-extrabold text-[10px] bg-blue-600 text-white shadow-sm' : 'px-4 py-1.5 rounded-lg font-extrabold text-[10px] bg-slate-100 text-slate-700 hover:bg-slate-200';
    });
    renderExcelTable();
}

function updateTabCounts() {
    const map = {
        'placement': window.dbState.placementData.length,
        'opt': window.dbState.optData.length,
        'consultation': window.dbState.consultationData.length,
        'event': window.dbState.eventData.length
    };
    Object.keys(map).forEach(k => {
        const el = document.getElementById(`count-sheet-${k}`);
        if (el) el.innerText = map[k];
    });
}

function exportCurrentSheetToCSV() {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(window.getActiveSheetData()), window.dbState.activeExcelSheet);
    XLSX.writeFile(wb, `CIDC_${window.dbState.activeExcelSheet}.csv`);
}
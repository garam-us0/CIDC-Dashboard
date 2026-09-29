function openSheetModal(sheetName) {
    window.dbState.activeExcelSheet = sheetName;
    const title = document.getElementById('modal-sheet-title');
    if (title) title.innerText = `${sheetName} Sheet Quick View`;
    const data = window.getActiveSheetData();
    const container = document.getElementById('modal-sheet-content');
    if (container) {
        if (data.length === 0) {
            container.innerHTML = `<p class="text-[10px] text-slate-500 p-3">No records found.</p>`;
        } else {
            const keys = Object.keys(data[0]);
            container.innerHTML = `
                <div class="overflow-x-auto border border-slate-200 rounded-xl">
                    <table class="w-full text-left text-[10px] text-slate-700">
                        <thead class="bg-slate-100 uppercase text-[10px] font-black text-slate-600 border-b border-slate-200">
                            <tr>${keys.map(k => `<th class="p-3">${k}</th>`).join('')}</tr>
                        </thead>
                        <tbody class="divide-y divide-slate-200 bg-white">
                            ${data.map(row => `<tr>${keys.map(k => `<td class="p-3">${row[k]}</td>`).join('')}</tr>`).join('')}
                        </tbody>
                    </table>
                </div>`;
        }
    }
    document.getElementById('sheet-modal')?.classList.replace('hidden', 'flex');
}

function closeSheetModal() { document.getElementById('sheet-modal')?.classList.replace('flex', 'hidden'); }
function goToExcelTabFromModal() { closeSheetModal(); window.location.href = 'data-management.html'; }

const FORM_INPUT_CLASS = 'w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-[10px] font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500';

// 상담 기록 입력 폼: 날짜 선택, 만족도 1~5, 후기 여러 줄 입력
function consultationFormField(k) {
    const label = CONSULT_FIELD_LABELS[k] || k;
    let input = `<input type="text" name="${k}" class="${FORM_INPUT_CLASS}">`;
    if (k === 'sessionDate') input = `<input type="date" name="${k}" required value="${toIsoDate(new Date())}" class="${FORM_INPUT_CLASS}">`;
    else if (k === 'student') input = `<input type="text" name="${k}" required class="${FORM_INPUT_CLASS}">`;
    else if (k === 'rating') input = `<select name="${k}" class="${FORM_INPUT_CLASS}"><option value="">-</option>${[5, 4, 3, 2, 1].map(n => `<option value="${n}">${'★'.repeat(n)} (${n})</option>`).join('')}</select>`;
    else if (k === 'review') input = `<textarea name="${k}" rows="3" class="${FORM_INPUT_CLASS}"></textarea>`;
    return `
        <div>
            <label class="block font-bold text-slate-700 mb-1 text-[10px]">${label}:</label>
            ${input}
        </div>`;
}

function addNewRowModal() {
    const isConsultation = window.dbState.activeExcelSheet === 'Consultation';
    const existingKeys = window.getActiveSheetData().length > 0 ? Object.keys(window.getActiveSheetData()[0]) : ['id', 'studentName', 'company', 'status'];
    const keys = isConsultation ? [...new Set([...CONSULT_FIELDS, ...existingKeys])] : existingKeys;
    const inputsContainer = document.getElementById('add-row-inputs');
    if (inputsContainer && isConsultation) {
        inputsContainer.innerHTML = keys.map(consultationFormField).join('');
    } else if (inputsContainer) {
        inputsContainer.innerHTML = keys.map(k => `
            <div>
                <label class="block font-bold text-slate-700 mb-1 capitalize text-[10px]">${k}:</label>
                <input type="text" name="${k}" required class="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-[10px] font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500">
            </div>
        `).join('');
    }
    document.getElementById('add-row-modal')?.classList.replace('hidden', 'flex');
}

function closeAddRowModal() { document.getElementById('add-row-modal')?.classList.replace('flex', 'hidden'); }

function submitNewRecord(e) {
    e.preventDefault();
    const newObj = {};
    new FormData(e.target).forEach((val, key) => newObj[key] = val);
    const isConsultation = window.dbState.activeExcelSheet === 'Consultation';
    window.getActiveSheetData().unshift(isConsultation ? normalizeConsultationRecord(newObj) : newObj);
    e.target.reset();
    window.saveStateToStorage();
    if (typeof updateTabCounts === 'function') updateTabCounts();
    if (typeof renderExcelTable === 'function') renderExcelTable();
    closeAddRowModal();
    if (typeof showSyncToast === 'function') showSyncToast();
}
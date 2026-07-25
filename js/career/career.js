function renderCareerRoster() {
    const body = document.getElementById('career-roster-body');
    if (!body) return;
    body.innerHTML = window.dbState.placementData.map((stu, idx) => `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="p-3 border-t border-slate-200 font-bold text-slate-900">${stu.studentName || stu.Name || '-'}</td>
            <td class="p-3 border-t border-slate-200 text-slate-500">${stu.cohort || '-'}</td>
            <td class="p-3 border-t border-slate-200 text-slate-500">${stu.major || '-'}</td>
            <td class="p-3 border-t border-slate-200 font-bold text-blue-600">${stu.company || '-'}</td>
            <td class="p-3 border-t border-slate-200 text-center">
                <button onclick="inspectStudentPath(${idx})" class="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold">
                    View Path
                </button>
            </td>
        </tr>
    `).join('');
}

function inspectStudentPath(idx) {
    const stu = window.dbState.placementData[idx];
    if (!stu) return;
    document.getElementById('selected-student-name').innerText = stu.studentName || stu.Name || '-';
    document.getElementById('selected-student-cohort').innerText = `Cohort: ${stu.cohort || '-'}`;
    document.getElementById('node-major').innerText = stu.major || '-';
    document.getElementById('node-internship').innerText = `${stu.company || '-'} - Intern`;
    document.getElementById('node-employment').innerText = `${stu.company || '-'} - ${stu.status || '-'}`;
}

function searchCareerPaths() {
    const query = document.getElementById('career-search-input')?.value.toLowerCase();
    if (query === undefined) return;
    document.querySelectorAll('#career-roster-body tr').forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
}
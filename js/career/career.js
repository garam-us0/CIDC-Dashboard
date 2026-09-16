window.addEventListener('DOMContentLoaded', () => {
    if (typeof renderCareerRoster === 'function') renderCareerRoster();
});

function renderCareerRoster() {
    const body = document.getElementById('career-roster-body');
    if (!body) return;
    body.innerHTML = window.dbState.placementData.map((stu, idx) => `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="p-3 border-t border-slate-200 font-bold text-slate-900">${stu.studentName || stu.Name || stu.StudentName || '-'}</td>
            <td class="p-3 border-t border-slate-200 text-slate-500">${stu.cohort || stu.Cohort || '-'}</td>
            <td class="p-3 border-t border-slate-200 text-slate-500">${stu.major || stu.Major || '-'}</td>
            <td class="p-3 border-t border-slate-200 font-bold text-blue-600">${stu.company || stu.Company || '-'}</td>
            <td class="p-3 border-t border-slate-200"><span class="bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-md font-extrabold text-[10px]">Approved</span></td>
            <td class="p-3 border-t border-slate-200"><span class="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-extrabold text-[10px]">${stu.status || stu.Status || 'Employed'}</span></td>
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
    document.getElementById('selected-student-name').innerText = stu.studentName || stu.Name || stu.StudentName || '-';
    document.getElementById('selected-student-cohort').innerText = `Cohort: ${stu.cohort || stu.Cohort || '-'}`;
    document.getElementById('node-major').innerText = stu.major || stu.Major || '-';
    document.getElementById('node-internship').innerText = `${stu.company || stu.Company || '-'} - Intern`;
    document.getElementById('node-opt').innerText = `OPT Approved`;
    document.getElementById('node-employment').innerText = `${stu.company || stu.Company || '-'} - ${stu.status || stu.Status || 'Employed'}`;
}

function searchCareerPaths() {
    const query = document.getElementById('career-search-input')?.value.toLowerCase();
    if (query === undefined) return;
    document.querySelectorAll('#career-roster-body tr').forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
}
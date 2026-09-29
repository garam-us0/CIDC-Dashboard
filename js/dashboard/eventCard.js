function renderEventList() {
    const listEl = document.getElementById('event-items-list');
    if (!listEl) return;
    listEl.innerHTML = window.dbState.eventData.map((evt, idx) => `
        <div onclick="selectEvent(${idx})" class="p-2.5 rounded-lg cursor-pointer text-[10px] font-bold flex justify-between items-center transition-all ${idx === window.dbState.currentEventIdx ? 'bg-blue-100 border border-blue-300 text-blue-900 shadow-sm' : 'hover:bg-slate-100 text-slate-600'}">
            <span class="truncate w-full">${evt.title}</span>
        </div>
    `).join('');
    
    const badge = document.getElementById('badge-event-count');
    if (badge) badge.innerText = `TOTAL : ${window.dbState.eventData.length}`;
}

function selectEvent(idx) { window.dbState.currentEventIdx = idx; renderEventList(); renderCurrentEvent(); }
function prevEvent() { window.dbState.currentEventIdx = (window.dbState.currentEventIdx - 1 + window.dbState.eventData.length) % window.dbState.eventData.length; renderEventList(); renderCurrentEvent(); }
function nextEvent() { window.dbState.currentEventIdx = (window.dbState.currentEventIdx + 1) % window.dbState.eventData.length; renderEventList(); renderCurrentEvent(); }

function renderCurrentEvent() {
    const evt = window.dbState.eventData[window.dbState.currentEventIdx];
    if (evt) {
        if(document.getElementById('event-photo-img')) document.getElementById('event-photo-img').src = evt.photo;
        if(document.getElementById('event-photo-title')) document.getElementById('event-photo-title').innerText = evt.title;
        if(document.getElementById('event-desc-text')) document.getElementById('event-desc-text').innerText = `"${evt.desc}"`;
        if(document.getElementById('event-attendance-text')) document.getElementById('event-attendance-text').innerText = `${evt.attendance} Students`;
        if(document.getElementById('event-date-text')) document.getElementById('event-date-text').innerText = evt.date;
    }
}


function renderEventList() {
    const listEl = document.getElementById('event-items-list');
    if (!listEl) return;
    listEl.innerHTML = window.dbState.eventData.map((evt, idx) => `
        <div onclick="selectEvent(${idx})" class="p-2.5 rounded-lg cursor-pointer text-[10px] font-bold flex justify-between items-center transition-all ${idx === window.dbState.currentEventIdx ? 'bg-blue-100 border border-blue-300 text-blue-900 shadow-sm' : 'hover:bg-slate-100 text-slate-600'}">
            <span class="truncate w-full">${evt.title}</span>
        </div>
    `).join('');
}

function selectEvent(idx) {
    window.dbState.currentEventIdx = idx; 
    renderEventList(); 
    renderCurrentEvent();
}

function prevEvent() {
    window.dbState.currentEventIdx = (window.dbState.currentEventIdx - 1 + window.dbState.eventData.length) % window.dbState.eventData.length;
    renderEventList(); 
    renderCurrentEvent();
}

function nextEvent() {
    window.dbState.currentEventIdx = (window.dbState.currentEventIdx + 1) % window.dbState.eventData.length;
    renderEventList(); 
    renderCurrentEvent();
}

function renderCurrentEvent() {
    const evt = window.dbState.eventData[window.dbState.currentEventIdx];
    if (evt) {
        const img = document.getElementById('event-photo-img');
        const title = document.getElementById('event-photo-title');
        const desc = document.getElementById('event-desc-text');
        
        if (img) img.src = evt.photo;
        if (title) title.innerText = evt.title;
        if (desc) desc.innerText = `"${evt.desc}"`;
    }
}
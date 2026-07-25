function renderEventList() {
    const listEl = document.getElementById('event-items-list');
    if (!listEl) return;
    listEl.innerHTML = window.dbState.eventData.map((evt, idx) => `
        <div onclick="selectEvent(${idx})" class="p-2.5 rounded-lg cursor-pointer text-[10px] font-bold flex justify-between items-center transition-all ${idx === window.dbState.currentEventIdx ? 'bg-blue-100 border border-blue-300 text-blue-900 shadow-sm' : 'hover:bg-slate-100 text-slate-600'}">
            <span class="truncate w-full">${evt.title}</span>
        </div>
    `).join('');
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
    }
}

function updateFeedbackDisplay() {
    const container = document.getElementById('feedback-text-container');
    const dots = document.getElementById('feedback-dots');
    if (container) container.innerText = window.dbState.feedbackList[window.dbState.currentFeedbackIdx];
    if (dots) {
        dots.innerHTML = window.dbState.feedbackList.map((_, i) =>
            `<span class="w-2 h-2 rounded-full ${i === window.dbState.currentFeedbackIdx ? 'bg-blue-600' : 'bg-slate-300'}"></span>`
        ).join('');
    }
}
function prevFeedback() { window.dbState.currentFeedbackIdx = (window.dbState.currentFeedbackIdx - 1 + window.dbState.feedbackList.length) % window.dbState.feedbackList.length; updateFeedbackDisplay(); }
function nextFeedback() { window.dbState.currentFeedbackIdx = (window.dbState.currentFeedbackIdx + 1) % window.dbState.feedbackList.length; updateFeedbackDisplay(); }
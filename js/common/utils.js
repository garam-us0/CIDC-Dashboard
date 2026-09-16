function updateLiveTimestamp() {
    const tsEl = document.getElementById('current-timestamp');
    if (!tsEl) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });
    tsEl.innerText = `Live Sync Active • ${timeStr}`;
}

function showSyncToast() {
    const toast = document.getElementById('sync-toast');
    if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 4000);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    updateLiveTimestamp();
    setInterval(updateLiveTimestamp, 60000);
});
// BAKIM SİSTEMİ - ANA JAVASCRIPT
const App = {
    showNotification(msg, type = 'success') {
        const colors = {success: '#10b981', error: '#ef4444', info: '#3b82f6'};
        const div = document.createElement('div');
        div.style.cssText = `position:fixed;top:20px;right:20px;background:${colors[type]};color:white;padding:1rem 1.5rem;border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,0.2);z-index:9999;`;
        div.textContent = msg;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 3000);
    },
    
    filterTable(tableId, searchInput) {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll('tbody tr');
        const term = searchInput.value.toLowerCase();
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    },
    
    validateForm(formId) {
        const form = document.getElementById(formId);
        const required = form.querySelectorAll('[required]');
        let valid = true;
        
        required.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                valid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        return valid;
    }
};

window.App = App;

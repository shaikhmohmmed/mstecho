document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.php-email-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage('success', 'Thank you! Your message has been sent.');
                form.reset();
            } else {
                showMessage('error', data.message || 'Something went wrong. Please try again.');
            }
        })
        .catch(error => {
            showMessage('error', 'Something went wrong. Please try again.');
        });
    });
});

function showMessage(type, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
    messageDiv.textContent = message;
    
    const form = document.querySelector('.php-email-form');
    const existingMessage = form.querySelector('.alert');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    form.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
} 
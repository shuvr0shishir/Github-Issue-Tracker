// Login Functionalities

const loginBtn = getById('login-btn')
loginBtn.addEventListener('click', () => {
    const warnings = document.querySelectorAll('.warning')
    warnings.forEach(w => {
        w.classList.add('hidden')
    });

    const username = getById('username');
    const password = getById('password');

    if (username.value.trim() === 'admin' && password.value.trim() === 'admin123') {
        password.value = ''
        window.location.assign('./main.html')
    } else {
        alert('username or password wrong!');
        username.value = ''
        password.value = ''
        warnings.forEach(w => {
            w.classList.remove('hidden')
        });
    }
});
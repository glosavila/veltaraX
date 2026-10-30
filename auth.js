document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const full_name = document.getElementById('fullName')?.value || document.getElementById('fullname')?.value || document.querySelector('input[name="full_name"]')?.value;
      const email = document.getElementById('email')?.value;
      const password = document.getElementById('password')?.value;
      const confirmPassword = document.getElementById('confirmPassword')?.value || document.getElementById('confirm_password')?.value;

      if (confirmPassword && password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ full_name, email, password })
        });
        const data = await res.json();
        if (res.ok) {
          alert(data.message);
          window.location.href = '/login.html';
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert("Cannot connect to server. Is backend running?");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email')?.value;
      const password = document.getElementById('password')?.value;

      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('veltarax_token', data.token);
          localStorage.setItem('veltarax_user', JSON.stringify(data.user));
          window.location.href = '/';
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert("Cannot connect to server");
      }
    });
  }
});
const API = 'http://localhost:5000/api';

async function signup() {
  await fetch(API + '/auth/signup', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  });
  window.location.href = 'login.html';
}

async function login() {
  const res = await fetch(API + '/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });
  const data = await res.json();
  localStorage.setItem('token', data.token);
  window.location.href = 'dashboard.html';
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

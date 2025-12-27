

// ================= SIGNUP =================
async function signup() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(API + '/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.msg || 'Signup failed');
    return;
  }

  alert('Signup successful. Please login.');
  window.location.href = 'login.html';
}

// ================= LOGIN =================
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.msg || 'Login failed');
    return;
  }

  // 🔥 TOKEN SAVE
  localStorage.setItem('token', data.token);

  // 🔥 JWT PAYLOAD READ (SAFE)
  const payload = JSON.parse(atob(data.token.split('.')[1]));

  // 🔥 ROLE BASED REDIRECT
  if (payload.role === 'admin') {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'dashboard.html';
  }
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}


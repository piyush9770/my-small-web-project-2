

document.addEventListener('DOMContentLoaded', loadResult);

async function loadResult() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const token = localStorage.getItem('token');
  if (!id || !token) {
    alert('Invalid access');
    window.location.href = 'dashboard.html';
    return;
  }

  const res = await fetch(API + '/ideas/' + id, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  const idea = await res.json();

  // BASIC INFO
  document.getElementById('title').innerText = idea.title;
  document.getElementById('status').innerText = idea.status;
  

  // ADMIN REVIEW
  const ar = idea.adminReview || {};

  document.getElementById('r-feedback').innerText =
    ar.feedbackText || 'No feedback yet';

  document.getElementById('r-percent').innerText =
    (ar.readinessPercent || 0) + '%';

  // Strengths
  const sBox = document.getElementById('r-strengths');
  sBox.innerHTML = '';
  (ar.strengths || []).forEach(s => {
    const li = document.createElement('li');
    li.innerText = s;
    sBox.appendChild(li);
  });

  // Improvements
  const iBox = document.getElementById('r-improvements');
  iBox.innerHTML = '';
  (ar.improvements || []).forEach(s => {
    const li = document.createElement('li');
    li.innerText = s;
    iBox.appendChild(li);
  });

  // Skills
  const kBox = document.getElementById('r-skills');
  kBox.innerHTML = '';
  (ar.suggestedSkills || []).forEach(s => {
    const span = document.createElement('span');
    span.innerText = s;
    span.style.marginRight = '8px';
    span.style.padding = '4px 8px';
    span.style.background = '#eef';
    kBox.appendChild(span);
  });
}


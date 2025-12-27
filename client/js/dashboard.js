document.addEventListener('DOMContentLoaded', loadMyIdeas);

async function loadMyIdeas() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const res = await fetch(API + '/ideas/my', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  const ideas = await res.json();

  const box = document.getElementById('myIdeaList');
  box.innerHTML = '';

  if (!ideas.length) {
    box.innerHTML = '<p>No ideas submitted yet.</p>';
    return;
  }

  ideas.forEach(i => {
    const div = document.createElement('div');
    div.style.border = '1px solid #ccc';
    div.style.padding = '12px';
    div.style.marginBottom = '15px';

    div.innerHTML = `
      <h3>${i.title}</h3>

      <p><b>Problem:</b><br>${i.problem}</p>

      <p><b>Solution:</b><br>${i.solution || '—'}</p>

      <p><b>Status:</b>
        <span style="color:${i.status === 'Approved' ? 'green' : i.status === 'Rejected' ? 'red' : 'orange'}">
          ${i.status}
        </span>
      </p>

      <a href="result.html?id=${i._id}">
        🔍 View Admin Review
      </a>
    `;

    box.appendChild(div);
  });
}



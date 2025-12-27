// ================= SKILLS LIST =================
const ALL_SKILLS = [
  'HTML',
  'CSS',
  'JavaScript',
  'DOM',
  'React',
  'Node.js',
  'Express.js',
  'MongoDB',

  // extra skills
  'TypeScript',
  'Git',
  'API Design',
  'Problem Solving',
  'Data Structures',
  'Algorithms',
  'SQL',
  'Python',
  'Java'
];

document.addEventListener('DOMContentLoaded', loadAllIdeas);

let allIdeas = [];

// ================= LOAD IDEAS =================
async function loadAllIdeas() {
  const token = localStorage.getItem('token');

  const res = await fetch(API + '/admin/ideas', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  allIdeas = await res.json();
  fillUserFilter(allIdeas);
  renderIdeas(allIdeas);
}

// ================= USER FILTER =================
function fillUserFilter(ideas) {
  const sel = document.getElementById('userFilter');
  sel.innerHTML = '<option value="all">All Users</option>';

  const users = {};
  ideas.forEach(i => {
    if (i.createdBy) {
      users[i.createdBy._id] = i.createdBy.email;
    }
  });

  Object.keys(users).forEach(id => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.innerText = users[id];
    sel.appendChild(opt);
  });
}

function applyFilter() {
  const uid = document.getElementById('userFilter').value;
  if (uid === 'all') {
    renderIdeas(allIdeas);
  } else {
    renderIdeas(allIdeas.filter(i => i.createdBy?._id === uid));
  }
}

// ================= RENDER IDEAS =================
function renderIdeas(ideas) {
  const box = document.getElementById('adminIdeaList');
  box.innerHTML = '';

  ideas.forEach(i => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <h3>${i.title}</h3>

      <p><b>User:</b> ${i.createdBy?.email || 'Unknown'}</p>

      <p><b>Problem:</b><br>${i.problem || '—'}</p>

      <p><b>Solution:</b><br>${i.solution || '—'}</p>

      <label>Status</label>
      <select onchange="changeStatus('${i._id}', this.value)">
        <option ${i.status === 'Pending' ? 'selected' : ''}>Pending</option>
        <option ${i.status === 'Approved' ? 'selected' : ''}>Approved</option>
        <option ${i.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
      </select>

      <label>Admin Feedback</label>
      <textarea id="fb-${i._id}">${i.adminReview?.feedbackText || ''}</textarea>

      <label>Strengths (comma separated)</label>
      <input id="st-${i._id}" value="${(i.adminReview?.strengths || []).join(',')}">

      <label>Improvements (comma separated)</label>
      <input id="im-${i._id}" value="${(i.adminReview?.improvements || []).join(',')}">

      <label>Suggested Skills</label>
      <div class="skill-box" id="skills-${i._id}"></div>

      <label>Readiness %</label>
      <input type="number" id="rp-${i._id}" value="${i.adminReview?.readinessPercent || ''}">

      <button onclick="saveReview('${i._id}')">💾 Save Review</button>

      <button onclick="deleteIdea('${i._id}')"
        style="margin-left:10px;background:red;color:white;">
        🗑 Delete Idea
      </button>
    `;

    box.appendChild(div);
    renderSkillButtons(i._id, i.adminReview?.suggestedSkills || []);
  });
}

// ================= SKILL BUTTONS =================
function renderSkillButtons(ideaId, selectedSkills) {
  const box = document.getElementById('skills-' + ideaId);
  box.innerHTML = '';

  ALL_SKILLS.forEach(skill => {
    const btn = document.createElement('span');
    btn.className = 'skill-btn';
    btn.innerText = skill;

    if (selectedSkills.includes(skill)) {
      btn.classList.add('active');
    }

    btn.onclick = () => {
      btn.classList.toggle('active');
    };

    box.appendChild(btn);
  });
}

function getSelectedSkills(ideaId) {
  const box = document.getElementById('skills-' + ideaId);
  return [...box.querySelectorAll('.skill-btn.active')]
    .map(b => b.innerText);
}

// ================= STATUS =================
async function changeStatus(id, status) {
  await fetch(API + '/admin/idea/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ status })
  });
}

// ================= SAVE REVIEW =================
async function saveReview(id) {
  const body = {
    adminReview: {
      feedbackText: document.getElementById('fb-' + id).value,
      strengths: document.getElementById('st-' + id).value.split(',').filter(Boolean),
      improvements: document.getElementById('im-' + id).value.split(',').filter(Boolean),
      suggestedSkills: getSelectedSkills(id),
      readinessPercent: Number(document.getElementById('rp-' + id).value)
    }
  };

  const res = await fetch(API + '/admin/idea/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    alert('Review saved successfully');
    loadAllIdeas();
  }
}

// ================= DELETE IDEA =================
async function deleteIdea(id) {
  if (!confirm('Are you sure you want to delete this idea?')) return;

  const res = await fetch(API + '/admin/idea/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  });

  if (res.ok) {
    alert('Idea deleted');
    loadAllIdeas();
  }
}

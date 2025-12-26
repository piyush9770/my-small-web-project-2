const API = 'http://localhost:5000/api';

async function submitIdea() {
  const token = localStorage.getItem('token');

  const res = await fetch(API + '/ideas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      title: title.value,
      problem: problem.value,
      solution: solution.value
    })
  });

  const data = await res.json();
  alert('Idea Score: ' + data.score);
}

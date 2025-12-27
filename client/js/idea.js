async function submitIdea() {
  const token = localStorage.getItem('token');

  await fetch(API + '/ideas', {
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

  location.href = 'dashboard.html';
}

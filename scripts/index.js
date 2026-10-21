// register sw
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js')
    .catch(err => console.log('sw error:', err));
}

// tab switcher
const navBtns = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    
    views.forEach(v => v.classList.remove('active'));
    navBtns.forEach(b => b.classList.remove('active'));
    
    document.getElementById(target).classList.add('active');
    btn.classList.add('active');
  });
});

// network check
const offlineBanner = document.getElementById('offline-banner');
const netStatus = document.getElementById('net-status');

function checkNetwork() {
  if (navigator.onLine) {
    offlineBanner.classList.add('hidden');
    if (netStatus) netStatus.textContent = "Online";
  } else {
    offlineBanner.classList.remove('hidden');
    if (netStatus) netStatus.textContent = "Offline";
  }
}

window.addEventListener('online', checkNetwork);
window.addEventListener('offline', checkNetwork);
checkNetwork();

// geo
let userCoords = null;
const locBtn = document.getElementById('btn-location');
const locStatus = document.getElementById('location-status');

locBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    locStatus.textContent = "GPS not supported";
    return;
  }
  
  locStatus.textContent = "Locating...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userCoords = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
      locStatus.textContent = `📍 ${userCoords}`;
    },
    () => locStatus.textContent = "Location access denied"
  );
});

// camera
const camBtn = document.getElementById('btn-camera');
const snapBtn = document.getElementById('btn-snap');
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const preview = document.getElementById('photo-preview');
let photoData = null;

camBtn.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
    video.classList.remove('hidden');
    snapBtn.classList.remove('hidden');
  } catch (err) {
    alert('Cannot access camera');
  }
});

snapBtn.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  
  photoData = canvas.toDataURL('image/jpeg');
  preview.src = photoData;
  preview.classList.remove('hidden');

  // stop stream
  const stream = video.srcObject;
  if (stream) stream.getTracks().forEach(t => t.stop());
  
  video.classList.add('hidden');
  snapBtn.classList.add('hidden');
});

// store & render
const form = document.getElementById('note-form');
const notesContainer = document.getElementById('notes-list');

function render() {
  const saved = JSON.parse(localStorage.getItem('notes') || '[]');
  notesContainer.innerHTML = '';
  
  if (!saved.length) {
    notesContainer.innerHTML = '<p style="color:#94a3b8; text-align:center; padding: 20px;">Nothing here yet</p>';
    return;
  }

  saved.forEach(item => {
    const div = document.createElement('div');
    div.className = 'note-card';
    div.innerHTML = `
      <p>${item.text}</p>
      ${item.photo ? `<img src="${item.photo}">` : ''}
      <div class="note-date">
        ${item.date} ${item.location ? '&nbsp;•&nbsp;📍 ' + item.location : ''}
      </div>
    `;
    notesContainer.prepend(div);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('note-text');
  
  const note = {
    text: input.value,
    location: userCoords,
    photo: photoData,
    date: new Date().toLocaleDateString('en-US')
  };

  const list = JSON.parse(localStorage.getItem('notes') || '[]');
  list.push(note);
  localStorage.setItem('notes', JSON.stringify(list));

  // reset form
  form.reset();
  userCoords = null;
  photoData = null;
  preview.classList.add('hidden');
  locStatus.textContent = '';

  render();
  document.querySelector('[data-target="view-feed"]').click();
});

render();
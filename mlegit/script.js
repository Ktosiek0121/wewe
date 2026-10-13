// Clock
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// QR Code
new QRCode(document.getElementById("qrcode"), {
  text: window.location.href,
  width: 100,
  height: 100,
});

// Load data from URL
function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const data = params.get('d');
  if (data) {
    try {
      const decoded = JSON.parse(atob(data));
      if (decoded.imie) document.getElementById('imie').textContent = decoded.imie;
      if (decoded.nazwisko) document.getElementById('nazwisko').textContent = decoded.nazwisko;
      if (decoded.dataUrodzenia) document.getElementById('dataUrodzenia').textContent = decoded.dataUrodzenia;
      if (decoded.pesel) document.getElementById('pesel').textContent = decoded.pesel;
      if (decoded.nrLegitymacji) document.getElementById('nrLegitymacji').textContent = decoded.nrLegitymacji;
      if (decoded.dataWydania) document.getElementById('dataWydania').textContent = decoded.dataWydania;
      if (decoded.terminWaznosci) document.getElementById('terminWaznosci').textContent = decoded.terminWaznosci;
      if (decoded.photo) document.getElementById('photoDisplay').src = decoded.photo;
      // fill form inputs too
      document.getElementById('inputImie').value = decoded.imie || '';
      document.getElementById('inputNazwisko').value = decoded.nazwisko || '';
      document.getElementById('inputDataUrodzenia').value = decoded.dataUrodzenia || '';
      document.getElementById('inputPesel').value = decoded.pesel || '';
      document.getElementById('inputNrLegitymacji').value = decoded.nrLegitymacji || '';
      document.getElementById('inputDataWydania').value = decoded.dataWydania || '';
      document.getElementById('inputTerminWaznosci').value = decoded.terminWaznosci || '';
    } catch(e) { console.error('Błąd dekodowania', e); }
  }
}
loadFromURL();

// Generate link
document.getElementById('generateLinkBtn').addEventListener('click', function() {
  const data = {
    imie: document.getElementById('inputImie').value || 'KRZYSZTOF',
    nazwisko: document.getElementById('inputNazwisko').value || 'KOWALSKI',
    dataUrodzenia: document.getElementById('inputDataUrodzenia').value || '16.08.2013',
    pesel: document.getElementById('inputPesel').value || '13281655531',
    nrLegitymacji: document.getElementById('inputNrLegitymacji').value || '4322/44',
    dataWydania: document.getElementById('inputDataWydania').value || '25.09.2025',
    terminWaznosci: document.getElementById('inputTerminWaznosci').value || '30.09.2026',
    photo: document.getElementById('photoDisplay').src,
  };
  const encoded = btoa(JSON.stringify(data));
  const url = window.location.origin + window.location.pathname + '?d=' + encoded;
  document.getElementById('linkOutput').value = url;
  history.pushState({}, '', url);
  // Update card display
  document.getElementById('imie').textContent = data.imie;
  document.getElementById('nazwisko').textContent = data.nazwisko;
  document.getElementById('dataUrodzenia').textContent = data.dataUrodzenia;
  document.getElementById('pesel').textContent = data.pesel;
  document.getElementById('nrLegitymacji').textContent = data.nrLegitymacji;
  document.getElementById('dataWydania').textContent = data.dataWydania;
  document.getElementById('terminWaznosci').textContent = data.terminWaznosci;
});

// Photo input
document.getElementById('photoInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      document.getElementById('photoDisplay').src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Confirm data
document.getElementById('confirmBtn').addEventListener('click', function() {
  document.getElementById('generateLinkBtn').click();
});

// Delete card
document.getElementById('deleteBtn').addEventListener('click', function() {
  document.getElementById('imie').textContent = '—';
  document.getElementById('nazwisko').textContent = '—';
  document.getElementById('dataUrodzenia').textContent = '—';
  document.getElementById('pesel').textContent = '—';
  document.getElementById('nrLegitymacji').textContent = '—';
  document.getElementById('dataWydania').textContent = '—';
  document.getElementById('terminWaznosci').textContent = '—';
  document.getElementById('photoDisplay').src = 'https://via.placeholder.com/100x120?text=Zdjęcie';
  document.getElementById('inputImie').value = '';
  document.getElementById('inputNazwisko').value = '';
  document.getElementById('inputDataUrodzenia').value = '';
  document.getElementById('inputPesel').value = '';
  document.getElementById('inputNrLegitymacji').value = '';
  document.getElementById('inputDataWydania').value = '';
  document.getElementById('inputTerminWaznosci').value = '';
});
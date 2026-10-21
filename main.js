// ========== Mobile Menu ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (nav) nav.classList.remove('open');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ========== Search ==========
function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    const city = document.getElementById('citySelect').value;

    if (!query && !city) {
        alert('Please enter a name, CNIC, or select a city to search.');
        return;
    }

    let message = 'Searching for: ';
    if (query) message += `"${query}" `;
    if (city) message += `in ${city}`;

    // Demo - baad mein real API se connect kar sakte ho
    alert(message + '\n\n(This is a demo. In production this would show matching cases.)');
}

function filterByCity(city) {
    document.getElementById('citySelect').value = city;
    performSearch();
}

// Allow Enter key to search
document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

// ========== Cases from API ==========
let casesData = {};

// Load cases from backend API
async function loadCases() {
    try {
        const res = await fetch('/api/cases');
        const data = await res.json();
        data.forEach(c => {
            casesData[c.id] = c;
        });
    } catch (err) {
        console.log('Could not load cases from API, using fallback');
    }
}

loadCases();

function showCaseDetails(id) {
    const c = casesData[id];
    if (!c) {
        alert('Case details not found.');
        return;
    }

    const statusColor = c.status === 'Found' ? '#1a7a4c' : c.status === 'Missing Kid' ? '#fd7e14' : '#dc3545';

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2 style="margin-bottom:12px;color:#0d5c3d;">${c.name}, ${c.age}</h2>
        <span style="display:inline-block;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:700;color:white;background:${statusColor};margin-bottom:16px;">
            ${c.status}
        </span>
        <p style="margin-bottom:8px;"><strong>Location:</strong> ${c.location}</p>
        <p style="margin-bottom:8px;"><strong>Date:</strong> ${c.date}</p>
        <p style="margin-bottom:8px;"><strong>Height:</strong> ${c.height}</p>
        <p style="margin-bottom:8px;"><strong>Clothing:</strong> ${c.clothing}</p>
        <p style="margin:16px 0;line-height:1.6;color:#555;">${c.description}</p>
        <p style="background:#e8f5ee;padding:12px;border-radius:8px;font-size:14px;">
            <i class="fas fa-phone" style="color:#1a7a4c;margin-right:6px;"></i>
            ${c.contact}
        </p>
    `;

    document.getElementById('caseModal').classList.add('active');
}

function contactAboutCase(id) {
    showCaseDetails(id);
}

function closeModal() {
    document.getElementById('caseModal').classList.remove('active');
}

// Close modal on outside click
document.getElementById('caseModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'caseModal') closeModal();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

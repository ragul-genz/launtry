// app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation & Page Transitions ---
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-btn');
    const sections = document.querySelectorAll('.page-section');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });
    
    function navigateTo(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Highlight active nav link
        document.querySelectorAll(`.nav-link[href="#${targetId}"]`).forEach(link => {
            link.classList.add('active');
        });
        
        // Close mobile menu if open
        navLinksContainer.classList.remove('active');
    }

    // Handle clicks on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateTo(targetId);
        });
    });

    // Handle initial hash in URL if present
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        navigateTo(hash);
    }

    // --- 2. Cost Calculator ---
    const calcService = document.getElementById('calc-service');
    const calcWeight = document.getElementById('calc-weight');
    const calcTotal = document.getElementById('calc-total');

    function updateCost() {
        const rate = parseFloat(calcService.value);
        const weight = parseFloat(calcWeight.value) || 0;
        const total = rate * weight;
        calcTotal.textContent = `₹${total}`;
        
        // Add a small animation to highlight price change
        calcTotal.style.transform = 'scale(1.1)';
        setTimeout(() => {
            calcTotal.style.transform = 'scale(1)';
        }, 200);
    }

    calcService.addEventListener('change', updateCost);
    calcWeight.addEventListener('input', updateCost);

    // --- 3. Track Order Simulation ---
    const trackBtn = document.getElementById('track-btn');
    const trackInput = document.getElementById('track-id');
    const trackingResult = document.getElementById('tracking-result');

    trackBtn.addEventListener('click', () => {
        const val = trackInput.value.trim();
        if (val === '') {
            alert('Please enter your Mobile Number or Order ID');
            return;
        }
        
        // Simulate loading state
        trackBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Tracking...';
        trackBtn.disabled = true;
        trackingResult.classList.add('hidden');

        // Show result after delay
        setTimeout(() => {
            trackBtn.innerHTML = 'Track Order';
            trackBtn.disabled = false;
            trackingResult.classList.remove('hidden');
            
            // We can randomly set active states for the demo
            // In a real app, this would be fetched from backend
        }, 1200);
    });

    // --- 4. WhatsApp Booking Form ---
    const bookingForm = document.getElementById('booking-form');
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('book-name').value.trim();
        const mobile = document.getElementById('book-mobile').value.trim();
        const address = document.getElementById('book-address').value.trim();
        const date = document.getElementById('book-date').value;
        const time = document.getElementById('book-time').value;
        const service = document.getElementById('book-service').value;
        
        // Format message
        const message = `*New Pickup Request!* 🧺%0A%0A` +
            `*Name:* ${name}%0A` +
            `*Mobile:* ${mobile}%0A` +
            `*Service:* ${service}%0A` +
            `*Date:* ${date}%0A` +
            `*Time:* ${time}%0A` +
            `*Address:* ${address}%0A%0A` +
            `Please confirm my booking.`;
            
        // Target WhatsApp Number provided by user
        const whatsappNumber = "917871803642";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        
        // Optionally reset form
        bookingForm.reset();
    });

    // --- 5. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});

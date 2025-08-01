// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navUl) {
        mobileMenuBtn.addEventListener('click', function() {
            navUl.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Initialize user database in localStorage if it doesn't exist
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    
    // Sign Up Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            
            // Validate password match
            if (password !== confirm) {
                alert('Passwords do not match!');
                return;
            }
            
            // Get existing users
            const users = JSON.parse(localStorage.getItem('users'));
            
            // Check if email already exists
            if (users.some(user => user.email === email)) {
                alert('This email is already registered. Please login instead.');
                return;
            }
            
            // Add new user
            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            
            // Store current user in session
            sessionStorage.setItem('currentUser', JSON.stringify({ name, email }));
            
            // Redirect to homepage with welcome message
            window.location.href = 'index.html?welcome=true';
        });
    }
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Get users
            const users = JSON.parse(localStorage.getItem('users'));
            
            // Find user
            const user = users.find(user => user.email === email && user.password === password);
            
            if (user) {
                // Store current user in session
                sessionStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
                
                // Redirect to homepage with welcome message
                window.location.href = 'index.html?welcome=true';
            } else {
                alert('Invalid email or password!');
            }
        });
    }
    
    // Check for welcome message on homepage
    if (window.location.search.includes('welcome=true')) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (currentUser) {
            alert(`Welcome back, ${currentUser.name}!`);
            
            // Update URL to remove the query parameter
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
    
    // Update header based on login status
    updateHeader();
});

function updateHeader() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const signupBtn = document.querySelector('nav ul li a.btn');
    const loginBtn = document.querySelector('nav ul li a.btn-outline');
    
    if (currentUser && signupBtn && loginBtn) {
        signupBtn.textContent = currentUser.name;
        signupBtn.classList.add('logged-in');
        loginBtn.textContent = 'Logout';
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        alert(`Thank you for subscribing with ${emailInput.value}!`);
        emailInput.value = '';
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}
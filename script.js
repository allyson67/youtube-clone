"use strict";

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeSearch();
    initializeNavigation();
    initializeSignIn();
    initializeMobileMenu();
    
    console.log('YouTube clone initialized successfully');
});

// Search functionality
function initializeSearch() {
    try {
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.querySelector('.search-input');
        const voiceSearchBtn = document.querySelector('.voice-search-btn');
        
        if (searchForm && searchInput) {
            // Handle search form submission
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const query = searchInput.value.trim();
                if (query) {
                    handleSearch(query);
                } else {
                    showMessage('Please enter a search term');
                }
            });
            
            // Handle search input focus
            searchInput.addEventListener('focus', function() {
                const searchContainer = document.querySelector('.search-container');
                if (searchContainer) {
                    searchContainer.style.borderColor = '#065fd4';
                }
            });
            
            // Handle search input blur
            searchInput.addEventListener('blur', function() {
                const searchContainer = document.querySelector('.search-container');
                if (searchContainer) {
                    searchContainer.style.borderColor = 'var(--border-color)';
                }
            });
        }
        
        // Handle voice search button
        if (voiceSearchBtn) {
            voiceSearchBtn.addEventListener('click', function() {
                handleVoiceSearch();
            });
        }
        
    } catch (error) {
        console.error('Error initializing search functionality:', error);
    }
}

// Navigation functionality
function initializeNavigation() {
    try {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Get the navigation text
                const navText = this.querySelector('.nav-text');
                const sectionName = navText ? navText.textContent : 'Unknown';
                
                // Update main content based on navigation
                updateMainContent(sectionName);
                
                console.log(`Navigated to: ${sectionName}`);
            });
            
            // Add hover effects
            link.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.backgroundColor = 'var(--hover-background)';
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.backgroundColor = '';
                }
            });
        });
        
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

// Sign in functionality
function initializeSignIn() {
    try {
        const signInBtn = document.querySelector('.sign-in-btn');
        
        if (signInBtn) {
            signInBtn.addEventListener('click', function() {
                handleSignIn();
            });
        }
        
    } catch (error) {
        console.error('Error initializing sign in functionality:', error);
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    try {
        const menuBtn = document.querySelector('.menu-btn');
        const sidebar = document.querySelector('.sidebar');
        
        if (menuBtn && sidebar) {
            menuBtn.addEventListener('click', function() {
                sidebar.classList.toggle('open');
                
                // Update aria-expanded attribute for accessibility
                const isOpen = sidebar.classList.contains('open');
                menuBtn.setAttribute('aria-expanded', isOpen);
            });
            
            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                        sidebar.classList.remove('open');
                        menuBtn.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        }
        
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
}

// Handle search functionality
function handleSearch(query) {
    try {
        console.log(`Searching for: "${query}"`);
        
        // Update main content to show search results
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="content-message">
                    <h2>Search Results for "${query}"</h2>
                    <p>This is a demo YouTube clone. In a real application, this would show search results for your query.</p>
                    <button onclick="resetToHome()" style="margin-top: 16px; padding: 8px 16px; background: var(--youtube-red); color: white; border: none; border-radius: 4px; cursor: pointer;">Back to Home</button>
                </div>
            `;
        }
        
        // Clear search input
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        
    } catch (error) {
        console.error('Error handling search:', error);
        showMessage('Search functionality encountered an error');
    }
}

// Handle voice search
function handleVoiceSearch() {
    try {
        console.log('Voice search activated');
        showMessage('Voice search is not available in this demo');
        
        // In a real application, this would integrate with Web Speech API
        // if ('webkitSpeechRecognition' in window) {
        //     // Implement speech recognition
        // }
        
    } catch (error) {
        console.error('Error handling voice search:', error);
    }
}

// Handle sign in
function handleSignIn() {
    try {
        console.log('Sign in clicked');
        showMessage('Sign in functionality is not available in this demo');
        
        // In a real application, this would redirect to authentication
        // window.location.href = '/signin';
        
    } catch (error) {
        console.error('Error handling sign in:', error);
    }
}

// Update main content based on navigation
function updateMainContent(sectionName) {
    try {
        const mainContent = document.querySelector('.main-content');
        if (!mainContent) return;
        
        let content = '';
        
        switch (sectionName.toLowerCase()) {
            case 'home':
                content = `
                    <div class="content-message">
                        <h2>Try searching to get started</h2>
                        <p>Start watching videos to help us build a feed of videos you'll love.</p>
                    </div>
                `;
                break;
            case 'shorts':
                content = `
                    <div class="content-message">
                        <h2>Shorts</h2>
                        <p>Short-form videos would appear here in a real YouTube application.</p>
                    </div>
                `;
                break;
            case 'subscriptions':
                content = `
                    <div class="content-message">
                        <h2>Subscriptions</h2>
                        <p>Videos from your subscribed channels would appear here.</p>
                    </div>
                `;
                break;
            case 'you':
                content = `
                    <div class="content-message">
                        <h2>Your Library</h2>
                        <p>Your saved videos, playlists, and watch history would appear here.</p>
                    </div>
                `;
                break;
            case 'history':
                content = `
                    <div class="content-message">
                        <h2>Watch History</h2>
                        <p>Your previously watched videos would appear here.</p>
                    </div>
                `;
                break;
            default:
                content = `
                    <div class="content-message">
                        <h2>${sectionName}</h2>
                        <p>This section is not implemented in this demo.</p>
                    </div>
                `;
        }
        
        mainContent.innerHTML = content;
        
    } catch (error) {
        console.error('Error updating main content:', error);
    }
}

// Reset to home view
function resetToHome() {
    try {
        // Reset navigation to home
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        const homeLink = document.querySelector('.nav-link');
        if (homeLink) {
            homeLink.classList.add('active');
        }
        
        // Reset main content
        updateMainContent('Home');
        
    } catch (error) {
        console.error('Error resetting to home:', error);
    }
}

// Utility function to show messages
function showMessage(message) {
    try {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #323232;
            color: white;
            padding: 12px 16px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Fade in
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
        
    } catch (error) {
        console.error('Error showing message:', error);
        // Fallback to alert
        alert(message);
    }
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    try {
        const sidebar = document.querySelector('.sidebar');
        const menuBtn = document.querySelector('.menu-btn');
        
        if (window.innerWidth > 768 && sidebar && menuBtn) {
            sidebar.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    } catch (error) {
        console.error('Error handling window resize:', error);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    try {
        // Handle Escape key to close mobile menu
        if (e.key === 'Escape') {
            const sidebar = document.querySelector('.sidebar');
            const menuBtn = document.querySelector('.menu-btn');
            
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                if (menuBtn) {
                    menuBtn.setAttribute('aria-expanded', 'false');
                    menuBtn.focus();
                }
            }
        }
        
        // Handle Enter key on search input
        if (e.key === 'Enter' && e.target.classList.contains('search-input')) {
            const searchForm = document.querySelector('.search-form');
            if (searchForm) {
                searchForm.dispatchEvent(new Event('submit'));
            }
        }
        
    } catch (error) {
        console.error('Error handling keyboard navigation:', error);
    }
});

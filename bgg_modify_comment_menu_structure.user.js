// ==UserScript==
// @name         Modify Comment Menu Structure for own Comments
// @namespace    https://github.com/kofaysi/bgg-scripts/blob/main/bgg_modify_comment_menu_structure.user.js
// @version      2024-08-15
// @description  Unhide dropdown elements, align them in a single row, and hide the Report button if Edit is available
// @author       https://github.com/kofaysi/
// @match        https://boardgamegeek.com/*
// @grant        none
// ==/UserScript==

function() {
    'use strict';

    // Function to align dropdown items horizontally
    function alignDropdownItemsHorizontally(dropdown) {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        dropdownMenu.style.display = 'flex';
        dropdownMenu.style.flexDirection = 'row';
        dropdownMenu.style.flexWrap = 'wrap'; // Handles overflow
        dropdownMenu.style.gap = '10px'; // Adds spacing between buttons
    }

    // Function to hide the Report button and align dropdown items
    function processDropdowns() {
        const dropdowns = document.querySelectorAll('.ellipsis-dropdown .dropdown');
        dropdowns.forEach(dropdown => {
            const editButton = dropdown.querySelector('button.dropdown-item') &&
                               Array.from(dropdown.querySelectorAll('button.dropdown-item')).find(button => button.textContent.includes('Edit'));

            if (editButton) {
                alignDropdownItemsHorizontally(dropdown);

                const reportButton = dropdown.querySelector('gg-button-report-text');
                if (reportButton) {
                    reportButton.style.display = 'none';
                }
            }
        });
    }

    // Monitor DOM changes to catch dynamically loaded content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                processDropdowns();
            }
        });
    });

    // Observe the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial run on page load
    window.addEventListener('load', function() {
        processDropdowns();
    });

})();

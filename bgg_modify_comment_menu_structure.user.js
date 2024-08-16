// ==UserScript==
// @name         Modify Comment Menu Structure for own Comments
// @namespace    https://github.com/kofaysi/bgg-scripts/blob/main/bgg_modify_comment_menu_structure.user.js
// @version      2024-08-15
// @description  Unhide dropdown elements, align them in a single row, and hide the Report button if Edit is available
// @author       https://github.com/kofaysi/
// @match        https://boardgamegeek.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to position the dropdown below the ellipsis button and align items horizontally
    function positionDropdownBelowEllipsis(dropdown) {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        dropdownMenu.style.display = 'flex';
        dropdownMenu.style.flexDirection = 'row';
        dropdownMenu.style.flexWrap = 'wrap'; // Handles overflow
        dropdownMenu.style.gap = '10px'; // Adds spacing between buttons

        // Position the dropdown below the ellipsis button
        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.top = '100%'; // Position the menu to open below the ellipsis button
        dropdownMenu.style.right = '0'; // Align the dropdown to the right edge of its container
        dropdownMenu.style.left = 'auto'; // Ensure it doesn't overflow on the left
        dropdownMenu.style.zIndex = '9999'; // Ensure it appears above other elements
        dropdownMenu.style.backgroundColor = '#000'; // Maintain background color to match site theme
        dropdownMenu.style.padding = '5px'; // Add some padding to the dropdown
        dropdownMenu.style.borderRadius = '4px'; // Slight rounding to the edges

        // Ensure the ellipsis button doesn't toggle the dropdown
        const ellipsisButton = dropdown.querySelector('button.dropdown-toggle');
        ellipsisButton.style.pointerEvents = 'none'; // Disable pointer events on the ellipsis button
    }

    // Function to hide the Report button and align dropdown items
    function processDropdowns() {
        const dropdowns = document.querySelectorAll('.ellipsis-dropdown .dropdown');
        dropdowns.forEach(dropdown => {
            const editButton = dropdown.querySelector('button.dropdown-item') && 
                               Array.from(dropdown.querySelectorAll('button.dropdown-item')).find(button => button.textContent.includes('Edit'));

            if (editButton) {
                positionDropdownBelowEllipsis(dropdown);
                
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

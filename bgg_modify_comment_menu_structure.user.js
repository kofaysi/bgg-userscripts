// ==UserScript==
// @name         Modify Comment Menu Structure for own Comments
// @namespace    https://github.com/kofaysi/bgg-scripts/blob/main/bgg_modify_comment_menu_structure.user.js
// @version      2024-08-15
// @description  Unhide dropdown elements, align them in a single row, and hide the Report button if Edit is available
// @author       https://github.com/kofaysi/
// @match        https://boardgamegeek.com/tag/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to align elements in a single row
    function alignInSingleRow() {
        const ulElements = document.querySelectorAll('ul.post-actions');
        ulElements.forEach(ul => {
            ul.style.display = 'flex';
            ul.style.flexDirection = 'row';
        });
    }

    // Function to unhide dropdown elements
    function unhideDropdownElements() {
        const dropdowns = document.querySelectorAll('.ellipsis-dropdown .dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'block';
        });
    }

    // Function to hide the Report button if Edit is available
    function hideReportButtonIfEditExists() {
        const dropdowns = document.querySelectorAll('.ellipsis-dropdown .dropdown-menu');
        dropdowns.forEach(dropdown => {
            const editButton = dropdown.querySelector('button.dropdown-item:contains("Edit")');
            if (editButton) {
                const reportButton = dropdown.querySelector('gg-button-report-text');
                if (reportButton) {
                    reportButton.style.display = 'none';
                }
            }
        });
    }

    // Run the functions when the DOM is fully loaded
    window.addEventListener('load', function() {
        alignInSingleRow();
        unhideDropdownElements();
        hideReportButtonIfEditExists();
    });

})();

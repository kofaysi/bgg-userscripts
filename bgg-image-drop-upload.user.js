// ==UserScript==
// @name         BGG Image Drop to Upload
// @namespace    https://github.com/kofaysi/
// @version      2024-07-08
// @description  Opens the editor upload tab, selects the upload image tab, fills the upload path, checks the subscribe checkbox, selects medium image size, and writes filename into textarea on image drop for BoardGameGeek
// @match        https://boardgamegeek.com/*
// @author       https://github.com/kofaysi/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Timeout duration in milliseconds
    const TIMEOUT_DURATION = 200;

    // Function to handle the drop event
    function handleDrop(event) {
        event.preventDefault();

        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];

            // Open the upload tab
            openUploadTab();

            // Select the upload image tab
            setTimeout(selectUploadImageTab, TIMEOUT_DURATION);

            // Fill the upload path
            setTimeout(() => fillUploadPath(file), TIMEOUT_DURATION * 2);

            // Write the filename into the textarea
            setTimeout(() => writeFilenameIntoTextarea(file), TIMEOUT_DURATION * 3);

            // Check the subscribe checkbox
            setTimeout(checkSubscribeCheckbox, TIMEOUT_DURATION * 4);

            // Select the Medium option in the second dropdown
            setTimeout(selectMediumOption, TIMEOUT_DURATION * 5);


        }
    }

    // Function to open the upload tab
    function openUploadTab() {
        // This function should trigger the UI element to open the upload tab
        document.querySelector('button[aria-label="Image"]').click();
    }

    // Function to select the upload image tab
    function selectUploadImageTab() {
        // This function should click the upload image tab
        document.querySelector('li[ngbnavitem="upload"] a').click();
    }

    // Function to fill the upload path
    function fillUploadPath(file) {
        const input = document.querySelector('input#upload-geek-image');
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;

        // Trigger change event to ensure any event listeners are fired
        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
    }

    // Function to check the subscribe checkbox
    function checkSubscribeCheckbox() {
        const checkbox = document.querySelector('input#upload-geek-image-subscribe');
        if (!checkbox.checked) {
            checkbox.click();
        }
    }

    // Function to select the Medium option in the second dropdown
    function selectMediumOption() {
        const dropdowns = document.querySelectorAll('select#geek-image-size');
        if (dropdowns.length > 1) {
            const secondDropdown = dropdowns[1];
            secondDropdown.value = 'medium';

            // Trigger change event to ensure any event listeners are fired
            const event = new Event('change', { bubbles: true });
            secondDropdown.dispatchEvent(event);
        }
    }

    // Function to write the filename into the textarea
    function writeFilenameIntoTextarea(file) {
        const textarea = document.querySelector('textarea#link-text');
        textarea.value = file.name;

        // Trigger input event to ensure any event listeners are fired
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
    }

    // Add the event listener for the drop event
    document.addEventListener('drop', handleDrop);

    // Prevent the default behavior for dragover event
    document.addEventListener('dragover', function(event) {
        event.preventDefault();
    });
})();

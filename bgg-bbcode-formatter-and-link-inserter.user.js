// ==UserScript==
// @name         BGG BBCode Formatter and Link Inserter
// @namespace    https://github.com/kofaysi/bgg-scripts
// @version      2024-07-18
// @description  Adds keyboard shortcuts for BBCode formatting in text fields, and automatically handles link pasting by opening the appropriate dialog for links or images on BGG.
// @match        https://boardgamegeek.com/*
// @author       https://github.com/kofaysi/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function toggleSelection(textarea, before, after) {
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let text = textarea.value;

        let selectedText = text.substring(start, end);
        let beforeText = text.substring(start - before.length, start);
        let afterText = text.substring(end, end + after.length);

        if (beforeText === before && afterText === after) {
            textarea.value = text.substring(0, start - before.length) + selectedText + text.substring(end + after.length);
            textarea.selectionStart = start - before.length;
            textarea.selectionEnd = end - before.length;
        } else {
            textarea.value = text.substring(0, start) + before + selectedText + after + text.substring(end);
            textarea.selectionStart = start + before.length;
            textarea.selectionEnd = end + before.length;
        }
    }

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    function extractImageId(url) {
        const regex = /https:\/\/boardgamegeek\.com\/image\/(\d+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    function openLinkDialog() {
        let linkButton = document.querySelector('button[aria-label="Add Link"]');
        if (linkButton) {
            linkButton.click();
        }
    }

    function openImageDialog() {
        let embedMediaButton = document.querySelector('button[aria-label="Embed Media"]');
        if (embedMediaButton) {
            embedMediaButton.click();
            setTimeout(() => {
                let imageButton = document.querySelector('button[aria-label="Image"]');
                if (imageButton) {
                    imageButton.click();
                }
            }, 100); // Adjust the timeout as necessary
        }
    }

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            let textarea = document.activeElement;
            if (textarea && (textarea.tagName === 'TEXTAREA' || (textarea.tagName === 'INPUT' && textarea.type === 'text'))) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        toggleSelection(textarea, '[b]', '[/b]');
                        break;
                    case 'i':
                        e.preventDefault();
                        toggleSelection(textarea, '[i]', '[/i]');
                        break;
                    case 'u':
                        e.preventDefault();
                        toggleSelection(textarea, '[u]', '[/u]');
                        break;
                    case 's':
                        if (e.shiftKey) {
                            e.preventDefault();
                            toggleSelection(textarea, '[-]', '[/-]');
                        }
                        break;
                    case 't':
                        if (e.shiftKey) {
                            e.preventDefault();
                            toggleSelection(textarea, '[c]', '[/c]');
                        }
                        break;
                    case 'h':
                        if (e.shiftKey) {
                            e.preventDefault();
                            toggleSelection(textarea, '[heading]', '[/heading]');
                        }
                        break;
                    case 'q':
                        if (e.shiftKey) {
                            e.preventDefault();
                            toggleSelection(textarea, '[q]', '[/q]');
                        }
                        break;
                    case 'o':
                        if (e.shiftKey) {
                            e.preventDefault();
                            toggleSelection(textarea, '[o]', '[/o]');
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    });

    document.addEventListener('paste', function(e) {
        let textarea = document.activeElement;
        if (textarea && (textarea.tagName === 'TEXTAREA' || (textarea.tagName === 'INPUT' && textarea.type === 'text'))) {
            let pastedText = (e.clipboardData || window.clipboardData).getData('text');
            if (isValidUrl(pastedText)) {
                e.preventDefault();

                if (pastedText.includes("https://boardgamegeek.com/image/")) {
                    // Open the image dialog
                    openImageDialog();

                    // Set the pasted URL in the image input field and perform the necessary steps
                    setTimeout(() => {
                        let imageId = extractImageId(pastedText);
                        let imageInput = document.querySelector('input[formcontrolname="geekimageId"]');
                        if (imageInput && imageId) {
                            imageInput.value = imageId;

                            // Simulate various events to trigger validation
                            ['input', 'change', 'blur'].forEach(eventType => {
                                let event = new Event(eventType, {
                                    bubbles: true,
                                    cancelable: true,
                                });
                                imageInput.dispatchEvent(event);
                            });

                            // Focus and blur to trigger any additional validation
                            imageInput.focus();
                            imageInput.blur();

                            // Select "Medium" in the dropdown
                            let imageSizeDropdown = document.querySelector('select[name="geek-image-size"]');
                            if (imageSizeDropdown) {
                                imageSizeDropdown.value = "medium";
                                let event = new Event('change', { bubbles: true });
                                imageSizeDropdown.dispatchEvent(event);
                            }

                            // Enable and click the "Embed Image" button
                            setTimeout(() => {
                                let embedButton = document.querySelector('.gg-modal-footer button.btn-primary');
                                if (embedButton) {
                                    embedButton.disabled = false;
                                    embedButton.click();
                                }
                            }, 100); // Adjust the timeout as necessary
                        }
                    }, 100); // Adjust the timeout as necessary for the image subwindow to appear
                } else {
                    // Open the link dialog
                    openLinkDialog();

                    // Set the pasted URL in the link input field
                    setTimeout(() => {
                        let linkInput = document.querySelector('input[name="url"]');
                        if (linkInput) {
                            linkInput.value = pastedText;

                            // Simulate various events to trigger validation
                            ['input', 'change', 'blur'].forEach(eventType => {
                                let event = new Event(eventType, {
                                    bubbles: true,
                                    cancelable: true,
                                });
                                linkInput.dispatchEvent(event);
                            });

                            // Focus and blur to trigger any additional validation
                            linkInput.focus();
                            linkInput.blur();

                            // Enable the submit button and click it
                            setTimeout(() => {
                                let form = linkInput.closest('form');
                                if (form) {
                                    let submitButton = form.querySelector('button[type="submit"]');
                                    if (submitButton) {
                                        submitButton.disabled = false;
                                        submitButton.click();

                                        // Click the "Add Link" button in the modal window
                                        setTimeout(() => {
                                            let addLinkButton = document.querySelector('gg-link-inserter .gg-modal-footer button.btn-primary');
                                            if (addLinkButton) {
                                                addLinkButton.click();
                                            }
                                        }, 500); // Adjust the timeout as necessary
                                    }
                                }
                            }, 100); // Adjust the timeout as necessary
                        }
                    }, 100); // Adjust the timeout as necessary for the link subwindow to appear
                }
            }
        }
    });
})();

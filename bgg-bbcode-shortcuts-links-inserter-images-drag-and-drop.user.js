// ==UserScript==
// @name         BBCode Formatter, Link Inserter, and Image Upload on Drop @boardgamegeek.com
// @namespace    https://github.com/kofaysi/bgg-userscripts/blob/main/bgg-bbcode-shortcuts-links-inserter-images-drag-and-drop.user.js
// @version      3.12
// @description  Adds keyboard shortcuts for BBCode formatting, handles link and image pasting, updates aria-labels with shortcuts, and automates image upload on drop in BoardGameGeek.
// @author       https://github.com/kofaysi/
// @match        https://boardgamegeek.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Centralized labels with shortcut descriptions
    // todo: shortcut to items https://boardgamegeek.com/wiki/page/Forum_Formatting#toc13
    const labels = {
        bold: 'Bold (Ctrl+B)',
        italic: 'Italic (Ctrl+I)',
        underline: 'Underline (Ctrl+U)',
        strikethrough: 'Strikethrough (Ctrl+Shift+S)',
        monospace: 'Monospace (Ctrl+Shift+T)',
        heading: 'Heading (Ctrl+Shift+H)',
        quote: 'Quote (Ctrl+Shift+Q)',
        spoiler: 'Spoiler (Ctrl+Shift+O)',
        addLink: 'Add Link (Ctrl+Shift+K)',
        insertImage: 'Image (Ctrl+Shift+I)',
        comment: 'Comment (Ctrl+Shift+N)',
        itemize: 'Itemize (Ctrl+Shift+Z)'
    };

    function updateAriaLabels() {
        for (let label of Object.values(labels)) {
            const labelText = label.split(" (")[0];
            const button = document.querySelector(`button[aria-label^="${labelText}"]`);
            if (button) {
                button.setAttribute('aria-label', label); // Set the full label with shortcut
            }
        }
    }

    updateAriaLabels(); // Call function to update aria-labels initially

    // Observe DOM changes to ensure aria-labels are updated even if buttons are dynamically created
    const observer = new MutationObserver(() => {
        updateAriaLabels();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    function toggleSelection(textarea, before, after) {
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let text = textarea.value;
        let selectedText = text.substring(start, end);

        textarea.value = text.substring(0, start) + before + selectedText + after + text.substring(end);
        textarea.selectionStart = start + before.length;
        textarea.selectionEnd = end + before.length;
    }

    function toggleItemization(textarea) {
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let text = textarea.value;
        let selectedText = text.substring(start, end).trim();

        if (!selectedText) return;

        let lines = selectedText.split('\n').map(line => {
            let trimmed = line.trim();
            if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
                return line;
            } else if (line.startsWith('  ')) {
                return '  - ' + trimmed;
            } else {
                return '* ' + trimmed;
            }
        });

        let newText = '[c]\n' + lines.join('\n') + '\n[/c]';
        textarea.value = text.substring(0, start) + newText + text.substring(end);
        textarea.selectionStart = start;
        textarea.selectionEnd = start + newText.length;
    }

    function openLinkDialog() {
        let linkButton = document.querySelector(`button[aria-label="${labels.addLink}"]`);
        if (linkButton) {
            linkButton.click();
        }
    }

    function openImageDialog() {
        let insertImageButton = document.querySelector(`button[aria-label="${labels.insertImage}"]`);
        if (insertImageButton) {
            insertImageButton.click();
            setTimeout(() => {
            //    let imageButton = document.querySelector(`button[aria-label="${labels.insertImage}"]`);
            //    if (imageButton) {
            //        imageButton.click();
            //    }
            }, 100);
        }
    }

    // Shortcuts handler
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
                        if (e.shiftKey) {
                            openImageDialog(); // Trigger the image dialog with Ctrl+Shift+I
                        } else {
                            toggleSelection(textarea, '[i]', '[/i]'); // Trigger italic with Ctrl+I
                        }
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
                            toggleSelection(textarea, '[mono]', '[/mono]');
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
                            toggleSelection(textarea, '[spoiler]', '[/spoiler]');
                        }
                        break;
                    case 'k':
                        if (e.shiftKey) {
                            e.preventDefault();
                            openLinkDialog(); // Trigger the link dialog
                        }
                        break;
                    case 'n':
                        if (e.shiftKey) {
                            e.preventDefault();
                            toggleSelection(textarea, '{{', '}}');
                        }
                        break;
                    case 'z':
                        if (e.shiftKey) {
                            e.preventDefault();
                            toggleItemization(textarea);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    });

    // Full paste event listener to handle URL pasting
    document.addEventListener('paste', function(e) {
        let textarea = document.activeElement;
        if (textarea && (textarea.tagName === 'TEXTAREA' || (textarea.tagName === 'INPUT' && textarea.type === 'text'))) {
            let pastedText = (e.clipboardData || window.clipboardData).getData('text');
            if (isValidUrl(pastedText)) {
                e.preventDefault();

                if (pastedText.includes("https://boardgamegeek.com/image/")) {
                    openImageDialog();

                    setTimeout(() => {
                        let imageId = extractImageId(pastedText);
                        let imageInput = document.querySelector('input[formcontrolname="geekimageId"]');
                        if (imageInput && imageId) {
                            imageInput.value = imageId;

                            ['input', 'change', 'blur'].forEach(eventType => {
                                let event = new Event(eventType, { bubbles: true, cancelable: true });
                                imageInput.dispatchEvent(event);
                            });

                            imageInput.focus();
                            imageInput.blur();

                            let imageSizeDropdown = document.querySelector('select[name="geek-image-size"]');
                            if (imageSizeDropdown) {
                                imageSizeDropdown.value = "medium";
                                let event = new Event('change', { bubbles: true });
                                imageSizeDropdown.dispatchEvent(event);
                            }

                            setTimeout(() => {
                                let embedButton = document.querySelector('.gg-modal-footer button.btn-primary');
                                if (embedButton) {
                                    embedButton.disabled = false;
                                    embedButton.click();
                                }
                            }, 100);
                        }
                    }, 100);
                } else {
                    openLinkDialog();

                    setTimeout(() => {
                        let linkInput = document.querySelector('input[name="url"]');
                        if (linkInput) {
                            linkInput.value = pastedText;

                            ['input', 'change', 'blur'].forEach(eventType => {
                                let event = new Event(eventType, { bubbles: true, cancelable: true });
                                linkInput.dispatchEvent(event);
                            });

                            linkInput.focus();
                            linkInput.blur();

                            setTimeout(() => {
                                let form = linkInput.closest('form');
                                if (form) {
                                    let submitButton = form.querySelector('button[type="submit"]');
                                    if (submitButton) {
                                        submitButton.disabled = false;
                                        submitButton.click();

                                        setTimeout(() => {
                                            let addLinkButton = document.querySelector('gg-link-inserter .gg-modal-footer button.btn-primary');
                                            if (addLinkButton) {
                                                addLinkButton.click();
                                            }
                                        }, 500);
                                    }
                                }
                            }, 100);
                        }
                    }, 100);
                }
            }
        }
    });

    // Helper function to check if a string is a valid URL
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

    // Image upload on drop functionality
    const TIMEOUT_DURATION = 200;

    function handleDrop(event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];

            openImageDialog();
            setTimeout(selectUploadImageTab, TIMEOUT_DURATION);
            setTimeout(() => fillUploadPath(file), TIMEOUT_DURATION * 2);
            setTimeout(() => writeFilenameIntoTextarea(file), TIMEOUT_DURATION * 3);
            setTimeout(checkSubscribeCheckbox, TIMEOUT_DURATION * 4);
            setTimeout(selectMediumOption, TIMEOUT_DURATION * 5);
        }
    }

    function selectUploadImageTab() {
        document.querySelector('li[ngbnavitem="upload"] a').click();
    }

    function fillUploadPath(file) {
        const input = document.querySelector('input#upload-geek-image');
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;

        const event = new Event('change', { bubbles: true });
        input.dispatchEvent(event);
    }

    function writeFilenameIntoTextarea(file) {
        const textarea = document.querySelector('textarea#link-text');
        textarea.value = file.name;

        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
    }

    function checkSubscribeCheckbox() {
        const checkbox = document.querySelector('input#upload-geek-image-subscribe');
        if (!checkbox.checked) {
            checkbox.click();
        }
    }

    function selectMediumOption() {
        const dropdowns = document.querySelectorAll('select#geek-image-size');
        if (dropdowns.length > 1) {
            const secondDropdown = dropdowns[1];
            secondDropdown.value = 'medium';

            const event = new Event('change', { bubbles: true });
            secondDropdown.dispatchEvent(event);
        }
    }

    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

})();

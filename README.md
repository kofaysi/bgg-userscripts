# BGG Scripts

## Introduction
Welcome to the **BGG Scripts** repository. This repository contains userscripts designed to enhance the user experience on BoardGameGeek (BGG). Currently, it includes:

1. [BBCode Shortcuts, Link Inserter and Image Upload Assistant](#bbcode-shortcuts-link-inserter-and-image-upload-assistant)
2. [Video Resizer](#video-resizer)
3. [Add Edit Tags Link](#add-edit-tags-link)

## Scripts

### BBCode Shortcuts, Link Inserter and Image Upload Assistant

This single userscript enhances your text editing experience on BoardGameGeek by adding keyboard shortcuts for BBCode formatting, automating link and image insertion, and simplifying image uploads. Key features include:

1. **BBCode Formatting Keyboard Shortcuts**: Quickly format text with keyboard shortcuts for bold, italic, underline, strikethrough, typewriter, headings, quotes, and hidden text.
2. **One-Click Embedding**:
   - **Automated Link Insertion**: Detects URLs pasted into the text field, opens the link dialog, and completes the link insertion for you.
   - **Smart Image Handling**: Detects BoardGameGeek image URLs, opens the image dialog, extracts the image ID, sets the preferred image size, and embeds the image seamlessly.
3. **Image Upload Assistant**:
   - **Automatic Upload Tab Selection**: Directly opens the image upload section.
   - **Drag-and-Drop Upload**: Automatically fills the upload path; simply drop your image.
   - **Filename Handling**: Inputs the filename into the text area automatically. Double-click the text area to edit as needed.
   - **Subscribe Checkbox**: Automatically checks the subscribe box to keep you updated on image posts.
   - **Preferred Image Size Selection**: Sets medium size for optimal display.

### Video Resizer
This userscript resizes BGG videos to not be the full width of the column and maintains proper aspect ratio and alignment. Here’s what it does:

1. **Resize YouTube Video Elements**: Adjusts the width and height of YouTube videos.
2. **Adjust Parent Containers**: Ensures no overflow and proper alignment of video containers.

### Add Edit Tags Link
  
This userscript enhances the user experience on the BoardGameGeek website by automatically adding an "Edit Tags" link to each board game entry listed on pages under https://boardgamegeek.com/tag/*. The "Edit Tags" link is seamlessly integrated into the existing layout, aligning to the right within the row of the board game name. This allows users to quickly access the tag editing page for any board game without disrupting the visual style of the site. The script runs automatically upon page load, requiring no additional interaction from the user.

## How to Install

### Prerequisites
- **Tampermonkey** (or any other userscript manager) installed in your browser.

### Installation Steps
1. **Install Tampermonkey**: Install Tampermonkey from [here](https://www.tampermonkey.net/).
2. **Load the Script**:
   - Open the script you want to install in the repository.
   - Click on the "Raw" button to trigger Tampermonkey to recognize the script and load it.
3. **Create a New Userscript (if needed)**: If the script doesn't load automatically, create a new userscript in Tampermonkey and paste the script.
4. **Save and Enable the Script**.
5. **Test the Script**:
   - For **UIUA**: Navigate to a BoardGameGeek thread, type a reply, and try dropping an image onto the page. The script should automatically perform all required actions in sequence with appropriate delays (each 200ms). Confirm the upload by clicking the **Upload & Embed Image** button and the image tag will be placed at the cursor.
   - For **BGG Video Resizer**: Navigate to a BoardGameGeek page with embedded YouTube videos. The videos should resize and align properly.

## Tested On
- **Firefox** 131.0.0 (64-bit)

## Feedback
Your feedback and suggestions are welcome! Feel free to share any improvements or issues.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## Contact
For any questions, feel free to contact the repository owner.

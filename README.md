# BGG Scripts

## Introduction
Welcome to the **BGG Scripts** repository. This repository contains userscripts designed to enhance the user experience on BoardGameGeek (BGG). Currently, it includes:

1. **The Ultimate Image Upload Assistant (UIUA)**
2. **BGG Video Resizer**

## Scripts

### The Ultimate Image Upload Assistant (UIUA)
This userscript automates several steps in the image upload process, saving you time and effort. Here’s what it does:

1. **Automatically Opens the Upload Tab**: No more hunting for the right icon.
2. **Selects the Correct Upload Tab**: Directly takes you to the image upload section.
3. **Fills the Upload Path**: Just drag and drop your image.
4. **Writes the Filename into the Textarea**: Automatically inputs the filename for you. If the filename is not suitable, double-click into the text area and start typing your own comment.
5. **Checks the Subscribe Checkbox**: Stay updated with your image posts without an extra click.
6. **Selects the Medium Image Size**: Ensures your images are the perfect size (preferred size).

### BGG Video Resizer
This userscript resizes BGG videos to not be the full width of the column and maintains proper aspect ratio and alignment. Here’s what it does:

1. **Resize YouTube Video Elements**: Adjusts the width and height of YouTube videos.
2. **Adjust Parent Containers**: Ensures no overflow and proper alignment of video containers.

### BGG BBCode Formatter and Link Inserter

This userscript enhances your text editing experience on BoardGameGeek by adding keyboard shortcuts for BBCode formatting and automating the link and image insertion process. Here’s what it does:

1. BBCode Formatting Shortcuts: Quickly format your text with keyboard shortcuts for bold, italic, underline, strikethrough, typewriter, headings, quotes, and hidden text.
2. One-Click Embedding: Streamlines the embedding process by automatically clicking through the necessary steps, saving you time and effort.
   1. Automated Link Insertion: Automatically detects URLs pasted into the text field, opens the appropriate dialog, and completes the link insertion process for you.
   2. Smart Image Handling: If a BoardGameGeek image URL is detected, it opens the image dialog, extracts the image ID, sets the preferred image size, and embeds the image without manual input.

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
- **Firefox** 127.0.2 (64-bit)

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

# The Ultimate Image Upload Assistant (UIUA)

## Introduction
Welcome to the repository for **The Ultimate Image Upload Assistant (UIUA)** userscript. This script is designed to streamline the image upload process on BoardGameGeek (BGG), saving users time and effort by automating repetitive steps.

## Features
- **Automatically Opens the Upload Tab**: No more hunting for the right icon.
- **Selects the Correct Upload Tab**: Directly takes you to the image upload section.
- **Fills the Upload Path**: Just drag and drop your image.
- **Writes the Filename into the Textarea**: Automatically inputs the filename for you. If the filename is not suitable, double-click into the text area and start typing your own comment.
- **Checks the Subscribe Checkbox**: Stay updated with your image posts without an extra click.
- **Selects the Medium Image Size**: Ensures your images are the perfect size (preferred size).

## Installation

### Prerequisites
- **Tampermonkey** (or any other userscript manager) installed in your browser.

### Steps
1. **Install Tampermonkey**: Install Tampermonkey from [here](https://www.tampermonkey.net/).
2. **Open the Script**: Open the script using one of the following links:
   - [View the script on Gist](https://gist.github.com/kofaysi/a22e9390d356a934a2f30eaa7941ee44)
   - [View the script on GitHub](https://github.com/kofaysi/bgg-scripts/blob/main/bgg-image-drop-upload.js)
3. **Trigger Tampermonkey to Load the Script**: Opening the gist link and selecting raw should trigger Tampermonkey to recognize the script and load it.
4. **Create a New Userscript (if needed)**: If the script doesn't load automatically, create a new userscript in Tampermonkey and paste the script from the link.
5. **Save and Enable the Script**.
6. **Test the Script**: Navigate to a BoardGameGeek thread, type a reply, and try dropping an image onto the page. The script should automatically perform all required actions in sequence with appropriate delays (each 200ms).
7. **Confirm Upload**: Click the **Upload & Embed Image** button and the image tag will be placed at the cursor.

## Tested On
- **Firefox** 127.0.2 (64-bit)

## Feedback
Your feedback and suggestions are welcome! Feel free to share any improvements or issues.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

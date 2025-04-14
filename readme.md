### Introduction

`Markiflax` allows you to create a fully functioning website just by writing [Markdown](https://www.markdownguide.org/) files.  
The app uses the powerful `Showdown` package to convert Markdown into clean HTML,making it perfect for blogs, notes, documentation, and more.  
It is configurable and the user can choose to edit the landing page as needed by providing a config.json file.
        
        
### Installation

Run the following command to install markiflax

```bash
npm install -g markiflax

```
On macOS/Linux:

```bash
sudo npm install -g markiflax

```

### Getting started

To use the application you need to do the following:

1. Navigate to a directory where you would like to run the application.
2. Create markdown files (don't forget to use the .md extension).
3. Create a JSON file to define your website configuration. This is an example:

```json

{
    "port": 3000,
    "title": "📝 My app title",
    "undertitle": "One line to describe what my app does",
    "paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "footer": "✨ My amazing footer!",
    "show_table_of_content": true,
    "show_footer": true,
    "show_paragraph":true,
    "show_title":true,
    "show_undertitle":true,
    "paginationOffsetConfig":0,
    "paginationlimitConfig":5
  }
```


4. If you want to add images to your application, place them at the root level of your application like this /public/images/your_image.png.  

5. Run the following command

```bash

markiflax

```


### Contribute


If you would like to contribute to this project the repo is here: https://github.com/Elie-Soued/markiflax
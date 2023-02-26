---
abbrlink: chatgpt-experience
categories:
- - 项目
date: '2023-02-13 21:44:31'
excerpt: '一、编写代码 （1）HTML Q：Write a html page with Material Design to display some
  project card which has itself link. Chat-GPT: Here''s an example HTML page that
  uses Material Design to display a list of project...'
tags:
- ChatGPT
title: ChatGPT使用体验
updated: Mon, 13 Feb 2023 13:44:34 GMT
---
# 一、编写代码

## （1）HTML

Q：Write a html page with Material Design to display some project card which has itself link.

Chat-GPT: Here's an example HTML page that uses Material Design to display a list of project cards, each with a link to the project's details:

```html

<html>
  <head>
    <!-- Import Material Design Lite -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
  </head>
  <body>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">Project 1</h2>
        </div>
        <div class="mdl-card__supporting-text">
          Description of Project 1.
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="project1.html">
            View Details
          </a>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">Project 2</h2>
        </div>
        <div class="mdl-card__supporting-text">
          Description of Project 2.
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="project2.html">
            View Details
          </a>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">Project 3</h2>
        </div>
        <div class="mdl-card__supporting-text">
          Description of Project 3.
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="project3.html">
            View Details
          </a>
        </div>
      </div>
    </div>
  </body>
</html>

```

实际效果——

![html](https://imgs.gw.to/file/c4dabe825553415692dd7.png)

## 2.PHP


Q:Write a PHP application to short URLS that user uploade

Chat-GPT:Here's an example PHP application that shortens URLs that the user uploads:

```php

<?php

// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Get the original URL from the form
  $originalUrl = $_POST['url'];

  // Generate a unique short URL
  $shortCode = generateShortCode();

  // Save the original URL and short code to the database
  saveToDatabase($originalUrl, $shortCode);

  // Redirect the user to the short URL
  header('Location: http://localhost/' . $shortCode);
  exit();
}

function generateShortCode() {
  // Generate a random string to use as the short code
  $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  $code = '';
  for ($i = 0; $i < 6; $i++) {
    $code .= $alphabet[rand(0, strlen($alphabet) - 1)];
  }

  // Check if the code is already in use in the database, and generate a new code if necessary
  // (You would need to write the logic to check the database here)

  return $code;
}

function saveToDatabase($url, $code) {
  // Connect to the database
  $conn = mysqli_connect('localhost', 'user', 'password', 'database');

  // Insert the URL and code into the database
  $query = "INSERT INTO short_urls (url, code) VALUES ('$url', '$code')";
  mysqli_query($conn, $query);

  // Close the database connection
  mysqli_close($conn);
}

?>

<!-- HTML form for submitting URLs -->
<form action="index.php" method="post">
  <label for="url">Enter a URL:</label>
  <input type="text" id="url" name="url">
  <input type="submit" value="Shorten">
</form>

```

效果图——

![php](https://imgs.gw.to/file/2b49881e56f873bd463c2.png)


## 3.Go

Q:Creat a self-hosted file management and sharing system with Material 3  using Go language

Chat-GPT:

Here's an example of how you can create a self-hosted file management and sharing system using the Go programming language and Material 3:

1. Create a new Go project with the following structure:

```lua
project_root
|-- main.go
|-- templates
|   |-- index.html
|-- static
|   |-- material.min.css
|   |-- material.min.js

```

2. In `main.go`, import the necessary packages and define a function to handle HTTP requests:

```go
package main

import (
	"html/template"
	"net/http"
)

func main() {
	http.HandleFunc("/", indexHandler)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("./templates/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}

```

3. In the `templates` directory, create an HTML template named `index.html` using Material 3 to create the user interface:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Self-hosted File Management and Sharing System</title>
	<link rel="stylesheet" href="/static/material.min.css">
</head>
<body>
	<!-- Add your Material 3 code here -->
	<!-- Example: -->
	<!-- Container for the user interface -->
	<div class="container">
		<!-- Material 3 card to display a file -->
		<div class="card">
			<div class="card-header">
				<h3>File Name</h3>
			</div>
			<div class="card-body">
				<p>File Description</p>
			</div>
			<div class="card-footer">
				<a href="#" class="btn btn-primary">Download</a>
			</div>
		</div>
	</div>

	<!-- Material 3 JavaScript -->
	<script src="/static/material.min.js"></script>
</body>
</html>

```

4. In the `static` directory, place the Material 3 CSS and JavaScript files.
5. Run the Go program and visit `http://localhost:8080` in your web browser to see the file management and sharing system.

This is just a basic example, but you can expand upon it by adding functionality to upload and manage files, and by integrating with a database to store file metadata.

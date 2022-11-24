# Notes repository
Web application which allows user to take notes and share them across all of their devices.

## About automated tests

Automated tests were written for all test scenarios of this application. Some of them were covered using the Selenium WebDriver framework (C# language), while others were covered using the Cypress framework (TypeScript language).

### Selenium WebDriver tests

In order to execute tests written in Selenium, you need to run them from the Test Explorer in your IDE. By default they will run in docker containers, so you need also to install Docker. After that, go to the `SeleniumTests` directory, open PowerShell and enter two commands - first `docker-compose build` and then `docker-compose up`. This will download the images for Selenium Hub and Chrome node and run them. After that, you should be able to visit the Selenium Grid in your browser under this URL: http://localhost:4445/ui:

<img width="600" alt="Zrzut ekranu 2022-11-24 o 23 15 29" src="https://user-images.githubusercontent.com/84130501/203869429-eec5ecef-9b60-48ac-a596-255183a501cb.png">

To execute tests, simply run them from your Test Explorer:

<img width="600" alt="Zrzut ekranu 2022-11-24 o 23 19 35" src="https://user-images.githubusercontent.com/84130501/203869781-adfcaa65-f0ba-460d-bf52-90d4a9aa7a72.png">

While running, the concurrency bar in Selenium Grid should fill up, as below: 

<img width="600" alt="Zrzut ekranu 2022-11-24 o 23 20 36" src="https://user-images.githubusercontent.com/84130501/203869891-18d6ee7b-675b-4bf9-82bb-f5e9c7879d6c.png">

### Cypress tests

In order to execute tests written in Cypress, you need to run them using `npm test` command. First, make sure you have the following packages installed:
- `cypress`,
- `cypress-xpath`,
- `cypress-file-upload`,
- `Node.js` is also required.

If you have those packages installed, you can navigate to `CypressTests` directory and run the following command in your terminal: `npm test`. This will open the Cypress test runner. First, you need to choose the type of testing:

<img width="600" alt="Zrzut ekranu 2022-11-24 o 23 01 16" src="https://user-images.githubusercontent.com/84130501/203868487-141bcd9d-ffaf-4d9a-84d8-7e1b66349d2b.png">

Simply pick `E2E Testing`. The next step will be to choose the browser. You can choose any browser you want.

<img width="600" alt="Zrzut ekranu 2022-11-24 o 23 05 06" src="https://user-images.githubusercontent.com/84130501/203868765-b49be7e8-f64d-45a1-b1cf-a2902389a88a.png">

From the main page you can execute any spec file. There are several spec files, each for specific area of the Notes Repository application:

<img width="600" alt="Zrzut ekranu 2022-11-24 o 23 08 54" src="https://user-images.githubusercontent.com/84130501/203869042-6d409512-848e-46b2-aed1-294932ff5f19.png">

Run tests by clicking any spec file:

<img width="600" alt="Zrzut ekranu 2022-11-24 o 23 24 40" src="https://user-images.githubusercontent.com/84130501/203870258-8c262843-e66e-4fea-ae11-ae8855a06609.png">


## About application

#### Table of Contents

 - [General info](#general-info)
 - [Images](#images)
 - [Technologies](#technologies)
 - [Status](#status)
 - [Links](#links)

### General info

The purpose of this application is to provide the user with a complex solution to take notes. App makes use of Markdown language 
which allows quick and effective text formatting as well as nesting html code inside of the note.

![PP_EditNote_Demo](https://user-images.githubusercontent.com/56163434/168643472-ca17ce3d-2735-4963-b7e1-402b770b6f43.gif)

### Images

<img src="https://user-images.githubusercontent.com/56251920/168623700-8560b9f9-a3d7-480f-8068-d72601844902.png" width="70%"/>

<img src="https://user-images.githubusercontent.com/56251920/168623814-5f84b40f-be78-4cc6-aac4-026429bf0117.png" width="70%"/>

<img src="https://user-images.githubusercontent.com/56251920/168623896-662e6dd1-1aec-487f-902f-eb301b8eb80a.png" width="70%"/>

<img src="https://user-images.githubusercontent.com/56397163/168771756-f62f5ef3-d252-4b70-a8c7-f62a969e622e.png" width="70%"/>


### Features

- uses the power of **Markdown** and **html**
- you can **share** notes with friends
- app has ready to use **templates** that can be used in notes
- **event** planning
- **folder** structure
- **responsiveness**, you can take notes either on desktop, tablet or smartphone
- it follows the *"idea write once access from any device"*
- **user friendly** UI
- login with **Google** authentication
- **free** to use

### Technologies

- Asp .Net Core
- Entity Framework Core
- Blazor
- C#
- Html, css
- MsSQL
- Docker
- Azure
- Visual Studio 2022

### Status

Development finished


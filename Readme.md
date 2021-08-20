# JS-ToDoList

This repo contains simple app that allows you create and store your tasks to do. You can add there new task with **Title**, **Text Content** and with **Deadline**. After creating tasks you can change their status to **Done** and **Undone**. Each list element can be update with by clicking on button and filling modal with new data. Also each list element can be deleted in the similar way. This app use local storage to save all added elements within session (until browser is closed). You are also able to download list of tasks in JSON format to store it localy. After that you can upload this JSON to load previous list.

Below you can see front-end's screenshots of this app:

<img src="https://raw.githubusercontent.com/aFku/JS-ToDOList/master/doc/main.PNG" width="240" height="130"> <img src="https://raw.githubusercontent.com/aFku/JS-ToDOList/master/doc/modal.png" width="240" height="130"> <img src="https://raw.githubusercontent.com/aFku/JS-ToDOList/master/doc/mobile.PNG" width="70" height="130">

## Stack

* JavaScript
* HTML
* CSS
* Bootstrap 4

## Deployment

To use this application you have to have local web server. You can use Node.js.

1. Firstly you need to install [Node.js](https://nodejs.org/en/download/)
2. Then you need to install http-server with npm. Execute command below in your command line (not sure if it works with regular command line in Windows so use PowerShell):

`npm install -g http-server`

3.  Now you can run http server with command:

`http-server .\<path to directory with index.html>\`

4. Type in your browser:

`127.0.0.1`

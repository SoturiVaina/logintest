## This application reqires Node.js dependencies and a MySQL database.
### REMEMBER: When pulling from the repository after initial installation, be sure to update your Node.js project and MySQL database as explained below.
### NOTE: Much of the code for this application is based on this tutorial: https://blog.logrocket.com/building-simple-login-form-node-js/

Node.js: https://nodejs.org/en/download <br>
MySQL: https://dev.mysql.com/downloads/installer/ (Use the web-community installer)

- Verify the installation of Node.js in the Command Prompt by using the commands ```node -v``` and ```npm -v```.
- To install the Node.js dependencies, use the Command Prompt to navigate to the folder with your local Git repository, then use the command ```npm install``` which will automatically install the dependencies from ```package.json``` and set up your Node.js project.
  - Once you have initially installed the Node.js dependencies, if you ever pull from the repository REMEMBER to use ```npm install``` in case of any updated dependencies (even when there are no updated dependencies, it is good practice to do so every time you pull).
<br>

- To install MySQL, use the following video guide below from around 9:48 to 15:07, which shows how to configure the MySQL Installer (NOTE: Use the Full Setup Type when installing if Developer Default is not available; make sure it includes the Server and Workbench).
  - https://youtu.be/7S_tz1z_5bA?si=q64HaxnL2QVUPzlM&t=588
  - When setting the MySQL root password, MAKE SURE to remember/keep the password as it will be used later in configuration.
- In the MySQL Workbench, you should see a local connection under MySQL Connections (if not, refer back to the video guide), which you should open.
- I have included a ```create-db.sql``` file, which you can open in a new query tab and use to create the database and table (lightning bolt button to execute queries), or you can enter these queries in manually on the empty query page.
- I have also included an ```update-db.sql``` file, which you can run in your server to update the database and tables if you pulled from the repo and the design has changed. If this is your first time setting up the table with ```create-db.sql```, the queries are already updated so you do not have to worry about this (NOTE: The queries in ```update-db.sql``` will also delete all of the content of the table).
  - Once you have your database and table set up, keep in mind that at any time you can enter the query ```SELECT * FROM users;``` to see the actual structure and contents of your table, as well as the query ```TRUNCATE users;``` to delete all of the entries in your table.
<br>

- Lastly, you need to set up your environment variables, so create a file called ```.env``` in the project folder and copy the data from the code block below into it. You will need to add your MySQL root password under ```DATABASE_PASSWORD``` as well as create a session secret key, which can be just about any somewhat-secure combination of characters for now, and add it under under ```SESSION_SECRET``` (NOTE: If any of your other environment variables—such as ```DATABASE```—are different, then they will need to be updated as well, although this is unlikely if you are following the instructions).
  - In earlier versions of the repo, the ```.env``` was included, but this was removed to prevent any overwriting when pulling, so if you are running a version that did include the ```.env``` file, please updated it according to the code block below.

#### ```.env``` File Contents:
```
DATABASE = login_db
DATABASE_HOST = localhost
DATABASE_USER = root
DATABASE_PASSWORD =
PORT = 5000
SESSION_SECRET =
```

- Another thing to note is that in the Handlebars files, the HTML ```<marquee>``` tag is used (because it is fun), which is deprecated and should NOT be used in anything serious, so if your browser does not support the ```<marquee>``` tag just simply remove it from each of the Handlebars files.
<br>

Once you have done all of the above, you should be able to navigate to your application folder and use the command ```npm start```, which will start the server and run the application with nodemon. Now, if you type ```localhost:5000``` into your web browser, it should bring you to the site. If there are any problems with installation or configuration, or you feel that I missed a step, just let me know.

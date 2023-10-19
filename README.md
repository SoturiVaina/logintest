This application reqires Node.js dependencies and a MySQL database.
- 
Node.js: https://nodejs.org/en/download
MySQL: https://dev.mysql.com/downloads/installer/ (Use the web-community installer)

- Verify the installation of Node.js in the Command Prompt by using the commands "node -v" and "npm -v".
- To install the Node.js dependencies, use the Command Prompt to navigate to the folder with your local Git repository, then use the command "npm install" which will automatically install the dependencies from package.json and set up your Node.js project.
- To install MySQL, use the following video guide below from around 9:48 to 15:07, which shows how to configure the MySQL Installer (NOTE: Use the Full Setup Type when installing if Developer Default is not available; make sure it includes the Server and Workbench).
  https://youtu.be/7S_tz1z_5bA?si=q64HaxnL2QVUPzlM&t=588
- When setting the MySQL root password, MAKE SURE to remember/keep the password as it will be used later in configuration.
- In the MySQL Workbench, you should see a local connection under MySQL Connections (if not, refer back to the video guide), which you should open.
- I have included a create-db.sql file, which you can open in a new query tab and use to create the database and table, or you can do this manually in the empty query page.
- Once you have your database and table set up, keep in mind that you can enter the query "SELECT * FROM users;" (without quotes) into the query page at any time to see the actual structure and contents of your table.
- To connect to the MySQL server through the application, open the .env file in a text editor and set the DATABASE_PASSWORD variable to your MySQL root password (NOTE: If your database name in MySQL is different than what is shown for DATABASE, or if any of the other .env variables are different for that matter, then their values also need to be changed).
-
Once you have done all of the above, you should be able to navigate to your application folder and use the command "npm start", which will start the server and run the application with nodemon. Now, if you type "localhost:5000" into your web browser, it should bring you to the site. If there are any problems with installation or configuration, or you feel that I missed a step, just let me know.

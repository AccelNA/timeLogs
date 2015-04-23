The folder stracture of front end part od this application as follows
* Folder Stracture


![Front End Folder](https://github.com/AccelNA/aws-coe/blob/master/contents/images/frontendfolder.png)<br/>

In this folder, first file is index.html. This file include a javascript file which named as **budle.js**. The bundle.js is created when you call **npm start** command. This file wrapped entire node packages and treated as normal javascript code. **browsify** npm is used for this pupose. If any changes you make on file, then that also need to reflect in bundle.js. For this purpose we include a npm **watchfy**. 


Inside **JS** folder we are following flux architecture.
![JS Folder](https://github.com/AccelNA/aws-coe/blob/master/contents/images/timelogJSFolder.png)<br/>

The **app.js** folder is the entry point to this application. This fils contains all routing operation and multiple view render operations are held. The **components** folder treated as view part in flux architecture. Some configuration required in our application, that is included in **config** folder. All REST operations are handled by **GET.js** file, which is included in **RESTService** folder. 

The user view part are in **component** folder. Reusable component keep as file inside the **component** folder and folder is treated as module of the application. 

All the operation for view part is handled by **stores** folder. Each Modules have one file in stores folder.

Dispatcher is the central part of flux architecture. It is handle all the operation and make relationship between action and view part.

This application is a responsive web application. For making this reponsive web application, we have used different React Bootstrap components. The CSS, JS and Fonts are keeping in **Bootstrap** folder.

The application contains different node modules. All node modules contain inside **node_modules**.

STEPS TO START Application
- clone this project from git hub
--install the dependancies using command -->"npm install"
--build the project using command -->"npm run build"
--start the application using command-->"npm run start"
-- open brower with url-->http://localhost:3000/


1 .install below libraries in application  they are used as utility

"lodash": "^4.17.21",
"moment": "^2.29.1",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"axios": "^0.24.0",
"@mui/icons-material": "latest",
"@mui/material": "^5.0.6",
"@mui/x-data-grid": "^5.0.0-beta.5",



2. folder structure 
src>
	views
	services
	
	
	Views:--this folder contians all react views and child componenets 
	Services -- this folder has one js file API ..here we have defined all http methods and service call methods
	
3.parent component name is :APP.js

APP.JS returns below components
<ApplicationBar> ---->its header bar in UI
<ApplicationDrawer> --->its menu drawer it has 2 links customer and trainer
<Container> -->this renders customer page by default and trainer page when user clicks trainer in appication drawer.



4.Dialogs components:
1.add New customre dialog ->>>>this dialog will popup when user clicks add new customer btn
2.Add New trainings dialog-->>>this will show popup when you click add training link in customer row
3.ALERT DIALOG:this will show popup when user wants to delete customer or training.

5. CustTable and TrainingTableCOL folder:
these folder contins custom column view passed as param to table component

 



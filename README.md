# What is IMS

React + Laravel Fullstack Web App that controls the data from Subscribers

## Installation

-   Download and extract the zip file in your folder
-   Open it to your favorite Code Editor (e.g. vscode)
-   Open terminal and go to "ims-main" directory
-   Run "composer install" in the terminal while in the "ims-main" directory
-   Open new terminal and run "cd react" while in the directory to go to react folder
-   Run "npm install" in the terminal while in the "react" directory
-   I already included the .env files in the repository for database, no need to add new (sqlite)
-   Go back to the terminal that you run composer install and run "php artisan migrate"
-   Please select "yes" to the question for migration
-   Run "php artisan migrate:fresh --seed" (for migration and fake data values)
-   You can visit https://sqliteviewer.app/ and Open the database/database.sqlite file to see the generated data in database
-   The resource example that you sent is always in the top row of database (id=1)
-   Run "php artisan serve" in the terminal that you run php artisan migrate
-   Open the react/.env and make sure that "VITE_API_BASE_URL=http://localhost:8000" is match with the generated port, update this if it's different in your local
-   Open the other terminal that you run npm install and run "npm run dev"
-   Open http://localhost:5173/, please change Port if you have different Port

## Notes

-   I used Soft Deletion function of Laravel in Delete to preserve the data.

## API Endpoints (Update the Port with your current Port)

**Get All Data**

-   (GET) http://localhost:8000/api/subscriber (soft deleted cannot be fetched)

**Get by Phone Number**

-   (GET) http://localhost:8000/api/subscriber/{$phoneNumber} (soft deleted data cannot be fetched)

**Update by Phone Number**

-   (PUT) http://localhost:8000/api/subscriber/{$phoneNumber} (if the phoneNumber cannot be found, it will create a new data)

**Delete by Phone Number**

-   (DELETE) http://localhost:8000/api/subscriber/{$phoneNumber} (only soft deletes, meaning data is still there but cannot be fetched)

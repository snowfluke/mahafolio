# config

Copy and paste your GCP Drive API credentials or Service Account on `config/`

# .env file

```
PORT=YOUR_BACKEND_PORT
GDRIVE_SA='YOUR_SERVICE_ACCOUNT_FILENAME.JSON'
ROOT_FOLDER='YOUR_ROOT_FOLDER_ID_IN_GOOGLE_DRIVE_SHARED_WITH_SERVICE_ACCOUNT_EMAIL'
MONGO_URI=YOUR_MONGODB_CONNECTION_URI
ADMIN_APP_SECRET=YOUR_ADMIN_APP_SECRET
APP_SECRET=YOUR_JWT_APP_SECRET
FRONTEND_ORIGIN='YOUR_FRONT_END_ORIGIN'
```

# admin user

Create a collection in mongodb with the name `admins`. The property only consists of two stuff:

1. `email` : Insert your email to your mongodb directly
2. `password` ; Generate it first with command in terminal `yarn password inputyourpassword`

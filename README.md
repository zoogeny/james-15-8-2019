# James - 15/8/2019
## Installation

NOTE: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Project setup

* install dependencies  
  `yarn install`  
  note: `yarn` was the default lockfile created by `create-react-app` so I kept it

* initialize the database  
  `npm run init`

### Run production version

* Build the production client  
  `npm run build`  
  output goes to the `build` folder

* Run the app as an express server:  
  `npm start`  
  client application is served from: http://localhost:4000  
  api is served from: http://localhost:4000/api

### Debug application

* To debug the api server  
  `npm run start:dev`  
  debug api server will run on http://localhost:4000/api

* To debug the client application (hot reloading of React app)  
  `npm run start:react`  
  debug client server will run on http://localhost:3000/

### Test application

* To run interactive tests:  
  `npm test`

## Security

### Addressed

* upload form only accepts files with extension .jpg and .png
* client javascript checks the declared file mime type is jpg or png
* client javascript checks the file size is less than maximum
* server javascript checks the file mime type is jpg or png
* server javascript checks the declared file size is less than maximum
* server javascript uses `file-types` library to double check mime type
* database library escapes all data by default to avoid SQL injection

### Not Addressed

* client doe not check the binary file to confirm mime type before attempting upload
* server side library used to handle multipart form file uploads saves the
  file to the disk immediately
  (e.g. before any sanity checks have been completed)

## Improvements

* consider other transport formats other than REST  
  (e.g. GraphQL, gRPC)
* Server side render using ReactDOMServer
* Pagination for long lists
* Better cross-browser and backward compatibility  
  (e.g. polyfills for libraries like `fetch`, async/await support using babel)
* More careful consideration of CORS policy
* Error handling on document load list
* aria attributes for accessibility
* debouncing search (e.g. avoid typing spam)
* Better sharing between server & client for shared data  
  (e.g. allowed mime types, max file sizes)
* Transaction handling for multi-part server request (e.g. delete)
* Integer ids for documents could be limiting long-term
* Super simple search using SQL LIKE could be significantly improved
* Would be nice to have a proper logging solution (other than console.log)

## Libraries

* ### react / react-dom / react-scripts
  default installation along with create-react-app
* ### express
  for API server URL routing
* ### cors
  express middle-ware to handle CORS
* ### node-sass
  sass support
* ### multer
  handle multi-part form uploads (for file upload)
* ### read-chunk / file-types  
  detect the actual file type from the file binary
* ### sqlite3
  basic persistence

### Dev libraries

* ### nodemon
  debug monitoring for express server

---

## API

API uses a REST interface and JSON transport.

### GET /list
- allows retrieval of all documents in the data store
- accepts no parameters
- returns the list of saved documents as a JSON array in the form:
        [
            {
                "id": 12,
                "title": "original_filename.jpg"
                "size": 6324
            },
            {
                "id": 13,
                "title": "another_filename.jpg"
                "size": 3456
            }
        ]
    where
    - **id**: a unique identifier for the document assigned after upload
    - **title**: the original file name of the document prior to upload
    - **size**: the size of the file in bytes

### GET /search
- allows searching for documents in the data store
- requires query parameter `term`  
  e.g. `/api/search?term=what%20i'm%20searching%20for`
- returns a list of saved documents that begin with the search term:
        [
            {
                "id": 12,
                "title": "original_filename.jpg"
                "size": 6324
            },
            {
                "id": 13,
                "title": "another_filename.jpg"
                "size": 3456
            }
        ]
    where
    - **id**: a unique identifier for the document assigned after upload
    - **title**: the original file name of the document prior to upload
    - **size**: the size of the file in bytes

### POST /upload
- allows upload of a new file to the data store
- requires param `upload` of type `file` in a request body formatted as `multipart/form-data`
- returns a JSON payload including the id of the successfully uploaded file in the form:
        {
            "error": null,
            "id": 6,
            "title": "original_name.png",
            "size": 5678,
        }

### DELETE /delete/:id
- allows removal of a file from the data store
- requires an id in the URL  
  e.g. `/api/delete/12`
- returns a JSON payload including the id of the successfully deleted file in the form:
      {
          "error": null,
          "id": 1234
      }

---
## Other notes

* This was my first use of React hooks (e.g. `useState` and `useEffect`) and
  I think I could probable structure some of the application state a little
  bit more nicely

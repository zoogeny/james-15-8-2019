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
  application is served from: http://localhost:4000/

### Debug application

* To debug the api server  
  `npm run start:dev`  
  debug api server will run on http://localhost:4000/api

* To debug the client application (hot reloading of React app)  
  `npm run start:react`  
  debug client server will run on http://localhost:3000/

NOTE: both the api and client debug servers can be run simultaneously

### Test application

* To run interactive tests:  
  `npm test`

## Security

### Addressed

* upload form only accepts files with extension .jpg and .png
* client and server checks the declared file mime type is jpg or png
* client and server checks the file size is less than maximum
* server uses `file-types` library to double check mime type by inspecting binary
* database library escapes all data by default to avoid SQL injection
* react escapes any strings inserted into HTML (e.g. document title)

### Not Addressed

* HTTPS / Authentication (as per instructions)
* client doe not check the binary file to confirm mime type before attempting upload
* server side library used to handle multipart form file uploads saves the
  file to the disk immediately
  (e.g. before any sanity checks have been completed)
* Express errors are leaked (e.g. some 5xx/4xx errors coming from router)
* DOS attacks or API spamming (no load testing either)
* Application logging and monitoring

## Improvements

* consider other transport formats other than JSON  
  (e.g. GraphQL, gRPC)
* Server side render using ReactDOMServer to improve SEO and time to first paint
* Pagination for long lists
* Better cross-browser and backward compatibility  
  (e.g. polyfills for libraries like `fetch`, async/await support using babel)
* More careful consideration of CORS policy / cache headers
* aria attributes for accessibility
* debouncing search (e.g. avoid typing spam)
* Better sharing between server & client for shared data  
  (e.g. allowed mime types, max file sizes)
* Transaction handling for multi-part server request  
  (e.g. delete from file system and delete from database)
* Integer ids for documents could be limiting long-term, strings might be a better choice
* Stable ids: right now id strategy is autoincrement in database so chance of two different images sharing the same id (although never at the same time). Maybe GUID would be a better id strategy.
    * NOTE: this makes caching a bit of a problem since if two images can share
      an id then there is a chance someone will see the wrong image from the
      `/view` endpoint. This is really more of a bug than an need for improvement.
* Super simple search using SQL LIKE could be significantly improved  
  (probably better to use dedicated search solution like ElasticSearch)
* Would be nice to have a proper logging solution (other than console.log)
* Custom error handlers for express server

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
  basic persistence for server api

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

### GET /view/:id
- allows the retrieval of a file from the data store
- requires an id in the URL  
  e.g. `/api/view/12`
- returns the document along with the detected mime type of the file

# Bullet-in Test task

## Demo

## Description
   To see additional features, follow the demo link.

#### Technologies
- React
- NodeJs + Express.js
- MongoDB + Mongoose ORM

#### Server Api
Server provides CRUD API with REST request types for {user} and {post} entities,but some of them are disabled. Server also has auth api.
Api url looks like this:
    
    (get/post/delete/put)://api/v1/{entities}/{entity_id - if needed}

Auth API operations:

    post: /api/v1/auth/login
    post: /api/v1/auth/register

## Install & run
After clonning, install packages in both client and server directories:
    
    npm -i
Then you can run both cient dev server and back-end server or build client with 

    npm build
In client directory and mooving build dir to back-end server's dir.  
Server .env file has suach a configuration:
    
    MONGODB_URI 
    PORT
    PASSWORD_HASH_KEY 
    JWT_SECRET
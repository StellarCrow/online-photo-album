# online-photo-album
Vue.js app (FE final task)

## About
Online Photo Album - web application like Instagram, where you can upload an image, create a new album, set likes, search, watch, filter and sort other user's photos.

## Features
	Client Side:
- Created Client side using Vue.js;
- Developed modules for changing app state using Vuex;
- Developed communication between client and server using axios.
- Project was divided on small reusable components;
- Implemented form validation using Regular Expressions;
- Implemented image uploading (with preview, size checking and limits);
- Implemented image lazy-loading (using Lozad.js)
- Implemented map on the site using Google Maps API;
- Implemented image searching by tags;
- Implemented image sorting by likes, date (from oldest to newest and vice versa);
- Implemented image filtration by orientation (portrait, landscape, square) and colors;
- Implemented likes;
- Made responsive markup;
- Designed app style;
- Created component for pagination;

  Server Side:
- Created Web server using Node.js (Express JS);
- Created authentication using JWT token;
- Defined Mongoose Schemas as instances in data base;
- Implemented photo uploading (using Multer) to the local folder with image compression (using Sharp);

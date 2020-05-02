# JS Loader
Load javascript files asynchronously

# Install
```sh
npm i @mersanuzun/js-loader
```

# Usage
```javascript
const JSLoader = require('@mersanuzun/js-loader');

JSLoader.loadJS('https://code.jquery.com/jquery-3.5.0.min.js', () => {
  console.log('Done!');
});

JSLoader.loadJSs([
  {
    path: 'https://code.jquery.com/jquery-3.5.0.min.js',
    cb: () => {
      console.log('Done Jquery');
    },
    async: true,
  },
  {
    path: 'vendor.js',
    cb: () => {
      console.log('Done Vendor');
    },
    async: true,
  }
]);
```

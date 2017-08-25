## Debugging project

this project contains the minimal configuration needed to reproduce an issue when react-hot-loader is included into the webpack DLL

## The issue

react-hot-loader fails to replace a component that has shouldComponentUpdate returning false if and only if react-hot-loader is included into the webpack DLL

## Step to reproduce the issue

- clone this project
- npm install
- npm run dll
- npm run start
- open the browser at localhost:4000
- open the browser console and notice the the hot reload is active
- open the file hot-reload-test/module/Stateful.js and notice that is has shouldComponentUpdate returning false, this is done intentionally to reproduce the issue
- touch the static text inside the file hot-reload-test/module/Stateful.js
- notice that the content in your browser has not been replaced even though the console logs say so

## Proving that the issue is related to the DLLs

after reproducing the issue

- stop the dev server
- remove the DllReferencePlugin from hot-reload-test/webpack.dev.js
- start the server
- touch the static text inside the file hot-reload-test/module/Stateful.js
- notice that the content in your browser has been replaced

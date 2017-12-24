# Reddit Browser

Reddit Browser is a progressive web app for browsing Reddit using [Reddit's Public API](https://www.reddit.com/dev/api).

The minimal viable product includes 
* User authentication 
* Home/Subreddit feeds with infinite scrolling
* Listing/Comment views
* Voting on comments and posts
* Parity with Reddit's routes


## Installation

```
git clone https://github.com/ian-henderson/reddit
cd reddit
npm install
```


## Reddit App Registration for Local Developement

1. Sign into reddit.com
2. Create an app under the "developed applications" heading [here](https://www.reddit.com/prefs/apps).


## Environment Variables

Once the app is registered, create a file named `.env.development.local` in the top directory using the client id and secret associated with your app.

```
REACT_APP_CLIENT_ID=<your app client id here>
REACT_APP_REDIRECT_URI=http://localhost:3000/login
REACT_APP_SECRET=<your app client secret here>
```


## Development Server

```
npm start
```

This will start a hot loading local development server at `localhost:3000`.


## Documentation

* [Introduction](docs/introduction/index.md)
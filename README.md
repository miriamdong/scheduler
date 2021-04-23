# Interview Scheduler

Using the latest tools and techniques, we build and test a React application that allows users to book and cancel interviews. We combine a concise API with a WebSocket server to build a realtime experience.

[Click Here to Visit Me](https://ssssss.netlify.app/)

## Setup

Install dependencies with `npm install`.

## Screenshots

![Creating Interview Appointments:](https://github.com/miriamdong/scheduler/blob/master/Doc/screencapture-localhost-8000-2021-04-21-14_19_45.png?raw=true)

![Edit Interview Appointments:](https://github.com/miriamdong/scheduler/blob/master/Doc/screencapture-localhost-8000-2021-04-21-14_20_29.png?raw=true)

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Built With

- React: 16.9.0
- Webpack, Babel
- Axios, WebSockets
- Firebase

## Dependencies

- classnames
- Normalize.css
- react-dom, react-scripts
- Storybook, Webpack Dev Server, Jest, Testing Library, Cypress
- Firebase for User authentication

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## Stretch Specifications

### WebSockets

The client application communicates with a WebSocket server.
When a user books or cancels an interview, all connected users see the update in their browser.

### Firebase

Email address & password-based authentication

## Features

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

This project need a star ⭐ from you ♥.

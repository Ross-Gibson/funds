# funds

Follow the [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started) guide to ensure you have the following dependencies installed and configured:

- Node (verison 8.3 or newer)
- Watchman
- Xcode
- Xcode CLI
- CocoaPods

Running the app

- from the project root run
  `yarn setup`
- and then run
  `yarn pods`
- serve the api by running
  `yarn serve`
- Open a new terminal tab and start the server by running
  `yarn start`
- Open a new terminal tab and then run
  `yarn ios`

TODO:

- Fetch more expenses when you scroll to the bottom of the expense list
- Persist state using something like `redux-persist`
- Display dates and times using the user perfered format 12/24hr
- Cache avatar images
- Add a launch/splash screen
- Add an app icon
- After adding a comment, it is possible to edit it, but nt to remove it.
- Show the full comment on the Expense detail view rather than truncating
- Refactor calls to the API to reduce code duplication
- Resolve navigation back swipe gesture between the native stack and the JS stack

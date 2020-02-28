# :moneybag: Funds

> Fund - "A sum of money saved or made available for a particular purpose".

A solution to the [Pleo mobile challenge](https://github.com/pleo-io/mobile-challenge).

## Getting started

Follow the [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started) guide to ensure you have the following dependencies installed and configured:

- Node (version 8.3 or newer)
- Watchman
- Xcode
- Xcode CLI
- CocoaPods

## Running the app

- from the project root run `yarn setup`
- and then run
  `yarn pods`
- serve the api by running
  `yarn serve`
- Open a new terminal tab and start the server by running
  `yarn start`
- Open a new terminal tab and then run
  `yarn ios`

## Features

- :white_check_mark: View a list of expenses
- :white_check_mark: Add a comment to an expense
- :white_check_mark: Filter expenses by missing receipts
- :white_check_mark: Search expenses by date, comment, amount etc
- :white_check_mark: Localised for English, French and Spanish (I used Google translate, so excuse me if the translations are poor)
- :white_check_mark: Right to Left UI support - works with languages like Arabic
- :white_check_mark: Dark Mode support, and all components are fully themed
- :white_check_mark: Typescript
- :white_check_mark: Redux & Redux Sagas
- :white_check_mark: React Hooks Context API
- :warning: Add a receipt image to an expense (started, but not finished)
> NOTE: Although the image selection for the receipt flow is not fully linked-up, I have added a dummy call to upload a photo via the API. You can test this by running the app locally and then navigating to add a receipt for an expense. When you tap the pink “Add receipt” button you’ll see a console log for “Added receipt to expense:” followed by the JSON of the expense object. In the receipts object you should see the url of the added image.
- :x: e2e, unit and UI tests

## Approach

I have used a mixed approach on the JS side with both Redux-Sagas and React Hooks (mainly as proof of concept). The Sagas manage the expenses state and anything that would be persisted. As well as handling the flow of actions and async API calls. The Hooks side of things use the Context API and currently only manage the translations, but could be expanded to handle things like presenting alerts and notifications in the future.

For the UI I have opted for [atomic design](https://atomicdesign.bradfrost.com/chapter-2/), and have chosen to built on top of [react-native-paper](https://callstack.github.io/react-native-paper/index.html). This approach lends itself well towards testing (although I did not get around to this), and the use of React Native Paper, gives a good base to build upon for theming and localisation.

## Debrief

I started this challenge with a good understanding of Swift, Objective-C and React Native - so I felt comfortable reading the list of requirements. However, I have never worked on a hybrid app, so this was immediately the area that I had to research. After reading a few blog posts, I understood the basics of how to bridge between the two realms, but it seemed like most use cases were for developing native views in Swift to be used on the React Native side (or vice-versa). The part I struggled with most was how to satisfy the requirements of the challenge and develop at least one full screen natively (opposed to having the screen of the JS side, but with each individual view natively). I found this hard to conceptualise, because of the navigation stack. It seemed like I would need a natural break in the stack to avoid duplication of navigation on both sides. After a bit of thinking I settled on the approach of having the main navigation handled by [react-navigation](https://reactnavigation.org), and then presenting the add receipt UI modally on a new stack controlled natively.

Since I had already developed a large portion of the app using React Native, I did not want to simply show a native screen using Swift in a none production manner. Instead, I wanted to approach this in a re-usable and testable way from the native side too. So, I started to implement a flow controller, with dependency injection and an app container to build an MVVM architecture. This soon became very time consuming to get to the point of displaying a simple screen and having the navigation managed from both sides. You can see this by comparing commit [31217a9](https://github.com/Ross-Gibson/funds/commit/31217a9f971092058a90333e70b0137ee4298ecb) against [955b7c2](https://github.com/Ross-Gibson/funds/commit/955b7c2414c5f3d42d1718380824d53bf6b61719). Although both technically work, the first achieves this by [manually setting the windows root view in the App Delegate](https://github.com/Ross-Gibson/funds/commit/31217a9f971092058a90333e70b0137ee4298ecb#diff-fa0a8f829b238f7c64b4c0ce8fc1472fR42) which is not an approach I would be happy with in production grade code.

After having the navigation and boilerplate configured on the native side the idea was to start building out the photo picker and camera view controllers, to enable a user to select an image to upload as a receipt. However, I made the decision to stop at this point because I had invested around four full days of development time on this challenge and suspected that I was maybe approaching this too much like I was making an app for release.

I hope you can understand my reason for stopping, and I'd be more than happy to talk you through my plan for the development on the native side if you'd like. Otherwise, here's a summary of what I would do to finish:

- Create a UI for the image source selection (Camera, Photo albums etc)
- Inject the permissions service into the view model of the image source selection view controller
- When a user selects the source type, e.g. Photo albums, use the permissions service to handle the permission flow
- After permission is granted, present a UI for photo selection
- Allow the user to select a photo, and then map this to a photo model object
- When the users dismisses the photo selection flow, pass the Swift photo model object back to the React Native side
- From the React Native side, respond to the dismiss action in the saga, and obtain the url of the photo from the model object
- Use the API to upload the photo with the given URL
- Add the logic to the reducer to handle the upload success/fail cases and update the state accordingly
- On the expense UI load the image into an `<Image />` component to display, using the url we now have stored in state

## Things I would do if continued developing

- Fetch more expenses when you scroll to the bottom of the expense list
- Persist state using something like `redux-persist`
- Display dates and times using the users preferred format 12/24hr
- Cache images
- Add a launch/splash screen
- Add an app icon
- After adding a comment, it is possible to edit it, but not to remove it.
- Show the full comment on the Expense detail view rather than truncating
- Refactor calls to the API to reduce code duplication
- Resolve navigation back swipe gesture between the native stack and the JS stack
- Improve the show/hide of the missing receipts filter, and add some animation
- Add e2e, unit and UI tests

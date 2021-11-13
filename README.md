# redux-academ
I will continue to build on this folder as I become more clear on the essentials of Redux. Keep in mind, this is built with @reduxjs/toolkit in mind & won't be very relevant to vanilla redux.

At the moment, I have pseudo-code comments guiding the build of a shopping-cart-based app. The best files to refer to are (in order):

- index.js : to create a global store
- ui-slice.js : to create a simple slice with simple reducers, including one that carries an action
app.js to see how the uiState ties into the app.js to "show a notification" If you would like to see how one would naively tie in the showNotification reducer, head to uiSliceNotificationMgmtWithoutThunk.js
- then head to cart-slice to integrate showNotification state updates 7 send them to the API
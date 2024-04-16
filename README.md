Description:

The task at hand requires business logic separation and demonstration of SDK usage in both the mobile and web application, hence I've created all the required tasks in the same directory in a single repository.

Mobile Application:

To run the application:

First, add the required variables in the .env file in the root of the project. You can find the env variables with their values in the email I've shared.

- For Android:

  1.  Open the project in visual studio code.
  2.  Run `yarn` in the terminal.
  3.  Start metro bundler using `yarn start`
  4.  Open Android studio and browse to the `android` directory of the project and open it in Android Studio.
  5.  Set build variant to `debug` or `release`.
  6.  Run the application.

- For iOS:
  1. Open the project in visual studio code.
  2. Run `yarn` in the terminal.
  3. Run `cd ios && pod install && cd ..` in the terminal.
  4. Start metro bundler using `yarn start`
  5. Open XCode, browse to the ios directory in the project, and open the MoviesApp.xcworkspace.
  6. Set run scheme to `debug` or `release`.
  7. Run the application.

Folder structure:

movies-sdk -> The actual SDK for data fetching of movies. I kept it in the same directory instead of publishing it because of API key restrictions and to share it for both web and mobile apps without having to copy it.

src -> The root directory of the application

- assets -> Contains the required images
- components -> The reusable components compose this folder.
- config -> To store the configuration related logic. In this case, we only need the environment variables as part of config.
- navigation -> I keep my navigation files separate from components to isolate it and manage it separately from components.
- network -> I setup the network client which is used to access the SDK in this folder.
- rtk -> Shorthand for Redux Toolkit - I used redux toolkit query to manage the state of the application and to trigger API calls and all the related logic is stored in this folder.
- screens -> The actual screens for the application
- strings -> I prefer to keep strings in separate file so that if I need to add localization later, I can do that easily.
- theme -> Any theme related code like colors, fonts etc.
- types -> The .d.ts files for globally reusable types.

I keep the structure where I use `index` files to shorten the export paths.
For components, I keep separate files for component, styles, and logic (using custom hooks). This way I am able to avoid the component files from being too large and can easily find out where do I need to make changes.

Assets: Usually I would use SVG icons to keep the app size short but due to unavailability of free svgs, I used png files.

Optimization: I used useMemo, useCallback and React.memo() features to make use of memoization where possible and avoided those where I felt that the cost of comparison would exceed the cost of re-rendering.

Approach:
This being not a very large project, I avoided the modular approach to avoid the folder structure from being too large and enhance code sharing where possible. After identifying any extractable UI components, I decided on the state management tool and I opted for Redux Toolkit Query. Although, this is not a large project where redux would be absolutely necessary, I preferred it because with redux toolkit query, we get the API calling logic as well which provides better support for error handling and loading states as well as for caching.

Web Application:

As the web app part was the bonus part, I didn't put much effort in it, mainly because of lack of time due to personal errands. I have reused most of the code from the mobile application in it such as the state management, network client setup, types, config etc. For the application itself, I have used Next.js as there were some troubles with create-react-app and I'm not familiar with other frameworks available (happy to explain it during the interview).

The application is a bare-minimum one to just demonstrate the integration of SDK and doesn't tackle the error handling very well and neither the loading states.

To run the application:
Open the project in VS Code.
Create the .env.local file and add the provided env variables in it.
Simply run `yarn run dev` in the terminal.
The app should launch.

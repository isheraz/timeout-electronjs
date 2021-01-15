# timeout-electronjs

Problem Statement:
Create a background application which runs automatically. Timer starts and locks your screen after an hour for 5 minutes and reminds you it's time to take a break from the screen and go out!.

- Detailed Requirements: Menu options: start, stop and pause with it's submenu: for 1 hours, 2 hours, 3 hours and 4 hours. Automatically starts at boot with settings to turn it off, on by default.. System halt after 1 hour, black screen with message (Time to take a break), timer and clock. So that, user can't use the screen for 5 minutes.

Implementation:

Jan 12, 2021: Setting up the initial electron project and running it in the tray with a free app icon and a basic tray menu.

Jan 13, 2021: Menu options: start, stop and pause with it's submenu: for 1 hours, 2 hours, 3 hours and 4 hours and a small browser window for the timer to show.

Jan 14, 2021: Implementation of the start, stop, reset, pause (with submenu options), minimize, hide, show and exit buttons. App automatically starts at boot with settings to turn it off, on by default. System halt after 1 hour, black screen with message, Time to take a break. So that, user can't use the screen for 5 minutes and show the quotes on the halt screen.

Jan 15, 2021: Understanding of all the local databases. Local Rxdb creation using leveldown adapter for nodeJS to store the activity data locally and creation of the Activity Schema. Insert an activity and Display all activites are still remaining.

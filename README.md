# Readcursive Ionic App

This project uses Ionic 6 and Capacitor.

## Ionic setup

1. Install [Node JS](https://nodejs.org/en/download/) (I would recommend the LTS version)
2. Run CMD/Terminal 
3. Run the command `npm install -g @ionic/cli` to install the ionic CLI globally (this is required for running commands like `ionic serve`)
4. Clone the project
5. `cd` into the project
6. Run the command `npm install` to install the packages necessary for the project
7. Run the command `ionic build` to build the app
8. Run the command `npx cap sync` to build the android and iOS projects
9. Run the command `npx cap open android` or `npx cap open ios` to open the respective IDEs
10. Run the command `ionic cap copy android --prod` to build the production version of the app

## Useful commands
- `ionic build && npx cap copy && npx cap open android` - compound command to build and open android studio
- `npx cap open android` - launches Android Studio
- `npx cap open ios` - launches Xcode
- `npx cap sync` - updates dependencies, and copies any web assets to your project
- `npx cap copy` - copy web assets only, which is faster if you know you don't need to update native dependencies
- `ionic g component` - automatically adds a component to project. Used for things like modals
- `ionic build --prod --source-map` - builds the project production version with source maps for Sentry.io support
- `ionic cap copy` - builds the project and copies the necessary files to update the app builds
- `ionic cap copy --prod --source-map` - builds the project in production mode (necessary to make isDevMode return false) and copies the necessary files to update the app builds
- `ionic cap run android -l --external` - runs the project in live-reload mode (requires port forwarding)
- `ionic cap copy --watch --source-map` & `ionic cap copy android --no-build` can be used as a poor-mans live-reload
- `npx jetifier` - resolves build hanging

## Useful links

- [Ionic installation](https://ionicframework.com/docs/installation/cli)

- Use this if get permission errors when installing Ionic on Mac or Linux - [Resolving EACCES permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

- [Using Capacitor with Ionic](https://capacitor.ionicframework.com/docs/getting-started/with-ionic/?utm_source=cli&utm_medium=referral&utm_campaign=CLI)

- [Capacitor Android Documentation](https://capacitor.ionicframework.com/docs/android)

- [How to translate in Ionic 4 — Globalization, Internationalization and Localization](https://enappd.com/blog/how-to-translate-in-ionic-4-globalization-internationalization-and-localization/11/)

## Common problems

- Make sure you run `ionic build` before `npx cap copy` otherwise the app won't update

### (Mac or Linux) `Missing write access` or EACCES permissions errors 
Taken from [the NPM docs](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

1. On the command line, in your home directory, create a directory for global installations: `mkdir ~/.npm-global`
2. Configure npm to use the new directory path: `npm config set prefix '~/.npm-global'`
3. In your preferred text editor, open or create a `~/.profile` file and add this line: `export PATH=~/.npm-global/bin:$PATH`
4. On the command line, update your system variables: `source ~/.profile`

### (Mac) `Error running update: /bin/sh: pod: command not found`
1. Make sure Xcode is installed
2. In Terminal, run the command `xcode-select --install`
3. In Terminal, run the command `sudo gem install -n /usr/local/bin cocoapods`

### (Linux) `no permissions (user in plugdev group; are your udev rules wrong?)`

1. Make sure you have USB debugging enabled
2. Change USB Preferences to PTP or MTP

### (Linux) Android Studio: `/dev/kvm device permission denied`

1. Run the command `sudo apt install qemu-kvm` to install kvm
2. Run the command `sudo adduser $USER kvm` to add the current user to the kvm group
3. If you are still getting permission denied, Run the command `sudo chmod o+x /dev/kvm` to give kvm open and execute permissions
3. If you are still getting permission denied, Run the command `sudo chown $USER /dev/kvm` to make the current user owner or kvm



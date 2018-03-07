## Opinionated modern front end build configuration with Webpack

This repository contains my newest front end build configuration to power my future React and modern JavaScript applications or websites.

I chose to use Webpack because of the many features it has and its rich configurability. Although it's a pain to work with and configure it has a great community behind it and solid documentation. The great many features it offers and the complex build process you can build with it is worth the struggle of implementing the right configuration.
I also chose to follow SurviveJS's Webpack book and managed to get my head around Webpack better than I would've if I just followed the official documentation. You can read the book online for free (at the time of this writing) at: [https://survivejs.com/webpack/foreword/](https://survivejs.com/webpack/foreword/)

**:warning: Note:** This repository is not meant to substitute projects such as [React Create App](https://github.com/facebook/create-react-app).
Such projects are mature, battle tested and supported by the rich JavaScript open source community. So why reinvent the wheel ?
Projects such as React Create App are ready made solutions. Black boxes. I wish to learn and use Webpack for the near future as my primary build tool and the best way to learn Webpack is to create my own configuration and make it work. It also allows me full flexibility to play around with the configuration.

### :electric_plug: Installation:
---
 #### 1. Clone this repository:

`$ git clone https://github.com/william-abboud/webpack-config.git`

#### 2. Install dependencies: (use NodeJS v9.x.x or newer)

`$ npm install`

### :package: What you get:
---
The purpose of this repository is to give you a base structure for creating modern web applications with a powerful build process.

In the :open_file_folder: `src` folder you will find the following folders:

 - :open_file_folder: `assets` - Use to hold assets such as fonts, images, json files and other complimentary site information.
   - :open_file_folder: `fonts` - Place `.woff` and `.woff2` files here. The folder contains a sample [**Montserrat** ](https://www.fontsquirrel.com/fonts/montserrat) font files.
   - :open_file_folder: `images` - Place your images here. I've included sample images here. Supported formats: ```.jpg, .jpeg, .gif, .png, .svg ```;
 - :open_file_folder: `js` - Place your JavaScript `.js` and JSX `.jsx` files here.
 - :open_file_folder: `scss` - Place your `.scss` files here.
 - :open_file_folder: `test` - Place your `.test.js` files here.

 - `index.html` - This is your base index.html file template. Webpack will inject bundled assets or style tags in it via the **HTMLWebpackPlugin**.
 - `index.js` - File is named `index` by convention. Webpack knows this will be the starting point of building dependency graph. This is the starting point of the web application. It imports the `main.scss` file and `babel-polyfill`. It also contains an example code to show Hot Module Replacement (**HMR**) and it imports an example `hello-world.js` module.
 - `main.scss` - The main SASS file. Used to set defaults and import `normalize.css`.

Outside the `src` folder you also get the following treats:

 - :chocolate_bar: `.babelrc` - This is Babel's configuration file. It describes the target browsers, the syntax it polyfills and the features it uses and excludes.
 - :ice_cream: `.browserslistrc` - Configuration file with YAML syntax in it describing the supported browsers. This file is used by tools such as Autoprefixer and Babel (unfortunately there is a bug so I needed to explicitly define the supported browsers in `.babelrc`).
 - :honey_pot: `package.json` - Describes development and normal dependencies as well as provide different commands for bundling.
 - :cookie: `webpack.config.json` - The maestro. This is where all the magic configuration is. This file contains both development and production build configurations.

### Usage:

---

This project leverages the power of npm scripts to shorthand long commands in the terminal without the
usage of a task runner such as `Gulp` or `Grunt`.

 - To build your project for production execute: `$ npm run build`
 - To build your project for development: `$ npm start`
 - To run test in your project `$ npm test`
 - To give statistics for your webpack build: `$ npm run stats` and the generated `stats.json` file to: [Stats visualizer](https://chrisbateman.github.io/webpack-visualizer/)

### :gift: Features:

---

 - :hammer: | Development build process
 - :ship: | Production build process
 - :thumbsup: | Easy command line usage
 - :100: | ES6 to ES5 transpilation and ES6 polyfills such as `Promises`
 - :earth_americas: | Transpiles and polyfills code based on target browsers
 - :gift: | Out of the box support for the `import/export` module syntax
 - :crown: | ReactJS support
 - :knife: | Supports ECMAScript features in Stage-3 stage
 - :incoming_envelope: | Dynamic `import` syntax
 - :crystal_ball: | SCSS support
 - :fire: | HMR - Hot Module Replacement
 - :satellite: | Development server with public IP address exposure, HTTPS, gzipping and error reporting
 -  :sos: | Server restart on change in the webpack configuration
 - :eyeglasses: | On file safe instant compilation without exiting on error
 - :x: | Rich friendly error reports
 - :curly_loop: | Inline source maps for development and separate source maps for productions
 - :sunrise: | Image compression and optimization
 - :rocket: | Separates common vendor libraries from `node_modules` into their own file for better browsers caching
 - :skull: | Dead code elimination
 - :globe_with_meridians: | Environment setting
 - :checkered_flag: | `Autoprefixer` support to prefix outputted CSS
 - :put_litter_in_its_place: | CSS minification and optimization powered by `cssnano`
 - :wastebasket: | Hashing filenames for predictable and persistent browser caching
 - :airplane: | JavaScript minification and optimization powered by `UglifyJS`
 - :bar_chart: | Build statistics
 - :chart_with_upwards_trend: | Bundle analysis with `BundleAnalyzerPlugin`
 - :bullettrain_side: | Testing with Jest
 - :eyes: | ESLint with support for ReactJS Linting
 - :earth_americas: | Browsers supported:
   - last 2 chrome versions
   - last 2 firefox versions
   - last 2 edge versions
   - last 2 opera versions
   - last 2 ChromeAndroid versions
   - safari >= 9.3
   - ie 11

### FAQ
---
 1. **Q: Why don't you have separate config files for production and development ?**
   **A**: I like to keep things in one place. I figured I don't have that much of a difficult configuration and I decided
   to go ahead and sacrifice extendability for simplicity at this stage of the project.

 2. **Q: Why do you support IE 11 ?**
   **A**: The reality is IE 11 is still heavily used and I can't afford to neglect it. Still supporting it is a reality check for me that all those moms and dads that still use IE 11 can have a good experience on the web just as their kids on Chrome.

3.  **Q: Why do you exclude typed arrays ?**
   **A**: I've never encountered a scenario on the web where I would need typed arrays so I figured might as well cut them out of the build. If I ever need them, I'll bring them back.

4.  **Q: Why Webpack over Gulp or Grunt ?**
   **A**: I've used Browserify with Gulp and Grunt. I feel the community is strongly moving to Webpack because of its many features and as the setup is getting easier and the documentation comprehensive this will be the finalist in Build wars at the end of the tunnel.

5.  **Q: Why no CSS modules ?**
   **A**: In my opinion BEM methodology is enough to make your CSS maintainable. It basically removes specificity issues and also describes your components semantically. Also enforcing a Component based web architecture whether with or without libraries such as React or Vue will perfectly complement BEM class naming.


### TODO

---
 - Inline Manifest in HTML
 - React optimization plugins
 - Babel optimization plugins
 - Responsive images on build
 - StyleLint
 - ESLintignore
 

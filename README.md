# Sonata

Sonata is a responsive CSS (Sass) framework and UI toolkit based on [ITCSS](https://itcss.io) architecture and [BEM](https://en.bem.info) methodology that provides you with the structure and basic styles to start any web project.

It includes:

- ITCSS layers structure.
- A customizable fluid grid system.
- Optional abstraction classes.
- Optional components (buttons, form elements, alerts).
- Responsive utility classes.

Sonata does not include complex components. The provided components are for the most common use cases in a web project and they are completely optional. Some of them might need basic JavaScript to work, like `form-file` or `form-switch`. Sonata does **not** include JavaScript.

There are no layer namespaces in class names (no `u-` prefix for utility classes, for example).


## Requirements

⚠️ **Warning:** This version of Sonata is built with LibSass, which is [soon to be deprecated](https://sass-lang.com/blog/libsass-is-deprecated). Support for Dart Sass will be added in a future version.

The framework consists of several scss files, so a build system, like webpack, is necessary to compile them to CSS.

It is **strongly** recommended to include [PurgeCSS](https://purgecss.com/) in your build chain for production, to remove unused CSS. You might want to use [Autoprefixer](https://github.com/postcss/autoprefixer) as well, to improve browser support.


## Getting started

1. Install the framework:
```bash
npm install --save-dev sonatacss
```

2. Create the primary Sass file for your project. You can copy this template for a quick start:
```scss
/*
 * Sonata CSS Framework v0.3.0
 * https://github.com/alexcandelas/sonata
 * MIT License
 */

// =============================================================================
// Contents
// =============================================================================
//
// Settings ...... Global variables and configuration.
// Tools ......... Mixins and functions.
// Generic ....... Resets and normalization.
// Elements ...... Unclassed HTML elements.
// Objects ....... Layout and design patterns (no cosmetics).
// Support ....... Simple styled elements and global animations.
// Components .... Designed pieces of UI.
// Utilities ..... Overrides and utility classes.



@import "node_modules/sonatacss/layers/settings";

@import "node_modules/sonatacss/layers/tools";

@import "node_modules/sonatacss/layers/generic";

@import "node_modules/sonatacss/layers/elements";

@import "node_modules/sonatacss/layers/abstractions";

@import "node_modules/sonatacss/layers/components";

@import "node_modules/sonatacss/layers/utilities";

```
Each line is importing all the files for the corresponding layer.

Alternatively, if you need more control over which specific files you want to include, you can use the following template, removing the lines that you don't need:
```scss
/*
 * Sonata CSS Framework v0.3.0
 * https://github.com/alexcandelas/sonata
 * MIT License
 */

// =============================================================================
// Contents
// =============================================================================
//
// Settings ...... Global variables and configuration.
// Tools ......... Mixins and functions.
// Generic ....... Resets and normalization.
// Elements ...... Unclassed HTML elements.
// Abstractions .. Objects (layout abstractions) and design patterns.
// Components .... Designed pieces of UI.
// Utilities ..... Overrides and utility classes.



// Settings
// =============================================================================

@import "node_modules/sonatacss/sass/1-settings/_breakpoints";
@import "node_modules/sonatacss/sass/1-settings/_class-names";
@import "node_modules/sonatacss/sass/1-settings/_colors";
@import "node_modules/sonatacss/sass/1-settings/_grid";
@import "node_modules/sonatacss/sass/1-settings/_radius";
@import "node_modules/sonatacss/sass/1-settings/_typography";
@import "node_modules/sonatacss/sass/1-settings/_utilities";



// Tools
// =============================================================================

@import "node_modules/sonatacss/sass/2-tools/_functions";
@import "node_modules/sonatacss/sass/2-tools/_aspect-ratio";
@import "node_modules/sonatacss/sass/2-tools/_button";
@import "node_modules/sonatacss/sass/2-tools/_clearfix";
@import "node_modules/sonatacss/sass/2-tools/_disabled";
@import "node_modules/sonatacss/sass/2-tools/_grid";
@import "node_modules/sonatacss/sass/2-tools/_media";
@import "node_modules/sonatacss/sass/2-tools/_position";
@import "node_modules/sonatacss/sass/2-tools/_screen";
@import "node_modules/sonatacss/sass/2-tools/_table-responsive";
@import "node_modules/sonatacss/sass/2-tools/_table-striped";
@import "node_modules/sonatacss/sass/2-tools/_truncate";
@import "node_modules/sonatacss/sass/2-tools/_visually-hidden";



// Generic
// =============================================================================

@import "node_modules/sonatacss/sass/3-generic/_box-sizing";
@import "node_modules/sonatacss/sass/3-generic/_normalize";
@import "node_modules/sonatacss/sass/3-generic/_base";



// Elements
// =============================================================================

@import "node_modules/sonatacss/sass/4-elements/_page";
@import "node_modules/sonatacss/sass/4-elements/_buttons";
@import "node_modules/sonatacss/sass/4-elements/_forms";
@import "node_modules/sonatacss/sass/4-elements/_lists";
@import "node_modules/sonatacss/sass/4-elements/_text";



// Abstractions
// =============================================================================

@import "node_modules/sonatacss/sass/5-abstractions/_animations";
@import "node_modules/sonatacss/sass/5-abstractions/_container";
@import "node_modules/sonatacss/sass/5-abstractions/_form-control";
@import "node_modules/sonatacss/sass/5-abstractions/_grid";
@import "node_modules/sonatacss/sass/5-abstractions/_list-bare";
@import "node_modules/sonatacss/sass/5-abstractions/_list-inline";
@import "node_modules/sonatacss/sass/5-abstractions/_list-spaced";
@import "node_modules/sonatacss/sass/5-abstractions/_media";
@import "node_modules/sonatacss/sass/5-abstractions/_ratio";
@import "node_modules/sonatacss/sass/5-abstractions/_table-scrollable";
@import "node_modules/sonatacss/sass/5-abstractions/_text";
@import "node_modules/sonatacss/sass/5-abstractions/_validation-icons";



// Components
// =============================================================================

@import "node_modules/sonatacss/sass/6-components/_alerts";
@import "node_modules/sonatacss/sass/6-components/_buttons";
@import "node_modules/sonatacss/sass/6-components/_checkbox";
@import "node_modules/sonatacss/sass/6-components/_form-field";
@import "node_modules/sonatacss/sass/6-components/_form-file";
@import "node_modules/sonatacss/sass/6-components/_form-switch";
@import "node_modules/sonatacss/sass/6-components/_radio";
@import "node_modules/sonatacss/sass/6-components/_section";
@import "node_modules/sonatacss/sass/6-components/_tables";



// Utilities
// =============================================================================

@import "node_modules/sonatacss/sass/7-utilities/_print";
@import "node_modules/sonatacss/sass/7-utilities/_background";
@import "node_modules/sonatacss/sass/7-utilities/_border";
@import "node_modules/sonatacss/sass/7-utilities/_display";
@import "node_modules/sonatacss/sass/7-utilities/_flex";
@import "node_modules/sonatacss/sass/7-utilities/_float";
@import "node_modules/sonatacss/sass/7-utilities/_margin";
@import "node_modules/sonatacss/sass/7-utilities/_max-width";
@import "node_modules/sonatacss/sass/7-utilities/_overflow";
@import "node_modules/sonatacss/sass/7-utilities/_padding";
@import "node_modules/sonatacss/sass/7-utilities/_position";
@import "node_modules/sonatacss/sass/7-utilities/_shadow";
@import "node_modules/sonatacss/sass/7-utilities/_svg";
@import "node_modules/sonatacss/sass/7-utilities/_table-layout";
@import "node_modules/sonatacss/sass/7-utilities/_width";
@import "node_modules/sonatacss/sass/7-utilities/_text";
@import "node_modules/sonatacss/sass/7-utilities/_vertical-alignment";
@import "node_modules/sonatacss/sass/7-utilities/_visibility";

```
Be aware that the `settings` and `tools` layers contain variables and mixins that are used by files in the subsequent layers, so removing lines from those layers it’s not recommended.


3. Customize the [settings variables](https://github.com/alexcandelas/sonata/tree/master/sass/1-settings) according to your needs. Usually you'd want to adjust the `$color-primary`, `$font-family-primary`, `$font-family-headings`and `$responsive-utilities` variables, at least. You can do this by declaring the variables before importing the `settings`layer, like this:

```scss
// ...

$color-primary: #502a7a;
$font-family: "Lato", sans-serif;

@import "node_modules/sonatacss/layers/settings";

// ...
```

4. Now that the configuration is set, you can initialize your development build process and create your own styles. Most of your code will live in the `components` layer. Place your code or imports in the appropriate layer, after Sonata files for that specific layer, like this:
```scss
// ...

@import "node_modules/sonatacss/layers/abstractions";

@import "node_modules/sonatacss/layers/components";
@import "components/my-component";
@import "components/another-component";

@import "node_modules/sonatacss/layers/utilities";

// ...
```


## Documentation

All classes and settings are documented in the source files. A proper documentation site will be available once the framework is more stable.


## Browser support

Sonata supports the latest stable versions of all major browsers (Chrome, Edge, Firefox, Opera, Safari) and the latest Firefox <abbr title="Extended Support Release">ESR</abbr> version.

Internet Explorer and Opera Mini are **not supported**.

Our current [browserslist](https://github.com/browserslist/browserslist#readme) is:
```
"> 0.5%",
"last 2 major versions",
"not dead",
"Firefox ESR",
"not Explorer <= 11",
"not OperaMini all"
```

## Acknowledgments

Sonata takes ideas or inspiration from other projects made by awesome people:

- [ITCSS](https://itcss.io) by [Harry Roberts](https://twitter.com/csswizardry), obviously.
- [BEM](https://en.bem.info) naming system by [Yandex](https://yandex.com/company/).
- [HTML5 boilerplate](https://html5boilerplate.com/): base and print styles, clearfix, visibility classes.
- [TailwindCSS](https://tailwindcss.com/): some flex and svg utility classes, and the idea of using quarters of rems for utilities.
- String functions by [Kitty Giraudel](https://hugogiraudel.com/).
- Color and math functions from [sass-color-helpers](https://github.com/voxpelli/sass-color-helpers) by Pelle Wessman.
- [Suit CSS](https://github.com/suitcss/base): some base styles and flex order utilities.
- The `table-responsive` mixin is based on [this article](https://css-tricks.com/responsive-data-tables/) by [Chris Coyier](https://twitter.com/chriscoyier).
- [Bourbon](https://www.bourbon.io/): the `position` mixin and a couple of internal functions.
- [Bootstrap](https://getbootstrap.com/): some class names.


## License

Released under the [MIT License](https://github.com/alexcandelas/sonata/blob/master/LICENSE).

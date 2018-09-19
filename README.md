# Sonata

Sonata is a responsive CSS framework and UI toolkit based on [ITCSS](https://itcss.io) architecture and [BEM](https://en.bem.info) methodology that provides you with the structure and basic styles to start any web project.

It includes:

- A customizable fluid grid system.
- Objects (layout abstractions).
- UI for common components (buttons, form elements, alerts).
- Responsive utility classes.

It does **not** include JavaScript. Some components (like `form-file`) might need basic JavaScript to fully work; examples will be provided in the documentation.

Sonata will never include complex components such as a carousel.

There are no layer namespaces in class names (no `c-` prefix for component classes).

## Requirements

The framework consists of several Sass files, so a build system is required to compile them to CSS.

You might want to include [Autoprefixer](https://github.com/postcss/autoprefixer) into your build process as well, for better browser support.

## Getting started

1. Choose an option to install the framework:
    - NPM: `npm install --save-dev sonatacss`
    - Clone the repo: `git clone https://github.com/alexcandelas/sonata.git`
    - [Download the files](https://github.com/alexcandelas/sonata/archive/master.zip).
2. Copy the `sass` folder into your project.
3. Customize the maps and variables inside `1-settings` according to your needs (e.g. font family, font size, primary colors, and the responsive utility classes that you wish the framework to generate).

Once that is done, you can start creating your own styles. The components layer is usually where most of your work will be placed.

## Documentation

Documentation is in the works.

## Browser support

The latest versions of all major browsers are supported:

- Chrome (last 3)
- Firefox (last 3)
- Internet Explorer 11
- Microsoft Edge 12+
- Opera (last 3)
- Safari (last 3)

## Credits

Sonata takes ideas or inspiration from other projects made by awesome people:

- [ITCSS](https://itcss.io) by [Harry Roberts](https://twitter.com/csswizardry), obviously.
- [BEM](https://en.bem.info) naming system by [Yandex](https://yandex.com/company/).
- [HTML5 boilerplate](https://html5boilerplate.com/): base and print styles, clearfix, visibility classes.
- [LostGrid](http://lostgrid.org/), an amazing PostCSS grid system: the `column` mixin is based on LostGrid system.
- [TailwindCSS](https://tailwindcss.com/), a utility-first framework: some flex and svg utility classes, and the idea of using increments of a quarter for generating the margin and padding utilities.
- Math and string functions by [Hugo Giraudel](https://hugogiraudel.com/).
- [Suit CSS](https://github.com/suitcss/base): some base styles and flex utilities (order).
- The `table-responsive` mixin is based on [this article](https://css-tricks.com/responsive-data-tables/) by [Chris Coyier](https://twitter.com/chriscoyier).
- The `fluid` mixin is adapted from the work by [Luca Rosaldi](https://codepen.io/LucaRosaldi/pen/RgPbeR), based on the idea proposed by [David Bachmann](https://css-tricks.com/between-the-lines/).
- [Bourbon](https://www.bourbon.io/): the `position` mixin and a couple of internal functions.
- [Bootstrap](https://getbootstrap.com/): Several class names.

### Alternatives

- [inuitcss](https://github.com/inuitcss/inuitcss): framework by Harry Roberts. It provides you with the ITCSS structure to start your projects. No UI is included.
- [iotaCSS](https://www.iotacss.com/): a very customizable framework that generates all CSS from Sass maps and variables.
- [Nebula](https://nebulaui.github.io/nebula/): based on BEMIT. Includes components ready to use with React.
- [haiticss](https://github.com/haiticss/haiticss): uses a slightly different layer structure. Focuses on abstract content, no components provided.

## License

Released under the [MIT License](https://github.com/alexcandelas/sonata/LICENSE.md).

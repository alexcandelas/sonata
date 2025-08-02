# Sonata

Sonata is a responsive CSS framework and UI toolkit that provides the structure and basic styles to start a web project. It is built with [Lightning CSS](https://lightningcss.dev) and powered by [UnoCSS](https://unocss.dev) for utilities generation.

Features:
- Native CSS layers structure.
- Fluid, responsive grid system.
- On-demand utility classes.
- Optional common components, like buttons, form elements and alerts.

Sonata does not include any JavaScript for components.


## Requirements

[Vite](https://vite.dev) is required to compile Sonata's CSS.


## Getting started

#### 1. Install Sonata
```bash
npm install --save-dev sonatacss@1.0.0-beta.1
```

#### 2. Register Sonata plugin
Add `sonatacss` to Vite plugins.
```js
import { defineConfig } from 'vite';
import { sonatacss } from 'sonatacss';

export default defineConfig({
    plugins: [
        sonatacss(),
    ],
});
```

#### 3. Create a CSS entry file
This file can be placed in any path in your project and will be the entry point for Vite. Common paths include `src/css/app.css` or `resources/css/app.css`.
```css
@layer base, abstractions, components, utilities;

@import "sonatacss";

/* Add your CSS styles below. Example: */
/* @import "my-component.css" layer(components); */
```
Don't forget to include the path to this file as an input in your Vite configuration.

#### 4. Add a configuration file
Create a `sonata.config.js` file in the root of your project with the specifications and design tokens.

Usually, you'll want to specify the content (files that are scanned for utility classes) and design tokens, like colors and fonts.
```js
// Example:
export default {
   content: [
       'templates/**/*.html',
       'src/js/**/*.js',
   ],
   tokens: {
       colors: {
           primary: '#502a7a',
       },
       fontFamily: {
           base: "Inter",
           headings: "Libre Baskerville",
       },
       // ....
   } 
}
```

#### 5. Build
Compile your styles with Vite as usual.
```bash
npm run build
# or
npm run dev
```


## Browser support
Sonata supports the latest stable versions of all major browsers (Chrome, Edge, Firefox, Opera, Safari) and the latest Firefox <abbr title="Extended Support Release">ESR</abbr> version.


## Acknowledgments

Sonata takes inspiration from:
- [UnoCSS](https://unocss.dev)
- [TailwindCSS](https://tailwindcss.com/)
- [HTML5 boilerplate](https://html5boilerplate.com)
- [Bootstrap](https://getbootstrap.com/)
- [BEM methodology](https://en.bem.info) by [Yandex](https://yandex.com/company/).


## License

Released under the [MIT License](https://github.com/alexcandelas/sonata/blob/master/LICENSE).

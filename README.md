# storybook-addon-compodoc

Show [Compodoc](https://github.com/compodoc/compodoc) pages for Angular component from selected story in [Storybook](https://storybook.js.org)

## How it works?

`Note: this works only for Angular components!`

This addon adds panel which will show Compodoc page related to component from selected story.

## Installation

`npm install storybook-addon-compodoc --save-dev` (or `--save-optional` or whatever suits you)

## Configuration

### Register addon

Don't forget to register addon in your `addons.js` file. To do so one should include `import 'storybook-addon-compodoc/register;` line there.

### In config.js

In your `config.js` Storybook file provide url where your Compodoc generated documentation is deployed using `configureCompodoc` and add global decorator using `addDecorator(withCompodoc())`,i.e.:

```js
import {configureCompodoc,withCompodoc} from 'storybook-addon-compodoc';
...
configureCompodoc({
  compodocUrl:'https://example.com/compodoc'
});
addDecorator(withCompodoc());
```

### In each story

In each story file you have to provide parameter with component class name, the best way is to use `addParameters` method, i.e.:

```ts
const stories = storiesOf("Components/MyComponent", module);

stories.addParameters({
  componentClassName: "MyComponent"
});
```

# TO DO

- [x] Initial working version
- [ ] Handle errors and missing configuration nicely
- [ ] Provide typings for public methods at least (configuration object)
- [ ] Try to get component name without need to provide it manually
- [ ] Update TODO

# Aimie-Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.3.

## Configurations

### Mobile keyboard

When a user focuses on an input, the mobile keyboard will push the content up. To prevent this, you can add the following:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, user-scalable=no, interactive-widget=resizes-content" />
```

If you need further customizations, you can add an event handler for window:resize and use window.innerHeight or window.visualViewport.height to modify the height of a container.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

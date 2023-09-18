# The Complete Guide to Angular

## Starting

### Installation

* Node.js
* node comes with NPM

### Commands


`npm install -g angular/cli@latest`
* `-g` means globally installed, not just in current project/folder
* `npm` is the NodePackageManager

`ng new my-first-app --no-strict`
* this makes a new proj folder
* choose yes/no for routing
* choose CSS or alternative
* `--no-strict`
  * forces more verbose code
  * can be disabled after the fact by setting `strict: false` in the `tsconfig.json`file

`ng serve`
* do this inside newly created project folder
* this serves the current proj inside browser

`npm install`
* run after copying a project from somewhere so it installs it

`npm install --legacy-peer-deps`
* when installing runs into errors

## Project Structure

### root

source folder of project files
> **src**
>
>> **app** *(contains the application itself)*
>
>> **styles.css** *(contains global styles)*
> 
>> **index.html** 
>> * serves as the root HTML file in which the single page app resides
>> * contains `<app-root>` tag
>>   * refers to the `app` component
>>   * in the app-component's .ts file theres a decorator:`@Component({..)}`
>>   * in side this is the selector that has the `app-root`string that specifies the `selector` `<app-root>` used in the index.html file
>
>> **main.ts**
> * first code to be executed on app start
> * `.bootstrapModule(AppModule)
>   * `app.module.ts` is boostrapped
> 
> **package.json** *(contains dependencies of project)*

## app startup
> **main.ts**
* gets started
> **app.module.ts**
* gets bootstrapped
> **AppComponent**
* module gets passed as argument in the `.bootstrap` section of `app.module.ts`
> **app.component.ts**
* contains selector `'app-root'`
> **index.html**
* that contains `<app-root>` selector can be handled now
> **app.component.html**
* HTML content is displayed


## components

> **app.component**
* is the root components
* holds all the other components
* only this file's selector will be in the `index.html`
* other component's selectors will be added to `AppComonent's` Html

### files of a component

> .html
  * **template**
> .css
  * **styling**
> .ts
  * **typescript file**
> .spec.ts (optional)
  * **test file**

### create a new component manually
* new folder inside `app` folder
  * good practice `FolderName = ComponentName`
* add .TS file
  * good parctice `<componentName>.component.ts`
* add .HTML file
  * good practice `<componentName>.template.html`
* add component to `app.module.ts`
  * register in the AppComponent's `declarations` array (should auto import)
* use in the `app.component.html
  * by using it's element-name specified in the decorator of the component's .TS file  

### create a new component using the CLI

* in a terminal
  * `ng generate component <name>`
  * `ng g c <name>`
* creates a folder with `<name>` in the app folder containing .html, .ts, .css and spec.ts files
  * decorator is taken care of
  * registering it in app module is taken care of
  * template and css are assigned

## other ways to reference components in template (.html) files

### using an attribute instead of a selector
* we can refer to a component by attribute by using square brackets like in CSS
  * in the `selector:` section enclose the name in `[]`
    * `selector: '[app-servers]'`
  * refer to the component in .html by using it as an attribute in another selector
    *  `<div app-service></div>...<div>`
### using a class 
* we can refer to a component by class by using a dot `.` at the start of the name
  * in the `selector:` section prepend the name with `.`
    * `selector: '.app-servers'`
  * refer to the component in .html by using it as a css class in another selector
    *  `<div class="app-service"></div>...<div>`

## templates

### with template file
* referenced in `@Component` decorator's `template:`section
  * points to an .html file residing in the same folder as the .ts file

### inline
* don't reference a file in the decorator but write the html code directly after `template:` as a string
  * doesn't support wraping with normal single quotes
  * multiline support by using backticks `` `...` ``

## structure of the TS files

* a component is just a TS class
  * export it so it can be used outside of the file
  * export as `<Name>Component` in camelCase
  * >export class ServerComponent{..}
* use a **decorator**
  * this identifies the class as a **component**
  * decorators enhance classes
  * always prepended with an @
  * > @Component()
  * component keyword needs to be imported
  *  > import { Component } from '@angular/core';
* pass JS object to the component-decorator to configure it
  * > selector: 'app-server'
  * > templateUrl: './server-template.html';
* declare (and assign) variables in the TS file in the class that is being exported to use in this TS or template
  * > `export class ServerComponent {
        serverId: number = 10;
        serverStatus: string = 'offline';
        }`
  * > the type declaration could be omitted
* methods
  *  declared in the `export class` part as:
  *  > `methodName() {}`
* constructor
  * inside `export class {` can be a constructor a method that is executed upon creation of the component
  * > `constructor() {
    setTimeout(() => {
    this.allowNewServer = true;
    },2000)
    }`

## Styling

### Inside the TS file
* in the decorator the external file is referenced after `styleUrls:`
* this can be **replaced** by ``styles: [` h3 { color: dodgerblue}`]``

### External files
* add to .css file of current component or a folder higher to work more global
* .css file needs to be referenced in the .ts file after `styleUrls:`
>h3 {
color: darkblue;
}

# Databinding

communication between TypeScript file and the Template

### From TypeScript to Template

* **String interpolation**
  * variables declared in the `export class` part of the TS file can be accessed trough string interpolation in the template
  * syntax: using double curly braces around the **typescript expression**
  * the typescript expression 
  * easiest is to reference a property: a variable in the .TS file
    * `{{ <TypeScriptExpression> }}`
      * eg: `{{ nameOfTheCat }}`
      * eg: `{{ getServerStatus() }}`
  * *any expression which can be resolved to a string*
  * method that returns a string is allowed
  * nu block or multiline expressions
  * ternary expression is ok
  

* **Property binding**
  * bind an element's property to an expression in the TS file
  * enclose the poperty in square brackets
    * `<button
      class="btn btn-primary"
      [disabled]="!allowNewServer"`
    * `allowNewServer` is a function in the TS file, it's in the constructor so is known/started upon creation


* interchangeability between property binding and string interpolation
  *  `<p [innerText]="allowedNewServer>`
  *  `<p>{{ allowNewServer }}</p>`

### From template to TypeScript

* **Event binding**
  * events are available trough the html element it's placed on
  * syntax: `(<eventName>)="<methodInTypeScript"`
  * eg: `(click)="onCreateServer()"`
  * to see events from certain elements use `console.log()` to see props and events from elements
* **event binding: passing and using data**
  * pass `$event` in the template as argument with the method bound to an event
  * this is a reserved name in Angular
  * in the TS file's method for the event we use the argument `event: any`
  * eg: `onUpdateServerName(event: any) {...}`

### To and from TS and HTML

* **Two-way-binding**
  * enable the `ngModel` directive by adding the `FormsModule` to the `imports[]` in `AppModule`
  * also add `@Angular/forms` import in `app.module.ts`
  * syntax: use `[(ngModel)]` in the html element
  * eg: `[(ngModel)]="serverName"`
  * the html element's property is passed to the TS file and also to TS property is passed to the template

# Directives

* instructions in the DOM
* components are directives too


* **Structural directives**
  * structural directives change the DOM structure
  * the `*` indicates a *structural* directive
   
  
  * `*ng-if` is a directive provided by Angular
    * for `*ng-if` the condition needs to be any expression that returns *true* or *false*
  * `<ng_template>` a directive from Angular accompanied by a local reference `#referenceName` as in
    * `<ng-template #<referenceName>>`
    * local reference with `#<referenceName>` are used to mark places in the DOM
    * this can now be used in the already present `*ng-if` statement as:
      * `<p *ng-if="serverCreated; else <referenceName>">`
  * `*ngFor`
    * a directive to repeat html elements
    * `<app-server *ngFor="let server of servers">`
      * `"let server of servers`
        * this gives us the variable `server` that represents one element of `servers` array
      * to use an index of the ngFor loop use:
        * `*ngFor=" let element of array; index as i"`
      * or
        * `*ngFor=" let element of array; let i = index"`
    * the html element is repeated for as many times as there are elements in the array of `servers`


* **Attribute directives**
  * look like 'normal' HTML attributes
  * are not marked with a `*`
  * they change only the element on which they are placed
  * `ngStyle`
    * use as `[ngStyle]`
      * `[]` are not part of the directive name
      * we use property binding, bind to a property of a directive
        * `<p [ngStyle]="{backgroundColor: getColor()}">` 
      * or 
        * `<p [ngStyle]="{'background-color': getColor()}">`
  * `ngClass`
    * allows to dynamically add or remove CSS class to the element
    * takes a key-value pair
      * key = the CSS class
      * value = the condition on which it will be added or not
    * `<p [ngClass]="{online: serverStatus === 'online'}">`
    * use property binding to use


# TypeScript

### Define a model

inside an angular project's app folder or subfolder of it create a .ts file of the model
> recipe.model.ts

add properties & constructor

    export class Recipe { 
        public name: string;
        public description: string;
        public imagePath: string;
    
        constructor(name: string, description: string, imagePath: string) {
            this.name = name;
            this.description = description;
            this.imagePath = imagePath;
        }
    }

the properties are `public` and accompanied by a type

### Define an array structure

`recipes: Recipe[] = [];`


# Bootstrap related

## install

`npm install --save bootstrap@3`

locally in project (not globally)  
version 3  
will install into node modules folder

## import / link

> angular.json

this file configures the CLI project

`"styles": [
"src/styles.css"
],`  

we add a ref to the node_modules folder and further to bootstrap's css file

`"node_modules/bootstrap/dist/css/bootstrap.min.css"`

so it becomes

`"styles": [
"node_modules/bootstrap/dist/css/bootstrap.min.css",
"src/styles.css"
],`

verification: 
* serve the app
* open in browser
* open DEV Tools
* tab: sources
* file: styles.css should refer to bootstrap


## From generated project readme

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# The Complete Guide to Angular

## Starting

### Installation

- Node.js
- node comes with NPM

### Commands

`npm install -g angular/cli@latest`

- `-g` means globally installed, not just in current project/folder
- `npm` is the NodePackageManager

`ng new my-first-app --no-strict`

- this makes a new proj folder
- choose yes/no for routing
- choose CSS or alternative
- `--no-strict`
  - forces more verbose code
  - can be disabled after the fact by setting `strict: false` in the `tsconfig.json`file

`ng serve`

- do this inside newly created project folder
- this serves the current proj inside browser

`npm install`

- run after copying a project from somewhere so it installs it

`npm install --legacy-peer-deps`

- when installing runs into errors

## Project Structure

### root

source folder of project files

> **src**
>
> > **app** _(contains the application itself)_
>
> > **styles.css** _(contains global styles)_
>
> > **index.html**
> >
> > - serves as the root HTML file in which the single page app resides
> > - contains `<app-root>` tag
> >   - refers to the `app` component
> >   - in the app-component's .ts file there's a decorator:`@Component({..)}`
> >   - in side this is the selector that has the `app-root`string that specifies the `selector` `<app-root>` used in the index.html file
>
> > **main.ts**
>
> - first code to be executed on app start
> - `.bootstrapModule(AppModule)
>   - `app.module.ts` is boostrapped
>
> **package.json** _(contains dependencies of project)_

## app startup

> **main.ts**

- gets started
  > **app.module.ts**
- gets bootstrapped
  > **AppComponent**
- module gets passed as argument in the `.bootstrap` section of `app.module.ts`
  > **app.component.ts**
- contains selector `'app-root'`
  > **index.html**
- that contains `<app-root>` selector can be handled now
  > **app.component.html**
- HTML content is displayed

## components

> **app.component**

- is the root components
- holds all the other components
- only this file's selector will be in the `index.html`
- other component's selectors will be added to `AppComonent's` Html

### files of a component

> .html

- **template**
  > .css
- **styling**
  > .ts
- **typescript file**
  > .spec.ts (optional)
- **test file**

### create a new component manually

- new folder inside `app` folder
  - good practice `FolderName = ComponentName`
- add .TS file
  - good parctice `<componentName>.component.ts`
- add .HTML file
  - good practice `<componentName>.template.html`
- add component to `app.module.ts`
  - register in the AppComponent's `declarations` array (should auto import)
- use in the `app.component.html
  - by using its element-name specified in the decorator of the component's .TS file

### create a new component using the CLI

- in a terminal
  - `ng generate component <name>`
  - `ng g c <name>`
- creates a folder with `<name>` in the app folder containing .html, .ts, .css and spec.ts files
  - decorator is taken care of
  - registering it in app module is taken care of
  - template and css are assigned
- creating without a spec.ts file
  - used to be
    - ~~`ng g c <componentName> --spec-false`~~
  - is now replaced by
    - `ng g c <componentName> --skip-tests`
  - since _Angular CLI Version 8_

## other ways to reference components in template (.html) files

### using an attribute instead of a selector

- we can refer to a component by attribute by using square brackets like in CSS
  - in the `selector:` section enclose the name in `[]`
    - `selector: '[app-servers]'`
  - refer to the component in .html by using it as an attribute in another selector
    - `<div app-service></div>...<div>`
    - all content placed between opening and closing tags a component are ignored

### using a class

- we can refer to a component by class by using a dot `.` at the start of the name
  - in the `selector:` section prepend the name with `.`
    - `selector: '.app-servers'`
  - refer to the component in .html by using it as a css class in another selector
    - `<div class="app-service"></div>...<div>`

## templates

### with template file

- referenced in `@Component` decorator's `template:`section
  - points to an .html file residing in the same folder as the .ts file

### inline

- don't reference a file in the decorator but write the html code directly after `template:` as a string
  - doesn't support wraping with normal single quotes
  - multiline support by using backticks `` `...` ``

## structure of the TS files

- a component is just a TS class
  - export it so it can be used outside of the file
  - export as `<Name>Component` in camelCase
  - > export class ServerComponent{..}
- use a **decorator**
  - this identifies the class as a **component**
  - decorators enhance classes
  - always prepended with an @
  - > @Component()
  - component keyword needs to be imported
  - > import { Component } from '@angular/core';
- pass JS object to the component-decorator to configure it
  - > selector: 'app-server'
  - > templateUrl: './server-template.html';
- declare (and assign) variables in the TS file in the class that is being exported to use in this TS or template
  - > `export class ServerComponent {
        serverId: number = 10;
        serverStatus: string = 'offline';
        }`
  - > the type declaration could be omitted
- methods
  - declared in the `export class` part as:
  - > `methodName() {}`
- constructor
  - inside `export class {` can be a constructor a method that is executed upon creation of the component
  - > `constructor() {
setTimeout(() => {
this.allowNewServer = true;
},2000)
}`

# Lifecyclehooks

when angular creates a new component it goes through phases, or _hooks_ for that component
these can be used to perform actions

when using these they need to be implemented by the class, these interfaces are named slightly different

      OnInit
      OnChanges
      DoCheck
      AfterContentInit
      AfterContentChecked
      AfterViewInit
      AfterViewChecked
      OnDestroy

**ngOnChanges()**

- executed at start
- when input prop's change : @Input() receive new values

**ngOnInit()**

- when the component has been initialized
- before added to the DOM, after basic initialization
- runs after the constructor

**ngDoCheck()**

- called during every change detection run
- when anything that could influence the template changes
- even when nothing changes, this runs on the check itself

**ngAfterContentInit()**

- called after the content with ngContent has been initialized

**ngAfterContentChecked()**

- after the ngContent is change detected

**ngAfterViewInit()**

- after the component's view (current + child) has been rendered

**ngAfterViewChecked()**

- called every time view and child-views have been checked

**ngOnDestroy()**

- right before the component will be destroyed, like with an `ng-if`

## Styling

### Inside the TS file

- in the decorator the external file is referenced after `styleUrls:`
- this can be **replaced** by ``styles: [` h3 { color: dodgerblue}`]``

### External files

- add to .css file of current component or a folder higher to work more global
- .css file needs to be referenced in the .ts file after `styleUrls:`
  > h3 {
  > color: darkblue;
  > }

# Databinding

communication between TypeScript file and the Template

### From TypeScript to Template

- **String interpolation**

  - variables declared in the `export class` part of the TS file can be accessed trough string interpolation in the template
  - syntax: using double curly braces around the **typescript expression**
  - the typescript expression
  - easiest is to reference a property: a variable in the .TS file
    - `{{ <TypeScriptExpression> }}`
      - eg: `{{ nameOfTheCat }}`
      - eg: `{{ getServerStatus() }}`
  - _any expression which can be resolved to a string_
  - method that returns a string is allowed
  - nu block or multiline expressions
  - ternary expression is ok

- **Property binding**

  - bind an element's property to an expression in the TS file
  - enclose the property in square brackets - `<button
class="btn btn-primary"
[disabled]="!allowNewServer"` - `allowNewServer` is a function in the TS file, it's in the constructor so is known/started upon creation

- interchangeability between property binding and string interpolation
  - `<p [innerText]="allowedNewServer>`
  - `<p>{{ allowNewServer }}</p>`

### From template to TypeScript

- **Event binding**
  - events are available through the html element it's placed on
  - syntax: `(<eventName>)="<methodInTypeScript"`
  - eg: `(click)="onCreateServer()"`
  - to see events from certain elements use `console.log()` to see props and events from elements
- **event binding: passing and using data**
  - pass `$event` in the template as argument with the method bound to an event
  - this is a reserved name in Angular
  - in the TS file's method for the event we use the argument `event: any`
  - eg: `onUpdateServerName(event: any) {...}`
- **local references**

  - a local reference can be placed on any HTML element
  - syntax: `#referenceName`
  - in the template
    - `<input type="text" class="form-control" #serverNameInput>`
    - the reference refers to the element in which it resides
    - references can be used anywhere in the template
      - `<button
class="btn btn-primary"
(click)="onAddServer(serverNameInput)">Add Server</button>`
      - the whole element is passed to the method now
  - in the .TS file
    - the reference references the DOM element from the template
    - template:
      - `<input type="text" class="form-control" #serverNameInput>`
    - in .TS:
      - `@ViewChild('serverContentInput') serverContentInput: ElementRef;`
      - `@ViewChild('serverContentInput', {static: false}) serverContentInput: ElementRef;`
        - the `@ViewChild` is a decorator
        - when accessing the element in `ngOnInit()`
          - `@ViewChild('serverContentInput') serverContentInput: ElementRef;`
          - `{ static: true }` needs to be added for accessing the element in `ngOnInit()` only
      - the value is accessible trough `nativeElement` on the property
        - `this.serverContentInput.nativeElement.value`
      - don't use this to change the element
  - use `@ContentChild('contentParagraph') paragraph: ElementRef;` to access references/elements in a ngContent element

### To and from TS and HTML

- **Two-way-binding**
  - enable the `ngModel` directive by adding the `FormsModule` to the `imports[]` in `AppModule`
  - also add `@Angular/forms` import in `app.module.ts`
  - syntax: use `[(ngModel)]` in the html element
  - eg: `[(ngModel)]="serverName"`
  - the html element's property is passed to the TS file and also to TS property is passed to the template

### Custom property binding = component communication

by default all properties of components are only accessible inside these components

- making a property bindable from outside, the parent-component using this child can use that property
- when a parent-component needs a property from a child component a decorator can be used

  - the child component can expose a property of itself to the hosting component
    - `@Input()`
      - this decorator can be used in the TS file to expose this property to the parent
      - `@Input() element: {type : string, name: string, content: string};`
      - now any component hosting the component can use this
    - `<app-server-element [element]="serverElement">`
      - the property `element` can be used to assign something to in the tag `<app-server-element>`
      - this is done in the parent component's template
      - because in the `server-element.component.ts` the decorator `@Input()` is used on that property
    - assigning an alias to use while binding
      - `@Input('srvrElement')`
      - `<app-server-element [srvrElement]="serverElement">`

- when a child-component sends an event to a parent-component
- parent-components can listen to events emitted by the child-component
  - the child-component will **emit** an event
    - create as a property on the child component
      - `@Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();`
      - `@Output()` is a decorator
      - `serverCreated` is an emitter
    - in the creation of the emitter the payload type is present
      - the emitter is triggered by a method in the same component
      - `onAddServer() {
this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
}`
      - with `.emit` the emitter is executed
      - the method above is triggered through the template
    - in the parent-component the template looks like
      - `<app-cockpit (serverCreated)="onServerAdded($event)"></app-cockpit>`
      - `(serverCreated)` is what the child-component emits, this is an event that can be 'listened' to
      - `onServerAdded($event)` is this component's method we sent it to
    - aliases are supported like with the previous paragraph

_combining the 2 ways of communication can be used to pass data from child -> parent -> other child  
another way would be by using **services**_

# Directives

- instructions in the DOM
- components are directives too

- **Structural directives**

  - structural directives change the DOM structure
  - the `*` indicates a _structural_ directive
  - `*ng-if` is a directive provided by Angular
    - for `*ng-if` the condition needs to be any expression that returns _true_ or _false_
  - `<ng_template>` a directive from Angular accompanied by a local reference `#referenceName` as in
    - `<ng-template #<referenceName>>`
    - local reference with `#<referenceName>` are used to mark places in the DOM
    - this can now be used in the already present `*ng-if` statement as:
      - `<p *ng-if="serverCreated; else <referenceName>">`
  - `*ngFor`
    - a directive to repeat html elements
    - `<app-server *ngFor="let server of servers">`
      - `"let server of servers`
        - this gives us the variable `server` that represents one element of `servers` array
      - to use an index of the ngFor loop use:
        - `*ngFor=" let element of array; index as i"`
      - or
        - `*ngFor=" let element of array; let i = index"`
    - the html element is repeated for as many times as there are elements in the array of `servers`

- **Attribute directives**

  - look like 'normal' HTML attributes
  - are not marked with a `*`
  - they change only the element on which they are placed
  - `ngStyle`
    - use as `[ngStyle]`
      - `[]` are not part of the directive name
      - we use property binding, bind to a property of a directive
        - `<p [ngStyle]="{backgroundColor: getColor()}">`
      - or
        - `<p [ngStyle]="{'background-color': getColor()}">`
  - `ngClass`
    - allows to dynamically add or remove CSS class to the element
    - takes a key-value pair
      - key = the CSS class
      - value = the condition on which it will be added or not
    - `<p [ngClass]="{online: serverStatus === 'online'}">`
    - use property binding to use

- **ng-content**
  - all data between opening and closing tags of a component's selector is normally ignored
    - in the component's template use `<ng-content> </ng-content>` to indicate this as a place
      to render the content between the components selector in the parent-component
      - in the child component
        - `<div class="panel-body"> <ng-content></ng-content> </div>`
      - in the parent component

            <app-server-element>
              <p>
                <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
                <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
              </p>
            </app-server-element>
- **creating a custom directive CRUDE**
  - > directiveName.directive.ts


  import {Directive, ElementRef, OnInit} from "@angular/core";
      
      @Directive({
        selector: '[appBasicHighlight]'
      })
      export class BasicHighlightDirective implements OnInit{
        constructor(private elementRef: ElementRef) {
        }
      
        ngOnInit() {
          this.elementRef.nativeElement.style.backgroundColor = 'green';
        }
      }


  - `@Directive` decorator with a selector
  - use `[]` in the selector name to use it as _attribute-style_
    - now it will be recognized when adding the name without the brackets to an element
  - inject the reference to the element this directive will be used on through constructor injection
  - do the action on the `OnInit` hook
  - add the directive to the `declarations`-array in
    > app.module.ts
  - use in template as: 
        
        <p appBasicHighlight>Style with new directive</p>

- **creating a custom directive BETTER**
  - create via CLI
    - `ng generate directive better-directive`
    - `ng g d better-directive`
    - files are created, added to `app.module.ts` and selector is specified
  - use the `renderer` in conjunction to `elementRef`
    - `constructor(private elRef: ElementRef, private renderer: Renderer2) { }`
    
          ngOnInit() {
            this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue')
          }
  - more about the renderer's capabilities https://angular.io/api/core/Renderer2  
  

- **use @HostListener to add interactivity**
  - as a method:
  
        @HostListener('mouseenter') mouseover(eventData: Event) {
          this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
        }

        @HostListener('mouseleave') mouseleave(eventData: Event) {
          this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'grey');
        }

  - the HostListener listens to events
    - `mouseenter` & `mouseleave` are events that are known

- **HostBinding**
  - `@HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';`
  - use `@HostListener` to change the property
    
        @HostListener('mouseenter') mouseover(eventData: Event) {
          this.backgroundColor = 'blue';
        }

  - binds to any property of the element containing the directive

- **adding configurability to custom Directives**
  - use properties with `@Input()` to make directive configurable
  - also use defaults for these properties  
  `@Input()defaultColor: string = 'transparent';`  
  `@Input()highlightColor: string = 'blue';`
  - usage

        <p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'">Style with new directive</p>

  - when defaults don't happen on load move the assignment of them into `ngOnInit()`

- **naming and aliases**
  - if the property alias is set to the name of the directive's selector the directive name kan be used as property in the template
    - when the selector is like `selector: '[appBetterHighlight]'`
    - and the property we expose is:
    - `@Input('appBetterHighlight')highlightColor: string = 'blue';`
    - in the template we can't use the property as
    
          <p appBetterHighlight [defaultColor]="'yellow'" [highlightColor]="'red'">Style with better directive</p>
    
    - but we can assign the value directly to the directive's name with the name is between `[ ]`

          <p [appBetterHighlight] ="'red'" [defaultColor]="'yellow'">Style with better directive</p>

- **special case concerning passing strings with property binding**
  - if the square brackets `[ ]` are removed from the property, the single quotes can be removed as well
    
        <p appBetterHighlight ="red" defaultColor="yellow">Style with better directive</p>

- **about structural directives**
  - in Angular there's no `*` like in the structural directives syntax
  - in Angular there's only:
    - property binding
    - event binding
    - 2-way-binding
    - string interpolation
  - `*ngIf` sections can be written as:

          <ng-template [ngIf]="!onlyOdd">
            <div>
              <li
                *ngFor="let number of evenNumbers"
                class="list-group-item"
                [ngClass]="{odd: number % 2 !== 0}"
                [ngStyle]="{backgroundColor: number % 2 !== 0 ? 'yellow' : 'transparent'}"
              >
                {{ number }}
              </li>
            </div>
          </ng-template>  


  - the `*ngIf` syntax is an easier way to do write this  


- **create a custom structural directive**
  - `ng g d unless`
  - use `@Input()` on a property
  - we want the property to execute a method, the key to this is the use `set` as in a _**setter**_ with the property
  - this makes it behave like a method but it's a _**setter**_
    - we want it to react to when the input/property changes so the setter makes it do that

          export class UnlessDirective {
            @Input() set unless(condition: boolean) {
              if (!condition) { } else { }
            }
            constructor() {
            }
          }

  - as the structural directives are a shortcut to the style as the `<ng-template>..</ng-template>` above
    - we need access to the element and place in the dom in our custom directive
    - so we use the constructor to inject the `TemplateRef` and `ViewContainerRef`
      - `constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}`
        - these can be used as

              @Input('appUnless') set unless(condition: boolean) {
                if (!condition) {
                  this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                  this.viewContainer.clear();
                }
              }    

  - notice that the `@Input()` decorator has a alias that is the same name as the directive's selector
  - this is so we can use it in the template as
    - `<div *appUnless="onlyOdd">`


  - **handy structural directive ngSwitch**
   
        <div [ngSwitch]="value">
          <p *ngSwitchCase="5">Value is 5</p>
          <p *ngSwitchCase="10">Value is 10</p>
          <p *ngSwitchCase="100">Value is 100</p>
          <p *ngSwitchDefaultD>Value is Default</p>
        </div>

# Services
  
  - to prevent long and complex chains of passing data between components


  - to prevent duplicate code over components


  - **create service**
    - `.ts` : `<serviceName>.service.ts`
    - add to 
    > app.module.ts
    - no decorator for services
      - services are regular TS classes

            export class LoggingService {
              logStatusChange(status: string) {
                console.log('A server status changed, new status: ' + status);
              }
            }     
- use trough injection described in _**'Hierarchical Injector'**_ chapter below

- if we need to inject something in a service
  - the issue is there's no decorator
    - just add `@Injectable()` as an annotation above `export class <ClassName> {`
   
          @Injectable()
          export class AccountsService {
   

  - add `@Injectable()` 
    - ~~**_to the service you want to inject into!_**~~
    - ~~_not to the service you want to inject_~~
    - **_to all service ! as of current Angular versions_**


  - example of using service instead of passing data trough components
    - in a service declare an emitter
      - `statusUpdated = new EventEmitter<string>();`
    - trigger it in a component's method
      - `this.loggingService.logStatusChange(status);`
    - react to it in another component by subscribing to the emitter and passing an arrow function
      
          accountsService.statusUpdated.subscribe(
            (status:string) => alert('new status:'+status)
          );

# Hierarchical Injector

  - used by eg: services
  - injects an instance automatically
  - requesting class needs in constructor
  - in the `@Component` part we add a section `providers`
    - here we add an array with the type of the classes to inject
      - `providers: [LoggingService],`
  - we inject through the constructor
    - `constructor(private <instanceName>: ClassWeWantInjected){}`
    -  TS shortcut: add an accessor in from of the name of the argument -> creates and assigns a property inside the class! 

  - alternative way
    - using the `inject()` function
    - no need as arg in constructor
    - declare in the `providers` section
      - `providers: [LoggingService],`
    - make a property like:
      - `private loggingService?: LoggingService;`
    - in the constructor body:
      - `this.loggingService = inject(LoggingService);`


- if the parent class has the service and we don't need a new instance in this class, do everyithng as usual just don't add it to `providers`
  - this way we don't get a new instance, we get the same as the parent class 
- adding the injectable class to the providers section tells angular that it should make a new instance in this class
- if we don't want a new instance, don't add it to the providers section

- if the parent component has an injected class, all the child components have the same instance of that class if we just inject but don't provide it
- to provide it for the whole app we can 


- for **_Angular 6+_** to provide application-wide services:
  - instead of declaration in `providers: [],`
  - in the class to inject:

        @Injectable({providedIn: 'root'})
        export class MyService { ... }

  

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

- the properties are `public` and accompanied by a type

the shortcut way to do this in TypeScript is

      export class Ingredient {
        constructor(public name: string, public amount: number) {}
      }

- properties removed, public moved to arg's and assignments removed

### Define an array structure

`recipes: Recipe[] = [];`

### Define a type ad hoc

`element: {type : string, name: string, content: string};`

- here we describe the structure of a variable's type, not the content
- so `element` is of a type that looks like `{type : string, name: string, content: string}`

### Create simple object with values ad hoc

- here we create a simple JS object with values inside an array
- `serverElements = [{type: 'server', name: 'TestServer', content: 'Just a test'}];`

# JavaScript

  - when using a service that holds data that is private, when using a getter for this 
    be sure to return a copy if it is a referenced type (Array , Object)
    - for an array
      - `return this.recipes.slice();`
        - this makes a copy when the getter is used, so we don't sent a ref to the original array
  - be sure to emit any changes to objects and subscribe to them in the components that use them


  - add array to list
    - with the spread operator `...`
      - `this.ingredients.push(...newIngredientsToBeAdded);`
        - by prefacing the array with `...` it will be converted into multiple values
          this wya the new elements will be pushed onto it as a single value each instead of an array

# Debugging in Chrome

- open developertools
- tab: _Sources_
- in the left section browse
  > webpack:// > src > app
  - here a breakpoint can be placed in de the familiar .ts files

# Linting

https://blog.bitsrc.io/how-ive-set-up-eslint-and-prettier-in-angular-16-and-why-i-did-that-4bfc304284a6

### add EsLint

`ng add @angular-eslint/schematics`

### add Pretier

`npm install prettier --save-dev`

- add config & ignore files in project root

  > .prettierrc.json

      {
        "tabWidth": 2,
        "useTabs": false,
        "singleQuote": true,
        "semi": true,
        "bracketSpacing": true,
        "arrowParens": "avoid",
        "trailingComma": "es5",
        "bracketSameLine": true,
        "printWidth": 80,
        "endOfLine": "auto"
      }

> .prettierignore

    # See http://help.github.com/ignore-files/ for more about ignoring files.

    # Compiled output
    /dist
    /tmp
    /out-tsc
    /bazel-out

    # Node
    /node_modules
    npm-debug.log
    yarn-error.log

    # IDEs and editors
    .idea/
    .project
    .classpath
    .c9/
    *.launch
    .settings/
    *.sublime-workspace

    # Visual Studio Code
    .vscode/*
    !.vscode/settings.json
    !.vscode/tasks.json
    !.vscode/launch.json
    !.vscode/extensions.json
    .history/*

    # Miscellaneous
    /.angular/cache
    .sass-cache/
    /connect.lock
    /coverage
    /libpeerconnection.log
    testem.log
    /typings

    # System files
    .DS_Store
    Thumbs.db

### manage running 2 tools on same code

`npm install prettier-eslint eslint-config-prettier eslint-plugin-prettier --save-dev`

### change eslint config to enable ESLINT & PRETTIER plugins

> .eslintrc.json

    {
    "root": true,
    "ignorePatterns": ["projects/**/*"],
    "overrides": [
    {
    "files": ["*.ts"],
    "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@angular-eslint/recommended",
    "plugin:@angular-eslint/template/process-inline-templates",
    "plugin:prettier/recommended"
    ],
    "rules": {
    "@angular-eslint/directive-selector": [
    "error",
    {
    "type": "attribute",
    "prefix": "app",
    "style": "camelCase"
    }
    ],
    "@angular-eslint/component-selector": [
    "error",
    {
    "type": "element",
    "prefix": "app",
    "style": "kebab-case"
    }
    ]
    }
    },
    {
    "files": ["*.html"],
    "excludedFiles": ["*inline-template-*.component.html"],
    "extends": [
    "plugin:@angular-eslint/template/recommended",
    "plugin:@angular-eslint/template/accessibility",
    "plugin:prettier/recommended"
    ],
    "rules": {
    "prettier/prettier": [
    "error",
    {
    "parser": "angular"
    }
    ]
    }
    }
    ]
    }

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

- serve the app
- open in browser
- open DEV Tools
- tab: sources
- file: styles.css should refer to bootstrap

# Notes concerning current versions

In Angular 8+, the @ViewChild() syntax which you'll see in the next lecture needs to be changed slightly:

Instead of:

`@ViewChild('serverContentInput') serverContentInput: ElementRef;`

use

`@ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;`

The same change (add `{ static: true }` as a second argument) needs to be applied to ALL usages of `@ViewChild()`  
(and also `@ContentChild()` which you'll learn about later) IF you plan on accessing the selected element inside of `ngOnInit()`.

If you DON'T access the selected element in ngOnInit (but anywhere else in your component),  
set `static: false` instead!

If you're using Angular 9+, you only need to add `{ static: true }`  
(if needed) but not `{ static: false }`.

**the same applies to _ContentChild()_**

# From generated project readme

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

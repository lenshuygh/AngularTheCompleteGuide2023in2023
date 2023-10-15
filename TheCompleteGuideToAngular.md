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

`npm install --save rxjs@6`

- to install RxJS

`npm install --save rxjs-compat`

- to install the rxjs-compat package

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
    - **_to all services ! as of current Angular versions_**
      - with object `{providedIn: 'root'}`
        - now no need to declare in `app.module.ts` or in a component


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

# Routing

- to use different urls for sections in a single page app routing is used
- the Angular router will translate the url or **route** into displaying the correct page inside the single page application


- > app.module.ts
  
  - add routes constant with an array of routes objects
  - a route consists of an path and a component
    - be sure to **not** preface the path with a `/`

          const appRoutes: Routes = [
            {path: '', component: HomeComponent},
            {path: 'users', component: UsersComponent},
            {path: 'servers', component: ServersComponent},
          ]

  - register the routes
    - new import: `routermodule` that registers the routes declared as constant
        
          imports: [
            BrowserModule,
            FormsModule,
            RouterModule.forRoot(appRoutes)
          ],

- the routes will be displayed/resolved into `<router-outlet></router-outlet>` in the template
- use routerLinks in the template for navigation targets 
  - `<a routerLink="/servers">`
  or
  - `<a [routerLink]="['/users']">`
- by using routerLinks tha app is not reloaded and restarted from zero
- in routerLinks prepend the url with a `/` to make an absolute path, otherwise it's relative
- Angular provides a _**routerLinkActive**_ directive
  - can be added to the wrapping element or the link itself
  - it will attach the specified class if the current link is active
  - `routerLinkActive="active"` will attach the css class `active` if the current route is active
  - all routes active get the class so the route that's empty gets it also
    to prevent this we use `[routerLinkActiveOptions]` with the option `{exact : true}`
    
         <li
            role="presentation"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{exact : true}"
          >

    - this tells Angular : only display the class if this is the **_exact_** path of the route
     

- router can be used in .TS files
  - inject the router in the .TS file
  - use `this.router.navigate()`
    - this takes an array of strings for paths

          onLoadServers() {
            this.router.navigate(['/servers']);
          }

  - this can be expanded with options
    - `this.router.navigate(['servers'], {relativeTo: this.route});`


- passing data to routes

    - **_be careful with the order of routes or childroutes_** 
      - **_routes with an argument like :id should be last in the list_**
      - **_a childroute with a part of the url as 'path' would be mistaken for an arg_**
        - **_`path :id` before `path: new` would trigger this behaviour_**
      

  - with params in the route
    - `{path: 'users/:id', component: UserComponent},`
      - all data after `users/` in the path is accepted as `id`
    - in the component the parameter data needs to be fetched
      - this data is available via the `ActivatedRoute`
        - `constructor(private route: ActivatedRoute) { }`
      - the ActivatedRoute contains a lot of metadata including the passed parameters
        - `this.route.snapshot.params['id']`

    - works also with multiple parameters
      - route
        - `{path: 'users/:id/:name', component: UserComponent},`
      - retrieving param's  

            id: this.route.snapshot.params['id'],
            name: this.route.snapshot.params['name']
        
      - if we use routerLink with arguments
        - `<a [routerLink]="['/users', 10, 'Anna']">Load Anna (10)</a>`
        - there's an issue that the page doesn't refresh 
        - so when we're on the page already (but with other data) we don't see the new param's result
        - the remedy this use `this.route.params`
          - this is an observable
          - when the param's change the observable fires
          - subscribe to it

                this.route.params.subscribe(
                  (params: Params) => {
                    this.user.id = params['id'];
                    this.user.name = params['name']
                  }
                );

    - with QueryParams and Fragments
      - adding these options
        - in **template**
          - query params are the parameters after a `?` in URLs
            - in the template use `QueryParams`
              `queryParams]="{allowEdit:1}"`
            - with a *routerLink* of `[routerLink]="['/servers', 5, 'edit']"`  
              - this produces an URL like: `/servers/5/edit?allowEdit=1`
          - a fragment is `.....#loading` at the end of the url
            - can be added with `fragment="'loading'"` in the template

                  <a
                    [routerLink]="['/servers', 5, 'edit']"
                    [queryParams]="{allowEdit:1}"
                    fragment="'loading'"
                    href="#"
                    class="list-group-item"
                    *ngFor="let server of servers">
                    {{ server.name }}
                  </a>

        - **programmatically** in .TS
          - in template we see
            - `<button (click)="onLoadServers(1)" class="btn btn-primary">Load Server 1</button>`
          - in the .TS file with `.navigate`:
            - `this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowedit: '1'}, fragment: 'loading'});`

      - retrieving options
        - trough the `ActivatedRoute`

              this.route.snapshot.queryParams
              this.route.snapshot.fragment
  
        - these are only updated at creation 
        - for a more reactive way subscribe on `.queryParams` or `.fragment` as prop's of the route

              this.route.queryParams.subscribe(.....);
              this.route.fragment.subscribe(.....);

          - about these **_Route Observables_**
            - this is a built-in observable and the subscription doesn't need to be cleaned up
            - others that are user-created
              - **_subscription will need to be cleaned up_**

### Nested Routing
  
  - with **child routes**
    - by declaring `children`inside the parent route
    - the path wil be prepended by the parent path
    
          {
            path: 'servers', component: ServersComponent, children: [
              {path: ':id', component: ServerComponent},
              {path: ':id/edit', component: EditServerComponent},
            ]
          },

    - `router-outlet` can be used again inside the template of the component that is the parent-rout of the child-route
    - typically the new router-outlet replaces the child-route's selector

    - preserve parameters on child routes
      - this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
        - `relativeTo` specifies what to prepend to this child route
        - `queryParamsHandling` states what to do with the parent rout's parameters
          - `'preserve'` passes the same param's as the parent
          - `'merge'` merges the parent-route's param's with the new param's of the child route

### Redirecting and Wildcard routes

  - **redirecting**

        {path: 'not-found', component: PageNotFoundComponent},
        {path: 'something', redirectTo: '/not-found'},

  - **wildcard**
    - be sure that this route that catches all not known is the **_last_** route declared

          {path: 'not-found', component: PageNotFoundComponent},
          {path: '**', redirectTo: '/not-found'},
        
### Path Matching

  - by default Angular matches paths by prefix
    - `{path: '', redirectTo: '/somewhere-else'}`
    will match for
    -  `/recipes`
    - `/`
  - as it is so common Angular should give an error
  - because of the default **prefix**-strategy Angular checks the start of the path
    - all paths start with `''` so it will match
  - to remedy this the matching strategy can be changed to `"full"`
    - `{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }`

### Outsourcing the Routing

  - typically the routing config is in a separate module `app-routing.module.ts`
    - unless there's only 1 or 2 routes specified in `app-module.ts`
    - a `const appRoutes: Routes = [...];` is declared and on the imports of `@NgModule`it's fed into the `RouterModule`
    - this `RouterModule` needs to be exported in the `exports:`of the `@NgModule` decorator
    - the new module should be imported in `app.module.ts`
  - > app-routing.module.ts

          const appRoutes: Routes = [
            ...routes...
          ];
    
          @NgModule({
            imports: [
              RouterModule.forRoot(appRoutes),
            ],
              exports: [RouterModule],
          })
          
          export class AppRoutingModule {}

  - > app.module.ts
  
        @NgModule({
          declarations: [...],
          imports: [
            BrowserModule,
            FormsModule,
            AppRoutingModule,
          ],
          providers: [ServersService],
          bootstrap: [AppComponent]
          })
        export class AppModule {
        }

### Guards (Route Guards)
  - logic/functionality executed before a route is loaded or before a route is left
  - _**a guard is a service**_  
  - Guard services need to be added to the `AppModule` as a provider, like other services

  - **CanActivate Guard**
    - create a service that implements `CanActivate`
    - the canActivate can return:
      - Observable that wraps a boolean, resolves to a true or false
      - Promise of a boolean
      - Boolean
    - it can run async or sync
    - at the end it returns true or false
    - to use
      - in the routes add id as an argument to the route that needs it
        - `path: 'servers', canActivate: [AuthGuard], component: ServersComponent, children: [`
        - this will protect parent and child routes
    - to protect nested routes only
      - don't just add it to all child routes
      - do add `CanActivateChild` interface to the guard-service
      - add the method from that interface named `canActivateChild()`
        - has the same form as the `CanActivate()` method
        - in this method call the `CanActivate()` method and pass the arguments from the current method (route and state)
        - replace `CanActivate` option on the route with `CanActivateChild` followed by the guard-service in an array  

  - **CanDeactivate Guard**
    - this guard can prevent the user from navigating away from a route
    - eg: if on an edit page a value is changed but not saved and the user tries to leave this page
    - added as option on a route 
      - `path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]},`

### Routes and static data
  - when a page/component is multipurpose and relies on some data being passed to it
  - on the `ActivatedRoute` there's a data property that can contain data
    - put data on a route
      - `{path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!!!!'}},`
    - fetch from the route (ActivatedRoute)
    
          constructor(private route: ActivatedRoute) { }

          ngOnInit(): void {
            this.errorMessage = this.route.snapshot.data['message'];
          }      
  
      or

          constructor(private route: ActivatedRoute) { }
    
          ngOnInit(): void {
              this.route.data.subscribe(
                (data: Data) => {
                  this.errorMessage = data['message'];
                }
              );
          }

### Routes and dynamic data
  - a resolver runs code before displaying the route/ before the component is rendered
  - create a service that implements Resolve (from @angular/router)
  - its type is the data it resolves around eg: `{id: number, name: string, status: string}`
    - can be simplified by using an interface with those properties
        
          interface Server {
            id: number,
            name: string,
            status: string
          }
          
          export class ServerResolver implements Resolve<Server> {  

  - the implemented method is `resolve()`

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
          return undefined;
        }

    - arguments taken is Route & RouterStateSnapshot
    - returns either
      - Observable<Server>
      - Promise<Server>
      - Server
    - so the **resolver** returns data
    - declare in `app.module.ts`
    - define it in the route
      - `{path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},`
        - the key value pair as option defines that the data that the resolver returns is assigned as value to that key
    - in the route's component handle it as a promise to get the data from the key specified in the route

              
        ngOnInit() {
          this.route.data.subscribe(
            (data: Data) => this.server = data['server']
          );
        }   

### Location strategies

a live server hosting the SPA needs te be configured to return the index.html when a page not found (404) occurs
The server navigates first, but when the server doesn't send it to the SPA, the SPA cannot provide error pages for this

**Enable adding hashes to the route**
> app-routing.module.ts

add config to the RouterModule import ot include`{useHash: true}`


    imports: [
      RouterModule.forRoot(appRoutes, {useHash: true}),
    ],

now url's look include a `#`

> http://localhost:4200/#/servers

this tells the server it should only mind the URL portion before the `#`  
so  if the URL includes the `#` it will always be handled by the SPA only the part after the `#` changes


# Observables
not built in in Angular or TS  

provided by RXJS package (cfr `package.json` listed as `"rxjs": "^6.6.3",`)

observable is a data source

observable are constructs to which we subscribe to be informed about data changes

observable pattern:
  timeline/stream between observable and observer
  events are present on the stream emitted by observable
  observer : the subscribe function
    
3 ways of handling the data packaging (observer):
 - handle normal data
 - handle errors
 - handle completion of observable
user code van be executed on these 3
  
observable don't _need_ to complete eg: a button's observable

used to handle **_async tasks_**
  don't know when it will happen or how long it will take

### Syntax

**subscribe to an observable**
  
    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        this.id = +params.id;
      });
    }

  - the observable is `params
  - `(params: Params)` is the data and type that it emitted by the observable
  - `in  => {...}` the data is used to handle the changed data

**create an observable**
  - add import for RXJS
    - `import {interval} from "rxjs";`

  - `interval` emits an event every x seconds

          ngOnInit() {
              interval(1000).subscribe(count => {
                console.log('count: ', count);
              });
          }

    - this observable will keep emitting data even when navigating away
    - creates memmoryleaks
    - not all observables are like this eg: **_http-requests_**

  - to prevent keeping emitting:
    - store the subscription in a variable
      - `this.firstObsSubscription = interval(1000).subscrive(...`
    - in the ngOnDestroy()) hook unsubscribe from the subscription
          
              ngOnDestroy(): void {
                this.firstObsSubscription.unsubscribe();
              }


  - build a custom observable
    - import
      - `import {Observable} from "rxjs";`
    - create observable 

            const customIntervalObservable = Observable.create(
              observer => {
                let count = 0;
                  setInterval(
                  () => {
                    observer.next(count);
                    count++;
                }, 1000);
            });

    - subscribe and handle output from observable    

          this.firstObsSubscription =customIntervalObservable.subscribe(
            data => {
              console.log('data: ', data);
            }
          );

      - **_errors_** and **_completing_** observables
        - error handling:
          - when (and if) observable throws an error the error can be handled in the subscription and the emitting stops
            - `error` is passed besides the data in the subscription

                  this.firstObsSubscription = customIntervalObservable.subscribe({
                    next: (data) => {
                      console.log('data: ', data);
                    },
                    error: (error) => {
                      alert(error.message)
                    }
                  });    





- completing
  - in the observable it the same as error to trigger/declare:
    
        if(count === 2){
          observer.complete();
        }


  - in the subscribe:

        this.firstObsSubscription = customIntervalObservable.subscribe({
            next: (data) => {
              console.log('data: ', data);
            },
            error: (error) => {
              alert(error.message)
            },
            complete: () => {
              console.log('complete');
            }
          }
        );

**Operators**
  - we 'listen' to data from the observable
  - can be done in subscription
  - for complex logic with the emitted data use operators
  - with built-in operators we can subscribe to the operators
    - `pipe()` -> _funnels observable data trough multiple operators_
    - `map()` (imported as  `import {map} from "rxjs/operators";`)
      - `pipe()` takes the emitted data and feeds it into whatever is between its `()`
      - and in `pipe()`we use operators (can be multiple, just separated by `,`, executed one after another)
        - like `map()` which is a mapper
          - in `map()` the data can be transformed
    - after the `pipe()` closes we do `.subscribe()`to handle the transformed data
    
          customIntervalObservable.pipe(map((data: number) => {
            return 'Round: ' + (data + 1);
          })).subscribe(
            (data) => {
              console.log('data: ' + data)
            }
          );

      - another operator that's useful is `filter()`
        - only passes data that meets its condition that resolves as a boolean
          
              filter(
                  (data: number) => {
                    return (data % 2 === 0);
                  }
                ),

      - `tap()`
        - the tap operator enables us to execute code without altering the response or data
        - with a subscription
          - use it to do something with the data without altering the data

                  ).pipe(
                    tap(event => {
                        console.log('event: ', event)
                      }
                    )
      - `take()`
        - the take operator _takes_ takes a number as argument
        - take takes that configured number times a value of the observable
        - unsubscribes from the observable when it has done _taking_
        - so if the arg is `1` it only takes the observables value `1` time and then unsubscribes
        
                fetchRecipes() {
                  this.authService.user.pipe(take(1)).subscribe(...);

          - this gets the user when the method `fetchRecipes()` is called 
          - then unsubscribes because we don't need updates on that user subject
          - when we need it again we take it, 1 time and unsubscribe because the method was called again
          
      - `exhaustMap()`
        - used to chan actions on observables
        - it combines observables
        - it waits for the first observable it is after to complete
        - then it takes that result as a function : `() => {}` so the data of the first observable
        - returns a new observable that replaces the previous, finished observable
          - this new observable is the one that is placed in the exhaustMap's function, inside `{}`

                fetchRecipes() {
                  return this.authService.user.pipe(
                    take(1),
                    exhaustMap(user => {
                      return this.httpClient.get<Recipe[]>(this.url, {
                        params: new HttpParams().set('auth', user.token),
                      });
                    }),
                    map(recipes => {
                      return recipes.map(recipe => {
                        return {
                          ...recipe,
                          ingredients: recipe.ingredients ? recipe.ingredients : [],
                        };
                      });
                    }),
                    tap(recipes => {
                      this.recipeService.setRecipes(recipes);
                    })
                  );
                }

            - first observable is `user` start a `pipe()` to handle its data
            - we `take()` the data and the result is a `user` object
            - that result is used in the `exhaustMap()`'s function
            - the function contains the HTTP request-observable
            - in this observable we use the `user` object's data in the headers
            - the result of the request-observable is passed down in the current pipe to the next operator
            - next operator is the `mpa()` , this receives the `request`'s data
              - this is because the `exhaustMap()` operator replaces the previous observable and replaces is with the observable in it's function
              - in this case it is the HttpRequest-observable, so that observables data is passed to the `map()`
              

  **Subjects**
   - replaces an EventEmitter
   - imported from RXJS
     - `import {Subject} from "rxjs";`
   - same syntax as EventEmitter
     - `activatedSubject = new Subject<boolean>();`
   - we tell the subscription to perform a `next()` and pass in data
     - `this.userService.activatedSubject.next(true);`
   - we can subscribe to it and handle the data
     
          this.userService.activatedSubject.subscribe(
            didActivate => {
              this.userActivated = didActivate;
            }
          )

  **BehaviorSubject**
  - a type of subject
  - gives subscribers immediate access to the subject's previous value
  - needs to be initialized upon creation, usually with null
    - `user = new BehaviorSubject<User>(null);`




  - use **Subjects** over _EventEmitters_ if working **_cross-component_** trough a service
    - observable operators can be used
    - one should unsubscribe from a subscription like an observable
    - **_only_** for cross-component events, use EventEmitters when `@Output()` is needed

  
  - links for Observables & RXJS
    - Official Docs: https://rxjs-dev.firebaseapp.com/
    - RxJS Series: https://academind.com/learn/javascript/understanding-rxjs/
    - Updating to RxJS 6: https://academind.com/learn/javascript/rxjs-6-what-changed/


# Forms

  - 2 approaches for handling forms
    - template driven: angular infers Form Objects from the DOM
    - reactive: structure is defined in TS, manually structure connect to HTML

  - Angular handles the data, so no submit action of the from itself, on the `<form>`tag
  - because no HTTP requests is sent out to a server, it stays withing Angular

### Template Driven Forms

  - Angular creates a JS object representing the form for us

> app.module.ts
    
- add FormsModule import (from @angular/forms)
  - `import { FormsModule } from '@angular/forms';`
- Angular doesn't detect input elements
  - because it doesn't know which inputs are controls
- adding controls
  - add ngModel to the element without the `[]`
    - now Angular is told this input is a control of the form
  - add `name="<controlName>"` to the element 
    - so the control can be used in TS
  
          <input
            class="form-control"
            id="username"
            type="text"
            ngModel
            name="username"
          >

    - or

          <select
            class="form-control"
            id="secret"
            ngModel
            name="secret"
          >

  - how to call `onSubmit()`
    - to place it on the html element button of type 'submit' is not good because
      - this is linked to the form it is in
      - submits a specific event 
        - a request
    - Angular has a solution
      - place `(ngSubmit)` on the form tag
        - `<form (ngSubmit)="onSubmit()">`
        - now the submit-typed button can be used inside a form
    -  get access to the form
      - place a local reference on the form element and pass it along with the `ngSubmit()` method
      - the local element looks weird as in:`#f="ngForm"`
        `<form (ngSubmit)="onSubmit(f)" #f="ngForm">`
        - use ViewChild to access without sending it with the method, viewChild as prop of the TS file 
          - `@ViewChild('f') signupForm: NgForm;`
        - in TS the passed argument is of type `NgForm`
        
                onSubmit(ref: NgForm) {
                  console.log('ref: ', ref);
                }    

    - the NgForm type payload in TS
      - contains handy properties like
        - property `dirty`means if the form is untouched or not
        - property `valid` when using validators
        - property `touched` if it was clicked on/in
      - contains the values
        - with `ref.value.<controlName>`
        
              this.user.username = this.signupForm.value.userData.username;
              this.user.email = this.signupForm.value.userData.email;


- validation
  - `required` and `email` can be added to html elements
    - these are available in TS now on `NgForm`
      - the form's `valid`property is now handy in TS

            <input
              class="form-control"
              id="email"
              type="email"
              ngModel
              name="email"
              required
              email>  


  - validators present in Angular
    - for reactive forms
      - https://angular.io/api/forms/Validators
    - directives for template driven forms
      - https://angular.io/api?type=directive

  - pattern validator
    - `[pattern]="'^[1-9]+[0-9]*$'"` or `pattern="^[1-9]+[0-9]*$"`
      - takes a regular expression in this case only positive numbers greater than 0

  - in the forms there are classes added and removed dynamically
    - ng-invalid
    - ng-valid
    - ng-dirty
  - these can be used to specify CSS
    - `input.ng-invalid, select.ng-invalid { border: 1px solid red; }`
      - will indicate inputs that are not valid visually
    - the form's `valid`property can be used to disable the submit button
      - `[disabled]="!f.valid"`
        - because of the property `[disabled]`
      - to prevent starting the new form with warnings about validity
        
              input.ng-invalid.ng-touched, select.ng-invalid.ng-touched {
                border: 1px solid red;
              }

      - to display validity info on specific elements, with a local ref we can refer to the element's control in another element
        
              <input
                  class="form-control"
                  id="email"
                  type="email"
                  ngModel
                  name="email"
                  required
                  email
                  #email="ngModel"
                >
                <span class="help-block" *ngIf="!email.valid && email.touched">
                  Please enter a valid email</span>   


  - use defaults in form elements with `[ngModel]`
    - `[ngModel]="defaultQuestion"` used as one-way-property binding
      - `defaultQuestion` is a string property in the TS file
  - to have instant checking , not after submitting
    - `[(ngModel)]="answer"` 2 way binding is still available
  - grouping data/inputs
    - validation can be done per-group
    - can be done by a wrapping div with `ngModelGroup`
      - `<div id="user-data" ngModelGroup="userData">`
        - the name is a subdivision in the ngForm's value
        - now there's a sub-control with that name too in the ngForm's controls
        - local ref can be used also
          - `<div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">`
          - `<p *ngIf="!userData.valid && userData.touched">`
  - working with radio buttons
    - array of values in TS
    
          <label>
              <input
                type="radio"
                name="gender"
                ngModel
                [value]="gender"
                >{{ gender}}
          </label>

  
  - populate inputs with the TS file
    - the `signupForm` is present trough `@ViewChild()..` in the TS file
      - with `setValue()` we can set the value of the **whole** form
      
               this.signupForm.setValue({
                userData: {
                  username: suggestedName,
                  email: ''
                },
                secret: 'pet',
                questionAnswer: '',
                gender: 'male'
              });     

    - better to use `patchValue` on the `form` property of the form in TS
      - this can set specific controls iso the whole form
  
             this.signupForm.form.patchValue(
               {userData: {
                 username: suggestedName
                 }}
             );

  - resetting a form
    - use `reset()`
      - `this.signupForm.reset();`
      - pass object like in `patchValue()`to reset specific controls
      - all properties of controls are reset also (dirty etc.)

### Reactive Forms

- the form is created programmatically, in the TS code
- this doesn't mean 'from scratch' entirely

  - import FormGroup in the component
    - `import {FormGroup} from "@angular/forms";`
  - add property of type FormGroup
    - `signupForm: FormGroup;`
      - this will hold the form
  - import ReactiveForms module in app module
    
          @NgModule({
            declarations: [
            AppComponent
            ],
            imports: [
            BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            ],
            providers: [],
            bootstrap: [AppComponent]
          })

  - create the form in TS and connect to the HTML elements
    - FormGroup needs to be initialized , best in `OnInit()`
      
          ngOnInit(): void {
              this.signupForm = new FormGroup<any>({});
          }
    - in the FormGroup arguments we define controls as JS objects
       - inside a new control a default can be set, and a validator, and a async validator 

              this.signupForm = new FormGroup<any>({
                'username': new FormControl(null),
                'email': new FormControl(null),
                'gender': new FormControl('male'),
              });        
    - link template to the FormGroup
      - HTML form property binding with `<form [formGroup]="signupForm">`
      - input element
        - add directive `formControlName'`and ref the TS control
          - can be done with property binding as `[formControlName]="'username'"` <- notice the single quotes as we're referencing a string ISO a prop
          
                  <input
                    class="form-control"
                    formControlName="username"
                    id="username"
                    type="text"
                  >
    - submit with ngSubmit
      - `<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">`
      - in TS the form and its data is available through the property of type FormGroup

    - validation
      - in the control
        - besides the default value , the 2nd arg can be validators, the 3rd  _async_ validators
          - some `Validators` are provided
            - `'username': new FormControl(null, Validators.required),`
          - array if multiple
            - `'email': new FormControl(null, [Validators.required, Validators.email]),`
      - template and validation status
        - `*ngIf="!signupForm.get('username').valid && signupForm.get('username').touched"`
          - signupForm is a prop so available
            - `.get()` can be used to get a control by control-name
          - classes `touched` and `valid` are also again available on the elements so with css classes it can be decorated

    - grouping
      - declare `FormGroup` 
        - van be bested, here the parent is also a FromGroup
  
              this.signupForm = new FormGroup({
                'userData': new FormGroup({
                  'username': new FormControl(null, Validators.required),
                  'email': new FormControl(null, [Validators.required, Validators.email])
                }),
                'gender': new FormControl('male'),
              });

      - in the template it also needs to be linked with a grouping
        - `<div formGroupName="userData">`
          - and the name is added
      - in template the path to the control's added classes needs to be updated if inside a formgroup
        - `*ngIf="!signupForm.get('userData.username').valid && signupForm.get('userData.username').touched"`

    - dynamically add controls
      - in TS provide a place to hold and add controls to
        - `hobbies': new FormArray([])`
          - this is in the FromGroup, and is an empty array we can add to
      - add in TS on action (there's a cast to `FormArray` in here !!)
      
              onAddHobby(){
                const control = new FormControl(null, Validators.required);
                (<FormArray>this.signupForm.get('hobbies')).push(control);
              }

      - in HTML template

              <div formArrayName="hobbies">
                <h4>Your hobbies</h4>
                <button
                (click)="onAddHobby()"
                class="btn btn-default"
                type="button"
                >Add Hobby
                </button>
                  <div *ngFor="let hobbyControl of getControls(); let i = index "
                       class="form-group">
                    <input type="text" class="form-control" [formControlName]="i">
              </div>


  - old way for looping trough controls
    - `*ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index"`
      - won't work in recent Angular versions
    - can be done by outsourcing the getting to the TS
      - `getControls() { return (<FormArray>this.signupForm.get('hobbies')).controls; }`
      - template:
        - `*ngFor="let hobbyControl of getControls(); let i = index"`
    - or with a getter
      - `get controls() { return (this.signupForm.get('hobbies') as FormArray).controls; }`
      - template:
        - `*ngFor="let hobbyControl of controls; let i = index"`


- custom validators
  - validators are functions
    - pass in a value of type `Formcontrol`
    - it has a type of `{[s: string]: boolean}`
      - a string as key  and a boolean as value
      - inside JS object
    - return true if condition is met
    - return `null` is not valid, **_NOT FALSE_**
    - in this validator we check if the value is in a certain array, if not the `ìndexOf()` returns `-1`
    - and the key value pair is returned

            forbiddenNames(control: FormControl): { [s: string]: boolean } {
                if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
                  return {'nameIsForbidden': true};
                } else {
                  return null;
                }
            }

  - usage in the control
    - `'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),`
      - `.bind(this)`because of the `this` inside the function

- async validator
  - returns a `Promise` or an `Observable`
    
        forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
          return new Promise<any>(
            (resolve, reject) => {
              setTimeout(() => {
                if (control.value === 'test@test.com') {
                  resolve({'emailIsFobidden': true});
                } else {
                  resolve(null);
                }
              }, 1500);
            }
          );
        }

  - usage as arg after normal validators
    - `'email': new FormControl(null, [Validators.required, Validators.email],[this.forbiddenEmails])`

- tracking the form and each control
  - status changes and value changes can be tracked
  - value (can also be on individual controls)
    
            this.signupForm.valueChanges.subscribe(
              (value) => console.log(value)
            );

  - status (can also track individual controls)

          this.signupForm.statusChanges.subscribe(
            (status) => console.log(status)
          );         

- set and patch values on a form
  - setValue takes an object representing the form and controls
  
        this.signupForm.setValue({
          'userData' : {
            'username': 'Lens',
            'email' : 'lens@test.be'
          },
          'gender' : 'male',
          'hobbies' : [],
        });
  - patchValue can take single elements to set the value of
  
          this.signupForm.patchValue({'gender':'female'});

  - resetting also works on reactive forms
      
         this.signupForm.reset();


# Pipes
  - transform data at display time, that data itself isn't changed
  - there's built-in pipes and custom pipes


### usage
- with a pipe `|` after the data, but between curly braces
  - `{{ server.instanceType | uppercase}}`
    - this transforms text preceding the pipe sign to uppercase
  - `{{ server.started | date}}`
    - the date pipe renders the time more pretty as a date
- some pipes can be configured
  - by adding a colon `:`
  - and the param(s) (additional param's are separated by colons `:`)
    - `{{ server.started | date: 'fullDate'}}`
- look at https://angular.io/api?query=pipe for info on built-in pipes, configuration etc.
- **_pipes can be combined_**
  - is applied form left to right
  - keep order in mind, some types can't be transformed by some pipes
    - `{{ server.started | date: 'fullDate' | uppercase}}`

### custompipes

- create a file like `shorten.pipe.ts` in the root folder
- best implements method `PipeTransform`
- always needs to return something
- needs the `@Pipe` decorator that takes a JS object with `name:`and the name to be used in the template
  - `@Pipe({name : 'shorten'})`
- add the pipe to `app.module.ts'` declarations

        import {Pipe, PipeTransform} from "@angular/core";
        
        @Pipe({name : 'shorten'})
          export class ShortenPipe implements PipeTransform {
            transform(value: any, ...args: any[]): any {
              return value.substring(0, 10);
            }
        }
  
- add user defined options
  - in the pipe's implemented transform method options/args can be used
    - `transform(value: any,limit: number): any {`
      - use that arg in the logic of the pipe
    - in the template specify is as an options to the pipe used
      - `{{ server.name |shorten: 5 }}</strong>`

- CLI can make a pipe
  - `ng generate pipe filter`   
  or 
  - `ng g p filter`
        

- pipes can be used for reducing/filtering data
  - `<li *ngFor="let server of servers | filter:filteredStatus:'status'"`
    - here `filteredStatus` is a changing string passed to the filter and the propname is tha property on the element of the array that gets checked against that string

- **_pipes on data don't run again automatically when the data changes_**
  - this is called `pure`
  - in the pipe's decorator you can set `pure: false` (= an `ìnpure` pipe)
  - **_this is a performance risk_**

        @Pipe({
          name: 'filter',
          pure: false
        })
        export class FilterPipe implements PipeTransform {


- Async pipe
  - async data, data that isn't there at first, it's not resolved or present
  - the pipe `async` wits before displaying the data


# HTTP
  - more at https://angular.io/guide/understanding-communicating-with-http


  - anatomy of an HTTP Request
    - URL / API Endpoint
    - HTTP Verb
    - Request Headers / MetaData
    - Request Body

  - add HttpClientModule to imports in `app.module.ts`
    - import from `@angular/common/http`
  - inject as service in component
    - use `httpClient.post()` to send data
    - if there's no subscription on the request it wil not be sent
    - `POST` returns an observable
      - one must subscribe to it , otherwise it won't even be sent
      
            onCreatePost(postData: { title: string; content: string }) {
              this.http.post(
                <api-address-as-string>,
                postData
              ).subscribe(
                responseData => console.log(responseData)
              );
            }


  - transform data received
    - with `pipe()` the data received can be funneled trough operators that change/handle the data
    
          private fetchPost() {
            this.http.get('https://ng-complete-guide-77d70-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
              .pipe(
                map(
                  response => {
                    const postArray = [];
                    for (const key in response) {
                      if (response.hasOwnProperty(key)) {
                        postArray.push({...response[key], id: key})
                      }
                    }
                    return postArray;
                  }
                )
              )
              .subscribe(
                response => console.log('response: ', response)
              )
          }

      - with `.pipe()` the data is mapped, returns an observable again so it can be subscribed upon
      - the type can be assigned so type: Any isn't there so much
        - the JS object describes an object with a string as key and a value of type `Post`
      
                  map(
                    (response: { [key: string]: Post }) => {
                      const postArray: Post[] = [];
                      ...

      - because the `get()` request and all other requests is generic a type can be set so the data handled is typed
        - the body type of the response is set on the HTTP method
          - `this.http.get<{[key: string]: Post}>('https://`
          or
          - `this.http.post<{name: string}>(`
        - so there isn't any need for type specification in the following operations

  - using a loading indicator
    - prop on TS indicating it is loading (boolean)
    - set default to false
    - set to true when handling subscription data
    - use `*ngIf` in template to display loading text


  - delete

            this.postService.deletePosts().subscribe(() => {
              this.loadedPosts = [];
              }
            )


  - **_errors_**
    - error handling
      - the subscribe function has a second argument for handling errors from the subscription
        
                  this.isFetching = true;
                    this.postService.fetchPosts().subscribe(
                      (response) => {
                        this.isFetching = false;
                        this.loadedPosts = response;
                      },
                      error => {
                        this.error = error.message;
                      }
                    );            

      - when it's about a request that's not subscribed to in the TS file
        - create a subject in the service where the call is done
          - `error = new Subject<string>();`
          - take the subscriptions error arg to trigger the subject
                  
                    this.httpClient.post<{ name: string }>(
                      'https://ng-complete-guide-77d70-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
                      postData
                    ).subscribe(
                      responseData => console.log(responseData),
                      error => this.error.next(error.message())
                    );   
        
          - now subscribe to that error where the call is used to display it if failed
            - `this.errorSubscription = this.postService.error.subscribe((errorMsg) => {
              this.error = errorMsg;
              })`          

      - the `catchError`-operator
        - helps in handling errors
        - imported from `rxjs/operators`
        - if the data is piped already, and there's an error this operator can be used
          - usage (needs to be returned so it can be subscribed to)
            - add as element in the pipe

                    .pipe(
                      map(
                        (response) => {
                          const postArray: Post[] = [];
                          for (const key in response) {
                            if (response.hasOwnProperty(key)) {
                              postArray.push({...response[key], id: key})
                            }
                          }
                          return postArray;
                        }
                      ),
                      catchError(error => {
                        // generic error handling operations
                        return error;
                      })
                    )
            - use `throwError` from `rxjs`
              - this function yields an observable by wrapping an error
              - use the catchError's data to feed that observable

                      .pipe(
                        map(
                          (response) => {
                            const postArray: Post[] = [];
                            for (const key in response) {
                              if (response.hasOwnProperty(key)) {
                                postArray.push({...response[key], id: key})
                              }
                            }
                            return postArray;
                          }
                        ),
                        catchError(errResponse => {
                          // generic error handling operations
                          return throwError(errResponse);
                        })
                      )

  - **Headers**
    - setting headers
      - any http method has an argument to configure that request, after the URL
      - inside this the `HttpHeaders` can be configured
        - imported from `"@angular/common/http"`
        
              ('https://ng-complete-guide-77d70-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
              {
                headers: new HttpHeaders(
                  {'CustomHeader': 'Hello'}
                )
              })
              .pipe(````

        - this will produces a header on the call

  - **Paramters**
    - setting parameters on the HTPP call (can also be set at the end of the URL itself)
      - trough `HttpParams` 
        - imported from `"@angular/common/http"`
        - also used in the arguments of a request, besides eg. _headers_
        - works not quite the same, no arg in `new HttpParams` but a method :`set()` 
        - the `.set()` takes 2 args, a key and a value
        
              ('https://ng-complete-guide-77d70-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
              {
                headers: new HttpHeaders(
                  {'CustomHeader': 'Hello'}
                ),
                params: new HttpParams().set(
                  'print','pretty'
                )
              })
              .pipe(

        - multiple parameters
          - define a variable (not constant) with new object of `HttpParams`
          - `.append()` to it with keys and values
          - be careful: the append method will not change the var, it will return it with the appended data
            - so it needs to be assigned again

                  let searchParams = new HttpParams();
                  searchParams = searchParams.append('print', 'pretty');
                  searchParams = searchParams.append('custom', 'key');    

            - set the params key's value to that new var in the options of the request
              - `params: searchParams`

- **response headers**
  - beside the data there's more to a response
  - it is possible to handle the whole object instead of only the data it contains
  - options are available to set like Headers and Parameters on the request
    - eg: `observe: 'response'`
      - the whole response iso the data is observed as return of this request

                      postData,
                      {
                        observe: 'response'
                      }
                    ).subscribe(

      - whole response is returned, so following data handling needs to start with this as the base
        - use `.tap()` to check the data without altering the response or data
        - the event's properties contains very specific data of the type etc of the response
          - eg: check if the event is of type 'response', only then there's a body available

                     return this.httpClient.delete(
                        '<URL>',
                        {
                          observe: 'events'
                        }
                      ).pipe(
                        tap(event => {
                            console.log('event: ', event);
                            if (event.type === HttpEventType.Response) {
                              console.log('body: ', event.body);
                            }
                          }
                        )
                      );
            
    - the ResponseType can also be configured
        
              return this.httpClient.delete(
                        '<URL>',
                        {
                          observe: 'events',
                          responseType: 'json'
                        }
                      ).pipe(

      - parsed and converted to a JS object
        - can be
          - `'text'`
          - `'blob'`
          - `'json'` = default

- **interceptors**
  - for eg. adding authorization
  - create a new file that is a service
  - implements `HttpIntercepter` interface from `@angular/common/http`
  - the intercept method that needs to be implemented
    - arg's are
      - HttpRequest
      - HttpHandler
        - function that forwards the request
    - allows us to run code before the request is sent
    - ends with `return next.handle(req);`
      - this lets the request continue
    
            intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
              console.log('Request is on its way');
              return next.handle(req);
            }

    - the interceptor needs to be provided as:
      - element in the `providers` array of `app.module.ts`
      - this element is a JS object with 3 key-value pairs
        - first pair: key is `provide` with value `HTTP_INTERCEPTORS`
        - second pair: key is `useClass` with value referring to the interceptor service
        - third pair
          - this is when there are more than 1 interceptor
            - if there's more than 1 they will replace each other
            - remedy this by setting `multi`with a value of `true`
              
                    imports: [BrowserModule, FormsModule, HttpClientModule, HttpClientModule],
                    providers: [{
                      provide: HTTP_INTERCEPTORS,
                      useClass: AuthInterceptorService,
                      multi: true
                    }],
                    bootstrap: [AppComponent]

    - to modify a request
      - the `HttpRequest` is immutable so a new one needs to be made
        - clone the request and pass a JS object that has all the properties
        - pass the modified req back

                intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                    console.log('Request is on its way');
                    const modifiedReq = req.clone({headers: req.headers.append('Auth', 'xyz')})
                    return next.handle(modifiedReq);
                }

    - interceptors can be used the handle responses data also
    
              intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                  console.log('Request is on its way');
                  const modifiedReq = req.clone({headers: req.headers.append('Auth', 'xyz')})
                  return next.handle(modifiedReq).pipe(
                    tap(event => {
                      console.log('Event received -> ', event);
                      if (event.type === HttpEventType.Response) {
                        console.log('Event response body: ', event.body);
                      }
                    })
                  );
              }
      
    - multiple interceptors
      - the order in which they are provided is important, below the auth header wouldn't be logged if the order of interceptors was reversed
      - in `app.module.ts`
        
            providers: [
                {
                  provide: HTTP_INTERCEPTORS,
                  useClass: AuthInterceptorService,
                  multi: true
                },{
                  provide: HTTP_INTERCEPTORS,
                  useClass: LoggingInterceptorService,
                  multi: true
                },
            ],


# Authentication
- client and server
  - user/client enters credentials
  - sent to server to validate, can't happen in browser because it is exposed
  - server validates, if ok, server will send a token (JWT)
    - is an encoded string
    - client receives this
      - is attached to all requests to the server for authentication
      - server validates the token for the requests

- a session is of no use for SPA's -> Stored on server, doesn't care about our client running in browser

- trough http request's and responses we ge a token, this token can be used in subsequent requests to be authenticated and make authenticated requests

- prevent using routes unauthorized with a guard
  - the guard returns true is authenticated, if a user is present if it works with a user that's there when authenticated and null when not
  - in `app-routing.module.ts`
    - protect a path
      - add the guard as an element to the array describing a path
        - `{path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [`
  
  - redirecting on not authenticated
    - if authenticated it returns true
    - if not it routes with urlTree
    
              return this.authService.user.pipe(
                take(1),
                map(user => {
                  //return !!user;
                  const isAuth = !!user;
                  if (isAuth) {
                    return true;
                  } else {
                    return this.router.createUrlTree(['/auth']);
                  }
                })
              );

- more on JWT https://jwt.io/

#  Storage

### use localStorage of the browser to persist users/tokens
- **save data**

  `localStorage.setItem('userData', JSON.stringify(user));`    
  - data needs to be a string -> `JSON.stringify()`

- **retrieve data**

    `JSON.parse(localStorage.getItem('userData'));`
  - data as string needs to parsed to use as object , is returned as object literal

- **removing data**
  - `localStorage.clear()`
    - removes all data
  - `localStorage.removeItem('userData');` 
    - removes specific data


# Dynamic components

  - components created at runtime
  - loaded on demand/programmatically -> `*ngIf`
  - can be destroyed?
  - loaded only programmatically -> without using `*ngIf`
    -  

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

### Casting
- cast a string to a number
  - `Number(route.params['id'])`  
  or
  - `+route.params['id']`

## copy object properties
- with the spread operator `...`
  - copies all properties into current object
  
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : [],
                };

  - this returns an object with all recipe properties but if the `ingredients` property isn't present we provide an empty array

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

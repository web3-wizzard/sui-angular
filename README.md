# Sui Angular Wallet Kit

The first package, written in Angular, provides components for connecting to the SUI blockchain wallet. ⚠️ These packages are in the experimental stage and will undergo frequent changes during development. Please do not regard these APIs as stable.

## Getting started

To begin with an Angular application, you can install the following package:

```shell script
npm i @sui-angular/core
```

Add the following code snippets to angular.json.

```json script
"assets": [
              ...,
              {
                "glob": "**/*",
                "input": "node_modules/@sui-angular/core/assets",
                "output": "sui-angular"
              }
            ],
```

```json script
"styles": [
            ...,
            "node_modules/@sui-angular/core/styles/sui-angular.scss"
          ],
```

Next, you should import the CoreModule and specify either BrowserAnimationsModule or NoopAnimationsModule, just as you did.

```typescript script
import { SuiAngularCoreModule } from '@sui-angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    ...,
    imports: [
        SuiAngularCoreModule,
        NoopAnimationsModule
    ],
    ...,
})
```

Add a connection button to your component
```html script
<div style="display: flex; justify-content: end; align-items: center;">
    <connect-button-container style="margin: 8px 16px;" (connected)="connected($event)"></connect-button-container>
</div>
```

```typescript script
import { AuthService, ConnectedWalletInterface } from '@sui-angular/core';

...
public connected(event: ConnectedWalletInterface): void {
    console.log(event, 'event');
}
...
```
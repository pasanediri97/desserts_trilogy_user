
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../directives/shared.module';
const components = [ 
    MenuComponent
];
@NgModule({
    declarations: [
        components
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        SharedModule
    ],
    exports: [
        ...components,
    ]
})
export class ComponentsModule { }

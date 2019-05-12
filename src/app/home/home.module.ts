import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { AddNodePage } from '../add-node/add-node.page';
import { AddNodePageModule } from '../add-node/add-node.module';

@NgModule({
    entryComponents: [
        AddNodePage
    ],
    imports: [
        AddNodePageModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    declarations: [HomePage]
})
export class HomePageModule { }

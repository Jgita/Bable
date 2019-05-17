import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MapsComponent} from './maps.component';
import {MapsService} from './maps.service';
import {CreateCollectionComponent} from './create-collection/create-collection.component';
import {EditMapComponent} from './edit-map/edit-map.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

const routes: Routes = [{
    path: '',
    component: MapsComponent
}, {
    path: 'create-collection',
    component: CreateCollectionComponent
}, {
    path: 'edit-map',
    component: EditMapComponent
}];

@NgModule({
    declarations: [
        MapsComponent,
        CreateCollectionComponent,
        EditMapComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        DragDropModule
    ],
    providers: [
        MapsService
    ]
})
export class MapsModule {
}

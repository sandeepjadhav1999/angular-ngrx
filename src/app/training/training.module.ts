import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { SharedModule } from "../shared/shared.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainingComponent } from "./current-training/stop-training/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { TraningRoute } from "./taining-rotuing.module";
import { TrainingComponent } from "./training.component";

@NgModule({
    declarations:[
        TrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        CurrentTrainingComponent,
    ],
    imports:[
        SharedModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
        TraningRoute
    ],
    exports:[],
    entryComponents:[StopTrainingComponent]
})
export class TrainingModule{
    
}
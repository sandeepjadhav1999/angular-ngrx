import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../trainig';
import { TrainingService } from '../trainig.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import * as frRoot from '../../app.reducer'
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>()
  exercises:Exercise[]
  excersieSub: Subscription
  isLoading:Observable<boolean>
  


  constructor(private training:TrainingService, private db:AngularFirestore, private uiSerivce:UiService,
    private store:Store<frRoot.State>) { }

  ngOnInit(){
    this.isLoading= this.store.select(frRoot.getIsLoading)
    
    this.FetchingExcersie()
    
    this.training.getAvailableExercises()
  }

  FetchingExcersie(){
    this.excersieSub = this.training.newExcersieChanged.subscribe(
      excer=> this.exercises=excer
    )
  }

  
  onStart(form:NgForm){
    this.training.startExercise(form.value.exercise)
  }

  

}

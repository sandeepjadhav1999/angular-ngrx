import { Injectable } from '@angular/core';
import { Exercise} from './trainig';
import { map, Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as frRoot from '../app.reducer'
import * as UI from '../shared/ui.actions'

@Injectable({
  providedIn: 'root'
})

export class TrainingService {
  exerciseChanged = new Subject<Exercise>()
  newExcersieChanged = new Subject<Exercise[]>()
  completedtableExcersie = new Subject<Exercise[]>()
  afSub:Subscription[]=[]

  private availableExercises: Exercise[] = [
  ];
  private exerciseHistory:Exercise[]=[]
  private runningExercise: Exercise;

  constructor(private db:AngularFirestore, private uiService:UiService,
    private store:Store<{ui:frRoot.State}>){}

  getAvailableExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.afSub.push( this.db.collection('available Exercises')
    .snapshotChanges()
    .pipe(map(docarry=>{
      return docarry.map(d=>{
        return {
          id: d.payload.doc.id,
          ...(d.payload.doc.data() as Exercise),
        }
      })
    }))
    .subscribe((excerise:Exercise[])=>{
      this.store.dispatch(new UI.StopLoading())
      this.availableExercises=excerise
      this.newExcersieChanged.next([...this.availableExercises])
    },error=>{
      this.store.dispatch(new UI.StopLoading())
      this.uiService.snackBarMsg('Fetchin Excersie Failed, Please Try Later', null, 3000)
      this.newExcersieChanged.next(null)
    }))
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({...this.runningExercise})
  }

  getRunningExercise(){
    return {...this.runningExercise}
  }

  completedExercise(){
    this.addtoDatabse({...this.runningExercise,date:new Date(), state:"completed"})
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  cancelledExercise(progress:number){
    this.addtoDatabse({...this.runningExercise,
      duration:this.runningExercise.duration*(progress/100),
      calories:this.runningExercise.calories*(progress/100),
      date:new Date(), 
      state:"cancelled "
    })
    this.runningExercise = null
    this.exerciseChanged.next(null)

  }

  cancelSub(){
    this.afSub.forEach(sub=>sub.unsubscribe())
  }

  getPassedExercise(){
    this.afSub.push( this.db.collection('finished excerise').valueChanges().subscribe((exercise:Exercise[])=>{
      this.completedtableExcersie.next(exercise)
    }))
  }

  addtoDatabse(excerise:Exercise){
    this.db.collection('finished excerise').add(excerise)
  }
}
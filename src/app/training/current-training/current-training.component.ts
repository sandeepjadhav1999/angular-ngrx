import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../trainig.service';

import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0
  timer:any

  constructor(public dialog:MatDialog, private traninigService:TrainingService) { }

  ngOnInit(){
    this.startorStop()
  }

  startorStop(){
    const step= this.traninigService.getRunningExercise().duration/100*1000
    this.timer=setInterval(() => {
      this.progress = this.progress +1
      if(this.progress >=100){
        this.traninigService.completedExercise()
        clearInterval(this.timer)
      }
    },step)
  }

  onStop(){
    clearInterval(this.timer)
    const dialogref = this.dialog.open(StopTrainingComponent, {data:{
      progress:this.progress
    }})
    dialogref.afterClosed().subscribe(result=>{
      if (result){
        this.traninigService.cancelledExercise(this.progress)
      }else{
        this.startorStop()
      }
    })
  }

}

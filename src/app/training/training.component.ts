import { Component, OnInit } from '@angular/core';
import { TrainingService } from './trainig.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoinTrainig:boolean= false

  constructor(private trainigService:TrainingService) { }

  ngOnInit(){
    this.trainigService.exerciseChanged.subscribe(result=>{
      if(result){
        this.ongoinTrainig = true
      }else{
        this.ongoinTrainig = false
      }
    })
  }

}

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from '../trainig';
import { TrainingService } from '../trainig.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort)sort :MatSort
  @ViewChild(MatPaginator) page:MatPaginator

  displayedColumns = ['name', 'date', 'calories', 'duration', 'state']
  dataSource = new MatTableDataSource<Exercise>()
  exchangedData= new Subscription

  constructor(private trainingService:TrainingService) { }

  ngOnInit(){

    this.exchangedData= this.trainingService.completedtableExcersie.subscribe((excersie:Exercise[])=>{
      this.dataSource.data=excersie
    })

    this.trainingService.getPassedExercise()
  }
  ngAfterViewInit(){
    this.dataSource.sort=this.sort
    this.dataSource.paginator=this.page
    
  }
  doFilter(filter:string){
    this.dataSource.filter=filter.trim().toLocaleLowerCase()
  }

  ngOnDestroy(): void {
    if(this.exchangedData)
    {this.exchangedData.unsubscribe()}
    
  }

}

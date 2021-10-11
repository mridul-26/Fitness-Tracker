import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingSevice } from '../training.service';

import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  TIMER!: ReturnType<typeof setTimeout>;
  @Output() trainingExit = new EventEmitter();

  constructor(private dialog: MatDialog,private trainingService:TrainingSevice) { }

  startOrResumeTimer(){

    const step = (this.trainingService.getRunningExercise().duration!/100) * 1000;
    // step = step!/100
    console.log(step);
    this.TIMER = setInterval(() => {
      this.progress = this.progress+1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.TIMER);
      }
    },step);
  }

  onStop(){
    clearInterval(this.TIMER);
    
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress : this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        // this.trainingExit.emit();
        this.trainingService.cancelExercise(this.progress);
      }
      else
      {
        this.startOrResumeTimer();
      }
    })
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }


}

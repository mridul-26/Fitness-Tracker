import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingSevice } from '../training.service';

// import { environment } from 'src/environments/environment';
// import { initializeApp } from 'firebase/app';
// import { Firestore } from 'firebase/firestore';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { doc, getDoc } from "firebase/firestore";



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  // @Output() trainingStart = new EventEmitter<void>()
  exercises: Exercise[] = [];
  // private db : Firestore
  constructor(private trainingService : TrainingSevice) { }
  
  ngOnInit(): void {
    
    this.exercises = this.trainingService.getAvailableExercises();
    
  }

  onStartTraining(form : NgForm){
    // this.trainingStart.emit();
    this.trainingService.startExercise(form.value.exercise)
  }

}

import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

export class TrainingSevice{
    
    exerciseChanged = new Subject<Exercise|undefined|null>();
    
    private avaliableExercises : Exercise[] = [
        {id:'crunches',name:'Crunches',duration:30,calories:8},
        {id:'touch-toes',name:'Touch Toes',duration:180,calories:15},
        {id:'side-lunges',name:'Side Lunges',duration:120,calories:18},
        {id:'burpees',name:'Burpees',duration:60,calories:8}
    ];

    private runningExercise!: Exercise|undefined|null;
    private exercises : Exercise[] = [];

    getAvailableExercises(){
        return this.avaliableExercises.slice();
    }

    startExercise(selectedId: string)
    {
        const data = this.avaliableExercises.find(ex => ex.id === selectedId);
        if (data !== undefined) {
            this.runningExercise = data;
        }
        // this.runningExercise = 
        this.exerciseChanged.next(this.runningExercise);
    }

    completeExercise(){
        
        if (this.runningExercise !== null && this.runningExercise!== undefined) {
            this.exercises.push({...this.runningExercise,date: new Date(),state:'completed'});            
            this.runningExercise = null;
            this.exerciseChanged.next(null);
        }

    }

    cancelExercise(progress : number) {

        if (this.runningExercise !== null && this.runningExercise!== undefined) {
            this.exercises.push({...this.runningExercise,
                                    duration:this.runningExercise.duration*(progress/100),
                                    calories:this.runningExercise.calories*(progress/100),
                                    date: new Date(),
                                    state:'cancelleed'
                                });            
            this.runningExercise = null;
            this.exerciseChanged.next(null);
        }

    }

    getRunningExercise(){
        return {...this.runningExercise};
    }

    getExercise(){
        return this.exercises.slice();
    }
}
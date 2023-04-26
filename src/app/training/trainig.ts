export interface Exercise {
    id:string,
    name:string,
    duration:number,
    date ?:Date,
    calories:number,
    state ?: 'completed' | 'cancelled ' | null
}

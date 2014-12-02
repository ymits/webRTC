module Greeting{
    export class Hello{
        constructor(private text : string){
        }
        say() : void{
            console.log(this.text);
        }
    }
}
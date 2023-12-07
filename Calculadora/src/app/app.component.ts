import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { isEmpty } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'Calculadora';
  resultado:string = ""
  operacion:string = ""
  lastWasEqual:boolean = false;

  onClickNum(num:Event){
    if(num.target instanceof HTMLElement){
      this.operacion += num.target.innerHTML;
    }
  }
  onClickEqual(){
    const algo = new Function('return ' + this.operacion)();
    this.resultado = algo.toString();
    this.operacion = algo.toString();
    this.lastWasEqual = true;
  }
  onClickSign(sign:Event){
    if(sign.target instanceof HTMLElement){
      this.operacion += this.comprobarSigno(sign.target.innerHTML);
      this.lastWasEqual = false;
    }
  }
  eraseAll(){
    this.resultado = "";
    this.operacion = "";
    this.lastWasEqual = false;
  }
  eraseOneDigit(){
    if(this.lastWasEqual){
      this.eraseAll();
    }else{
      this.operacion = this.operacion.substring(0,this.operacion.length-1);
      this.lastWasEqual = false;
    }
  }
  cambiarSigno(){
    if(this.operacion.charAt(0) == "-"){
      this.operacion = this.operacion.substring(1,this.operacion.length);
    }else{
      this.operacion = "-" + this.operacion;
    }
  }
  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent){
    if (event.key.match(new RegExp("[0-9]"))) {
      this.operacion += event.key;
    } else if (event.key.match(new RegExp("[+-/\*%]"))) {
      this.operacion += this.comprobarSigno(event.key);
    }else{
      console.log(event.key);
    }
  }
  comprobarSigno(signo:string):string{
    console.log(this.operacion==="")
    if(this.operacion.match(new RegExp("[+-/\*%]"))|| this.operacion === ""){
      return "";
    }
    return signo;
  }
}

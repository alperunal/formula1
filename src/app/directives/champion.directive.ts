import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appChampion]'
})
export class ChampionDirective implements OnInit {
  @Input()
  appChampion: boolean;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if(this.appChampion) {
      this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', '#F5F5F5');
    }
  }
}

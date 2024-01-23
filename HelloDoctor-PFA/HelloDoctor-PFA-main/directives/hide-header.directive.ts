import { AfterViewInit, Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, isPlatform } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements AfterViewInit{

  @Input('appHideHeader') header: any;
  private headerHeight = isPlatform('ios') ? 44 : 56;
  private children: any;

  constructor(private rendrer: Renderer2, private domCtrl: DomController,) {}

  ngAfterViewInit(): void {
    this.header = this.header.el;
    this.children = this.header.children;
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any){
    const scrollTop: number = $event.detail.scrollTop;
    let newPostion = -scrollTop;
    if (newPostion<-this.headerHeight) {
      newPostion=-this.headerHeight;
    }
    let newOpacity = 1 - (newPostion/-this.headerHeight);

    this.domCtrl.write(() => {
      this.rendrer.setStyle(this.header, 'top', newPostion + 'px');
      for(let c of this.children){
        this.rendrer.setStyle(c, 'opacity', newOpacity)
      }
    })
  }

}

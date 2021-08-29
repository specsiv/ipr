import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: ['./card-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardWrapperComponent implements OnInit {
  @Input() card!: Card;

  @ViewChild('preview', { read: ViewContainerRef, static: true }) previewView!: ViewContainerRef;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    const component = this.previewView.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(this.card.cardPreviewComponent)
    );

    component.instance.data = this.card.data;
  }
}

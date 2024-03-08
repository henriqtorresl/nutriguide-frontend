import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

export default interface Tabs {
  name: string;
  key: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() tabs!: Tabs[];
  @Output() onTabChange = new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  abrirTab(key: string): void {
    this.tabs.forEach((t) => {
      t.isActive = key === t.key;
    });

    this.onTabChange.emit(key);
  }

}
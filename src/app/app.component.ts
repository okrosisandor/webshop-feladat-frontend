import { Component, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnChanges {
  url = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.url = window.location.href;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.url = window.location.href
  }
}

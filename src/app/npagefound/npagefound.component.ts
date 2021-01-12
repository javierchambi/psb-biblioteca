import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-npagefound',
  templateUrl: './npagefound.component.html',
  styleUrls: ['././npagefound.component.css'
  ]
})
export class NpagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Year = new Date().getFullYear;

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-spot-modal',
  templateUrl: './spot-modal.component.html',
  styleUrls: ['./spot-modal.component.scss']
})
export class SpotModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log('Desde Modal: ', this.data.title);
  }

}

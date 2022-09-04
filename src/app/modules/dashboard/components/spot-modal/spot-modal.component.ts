import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilePond, FilePondOptions } from 'filepond';

@Component({
  selector: 'app-spot-modal',
  templateUrl: './spot-modal.component.html',
  styleUrls: ['./spot-modal.component.scss']
})
export class SpotModalComponent implements OnInit {
  @ViewChild('myPond')
  myPond!: FilePond;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrástra o selecciona las imágenes...',
    // acceptedFileTypes: ['image/jpeg, image/png', 'image/jpg'],
    allowReorder:true,
    maxFiles:5,
  }

  ngOnInit(): void {
    
  }

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  pondHandleRemoveFile(event: any) {
    console.log('A file was removed', event);
  }

  pondHandleActivateFile(event: any) {
    console.log('A file was activated', event)
  }

  uploadFiles(){
    console.log(this.myPond.getFiles());
  }

  prueba() {
    console.log('upload files: ');    
    this.uploadFiles();
  }

}

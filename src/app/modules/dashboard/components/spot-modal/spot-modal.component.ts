import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilePond, FilePondOptions } from 'filepond';

@Component({
  selector: 'app-spot-modal',
  templateUrl: './spot-modal.component.html',
  styleUrls: ['./spot-modal.component.scss']
})
export class SpotModalComponent implements OnInit {
  @ViewChild('myPond') myPond!: FilePond;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrastrá o selecciona las imágenes...',
    // acceptedFileTypes: ['image/jpeg, image/png', 'image/jpg'],
    allowReorder:true,
    maxFiles:5,
  }

  spotForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
    name_es: new FormControl('', [Validators.required]),
    name_en: new FormControl('', [Validators.required]),
    description_es: new FormControl('', [Validators.required]),
    description_en: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    latitude: new FormControl('-46.435352'),
    longitude: new FormControl('-67.521189'),
    phones: new FormControl('')
  });

  ngOnInit(): void {
    
  }

  get isInvalid() {
    return this.spotForm.invalid;
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

  save() {
    if(this.spotForm.valid) {
      const form = this.spotForm.value;
      form.files = this.myPond.getFiles().map(elem => elem.file);
      console.log('form: ', form);
    }
  }

}

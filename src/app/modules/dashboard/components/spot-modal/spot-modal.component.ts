import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilePond, FilePondOptions } from 'filepond';
import { Category } from 'src/app/models/category.interface';
import { SpotService } from 'src/app/modules/shared/services/spot.service';

@Component({
  selector: 'app-spot-modal',
  templateUrl: './spot-modal.component.html',
  styleUrls: ['./spot-modal.component.scss'],
})
export class SpotModalComponent implements OnInit {
  @ViewChild('myPond') myPond!: FilePond;
  categories: Category[] = [];
  options: google.maps.MapOptions = {
    center: { lat: -46.441774, lng: -67.517348 },
    zoom: 14,
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spotService: SpotService,
    public dialogRef: MatDialogRef<SpotModalComponent>
  ) {}

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrastrá o selecciona las imágenes...',
    // acceptedFileTypes: ['image/jpeg, image/png', 'image/jpg'],
    allowReorder: true,
    maxFiles: 5,
  };

  spotForm = new FormGroup({
    category_id: new FormControl('', [Validators.required]),
    name_es: new FormControl('', [Validators.required]),
    name_en: new FormControl('', [Validators.required]),
    description_es: new FormControl('', [Validators.required]),
    description_en: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required]),
    phones: new FormControl(''),
  });

  ngOnInit(): void {
    this.spotService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
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
    console.log('A file was activated', event);
  }

  uploadFiles() {
    console.log(this.myPond.getFiles());
  }

  save() {
    if (this.spotForm.valid) {
      const form = this.spotForm.value;
      form.images = this.slugify(this.spotForm.controls['name_es'].value);
      const formData = new FormData();
      for (const key of Object.keys(form)) {
        const value = form[key];
        formData.append(key, value);
      }
      // Images
      const files = this.myPond.getFiles().map((elem) => elem.file);
      for (const image of files) {
        formData.append('files[]', image);
      }
      this.spotService.spotCreate(formData).subscribe(({ status }: any) => {
        if (status === 201) {
          this.dialogRef.close(true);
        }
      });
    }
  }

  clickOnMap(event: google.maps.MapMouseEvent) {
    this.spotForm.controls['latitude'].setValue(event.latLng?.lat());
    this.spotForm.controls['longitude'].setValue(event.latLng?.lng());
    this.markerPositions = [];
    this.addMaker(event);
  }

  addMaker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng?.toJSON()!);
  }

  private slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
}

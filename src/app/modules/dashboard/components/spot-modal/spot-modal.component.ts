import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatePhone } from '../../../shared/validators/phone.validator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilePond, FilePondOptions } from 'filepond';
import { Category } from 'src/app/models/category.interface';
import { SpotService } from 'src/app/modules/shared/services/spot.service';
import { environment } from 'src/environments/environment';

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
  selected: number | null = null;
  pondFiles: FilePondOptions['files'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spotService: SpotService,
    public dialogRef: MatDialogRef<SpotModalComponent>
  ) {}

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrastrá o selecciona las imágenes...',
    acceptedFileTypes: ['image/*'],
    allowReorder: true,
    maxFiles: 5,
  };

  spotForm = new FormGroup({
    category_id: new FormControl('', [Validators.required]),
    name_es: new FormControl(this.data.spot ? this.data.spot.name_es : '', [
      Validators.required,
    ]),
    name_en: new FormControl(this.data.spot ? this.data.spot.name_en : '', [
      Validators.required,
    ]),
    description_es: new FormControl(
      this.data.spot ? this.data.spot.description_es : '',
      [Validators.required]
    ),
    description_en: new FormControl(
      this.data.spot ? this.data.spot.description_en : '',
      [Validators.required]
    ),
    address: new FormControl(this.data.spot ? this.data.spot.address : '', [
      Validators.required,
    ]),
    latitude: new FormControl(this.data.spot ? this.data.spot.latitude : '', [
      Validators.required,
    ]),
    longitude: new FormControl(this.data.spot ? this.data.spot.longitude : '', [
      Validators.required,
    ]),
    phones: new FormControl(
      this.data.spot && this.data.spot.phones.length > 0
        ? this.data.spot.phones.map((phone: any) => phone.number).join(',')
        : '', [
          Validators.required, ValidatePhone()
        ]
    ),
  });

  ngOnInit(): void {
    this.spotService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      if (this.data.spot) {
        this.selected = this.data.spot.category.id;
      }
    });
    if (this.data.spot) {
      this.addMaker({
        lat: Number(this.data.spot.latitude),
        lng: Number(this.data.spot.longitude),
      });
      this.pondFiles = this.data.spot.images.map((image: any) => {
        return {
          source: environment.server + '/' + image,
        };
      });
    }
  }

  get isInvalid() {
    return this.spotForm.invalid;
  }

  save() {
    if (this.spotForm.valid) {
      const formData = this.generateFormData();
      this.data.spot ? this.modify(formData) : this.create(formData);
    }
  }

  private generateFormData() {
    const form = this.spotForm.value;
    form.images = this.slugify(this.spotForm.controls['name_es'].value);
    form.phones = form.phones.trim().split(",").filter((filter: string) => filter).join(",");
    const formData = new FormData();
    for (const key of Object.keys(form)) {
      const value = form[key];
      formData.append(key, value);
    }
    const files = this.myPond.getFiles().map((elem) => elem.file);
    for (const image of files) {
      formData.append('files[]', image);
    }
    return formData;
  }

  private create(data: FormData) {
    this.spotService.spotCreate(data).subscribe(({ status }: any) => {
      if (status === 201) {
        this.dialogRef.close(true);
      }
    });
  }

  private modify(data: FormData) {
    this.spotService
      .spotModify(this.data.spot.id, data)
      .subscribe(({ status }: any) => {
        if (status === 201) {
          this.dialogRef.close(true);
        }
      });
  }

  clickOnMap(event: google.maps.MapMouseEvent) {
    this.spotForm.controls['latitude'].setValue(event.latLng?.lat());
    this.spotForm.controls['longitude'].setValue(event.latLng?.lng());
    this.markerPositions = [];
    this.addMaker({ lat: event.latLng?.lat()!, lng: event.latLng?.lng()! });
  }

  addMaker(coords: { lat: number; lng: number }) {
    this.markerPositions.push(coords);
  }

  private slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
}

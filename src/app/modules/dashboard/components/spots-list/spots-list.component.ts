import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Spot } from 'src/app/models/spot.interface';
import { SpotService } from 'src/app/modules/shared/services/spot.service';

@Component({
  selector: 'app-spots-list',
  templateUrl: './spots-list.component.html',
  styleUrls: ['./spots-list.component.scss'],
})
export class SpotsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'address', 'operations'];
  dataSource = new MatTableDataSource<Spot>();

  constructor(private spotService: SpotService) {}

  ngOnInit(): void {
    this.spotService.getSpots().subscribe((spots: Spot[]) => {
      this.dataSource = new MatTableDataSource(spots);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data, filter: string) => {
      return (
        data.name.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
        data.category.name
          .trim()
          .toLowerCase()
          .includes(filter.trim().toLowerCase()) ||
        data.address.trim().toLowerCase().includes(filter.trim().toLowerCase())
      );
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

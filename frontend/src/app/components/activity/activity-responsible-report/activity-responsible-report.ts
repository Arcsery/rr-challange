import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ActivityService} from '../activity-service';
import {ActivityResponsibleReportDto} from '../dto/ActivityResponsibleReportDto';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {
  MatCell,
  MatCellDef, MatColumnDef, MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-activity-responsible-report',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatTable,
    MatNoDataRow,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatPaginator
  ],
  templateUrl: './activity-responsible-report.html',
  styleUrl: './activity-responsible-report.scss',
})
export class ActivityResponsibleReport implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  activityService = inject(ActivityService);

  displayedColumns: string[] = ['responsibleName', 'totalMinutes', 'uniquePartners'];
  dataSource: MatTableDataSource<ActivityResponsibleReportDto> = new MatTableDataSource();

  ngOnInit(): void {
    this.activityService.getResponsibleActivityReport().subscribe({
      next: (result: ActivityResponsibleReportDto[]) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

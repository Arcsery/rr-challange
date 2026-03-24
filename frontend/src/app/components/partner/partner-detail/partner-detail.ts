import {AfterViewInit, Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PartnerService} from '../partner-service';
import {PartnerDetailDto} from '../dto/PartnerDetailDto';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {ActivityResponseDto} from '../../activity/dto/ActivityResponseDto';
import {MatPaginator} from '@angular/material/paginator';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {Sidenav} from '../../../shared/sidenav/sidenav';
import {PartnerStatus} from '../../enums/PartnerStatus';
import {MatTooltip} from '@angular/material/tooltip';
import {ActivityDialog} from '../../activity/activity-dialog/activity-dialog';
import {ActivityService} from '../../activity/activity-service';
import {SnackbarMessageService} from '../../../shared/snackbar-message/snackbar-message-service';

@Component({
  selector: 'app-partner-detail',
  imports: [
    MatFormField,
    MatLabel,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    MatHeaderRow,
    MatRow,
    MatInput,
    MatPaginator,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatButton,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './partner-detail.html',
  styleUrl: './partner-detail.scss',
})
export class PartnerDetail implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('activityActions', { static: true })
  activityActions!: TemplateRef<unknown>;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly sidenav = inject(Sidenav);
  private readonly partnerService = inject(PartnerService);
  private readonly activityService = inject(ActivityService);
  private readonly snackbarService = inject(SnackbarMessageService);

  partnerId!: number;
  partner: PartnerDetailDto | null = null;

  displayedColumns = ['id', 'subject', 'type', 'description', 'durationMinutes', 'responsibleName', 'partnerId', 'partnerName', 'actions'];
  dataSource: MatTableDataSource<ActivityResponseDto> = new MatTableDataSource();

  ngOnInit(): void {

    this.sidenav.setContextualActions(this.activityActions);

    const id = this.route.snapshot.params['id'];

    if (id === undefined) {
      this.router.navigate(['/']).then();
      return;
    }
    this.partnerId = Number(id);
    this.loadPartner()
  }

  loadPartner(): void {
    this.partnerService.getDetailsById(this.partnerId).subscribe({
      next: (partner) => {
        this.partner = partner;
        this.dataSource = new MatTableDataSource(partner.activities);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error(error);
        this.snackbarService.showError(error.message);
      }
    });
  }

  createActivity(): void {
    const dialogRef = this.dialog.open(ActivityDialog, {
      width: '600px',
      disableClose: true,
      data: {
        partnerId: this.partnerId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPartner();
      }
    });
  }

  updateActivity(activity: ActivityResponseDto): void {
    const dialogRef = this.dialog.open(ActivityDialog, {
      width: '600px',
      disableClose: true,
      data: {
        partnerId: this.partnerId,
        activity
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPartner();
      }
    });
  }

  deleteActivity(activity: ActivityResponseDto): void {
      this.activityService.delete(activity.id).subscribe({
        next: () => {
          this.loadPartner();
        },
        error: (error) => {
          console.error(error);
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

  ngOnDestroy(): void {
    this.sidenav.clearContextualActions();
  }

  protected readonly PartnerStatus = PartnerStatus;
}

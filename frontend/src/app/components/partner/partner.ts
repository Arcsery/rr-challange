import {AfterViewInit, Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {Sidenav} from '../../shared/sidenav/sidenav';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

import {PartnerService} from './partner-service';
import {QualificationType} from '../enums/QualificationType';
import {PartnerResponseDto} from './dto/PartnerResponseDto';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {PartnerStatus} from '../enums/PartnerStatus';
import {PartnerRequestDto} from './dto/PartnerRequestDto';

import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatSort} from '@angular/material/sort';

import {ConfirmDialog} from '../../shared/confirm-dialog/confirm-dialog';
import {Router} from '@angular/router';
import {ApiErrorResponse} from '../../expection/dto/ApiErrorResponse';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConflictSnackbarComponent} from '../../expection/conflict-snackbar.component.ts/conflict-snackbar.component';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSidenav} from '@angular/material/sidenav';
import {SnackbarMessageService} from '../../shared/snackbar-message/snackbar-message-service';

@Component({
  selector: 'app-partner',
  imports: [
    MatButton,
    MatFormFieldModule,
    MatTable,
    MatInput,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatNoDataRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatPaginator,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    FormsModule,
    MatIcon,
    MatTooltip,
    MatSort
  ],
  templateUrl: './partner.html',
  styleUrl: './partner.scss'
})
export class Partner implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('partnerActions', {static: true})
  partnerActions!: TemplateRef<unknown>;

  @ViewChild('createPartnerDialog', {static: true})
  createPartnerDialog!: TemplateRef<unknown>;

  displayedColumns: string[] = [
    'id',
    'name',
    'taxNumber',
    'headquarters',
    'status',
    'qualifications',
    'actions'
  ];
  dataSource: MatTableDataSource<PartnerResponseDto> = new MatTableDataSource<PartnerResponseDto>([]);

  isSaving: boolean = false;
  isEdit: boolean = false;
  editingPartnerId: number | null = null;

  readonly qualificationOptions:  QualificationType[] = Object.values(QualificationType);
  readonly partnerStatusOptions: PartnerStatus[] = Object.values(PartnerStatus);
  selectedQualifications: QualificationType[] = [];

  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly snackbarService = inject(SnackbarMessageService);
  readonly sidenav: Sidenav = inject(Sidenav);
  readonly partnerService: PartnerService = inject(PartnerService);
  readonly router: Router = inject(Router);

  partnerForm = this.fb.group({
    version: this.fb.control<number | null>(null),
    name: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(150)
    ]),
    taxNumber: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    headquarters: this.fb.nonNullable.control('', [
      Validators.required
    ]),
    status: this.fb.nonNullable.control(
      PartnerStatus.ACTIVE,
      [Validators.required]
    ),
    qualifications: this.fb.nonNullable.control<QualificationType[]>([])
  });

  ngOnInit(): void {
    this.sidenav.setContextualActions(this.partnerActions);
    this.loadPartners();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;

    this.sort.active = 'id';
    this.sort.direction = 'asc';
    this.sort.sortChange.emit();
  }

  ngOnDestroy(): void {
    this.sidenav.clearContextualActions();
  }

  loadPartners(): void {
    const qualificationsToSend: QualificationType[] | undefined =
      this.selectedQualifications.length > 0
        ? this.selectedQualifications
        : undefined;

    this.partnerService.getAll(qualificationsToSend).subscribe({
      next: (partners:  PartnerResponseDto[]) => {
        this.dataSource.data = partners;
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.showError(error);
      }
    });
  }

  onQualificationChange(): void {
    this.loadPartners();
  }

  clearQualificationFilter(): void {
    this.selectedQualifications = [];
    this.loadPartners();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {

    this.isEdit = false;
    this.editingPartnerId = null;

    this.partnerForm.reset({
      version: null,
      name: '',
      taxNumber: '',
      headquarters: '',
      status: PartnerStatus.ACTIVE,
      qualifications: []
    });

    this.dialog.open(this.createPartnerDialog, {
      disableClose: true,
      width: '560px'
    });
  }

  savePartner(dialogRef: MatDialogRef<unknown>): void {
    if (this.partnerForm.invalid) {
      this.partnerForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const request: PartnerRequestDto = {
      version: this.partnerForm.controls.version.value,
      name: this.partnerForm.controls.name.value.trim(),
      taxNumber: this.partnerForm.controls.taxNumber.value.trim(),
      headquarters: this.partnerForm.controls.headquarters.value.trim(),
      status: this.partnerForm.controls.status.value,
      qualifications:
      this.partnerForm.controls.qualifications.value
    };

    const request$ =
      this.isEdit && this.editingPartnerId != null
        ? this.partnerService.update(
          this.editingPartnerId,
          request
        )
        : this.partnerService.create(request);

    request$.subscribe({
      next: () => {
        const message = this.isEdit ? "Sikeres Partner módosítás" : "Sikeres Partner hozzáadás"
        this.snackbarService.showSuccess(message);
        this.isEdit = false;
        this.editingPartnerId = null;
        this.isSaving = false;
        dialogRef.close();
        this.loadPartners();
      },
      error: (error: HttpErrorResponse) => {
        const apiError = error.error as ApiErrorResponse;
        if (apiError.status === 409) {
          this.snackbarService.showError(
            error,
            () => this.loadPartners()
          );
          this.isSaving = false;
          this.dialog.closeAll()
        } else {
          this.snackbarService.showError(error);
        }
        this.isSaving = false;
        this.isEdit = false;
        this.editingPartnerId = null;
      }
    });
  }

  updatePartner(partner: PartnerResponseDto): void {

    this.isEdit = true;
    this.editingPartnerId = partner.id;

    this.partnerForm.reset({
      version: partner.version,
      name: partner.name,
      taxNumber: partner.taxNumber,
      headquarters: partner.headquarters,
      status: partner.status,
      qualifications:
        partner.qualifications ?? []
    });

    this.dialog.open(this.createPartnerDialog, {
      disableClose: true,
      width: '560px'
    });
  }

  deletePartner(partner: PartnerResponseDto): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Partner törlése',
        message:
          'Biztosan törölni szeretnéd ezt a partnert?',
        partnerName: partner.name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.partnerService.delete(partner.id).subscribe({
        next: () => {
          this.snackbarService.showSuccess("Sikeres partner törlés!")
          this.loadPartners()
        },
        error: error => {
          console.error(error)
          this.snackbarService.showError(error)
        }
      });
    });
  }

  goToDetails(partnerId: number): void {
    this.router.navigate(
      ['/partners', partnerId]
    );
  }

  get nameCtrl() {
    return this.partnerForm.controls.name;
  }

  get taxNumberCtrl() {
    return this.partnerForm.controls.taxNumber;
  }

  get headquartersCtrl() {
    return this.partnerForm.controls.headquarters;
  }

  get statusCtrl() {
    return this.partnerForm.controls.status;
  }
}

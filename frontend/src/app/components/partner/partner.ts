import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Sidenav } from '../../shared/sidenav/sidenav';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatNoDataRow,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material/dialog';
import { PartnerService } from './partner-service';
import { QualificationType } from '../enums/QualificationType';
import { PartnerResponseDto } from './dto/PartnerResponseDto';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import {ReactiveFormsModule, FormBuilder, Validators, FormsModule} from '@angular/forms';
import { PartnerStatus } from '../enums/PartnerStatus';
import { PartnerRequestDto } from './dto/PartnerRequestDto';

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
    FormsModule
  ],
  templateUrl: './partner.html',
  styleUrl: './partner.scss',
})
export class Partner implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('partnerActions', { static: true })
  partnerActions!: TemplateRef<unknown>;

  @ViewChild('createPartnerDialog', { static: true })
  createPartnerDialog!: TemplateRef<unknown>;

  private readonly dialog = inject(MatDialog);
  private readonly fb = inject(FormBuilder);

  displayedColumns: string[] = ['id', 'name', 'taxNumber', 'headquarters', 'status', 'qualifications'];
  dataSource = new MatTableDataSource<PartnerResponseDto>([]);

  isLoading = false;
  isSaving = false;

  readonly qualificationOptions = Object.values(QualificationType);
  readonly partnerStatusOptions = Object.values(PartnerStatus);

  selectedQualifications: QualificationType[] = [];

  partnerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(150)]],
    taxNumber: ['', [Validators.required, Validators.maxLength(50)]],
    headquarters: ['', [Validators.required]],
    status: [PartnerStatus.ACTIVE, [Validators.required]],
    qualifications: [[] as QualificationType[]]
  });

  constructor(
    private readonly sidenav: Sidenav,
    private readonly partnerService: PartnerService,
  ) {}

  ngOnInit(): void {
    this.sidenav.setContextualActions(this.partnerActions);
    this.loadPartners();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.sidenav.clearContextualActions();
  }

  loadPartners(): void {
    this.isLoading = true;

    const qualificationsToSend =
      this.selectedQualifications.length > 0 ? this.selectedQualifications : undefined;

    this.partnerService.getAll(qualificationsToSend).subscribe({
      next: (partners) => {
        this.dataSource.data = partners;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
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
    this.partnerForm.reset({
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
      name: this.partnerForm.controls.name.getRawValue().trim(),
      taxNumber: this.partnerForm.controls.taxNumber.getRawValue().trim(),
      headquarters: this.partnerForm.controls.headquarters.getRawValue().trim(),
      status: this.partnerForm.controls.status.getRawValue(),
      qualifications: this.partnerForm.controls.qualifications.getRawValue()
    };

    this.partnerService.create(request).subscribe({
      next: () => {
        this.isSaving = false;
        dialogRef.close();
        this.loadPartners();
      },
      error: (error) => {
        console.error(error);
        this.isSaving = false;
      }
    });
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

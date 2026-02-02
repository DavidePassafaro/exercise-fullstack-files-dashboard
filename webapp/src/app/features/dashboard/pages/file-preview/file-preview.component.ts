import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../../../core/services/file.service';
import { FileDetailsComponent } from '../../components/file-details/file-details.component';
import { DataLayoutComponent } from '../../components/data-layout/data-layout.component';
import { DataTypeSelectorComponent } from '../../components/data-type-selector/data-type-selector.component';
import { UploadedFileColumn } from '../../../../shared/models/uploaded-file';
import { CleanDatePipe } from '../../pipes/clean-date.pipe';
import { CleanNumberPipe } from '../../pipes/clean-number.pipe';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';

@Component({
  selector: 'csv-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FileDetailsComponent,
    DataLayoutComponent,
    DataTypeSelectorComponent,
    CleanDatePipe,
    CleanNumberPipe,
    PrimaryButtonComponent,
  ],
})
export class FilePreviewComponent {
  private route = inject(ActivatedRoute);
  private fileService = inject(FileService);

  file = computed(() =>
    this.fileService
      .filesList()
      .find((file) => file._id === this.route.snapshot.paramMap.get('id')),
  );

  private originalColumnConfigs: UploadedFileColumn[] = [];
  protected columnConfigs = linkedSignal(() => {
    const config = this.file()?.columnConfigs || [];
    this.originalColumnConfigs = [...config.map((c) => ({ ...c }))];
    return config;
  });

  protected isSaving = signal(false);
  protected hasChanges = signal(false);

  loadMore(): void {
    alert('Feature not implemented');
  }

  onDataTypeChange(event: string, column: UploadedFileColumn): void {
    if (event === column.dataType) {
      return;
    }

    this.hasChanges.set(true);
    this.columnConfigs.update((columns) => {
      const index = columns.findIndex((c) => c.columnName === column.columnName);
      if (index !== -1) {
        columns[index].dataType = event as 'number' | 'date' | 'text';
      }
      return columns;
    });
  }

  saveColumnConfigsChanges(): void {
    this.isSaving.set(true);

    this.fileService
      .updateFile(this.file()!._id, { columnConfigs: this.columnConfigs() })
      .subscribe({
        next: () => {
          alert('Column configs saved successfully');
        },
        error: (error) => {
          alert('Failed to save column configs');
        },
        complete: () => {
          this.isSaving.set(false);
          this.hasChanges.set(false);
        },
      });
  }

  cancelColumnConfigsChanges(): void {
    this.columnConfigs.set(this.originalColumnConfigs);
    this.hasChanges.set(false);
  }
}

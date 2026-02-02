import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../../../core/services/file.service';
import { FileDetailsComponent } from '../../components/file-details/file-details.component';
import { DataLayoutComponent } from '../../components/data-layout/data-layout.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'csv-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FileDetailsComponent, DataLayoutComponent, TitleCasePipe],
})
export class FilePreviewComponent {
  private route = inject(ActivatedRoute);
  private fileService = inject(FileService);

  file = computed(() =>
    this.fileService
      .filesList()
      .find((file) => file._id === this.route.snapshot.paramMap.get('id')),
  );

  loadMore(): void {
    alert('Feature not implemented');
  }
}

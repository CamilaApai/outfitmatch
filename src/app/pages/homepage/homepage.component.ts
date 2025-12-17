// homepage.component.ts
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { UploadModalComponent } from '../../components/upload-modal/upload-modal.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NgIf, UploadModalComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  showModal = false;

  openUploadWindow() {
    this.showModal = true;
  }

  closeUploadWindow() {
    this.showModal = false;
  }
}

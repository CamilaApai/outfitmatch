import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [NgIf],
  standalone: true,  
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  showUploadPopup = false;

  openUploadWindow() {
    this.showUploadPopup = true;
  }

  closeUploadWindow() {
    this.showUploadPopup = false;
  }
}
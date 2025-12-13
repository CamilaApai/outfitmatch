// src/app/components/footer/footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

// FooterComponent displays the footer section of the application
export class FooterComponent {
  // currentYear holds the current year for display in the footer
  currentYear: number = new Date().getFullYear();
}
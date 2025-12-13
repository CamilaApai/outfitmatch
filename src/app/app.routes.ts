import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ClosetComponent } from './pages/closet/closet.component';
import { BuildOutfitComponent } from './pages/outfit-builder/outfit-builder.component';
import { AttributionComponent } from './pages/attribution/attribution.component';


export const routes: Routes = [
  { path: '', component: HomepageComponent },       
  { path: 'closet', component: ClosetComponent },
  { path: 'build-outfit', component: BuildOutfitComponent },
  { path: 'attribution', component: AttributionComponent }
];

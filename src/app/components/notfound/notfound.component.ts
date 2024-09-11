import { FooterComponent } from './../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavBlankComponent } from './../nav-blank/nav-blank.component';
import { Component } from '@angular/core';
import { NavAuthComponent } from "../nav-auth/nav-auth.component";
import { LayoutBlankComponent } from "../../layouts/layout-blank/layout-blank.component";

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [NavBlankComponent, RouterOutlet, FooterComponent, NavAuthComponent, LayoutBlankComponent],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {

}

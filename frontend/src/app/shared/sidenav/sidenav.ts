import { Component, TemplateRef, ChangeDetectorRef, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent
} from '@angular/material/sidenav';
import { NgTemplateOutlet } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatButton,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    NgTemplateOutlet,
    MatIcon
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  contextualActions: TemplateRef<unknown> | null = null;

  private cdr = inject(ChangeDetectorRef);

  setContextualActions(template: TemplateRef<unknown> | null): void {
    setTimeout(() => {
      this.contextualActions = template;
      this.cdr.detectChanges();
    }, 0);
  }

  clearContextualActions(): void {
    setTimeout(() => {
      this.contextualActions = null;
      this.cdr.detectChanges();
    }, 0);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Third-party modules.
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { IconsModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { TooltipsModule } from '@progress/kendo-angular-tooltip';
import { MenusModule } from '@progress/kendo-angular-menu';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';

// Providers.
import { NotificationService } from '@progress/kendo-angular-notification';

// Directives.
import { OverlayDirective } from '@shared/directives/overlay/overlay.directive';
import { ComponentDirective } from '@shared/directives/component/component.directive';
import { ImageDirective } from '@shared/directives/image/image.directive';
import { NavbarComponent } from './components/navbar/navbar.component';

/*
Modules, components that are required by all feature modules are imported here.
Avoid using services as they are singletons that are provided once for the entire app.
*/

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    OverlayDirective,
    ComponentDirective,
    ImageDirective,
    NgOptimizedImage,

    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    SlickCarouselModule,
    DialogsModule,
    ButtonsModule,
    NavigationModule,
    LayoutModule,
    LabelModule,
    DropDownsModule,
    IconsModule,
    InputsModule,
    TreeViewModule,
    TooltipsModule,
    MenusModule,
    PopupModule,
    ChatModule,
  ],
  providers: [NotificationService],
  exports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    SlickCarouselModule,
    DialogsModule,
    ButtonsModule,
    NavigationModule,
    LayoutModule,
    LabelModule,
    DropDownsModule,
    IconsModule,
    InputsModule,
    TreeViewModule,
    TooltipsModule,
    MenusModule,
    PopupModule,
    ChatModule,

    // Directives.
    OverlayDirective,
    ComponentDirective,
    ImageDirective,

    // Components.
    NavbarComponent,
  ],
})
export class SharedModule {}

import {NgModule} from "@angular/core";
import {MatButtonModule, MatIconModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
  ],
})
export class SharedModule {
}

import {NgModule} from "@angular/core";
import {MatButtonModule, MatIconModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MomentModule} from "ngx-moment";

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MomentModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MomentModule,
  ],
})
export class SharedModule {
}

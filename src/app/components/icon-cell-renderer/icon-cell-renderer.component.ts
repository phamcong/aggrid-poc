import { Component } from "@angular/core";

import { AgRendererComponent } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  templateUrl: './icon-cell-renderer.component.html'
})
export class IconCellRenderer implements AgRendererComponent {
  params!: any;
  rendererImage!: string;
  value!: any[];
  icon!: string;

  agInit(params: any): void {
    this.params = params;
    this.icon = params.icon;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true
  }

  onClickIcon = () => {
    this.params.onClickIcon()
  }
}
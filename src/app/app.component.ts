import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { portfolioData } from './app.utils';
import { IconCellRenderer } from './components/icon-cell-renderer/icon-cell-renderer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aggrid-poc';
  gridOptions: GridOptions = {}

  ngOnInit() {
    this.gridOptions = {
      columnDefs: [
        {
          field: 'isUnrealized',
          enableRowGroup: true, rowGroup: true, hide: true,
          valueFormatter: (params) => params.value === 'true' ? 'Unrealized companies' : 'Realized companies'
        },
        {
          field: 'company', width: 200, pinned: 'left',
          suppressAutoSize: true,
          suppressSizeToFit: true,
          cellRenderer: 'iconCellRenderer',
          cellRendererParams: {
            icon: 'bi-search',
            onClickIcon: () => alert('Preparing to navigate!')
          }
        },
        {
          field: 'Calculated columns', headerClass: 'bg-orange',
          children: [
            { field: 'exitDate', editable: true },
            {
              field: 'exitDateFn', valueGetter: (params: any) => {
                if (!params.data) return 'n.a'
                return params.data.exitDate > 5 ? params.data.exitDate * 2 : params.data.exitDate * 3
              },
              cellClassRules: {
                'border-danger': (params: any) => params.value === 0
              }
            },
            {
              field: 'exitWay', editable: true,
              cellEditor: 'agRichSelectCellEditor',
              cellEditorParams: {
                values: ['Trade Sale', 'Trade Buy']
              },
              cellClass: 'editable-dropdown-cell'
            },
            {
              field: 'nbOfBlock', editable: true,
              cellClassRules: {
                'border-danger': (params: any) => params.value === 10
              }
            },
            { field: 'calcBasis', editable: true },
            { field: 'calcDate', editable: true },
            { field: 'basisCagr', editable: true },
          ].map(item => ({ ...item, headerClass: 'bg-orange' }))
        },
        {
          field: 'Other columns', headerClass: 'bg-primary',
          children: [
            { field: 'basisAtExit', editable: true },
            { field: 'debtReduction', editable: true },
            { field: 'fullEquityValue', editable: true },
            { field: 'ownerExitPer', editable: true }
          ].map(item => ({ ...item, headerClass: 'bg-primary' }))
        }
      ],
      rowData: Array(100).fill({}).map((_, idx) => ({
        company: `Company ${idx}`,
        isUnrealized: idx % 3 === 0,
        exitDate: 5.0,
        exitWay: 'Trade Sale',
        nbOfBlock: idx % 4 === 0 ? 10 : 2,
        calcBasis: 'ebitdata',
        calcDate: '2021.0',
        basisCagr: null,
        basisAtExit: 120,
        debtReduction: null,
        fullEquityValue: null,
        ownerExitPer: null,
      })),
      groupDefaultExpanded: 1,
      rowSelection: 'multiple',
      enableRangeSelection: true,
      suppressRowClickSelection: true,
      singleClickEdit: true,
      getRowStyle: (params: any) => params.node.group ? { 'color': 'lightskyblue', 'font-weight': 'bold' } : undefined,
      groupUseEntireRow: true,
      defaultColDef: {
        filter: true, sortable: true, resizable: true,
        cellClassRules: {
          'editable-cell': (params: any) => {
            return params.colDef.editable
          }
        },
        valueFormatter: (params: any) => params.value || 'n.a'
      },
      autoGroupColumnDef: {
        width: 250, suppressSizeToFit: true,
        valueFormatter: (params) => params.node?.group ? 'ABC' : params.value
      },
      frameworkComponents: {
        iconCellRenderer: IconCellRenderer
      },
      onFirstDataRendered: (params) => params.api.sizeColumnsToFit()
    }

    const rawData = portfolioData
    console.log(rawData.Portfolio.length)

  }
}

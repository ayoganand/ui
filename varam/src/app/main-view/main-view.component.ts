import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  tableOptions: any;
  isTableLoaded: Boolean = false;
  mode = 'add';
  addData = {
    "id": '',
    "name": '',
    "m1": '',
    'm2': ''
  }
  newData = {
    headerContent: [{
      "label": "Student ID",
      "key": "id"
    }, {
      "label": "Name",
      "key": "name"
    }, {
      "label": "Class",
      "key": "class"
    }, {
      "label": "M1",
      "key": "m1"
    }, {
      "label": "M2",
      "key": "m2"
    }, {
      "label": "Total",
      "key": "total"
    }, {
      "label": "Result",
      "key": "result"
    }],
    bodyContent: [{
      "id": "cse1",
      "name": "anudeep",
      "class": "9",
      "m1": 88,
      "m2": 88
    }]
  }
  constructor() { }

  ngOnInit() {
    this.initializeDatatable();
  }
  initializeDatatable() {
    let allData = JSON.parse(localStorage.getItem('tableData'));
    this.newData['bodyContent'] = allData;
    const refObject = this;
    try {
      this.tableOptions = {
        pageLength: 8,
        columnDefs: [{ orderable: false, targets: -1 }],
        initComplete: () => {
          refObject.isTableLoaded = true;
        }
      };
    } catch (error) {
      console.log(error);
    }
    this.isTableLoaded = true;
  }
  getTotal() {
    return parseInt(this.addData.m1) + parseInt(this.addData.m2);
  }
  getResult() {
    return this.addData['total'] > 35 ? 'Pass' : 'Fail';
  }
  addStudent() {
    let tempObj = this.addData;
    tempObj['total'] = this.addData.m1 + this.addData.m2;
    tempObj['result'] = tempObj['total'] > 35 ? 'pass' : 'fail';
    let allData = JSON.parse(localStorage.getItem('tableData'));
    if (allData) {
      if (this.mode == 'edit') {
        allData.forEach((element,index) => {
          if (element.id == tempObj['id']) {
             allData.splice(index,1);
          }
        });
        allData.push(this.addData);
      } else {
        allData.push(this.addData);
      }
    } else {
      allData = [];
      allData.push(this.addData)
    }
    localStorage.setItem('tableData', JSON.stringify(allData));
    document.getElementById('closeButton').click();
    this.initializeDatatable();
  }
  openPopUp(data) {
    this.mode = 'edit';
    document.getElementById('modalButton').click();
    this.addData = data;
  }
}

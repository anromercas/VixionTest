import { Component } from '@angular/core';
import { FileConvertService } from './services/file-convert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  file: any;
  keysOfCSV: string[] = [];
  keysOfCSVToHtml: string[] = [];
  json: any = {};
  formattedJSON: any = {};

  constructor(public fileConvert: FileConvertService) {}

  async getFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file)
    this.json = JSON.parse(await event.target.files[0].text());

    console.log("json", this.json);
    let index = 0;
    let valueFormatted = {

    }
    Object.entries(this.json)
        .forEach(([key, value]) => {
          index ++;
          console.log(key)
          this.keysOfCSVToHtml.push(key + " --> col " + index)
          this.keysOfCSV.push(key)
          if (value) {
            let choiceItem  = value as Choice;
            let choiceData = choiceItem.data;
            this.formattedJSON = choiceData
            console.log(choiceData)
          }
        })
    
  }

  deleteFiles() {
    this.file = undefined;
    this.json = {}
  }

  export() {
    this.fileConvert.downloadFile(this.formattedJSON, this.file.name, this.keysOfCSV)
  }

}

export interface Choice {
  data: any[]; 
}
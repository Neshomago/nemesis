import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-massivetickets',
  templateUrl: './massivetickets.component.html',
  styleUrls: ['./massivetickets.component.scss']
})
export class MassiveticketsComponent implements OnInit {

  fileToUpload: File | undefined;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    // this.fileToUpload = files.item(0);
}

files:any;
uploadExcel(event: any) {
  const files: FileList = event.target.files;
  this.files = files;
  // console.log('Files: ',files);
  const formdata = new FormData();

  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    console.log('Archivo: ', element);
    formdata.append('files', element);
  }

  this.httpClient
    .post('http://localhost:5000/excel', formdata)
    .subscribe(
      (d) => {
        console.log('post image: ', d);
      },
      (error) => {
        console.error(error);
      }
    );
}

uploadFileToActivity() {
  // this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
  //   // do something, if upload success
  //   }, error => {
  //     console.log(error);
  //   });
}

}

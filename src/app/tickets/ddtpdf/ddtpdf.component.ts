import { Component, ElementRef} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-ddtpdf',
  templateUrl: './ddtpdf.component.html',
  styleUrls: ['./ddtpdf.component.scss']
})
export class DdtpdfComponent {

  theTicketData: any=[];
  unserialTags:any =
  [
    {
    type:'item',
    item:'A',
    item_serial:'aa',
    },
    {
      type:'item',
    item:'A',
    item_serial:'aa',
    },
    {
      type:'item',
      item:'A',
      item_serial:'aa',
      },
      {
        type:'item',
        item:'A',
        item_serial:'aa',
        },
];


  @ViewChild('dataPdf')
  dataPdf!: ElementRef;

  filename= "TcktNm_Tid";
  constructor() { }

  ddtDownload(): void{
    let DATA = document.getElementById('dataPdf') as HTMLSourceElement;
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('DDT_Download'+ this.filename +'.pdf');
    });     
  }

}

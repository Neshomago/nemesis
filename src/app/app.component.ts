import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'nemesis-app';

  constructor(private translate: TranslateService, private titleService: Title) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.translate.addLangs(['en', 'it']);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.get('app.title').subscribe((res: string) => {
        this.titleService.setTitle(res);
      });
    });
  }

  // Se cambia el idioma a Italiano
  changeLanguageToSpanish(): void {
    this.translate.use('it');
    console.log('Idioma cambiado al Italiano');
  }
  
  // Se cambia el idioma a Inglés
  changeLanguageToEnglish(): void {
    this.translate.use('en');
    console.log('Idioma cambiado al Inglés');
  }

  showAlert() {
    const msg = this.translate.instant('Error');
    alert(msg);
  }
    
}

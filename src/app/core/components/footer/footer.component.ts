import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="mt-4 p-5 bg-success text-white rounded">
    <h3>Contact information:</h3>
    <p>phone-number: ###########</p>
    <p>email-address: ############@gmail.com</p>
  </div>
  `,
  styles: [
  ]
})
export class FooterComponent {

}

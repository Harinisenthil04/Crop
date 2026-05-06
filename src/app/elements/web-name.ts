import { Component } from '@angular/core';

@Component({
  selector: 'website-name',
  template: `
    <style>
      .web-name {
        display: inline-block;
        font-size: inherit;
        color: #dadada;
        font-weight: bolder;
        text-shadow: -1px 2px 3px rgba(0, 0, 0, 0.3);
      }
      .web-name-span {
        color: #4cff4c;
      }
    </style>
    <h2 class="web-name"><span class="web-name-span">Agri</span>Chain</h2>
`
})
export class WebNameElement {
  title = 'AgriChain';
}
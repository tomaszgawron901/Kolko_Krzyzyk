import {Controller} from './controller';
import {BoardComponent} from './BoardComponent';

customElements.define('board-component', BoardComponent);
let con = new Controller(document.body);
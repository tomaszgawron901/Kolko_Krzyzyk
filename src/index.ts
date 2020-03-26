import {Controller} from './controller';
import {BoardComponent} from './BoardComponent';
import './style.scss';

customElements.define('board-component', BoardComponent);
new Controller(document.body);
import './main.scss';
import "babel-polyfill";
import { h2 } from './js/hello-world';

document.body.prepend(h2);

if (process.env.NODE_ENV !== "production") {
  if (module.hot) {
    module.hot.accept('./js/hello-world', () => {
      document.body.replaceChild(h2, document.body.firstChild);
    });
  }
}

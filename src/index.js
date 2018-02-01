import './main.scss';
import "babel-polyfill";
import message, { h2 } from './js/hello-world.js';

document.body.prepend(h2);

if (process.env.NODE_ENV !== "production") {
	if (module.hot) {
		module.hot.accept('./js/hello-world.js', () => {
			document.body.replaceChild(h2, document.body.firstChild);
		});
	}
}

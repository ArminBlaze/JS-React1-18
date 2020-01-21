import createHistory from 'history/createBrowserHistory';
	
const history = createHistory(); //тут мы создали синглтон.

window.routerHistory = history; //для отладки

export default history;
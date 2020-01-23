import { createBrowserHistory } from 'history'
const history = createBrowserHistory() //тут мы создали синглтон.
	
window.routerHistory = history; //для отладки

export default history;
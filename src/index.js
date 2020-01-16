import dva from 'dva';
import browserHistory from './history';
import { stringify, parse } from 'qs';
import { getMountNode } from '@ice/stark-app'
import './base/styles/base.scss';

const mountNode = getMountNode(document.getElementById('bodycontext'))

const app = dva({
	history: browserHistory,
  stringify,
  parse,
  onError(e) {
    console.log('error---', e);
  },
});

//app.use();

//2.Model
require('./models').default.forEach(key => {
	app.model(key.default);
});

//3.Router
app.router(require('./router').default);

//4.Start
app.start(mountNode);

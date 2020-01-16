import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux, Route, Switch } from 'dva/router';
import { Spin, ConfigProvider } from 'antd';
import AppContent from './AppContent';
import zhCN from 'antd/es/locale/zh_CN';

export default function Router({ history }) {
  const { ConnectedRouter } = routerRedux;
  return (
    <ConfigProvider locale={zhCN}>
      <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={AppContent} />
          </Switch>
      </ConnectedRouter>
    </ConfigProvider>
  );
}

Router.propTypes = {
  history: PropTypes.object
};

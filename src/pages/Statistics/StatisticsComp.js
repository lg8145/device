import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Tag } from 'antd';
import Components from '../../base/components';
import { ReqApi, Urls, UserInfo } from '../../base/common';

const { SearchMore, FooterPagination, DeleteModal } = Components;

@connect(state => ({ workManagementModel: state.workManagementModel }))
class StatisticsComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="baseListStyle">
        <div className="topCon">
          <span className="currentTitle">统计报表</span>
        </div>
      </div>
    )
  }
}

export default StatisticsComp;

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Badge } from 'antd';
import Components from '../../../base/components'
import { IconFont } from '../../../base/components/IconFont';
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import './index.scss'
const { SearchMore, FooterPagination, DeleteModal } = Components;

@connect(state => ({ equipmentOverviewModel: state.equipmentOverviewModel, statisticsWaringModel: state.statisticsWaringModel }))
class WaringTOP extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.tableColumns = [
      {
        title: '产线',
        dataIndex: 'productionLineName',
        key: 'productionLineName',
      },
      {
        title: '设备编号',
        dataIndex: 'deviceCode',
        key: 'deviceCode'
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName'
      },
      {
        title: '预警次数',
        dataIndex: 'warningCount',
        key: 'warningCount'
      }
    ];
  }
  componentDidMount() {
    this.props.dispatch({ type: 'statisticsWaringModel/getWaringDeviceList' })//预警设备排名
  }

  componentWillUnmount() {
  }
  tabChangeClick = item => {
    this.props.dispatch({ type: 'statisticsWaringModel/settabActiveKey', payload: item.key })
    this.props.dispatch({ type: 'statisticsWaringModel/getWaringDeviceList', payload: { page: 1, pageSize: 5 } })//预警设备排名
  }
  render() {
    const { waringTOPTabActiveKey } = this.props.equipmentOverviewModel;
    const { waringDeviceList, tabActiveKey } = this.props.statisticsWaringModel;
    const tabList = [
      { key: 0, label: '预警当日排名' },
      { key: 1, label: '预警本周排名' },
      { key: 2, label: '预警月度排名' },
    ];
    return (
      <div className="WaringTOP baseListStyle">
        <div className="headerTab">
          {
            tabList.map(item => {
              return <div
                key={item.key}
                className={'tab'}
                onClick={() => this.tabChangeClick(item)}
              >
                <span
                  className={item.key === tabActiveKey ? 'tab active' : 'tab'}
                >{item.label}</span>
              </div>
            })
          }
        </div>
        <Table
          rowKey={'deviceCode'}
          loading={this.tableLoading}
          columns={this.tableColumns}
          pagination={false}
          dataSource={waringDeviceList.list || []}
          width={'100%'}
        />
      </div>
    )
  }
}

export default WaringTOP;

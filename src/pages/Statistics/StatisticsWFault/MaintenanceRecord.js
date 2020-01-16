import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Divider, DatePicker } from 'antd';
import Components from '../../../base/components'
import { IconFont } from '../../../base/components/IconFont';
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import './index.scss'
const { RangePicker } = DatePicker;
@connect(state => ({ maintenanceWorkModel: state.maintenanceWorkModel }))
class MaintenanceRecord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }

  }
  componentDidMount() {
    this.props.dispatch({ type: 'maintenanceWorkModel/getTableList' })
  }

  componentWillUnmount() {
  }
  // onMaintenanceRecord = () => {
  //   this.props.dispatch({ type: 'global/addTabs', path: 'maintenanceWork' })
  // }
  onChange = (date, dateString) => {
    this.props.dispatch({ type: 'maintenanceWorkModel/getTableList', payload: { startDate: dateString[0], endDate: dateString[1], page: 1, pageSize: 5 } })
  }
  render() {
    const { listData } = this.props.maintenanceWorkModel;
    const tableColumns = [
      {
        key: 1,
        title: '发生时间',
        dataIndex: 'applyRepairDate'
      },
      {
        key: 2,
        title: '产线',
        dataIndex: 'productionLineName',
      },
      {
        key: 3,
        title: '设备编号',
        dataIndex: 'deviceCode',
      },
      {
        key: 4,
        title: '设备名称',
        dataIndex: 'deviceName',
      },
      {
        key: 6,
        title: '故障类别',
        dataIndex: 'repairModeName',
      },
      {
        key: 8,
        title: '故障描述',
        dataIndex: 'faultDescribe',
        render: text => <span title={text}>{text && text.length > 12 ? text.substring(0, 12) + '...' : text ? text : '--'}</span>
      }
    ];
    return (
      <div className="MaintenanceRecord baseListStyle">
        <div className="headerTab titlerecord">故障记录表
        <div className="more">
            <RangePicker onChange={this.onChange} />
          </div>
        </div>
        <Divider type="horizontal" />
        <Table
          rowKey={'code'}
          loading={this.tableLoading}
          columns={tableColumns}
          pagination={false}
          dataSource={listData.list || []}
          width={'100%'}
        />
      </div>
    )
  }
}

export default MaintenanceRecord;

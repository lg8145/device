import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Divider, Menu, Modal, Upload, Row, Col, Badge } from 'antd';
import Components from '../../../base/components'
import { IconFont } from '../../../base/components/IconFont';
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import './index.scss'
const { SearchMore, FooterPagination, DeleteModal } = Components;

@connect(state => ({ maintenanceWorkModel: state.maintenanceWorkModel }))
class MaintenanceRecord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }

  }
  componentDidMount() {
    this.props.dispatch({ type: 'maintenanceWorkModel/getTablePage5List', payload: { page: 1, pageSize: 5 } })
  }

  componentWillUnmount() {
  }
  onMaintenanceRecord = () => {
    this.props.dispatch({ type: 'global/addTabs', path: 'maintenanceWork' })
  }
  render() {
    const { tablePage5List } = this.props.maintenanceWorkModel;
    const colors = {
      '0': '#05A9F4',//申请维修
      '1': '#23BC08',//已维修
      '2': '#F49505',//维修中
      '3': '#E52C00',//无法修复
    }
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
        render: (text, record) => <span>{text ? text : '--'}</span>
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
        title: '维修项目',
        dataIndex: 'repairItem',
        render: (text, record) => <span>{text ? text : '--'}</span>
      },
      {
        key: 8,
        title: '状态',
        dataIndex: 'repairStatusName',
        render: (text, record) => <span style={{ color: colors[record.repairStatus] }}>{text}</span>
      }
    ];
    return (
      <div className="MaintenanceRecord baseListStyle">
        <div className="headerTab">维修记录
        {
            tablePage5List && tablePage5List.total > 5 && <div className="more" onClick={() => this.onMaintenanceRecord()}>查看更多</div>
          }

        </div>
        {/* <Divider type="horizontal" /> */}
        <Table
          rowKey={'code'}
          loading={this.tableLoading}
          columns={tableColumns}
          pagination={false}
          className="tableCss"
          dataSource={tablePage5List.list || []}
          width={'100%'}
        />
      </div>
    )
  }
}

export default MaintenanceRecord;

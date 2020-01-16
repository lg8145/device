import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Tag } from 'antd';
import Components from '../../../base/components'
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import CheckDeviceModal from './AddMaintainRecord/CheckDeviceModal'
const { SearchMore, FooterPagination, DeleteModal } = Components;

@connect(state => ({ maintainRecordModel: state.maintainRecordModel }))
class MaintainRecordComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkDeviceBisible: false,
    }
    this.tableColumns = [
      {
        title: '日期',
        dataIndex: 'maintenanceDate',
        key: 'maintenanceDate'
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
        title: '设备类别',
        dataIndex: 'categoryName',
        key: 'categoryName'
      },
      // {
      //   title: '负责人',
      //   dataIndex: 'maintenanceByName',
      //   key: 'maintenanceByName'
      // },
      {
        title: '操作',
        dataIndex: 'cz',
        key: 'cz',
        fixed: 'right',
        width: 200,
        render: (value, row, index) => {
          return (
            <div className="table-click">
              <a style={{ marginRight: 10 }} onClick={() => this.onDetail(row, index)}>查看详情</a>
            </div>
          )
        }
      }
    ];
  }

  componentDidMount() {
    this.props.dispatch({ type: 'maintainRecordModel/getTableList' })
    this.props.dispatch({ type: 'maintainRecordModel/watchChange' })
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'maintainRecordModel/resetData' })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'maintainRecordModel/setCurrent', payload: e })
  }
  //查看详情
  onDetail = (record) => {
    return ReqApi.get({
      url: Urls.MaintenanceRecord_skipView,
      pm: { maintenanceRecordCode: record.maintenanceRecordCode }
    }).then((data) => {
      this.props.dispatch({ type: 'maintainRecordDetailModel/setmaintainRecordDetail', payload: data })
      this.props.dispatch({ type: 'global/addRemoveTabs', path: 'maintainRecord', targetPath: 'maintainRecordDetail' })
    })
  }
  //新建
  addRow = () => {
    this.setState({ checkDeviceBisible: true })
  }
  onCancel = () => {
    this.setState({ checkDeviceBisible: false })
  }
  handleSearchForm = (e) => {
    this.props.dispatch({ type: 'maintainRecordModel/setSearch', payload: e })
  }
  render() {
    const { tableLoading, listData, current } = this.props.maintainRecordModel;
    const { checkDeviceBisible } = this.state
    const searchItems = [
      {
        label: '设备编号',
        type: 'Input',
        id: 'deviceCode'
      },
      {
        label: '设备名称',
        type: 'Input',
        id: 'deviceName'
      },
      {
        label: '时间范围',
        type: 'RangePicker',
        id: 'countDate',
        dateKeyNames: ['startDate', 'endDate'],
      }
    ]
    return (
      <div className="baseListStyle tabHeight">
        <div className="headDiv">
          <SearchMore
            searchItems={searchItems}
            onSearch={e => this.handleSearchForm(e)}
            onReset={() => this.handleSearchForm({})}
          />
        </div>
        <div className="addRowBtn">
          <Button type="primary" onClick={this.addRow}><Icon type="plus" />新建</Button>
        </div>
        <Table
          rowKey={'id'}
          loading={tableLoading}
          columns={this.tableColumns}
          pagination={false}
          dataSource={listData.list}
          width={'100%'}
        />
        <FooterPagination total={listData.total ? listData.total : 0} current={current} pageChange={this.pageChange} />
        {checkDeviceBisible && <CheckDeviceModal onCancel={this.onCancel} />}
      </div>
    )
  }
}

export default MaintainRecordComp;

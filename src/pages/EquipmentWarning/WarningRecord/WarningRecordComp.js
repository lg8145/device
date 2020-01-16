import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Tag } from 'antd';
import Components from '../../../base/components'
import { ReqApi, Urls, UserInfo } from '../../../base/common';
const { SearchMore, FooterPagination, DeleteModal } = Components;

@connect(state => ({ warningRecordModel: state.warningRecordModel }))
class WarningRecordComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkDeviceBisible: false,
    }
    this.tableColumns = [
      {
        title: '预警时间',
        dataIndex: 'warningTime',
        key: 'warningTime',
        render: (text, index) => <span>{text ? text : '--'}</span>
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
        title: '设备型号',
        dataIndex: 'model',
        key: 'model',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        title: '监控项',
        dataIndex: 'itemName',
        key: 'itemName',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        title: '监控值',
        dataIndex: 'value',
        key: 'value',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        title: '警告',
        dataIndex: 'warningValue',
        key: 'warningValue',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        title: '处理结果',
        dataIndex: 'dealResult',
        key: 'dealResult',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      // {
      //   title: '处理人',
      //   dataIndex: 'dealByName',
      //   key: 'dealByName'
      // },
      {
        title: '处理时间',
        dataIndex: 'dealDate',
        key: 'dealDate',
        render: (text, index) => <span>{text ? text : '--'}</span>
      }
    ];
  }

  componentDidMount() {
    this.props.dispatch({ type: 'warningRecordModel/getTableList' })
    this.props.dispatch({ type: 'warningRecordModel/watchChange' })
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'warningRecordModel/resetData' })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'warningRecordModel/setCurrent', payload: e })
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
    this.props.dispatch({ type: 'warningRecordModel/setSearch', payload: e })
  }
  render() {
    const { tableLoading, listData, current } = this.props.warningRecordModel;
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
        label: '设备型号',
        type: 'Input',
        id: 'model'
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
        <Table
          rowKey={'code'}
          loading={tableLoading}
          columns={this.tableColumns}
          pagination={false}
          dataSource={listData.list}
          width={'100%'}
        />
        <FooterPagination total={listData.total ? listData.total : 0} current={current} pageChange={this.pageChange} />
      </div>
    )
  }
}

export default WarningRecordComp;

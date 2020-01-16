import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Tag } from 'antd';
import Components from '../../../base/components'
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import CheckDeviceModal from './AddSpotCheckTask/CheckDeviceModal'

const { SearchMore, FooterPagination, DeleteModal } = Components;

@connect(state => ({ spotCheckTaskModel: state.spotCheckTaskModel, spotCheckTaskDetailModel: state.spotCheckTaskDetailModel }))
class SpotCheckTaskComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkDeviceBisible: false,
    }
    this.tableColumns = [
      {
        title: '设备点检单',
        dataIndex: 'spotCheckCode',
        key: 'spotCheckCode'
      },
      {
        title: '业务日期',
        dataIndex: 'spotCheckTime',
        key: 'spotCheckTime'
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
        dataIndex: 'deviceCategoryName',
        key: 'deviceCategoryName'
      },
      // {
      //   title: '点检人员',
      //   dataIndex: 'spotCheckByName',
      //   key: 'spotCheckByName'
      // },
      {
        title: '点检结果',
        dataIndex: 'spotResultName',
        key: 'spotResultName'
      },
      {
        title: '操作',
        dataIndex: 'cz',
        key: 'cz',
        fixed: 'right',
        width: 150,
        render: (value, row, index) => {
          return (
            <div className="table-click">
              <a onClick={() => this.onDetail(row, index)}>查看点检报告</a>
            </div>
          )
        }
      }
    ];
  }

  componentDidMount() {
    this.props.dispatch({ type: 'spotCheckTaskModel/getTableList' })
    this.props.dispatch({ type: 'spotCheckTaskModel/watchChange' })
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'spotCheckTaskModel/resetData' })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'spotCheckTaskModel/setCurrent', payload: e })
  }
  onCancel = () => {
    this.setState({ checkDeviceBisible: false })
  }
  //查看点检报告
  onDetail = (record) => {
    return ReqApi.get({
      url: Urls.SpotCheckTask_getSpotCheckView,
      pm: { spotCheckCode: record.spotCheckCode }
    }).then((data) => {
      this.props.dispatch({ type: 'spotCheckTaskDetailModel/setSpotCheckTaskDetail', payload: data })
      this.props.dispatch({ type: 'global/addRemoveTabs', path: 'spotCheckTask', targetPath: 'spotCheckTaskDetail' })
    })
  }
  addRow = () => {
    this.setState({ checkDeviceBisible: true })
  }
  render() {
    const { tableLoading, listData, current } = this.props.spotCheckTaskModel;
    const { checkDeviceBisible } = this.state
    return (
      <div className="baseListStyle tabHeight">
        <div className="addRowBtn">
          <Button type="primary" onClick={this.addRow}><Icon type="plus" />新建</Button>
        </div>
        <Table
          rowKey={'spotCheckCode'}
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

export default SpotCheckTaskComp;

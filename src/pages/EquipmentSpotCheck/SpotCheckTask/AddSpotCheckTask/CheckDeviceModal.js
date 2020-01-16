import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Modal, Input, Pagination } from 'antd';
import Components from '../../../../base/components';
import { ReqApi, Urls } from '../../../../base/common';
const { FooterPagination } = Components;
const Search = Input.Search;
@connect(state => ({ addspotCheckTaskModel: state.addspotCheckTaskModel }))
class CheckDeviceModal extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
    }
    this.columns = [
      {
        title: '设备编号',
        dataIndex: 'code',
        key: 'code',
      }, {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '设备型号',
        dataIndex: 'model',
        key: 'model',
      }, {
        title: '生产厂商',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
      },
      {
        title: '操作',
        render: (text, record) => <a onClick={() => {
          let _func = this.onCheckDevice
          typeof _func === 'function' ? _func(record) : null
        }}>选取</a>
      }
    ]
  }
  componentDidMount() {
    this.props.dispatch({ type: 'addspotCheckTaskModel/getDeviceAlllist' })
  }
  componentWillUnmount() {
    // this.props.dispatch({ type: 'addspotCheckTaskModel/resetFreeSearch' })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'addspotCheckTaskModel/pageChange', payload: e, types: 'dealer' })
  }
  onCheckDevice = (record) => {
    this.props.dispatch({ type: 'addspotCheckTaskModel/setCheckDeviceDetail', payload: record })
    this.props.dispatch({ type: 'addspotCheckTaskModel/getTaskList', payload: record })
    this.props.onCancel()
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'spotCheckTask', targetPath: 'addSpotCheckTask' })
  }
  handleSearch = (fuzzyMatch) => {
    this.props.dispatch({ type: 'addspotCheckTaskModel/handleSearch', payload: fuzzyMatch })
  }
  render() {
    const rowSelection = {
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows })
      },
    };
    const { listData } = this.props.addspotCheckTaskModel
    return (
      <Modal
        className="checkDeviceModal"
        width={600}
        title={'选取设备'}
        wrapClassName="vertical-center-modal"
        visible={true}
        footer={null}
        onCancel={this.props.onCancel}
      >
        <Search
          placeholder="请输入设备编号/设备名称进行查询"
          style={{ width: 294 }}
          className="SearchComp"
          onSearch={fuzzyMatch => this.handleSearch({ fuzzyMatch })}
        />
        <Table
          rowKey={'code'}
          columns={this.columns}
          pagination={false}
          dataSource={listData.list || []}
        />
        <Pagination
          className="_pagination"
          defaultPageSize={5}
          showQuickJumper
          size="small"
          showSizeChanger={false}
          onChange={(page, pageSize) => this.pageChange({ page, pageSize })}
          defaultCurrent={1}
          showTotal={(total, range) => `为您找到 ${total} 条记录`}
          total={listData.total}
        />
      </Modal>
    )
  }
}

export default CheckDeviceModal
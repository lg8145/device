import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Modal, Input, Pagination, Button } from 'antd';
import Components from '../../../../base/components';
import { ReqApi, Urls } from '../../../../base/common';
const { FooterPagination } = Components;
const Search = Input.Search;
@connect(state => ({ planassociatedDeviceModel: state.planassociatedDeviceModel }))
class PlanAssociatedDeviceModal extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
    }
    this.columns = [{
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
    }]
  }
  componentDidMount() {
    // this.props.dispatch({ type: 'planassociatedDeviceModel/getDViceAlllist' })
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'planassociatedDeviceModel/resetFreeSearch' })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'planassociatedDeviceModel/pageChange', payload: e })
  }
  onSubmit = (record) => {
    const { selectedRowsAll,associatedDeviceData } = this.props.planassociatedDeviceModel
    let newArr = [...selectedRowsAll,...associatedDeviceData]
    this.props.dispatch({ type: 'planassociatedDeviceModel/setAssociatedDeviceData', payload: newArr })
    this.props.onCancel()
  }
  handleSearch = (fuzzyMatch) => {
    this.props.dispatch({ type: 'planassociatedDeviceModel/handleSearch', payload: fuzzyMatch })
  }
  onChange = (selectedRowKeys, selectedRows) => {
    this.props.dispatch({ type: 'planassociatedDeviceModel/setAddDeviceVal', payload: { selectedRowKeys, selectedRows } })
  }
  render() {
    const { deviceAllList,associatedDeviceData } = this.props.planassociatedDeviceModel
    const rowSelection = {
      type: 'checkbox',
      onChange: (selectedRowKeys, selectedRows) => this.onChange(selectedRowKeys, selectedRows),
      getCheckboxProps: (record) => ({
        disabled: associatedDeviceData.some(item => item.code === record.code),
      }),
    };
    return (
      <Modal
        className="baseTableModal"
        width={900}
        title={'添加设备'}
        wrapClassName="vertical-center-modal"
        visible={true}
        footer={[
          <Button key="1" onClick={this.props.onCancel}>取消</Button>,
          <Button key="2" onClick={this.onSubmit} type="primary">保存</Button>
        ]}
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
          dataSource={deviceAllList.list || []}
          rowSelection={rowSelection}
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
          total={deviceAllList.total}
        />

      </Modal>
    )
  }
}

export default PlanAssociatedDeviceModal
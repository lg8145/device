import React, { PureComponent } from 'react';
import { Tabs, Table, Pagination, Divider, Input } from 'antd';
import Components from '../../../base/components';
const { Search } = Input;
const { TabPane } = Tabs;
import { connect } from 'dva';
const { FooterPagination } = Components;
import './index.scss'
@connect(state => ({ equipmentListModel: state.equipmentListModel }))
class ChoiceDevice extends PureComponent {
  constructor(props) {
    super(props)
  }
  addEp = (record) => {
    this.props.addData(record);
    this.props.handleCancel()
  }
  componentDidMount() {
    this.props.dispatch({ type: 'equipmentListModel/getTableList', payload: { page: 1, pageSize: 5 } })
    this.props.dispatch({ type: 'equipmentListModel/watchChange' });
  }
  onSearch = (e) => {
    this.props.dispatch({ type: 'equipmentListModel/setCurrent', payload: { fuzzyMatch: e, page: 1, pageSize: 5 } })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'equipmentListModel/setCurrent', payload: e })
  }
  render() {
    const columns = [
      {
        key: '1',
        title: '设备编号',
        dataIndex: 'code'
      },
      {
        key: '2',
        title: '设备名称',
        dataIndex: 'name'
      },
      {
        key: '3',
        title: '设备型号',
        dataIndex: 'model'
      },
      {
        key: '4',
        title: '生产厂商',
        dataIndex: 'manufacturer'
      },
      {
        key: '5',
        title: '操作',
        render: (text, record) => (
          <span>
            <a onClick={() => this.addEp(record)}>选取</a>
          </span>
        ),
      },
    ]
    const { tableLoading, datalist, current, currentFree } = this.props.equipmentListModel;
    return (
      <div className="choose-footer">
        <Search
          placeholder="请输入设备编号/名称/型号进行查询"
          onSearch={this.onSearch}
          style={{ width: 300, paddingLeft: 30 }}
        />
        <div style={{ height: 20 }}></div>
        <Table
          rowKey={'code'}
          loading={tableLoading}
          columns={columns}
          pagination={false}
          dataSource={datalist.list}
          width={'100%'}
          height={'100%'}
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
          total={datalist.total}
        />
        {/* <FooterPagination total={datalist.total ? datalist.total : 0} current={currentFree} pageChange={this.pageChange} /> */}
      </div>
    )
  }
}
export default ChoiceDevice
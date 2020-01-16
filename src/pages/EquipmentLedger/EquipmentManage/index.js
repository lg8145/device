import React, { PureComponent } from 'react';
import './index.scss'
import { Tabs, Table, Tooltip, Modal, Row, Col, Form, Button, Input, Icon, Divider, message, Badge } from 'antd';
import Components from '../../../base/components';
import EditModal from './editModal'
import { connect } from 'dva';
import { request, Urls, ReqApi } from '../../../base/common';
const { FooterPagination, SearchMore, DeleteModal } = Components;
const { TabPane } = Tabs;
@connect(state => ({ equipmentManageModel: state.equipmentManageModel }))
class EquipmentManage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false,
      type: '',
      detail: {},
      title: ''
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'equipmentManageModel/getTableList' })
    this.props.dispatch({ type: 'equipmentManageModel/watchChange' });
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'equipmentManageModel/resetData' })
  }

  handleCancel = () => {
    this.setState({ showAdd: false })
  }
  editEp = (record) => {
    this.setState({ showAdd: true, detail: record, title: '编辑' })
  }
  addEp = () => {
    this.setState({ showAdd: true, detail: {}, title: '新建' })
  }
  handleCancel = () => {
    this.setState({ showAdd: false, detail: {} })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'equipmentManageModel/setCurrent', payload: e })
  }
  handleSearchForm = (e) => {
    this.props.dispatch({ type: 'equipmentManageModel/setSearch', payload: e })
  }
  onSubmit = (values) => {
    if (this.state.title == '编辑') {//编辑
      return ReqApi.post({
        url: Urls.sparePartUpdate,
        pm: values
      }).then((data) => {
        message.success('提交成功')
        this.setState({
          detail: {},
          showAdd: false
        })
        this.props.dispatch({ type: 'equipmentManageModel/getTableList' })
      })
    } else {//新增
      return ReqApi.post({
        url: Urls.sparePartSave,
        pm: values
      }).then((data) => {
        message.success('提交成功')
        this.setState({
          detail: {},
          showAdd: false
        })
        this.props.dispatch({ type: 'equipmentManageModel/getTableList' })
      })
    }
  }
  deleteRow = (row, index) => {
    ReqApi.post({
      url: Urls.sparePartLogicDel,
      pm: { code: row.code }
    }).then((data) => {
      message.success('删除成功')
      this.props.dispatch({ type: 'equipmentManageModel/getTableList' })
    })
  }
  render() {
    let { showAdd, detail, title } = this.state;
    const { tableLoading, listData, current } = this.props.equipmentManageModel;
    const colors = {
      '0': '#BFBFBF',//未使用
      '1': '#23BC08',//已使用
      '2': '#E52C00',//已报废
    }
    const columns = [
      {
        key: 1,
        title: '备件编号',
        dataIndex: 'code',
      },
      {
        key: 2,
        title: '备件名称',
        dataIndex: 'name',
      },
      {
        key: 3,
        title: '规格型号',
        dataIndex: 'model',
        render: (text) => {
          return <Tooltip placement="topLeft" title={text} arrowPointAtCenter>
            {text && text.length > 12 ? text.substring(0, 12) + "..." : text ? text : '--'}
          </Tooltip>
        }
      },
      {
        key: 4,
        title: '生产厂商',
        dataIndex: 'manufacturer',
        render: (text) => {
          return <Tooltip placement="topLeft" title={text} arrowPointAtCenter>
            {text && text.length > 12 ? text.substring(0, 12) + "..." : text ? text : '--'}
          </Tooltip>
        }
      },
      {
        key: 5,
        title: '关联设备',
        dataIndex: 'deviceName',
        render: (text, record) => <span>{text ? text : '--'}</span>
      },
      {
        key: 6,
        title: '状态',
        dataIndex: 'statusName',
        render: (text, record) => {
          return <Badge color={colors[record.status]} text={record.statusName} />
        }
      },
      {
        key: 7,
        title: '操作',
        dataIndex: '',
        width: 150,
        render: (text, record, index) => (
          <span>
            <a onClick={() => this.editEp(record)}>编辑</a>
            <Divider type="vertical" />
            <DeleteModal deleteOk={() => this.deleteRow(record, index)}><a style={{ marginRight: 10 }}>删除</a></DeleteModal>
          </span>
        ),
      },
    ];
    const searchItems = [
      {
        label: '备件编号',
        type: 'Input',
        id: 'code'
      },
      {
        label: '备件名称',
        type: 'Input',
        id: 'name'
      },
      {
        label: '规格型号',
        type: 'Input',
        id: 'model'
      },
      {
        label: '生产厂商',
        type: 'Input',
        id: 'manufacturer'
      },
      {
        label: '关联设备',
        type: 'Input',
        id: 'deviceCode'
      },
      {
        label: '状态',
        type: 'Select',
        id: 'status',
        enums: [
          { catCode: '', catName: '全部' },
          { catCode: 0, catName: '未使用' },
          { catCode: 1, catName: '已使用' },
          { catCode: 2, catName: '已报废' },
        ],

      },

    ];
    return (
      <div className="equipmentManage tabHeight">
        <div className="baseListStyle">
          <div className="headDiv">
            <SearchMore
              searchItems={searchItems}
              onSearch={e => this.handleSearchForm(e)}
              onReset={() => this.handleSearchForm({})}
            />
          </div>
          <div className="addRowBtn">
            <Button type="primary" onClick={this.addEp}><Icon type="plus" />新建</Button>
          </div>

          <Table
            rowKey={'id'}
            loading={tableLoading}
            columns={columns}
            pagination={false}
            dataSource={listData.list}
            width={'100%'}
          />

          <FooterPagination total={listData.total ? listData.total : 0} current={current} pageChange={this.pageChange} />
          {showAdd && <EditModal detail={detail} onSubmit={this.onSubmit} onCancel={this.handleCancel} title={title} />}
        </div>
      </div>
    )
  }

}
export default EquipmentManage
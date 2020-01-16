import React, { PureComponent } from 'react';
import './index.scss'
import { connect } from 'dva'
import { Tabs, Button, Icon, Divider, Table, message, Badge } from 'antd';
import Components from '../../../base/components';
import AddData from './AddData';
import { ReqApi, Urls } from '../../../base/common';
const { TabPane } = Tabs;
const { FooterPagination, DeleteModal } = Components
@connect(state => ({ basicDataModel: state.basicDataModel }))
class BasicData extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false,
      detail: {},
      title: '',
      tabIndex: '0',
      tableData: { name: '设备类别', reqSave: Urls.deviceCategorySave, reqEidet: Urls.deviceCategoryUpdate }
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'basicDataModel/getTableList' });
    this.props.dispatch({ type: 'basicDataModel/getParameterTermList' });
    this.props.dispatch({ type: 'basicDataModel/getWorkshopList' });
    this.props.dispatch({ type: 'basicDataModel/watchChange' });
  }
  onChange = e => {
    this.setState({
      tabIndex: e
    })
    let type = { name: '设备类别', reqSave: Urls.deviceCategorySave, reqEidet: Urls.deviceCategoryUpdate };
    let site = { name: '参数项', reqSave: Urls.ParameterTermSave, reqEidet: Urls.ParameterTermUpdate };
    let work = { name: '产线', reqSave: Urls.workshopSave, reqEidet: Urls.workshopUpdate };
    e == 0 && this.setState({ tableData: type });
    e == 1 && this.setState({ tableData: site });
    e == 2 && this.setState({ tableData: work });

  }
  pageChange = e => {
    this.props.dispatch({ type: 'basicDataModel/setCurrent', payload: e })
  }
  handleCancel = () => {
    this.setState({ showAdd: false })
  }
  deleteRow = (record, i) => {
    let tabDelUrl = {
      '0': Urls.deviceCategoryLogicDelCategory,
      '1': Urls.ParameterTermLogicDel,
      '2': Urls.workshopLogicDel
    }
    return ReqApi.post({
      url: tabDelUrl[this.state.tabIndex],
      pm: { code: record.code }
    }).then((data) => {
      message.success('删除成功')
      this.state.tabIndex == 0 && this.props.dispatch({ type: 'basicDataModel/getTableList' });
      this.state.tabIndex == 1 && this.props.dispatch({ type: 'basicDataModel/getParameterTermList' });
      this.state.tabIndex == 2 && this.props.dispatch({ type: 'basicDataModel/getWorkshopList' });
    })

  }
  editEp = (record) => {
    this.setState({ showAdd: true, detail: record, title: '编辑' })
  }
  addEp = () => {
    this.setState({ showAdd: true, detail: {}, title: '新建' })
  }
  startUse = (record) => {
    console.log(this.state.tabIndex)
    let tabDelUrl = {
      '0': Urls.deviceCategoryLogicCategory,
      '1': Urls.paramLogicDel,
      '2': Urls.workshopUpdateStatus
    }
    return ReqApi.post({
      url: tabDelUrl[this.state.tabIndex],
      pm: { code: record.code, status: record.status == 1 ? 0 : 1 }
    }).then((data) => {
      message.success('操作成功')
      this.state.tabIndex == 0 && this.props.dispatch({ type: 'basicDataModel/getTableList' });
      this.state.tabIndex == 1 && this.props.dispatch({ type: 'basicDataModel/getParameterTermList' });
      this.state.tabIndex == 2 && this.props.dispatch({ type: 'basicDataModel/getWorkshopList' });
    })
  }
  onSubmit = (values, i) => {
    if (this.state.title == '编辑') {//编辑
      return ReqApi.post({
        url: i.reqEidet,
        pm: values
      }).then((data) => {
        message.success('提交成功')
        this.setState({
          detail: {},
          showAdd: false
        })
        i.name == "设备类别" && this.props.dispatch({ type: 'basicDataModel/getTableList' });
        i.name == "参数项" && this.props.dispatch({ type: 'basicDataModel/getParameterTermList' });
        i.name == "产线" && this.props.dispatch({ type: 'basicDataModel/getWorkshopList' });
      })
    } else {//新增
      return ReqApi.post({
        url: i.reqSave,
        pm: values
      }).then((data) => {
        message.success('提交成功')
        this.setState({
          detail: {},
          showAdd: false
        })
        i.name == "设备类别" && this.props.dispatch({ type: 'basicDataModel/getTableList' });
        i.name == "参数项" && this.props.dispatch({ type: 'basicDataModel/getParameterTermList' });
        i.name == "产线" && this.props.dispatch({ type: 'basicDataModel/getWorkshopList' });
      })
    }
  }
  render() {
    const color = {
      '1': 'success',
      '0': 'error'
    }
    const columns = [
      {
        key: 1,
        title: '名称',
        dataIndex: 'name'
      },
      {
        key: 2,
        title: '状态',
        dataIndex: 'statusName',
        render: (text, record) => {
          return <Badge status={color[record.status]} text={record.statusName} />
        }
      },
      {
        key: 3,
        title: '描述',
        dataIndex: 'systemDescribe',
      },
      {
        key: 4,
        title: '操作',
        render: (text, record, i) => (
          <span>
            <a onClick={() => this.editEp(record)}>编辑</a>
            <Divider type="vertical" />
            <DeleteModal deleteOk={() => this.deleteRow(record, i)}><a>删除</a></DeleteModal>
            <Divider type="vertical" />
            <a onClick={() => this.startUse(record)}>{record.status == 1 ? '禁用' : '启用'}</a>

          </span>
        ),
      },
    ];
    const columns1 =[
      {
        key: 'name',
        title: '名称',
        dataIndex: 'name'
      },
      {
        key: 'unitMeasure',
        title: '计量单位',
        dataIndex: 'unitMeasure',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        key: 'influxdbColumn',
        title: '关联字段',
        dataIndex: 'influxdbColumn',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        key: 'statusName',
        title: '状态',
        dataIndex: 'statusName',
        render: (text, record) => {
          return <Badge status={color[record.status]} text={record.statusName} />
        }
      },
      {
        key: 'systemDescribe',
        title: '描述',
        dataIndex: 'systemDescribe',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        key: 'cz',
        title: '操作',
        render: (text, record, i) => (
          <span>
            <a onClick={() => this.editEp(record)}>编辑</a>
            <Divider type="vertical" />
            <DeleteModal deleteOk={() => this.deleteRow(record, i)}><a>删除</a></DeleteModal>
            <Divider type="vertical" />
            <a onClick={() => this.startUse(record)}>{record.status == 1 ? '禁用' : '启用'}</a>

          </span>
        ),
      },
    ];
    if(this.state.tabIndex == 1){
      columns.push()
    }
    let { showAdd, detail, title, tableData } = this.state;
    const { tableLoading, listData, current, parameterTermList, workshopList } = this.props.basicDataModel;
    const leftList = [
      { name: '设备类别', data: listData, reqSave: Urls.deviceCategorySave, reqEidet: Urls.deviceCategoryUpdate },
      { name: '参数项', data: parameterTermList, reqSave: Urls.ParameterTermSave, reqEidet: Urls.ParameterTermLogicDel },
      { name: '产线', data: workshopList, reqSave: Urls.workshopSave, reqEidet: Urls.workshopUpdate }
    ]
    return (
      <div className='basic tabHeight'>
        <Tabs defaultActiveKey="0" tabPosition={"left"} onChange={this.onChange}>
          {leftList.map((i, index) => (
            <TabPane tab={i.name} key={index}>
              <div className="addRowBtn basic-tab">
                <Button type="primary" onClick={this.addEp}><Icon type="plus" />新建</Button>
              </div>
              <Table
                rowKey={'code'}
                loading={tableLoading}
                // columns={columns}
                columns={this.state.tabIndex == 1 ? columns1 : columns}
                pagination={false}
                dataSource={i.data.list}
                width={'100%'}
                height={'100%'}
              />
              <FooterPagination total={i.data.total ? i.data.total : 0} current={current} pageChange={this.pageChange} />
            </TabPane>
          ))}
        </Tabs>
        {showAdd && <AddData detail={detail} index={this.state.tabIndex} onSubmit={this.onSubmit} tableData={tableData} onCancel={this.handleCancel} title={title} />}
      </div>
    )
  }
}
export default BasicData 
import React, { PureComponent } from 'react';
import './index.scss'
import { connect } from 'dva';
import { Icon, Table, Radio, Modal, List, Button, Divider, message, Badge, Row } from 'antd';
import Components from '../../../base/components';
import AddEquipment from './AddEquipment'
import CheckSample from './CheckSample'
import { ReqApi, Urls, request } from '../../../base/common';
const { FooterPagination, DeleteModal } = Components;
@connect(state => ({ equipmentListModel: state.equipmentListModel }))
class EauipmentList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false,
      type: '',
      title: '',
      site: '',
      detail: {},
      showCheck: false,
      CheckSampleData: [],
      categoryCode: '',
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: 'equipmentListModel/getTypeList' });
    this.props.dispatch({ type: 'equipmentListModel/getSiteList' });
    this.props.dispatch({ type: 'equipmentListModel/getTableList' })
    this.props.dispatch({ type: 'equipmentListModel/watchChange' });
  }
  addEp = (record) => {
    this.setState({ showAdd: true, detail: record, title: '新建设备' })
  }
  editEp = (record) => {
    this.setState({ showAdd: true, detail: record, title: '编辑设备' })
  }
  handleCancel = () => {
    this.setState({ showAdd: false, detail: {}, showCheck: false, title: '' })
  }
  pageChange = e => {
    this.props.dispatch({ type: 'equipmentListModel/setCurrent', payload: { ...e, categoryCode: this.state.categoryCode } })
  }
  onSubmit = (values) => {
    if (this.state.title == '编辑设备') {//编辑
      return ReqApi.post({
        url: Urls.deviceUpdate,
        pm: values
      }).then((data) => {
        message.success('提交成功')
        this.setState({
          detail: {},
          showAdd: false,
          title: ''
        })
        this.props.dispatch({ type: 'equipmentListModel/getTableList' })
      })
    } else if (this.state.title == '新建设备') {//新增
      ReqApi.post({
        url: Urls.deviceSave,
        pm: values
      }).then((data) => {
        message.success('提交成功')
        this.setState({
          detail: {},
          showAdd: false,
          title: ''
        })
        this.props.dispatch({ type: 'equipmentListModel/getTableList' })
      })
    }

  }
  onChangeType = (e) => {
    this.setState({
      categoryCode: e.target.value
    })
    this.props.dispatch({ type: 'equipmentListModel/setCurrent', payload: { categoryCode: e.target.value, site: this.state.site } })
  }
  onChangeSite = (e) => {
    this.setState({
      site: e.target.value,
    });
    this.props.dispatch({ type: 'equipmentListModel/setCurrent', payload: { site: e.target.value, categoryCode: this.state.categoryCode } })
  }

  check = (record) => {
    return ReqApi.get({
      url: Urls.getDeviceCalibrationResult,
      pm: { deviceCode: record.code }
    }).then((data) => {
      this.setState({
        showCheck: true,
        CheckSampleData: data
      })
    })
  }

  render() {
    const colors = {
      1: '#23BC08',
      2: '#F49505',
      3: '#E52C00'
    }
    const statusName = {
      1: '正常',
      2: '检修中',
      3: '已报废'
    }
    const columns = [
      {
        key: 'code',
        title: '设备编号',
        dataIndex: 'code'
      },
      {
        key: 'name',
        title: '设备名称',
        dataIndex: 'name'
      },
      {
        key: 'categoryName',
        title: '设备类型',
        dataIndex: 'categoryName',
        render: (text, record) => <span>{text ? text : '--'}</span>
      },
      {
        key: 'productionLineName',
        title: '所属产线',
        dataIndex: 'productionLineName',
        render: (text, record) => <span>{text ? text : '--'}</span>
      },
      {
        key: 'manufacturer',
        title: '生产厂商',
        dataIndex: 'manufacturer',
        render: (text, record) => <span>{text ? text : '--'}</span>
      },
      {
        key: 'purchaseDate',
        title: '购入日期',
        dataIndex: 'purchaseDate',
        render: (text, record) => <span>{text ? text : '--'}</span>
      },
      {
        key: 'warranty',
        title: '保修期至',
        dataIndex: 'warranty',
        render: (text, record) => <span>{text ? text : '--'}</span>
      },
      {
        key: 'statusName',
        title: '状态',
        dataIndex: 'statusName',
        render: (text, record) => {
          return <Badge color={colors[record.status]} text={statusName[record.status]} />
        }
      },
      {
        key: '12',
        title: '操作',
        render: (text, record) => (
          <span>
            <a onClick={() => this.editEp(record)}>编辑</a>
            {/* <Divider type="vertical" /> */}
            {/* <a onClick={() => this.check(record)}>查看样本</a> */}
          </span>
        ),
      },
    ];
    const { tableLoading, datalist, current, typeList, siteList } = this.props.equipmentListModel;
    let { detail, showAdd, title, CheckSampleData } = this.state
    return (
      <div className="equipmentList baseListStyle tabHeight">
        <List>
          {/* <List.Item className="title-list"> */}
          {/* <div className="title-span"> */}
          {/* <div style={{ paddingRight: 5 }}>全部设备</div> */}
          <div className="SearchMore">
            <div className="compDiv">
              <Row>
                {/* <Radio.Group onChange={this.onChange} >
                  {/* <Radio.Button value={''} key={''}>全部设备</Radio.Button> 
                  {typeList && typeList.map((i, index) =>
                    <Radio.Button value={i.categoryCode} key={index}>{i.categoryName}{i.count ? <span>(<span className='count-span'>{i.count}</span>)</span> : null}</Radio.Button>
                  )}
                </Radio.Group> */}
                <Radio.Group onChange={this.onChangeType} defaultValue="" >
                  {typeList && typeList.map((i, index) =>
                    <Radio.Button value={i.categoryCode} key={index}>{i.categoryName}{i.count ? <span>(<span className='count-span'>{i.count}</span>)</span> : null}</Radio.Button>
                  )}
                </Radio.Group>
              </Row>
            </div>
            <div className="btnDiv" style={{ width: typeList.length > 15 ? 250 : 190 }}>
              {
                typeList.length > 15 ?
                  <a onClick={this.toggle}>更多
                            {this.state.expand === false ? <Icon type="down" /> : <Icon type="up" />}
                  </a> : null
              }
            </div>
          </div>
          {/* <div>
                <Radio.Group defaultValue="" buttonStyle="solid" onChange={this.onChangeType}>
                  <Radio.Button >全部</Radio.Button>
                  {typeList.map((i, index) => (
                    <Radio.Button value={i.categoryCode} key={index}>{i.categoryName}{i.count ? <span>(<span className='count-span'>{i.count}</span>)</span> : null}</Radio.Button>
                  ))}
                </Radio.Group>
              </div> */}
          {/* </div> */}
          {/* </List.Item> */}
          {/* <List.Item className="title-list">
            <div className="title-span">
              <div style={{ paddingRight: 5 }}>站点:</div>
              <div>
                <Radio.Group defaultValue="" buttonStyle="solid" onChange={this.onChangeSite}>
                  {siteList.map((i, index) => (
                    <Radio.Button value={i.code} key={i.code}>{i.name}</Radio.Button>
                  ))}
                </Radio.Group>
              </div>
            </div>
          </List.Item> */}
        </List>
        <div className="addRowBtn">
          <Button type="primary" onClick={this.addEp}><Icon type="plus" />新建</Button>
        </div>
        <Table
          rowKey={'code'}
          loading={tableLoading}
          columns={columns}
          pagination={false}
          dataSource={datalist.list}
          width={'100%'}
          height={'100%'}
        />
        <FooterPagination total={datalist.total ? datalist.total : 0} current={current} pageChange={this.pageChange} />
        {showAdd && <AddEquipment detail={detail} onSubmit={this.onSubmit} onCancel={this.handleCancel} title={title} />}
        <Modal
          title='校准结果'
          visible={this.state.showCheck}
          footer={null}
          width="50%"
          onCancel={this.handleCancel}
        >
          <CheckSample data={CheckSampleData} />
        </Modal>
      </div>
    )
  }
}
export default EauipmentList
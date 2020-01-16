import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Modal, Input, Row, Col, Badge } from 'antd';
import Components from '../../../base/components';
import { ReqApi, Urls } from '../../../base/common';
const { FooterPagination } = Components;
const Search = Input.Search;
@connect(state => ({ realTimeModel: state.realTimeModel }))
class DetailModal extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
    }
    this.columnsWarning = [
      {
        title: '发生时间',
        dataIndex: 'warningTime',
        key: 'warningTime',
      }, {
        title: '预警提醒',
        dataIndex: 'warningDescribe',
        key: 'warningDescribe',
      }
    ]
    this.colors = {
      '0': '#23BC08',
      '1': '#F49505',
      '2': '#E52C00'
    }
    this.columnsRepair = [
      {
        title: '日期',
        dataIndex: 'repairDate',
        key: 'repairDate',
      }, {
        title: '维修项目',
        dataIndex: 'repairItem',
        key: 'repairItem',
      },
      {
        title: '状态',
        dataIndex: 'repairStatusName',
        key: 'repairStatusName',
        render: (text, record) => {
          return <Badge color={this.colors[record.status]} text={record.repairStatusName} />
        }
      }
    ]
  }
  componentDidMount() {

  }
  componentWillUnmount() {
    // this.props.dispatch({ type: 'realTimeModel/resetFreeSearch' })
  }
  onWarning = () => {
    this.props.onCancel()
    this.props.dispatch({ type: 'global/addTabs', path: 'warningRecord' })
  }
  onRepair = () => {
    this.props.onCancel()
    this.props.dispatch({ type: 'global/addTabs', path: 'repairApply' })
  }
  render() {
    const { detail } = this.props.realTimeModel
    const colors = [
      '#23BC08',//运转正常
      '#E52C00',//运行异常
      '#F49505',//预警
      '#BFBFBF'//关机
    ]
    const statusName = ['正常', '异常', '预警', '关机']
    return (
      <Modal
        className="RealTimeModal"
        width={900}
        title={'设备详情'}
        wrapClassName="vertical-center-modal"
        visible={true}
        footer={null}
        onCancel={this.props.onCancel}
      >
        <div className="topcon">
          <Row>
            <Col className="gutter-row coldiv" span={4}><span className="coldivT">设备名称：</span></Col>
            <Col className="gutter-row" span={4}><span className="coldivC">{detail.name}</span> </Col>
            <Col className="gutter-row coldiv" span={4}><span className="coldivT">设备类别：</span></Col>
            <Col className="gutter-row " span={4}><span className="coldivC">{detail.categoryName}</span> </Col>
            <Col className="gutter-row coldiv" span={4}><span className="coldivT">运转状态：</span></Col>
            <Col className="gutter-row " span={4}><span className="coldivC" style={{ color: colors[detail.runtimeStatus] }}>{statusName[detail.runtimeStatus]}</span> </Col>
          </Row>
          <Row>
            <Col className="gutter-row coldiv" span={4}><span className="coldivT">设备编号：</span></Col>
            <Col className="gutter-row" span={4}><span className="coldivC">{detail.code}</span></Col>
            <Col className="gutter-row coldiv" span={4}><span className="coldivT">设备型号：</span></Col>
            <Col className="gutter-row" span={4}><span className="coldivC">{detail.model}</span> </Col>
            <Col className="gutter-row coldiv" span={4}><span className="coldivT">生产厂商：</span></Col>
            <Col className="gutter-row" span={4}><span className="coldivC">{detail.manufacturer}</span> </Col>
          </Row>
          <Row>
            <Col className="gutter-row coldiv" span={4}><span className="coldivT">所属产线：</span></Col>
            <Col className="gutter-row" span={4}><span className="coldivC">{detail.productionLineName}</span> </Col>
            <Col className="gutter-row coldiv" span={4}><span className="coldivT">位置：</span></Col>
            <Col className="gutter-row" span={4}><span className="coldivC">{detail.location}</span> </Col>
            <Col className="gutter-row coldiv" span={4}><span className="coldivT">开机时间：</span></Col>
            <Col className="gutter-row" span={4}><span className="coldivC">{detail.openTime}</span> </Col>
          </Row>
        </div>
        <div className="waringTitle">
          <span>预警记录</span>
          <div className="more" onClick={() => this.onWarning()}>查看更多</div>
        </div>
        <Table
          rowKey={'code'}
          columns={this.columnsWarning}
          pagination={false}
          dataSource={detail.warningRecordVos && detail.warningRecordVos.list || []}
        />
        <div className="waringTitle"><span>维修记录</span><div className="more" onClick={() => this.onRepair()}>+添加</div></div>
        <Table
          rowKey={'code'}
          columns={this.columnsRepair}
          pagination={false}
          dataSource={detail.repairRecordVos && detail.repairRecordVos.list || []}
        />
      </Modal>
    )
  }
}

export default DetailModal
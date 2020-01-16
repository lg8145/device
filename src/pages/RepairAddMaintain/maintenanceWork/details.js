import React, { PureComponent } from 'react';
import { Tabs, Table, Radio, Divider, Form, Row, Col, Input, Select, DatePicker, Modal, List } from 'antd';
import Components from '../../../base/components';
const { IconFont } = Components;
import './index.scss'
import { connect } from 'dva'
import { ReqApi, Urls } from '../../../base/common';
@connect(state => ({ maintenanceWorkModel: state.maintenanceWorkModel, global: state.global }))
class Details extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showChoose: false,
      detail: {},
    }
  }
  componentDidMount() {
    return ReqApi.get({
      url: Urls.RepairRecordSkip_skipView,
      pm: { code: this.props.global.tabTrans.detail.code }
    }).then((data) => {
      this.setState({ detail: data })
    })
  }
  showCreatePage = () => {
    this.props.dispatch({ type: 'global/addRemoveTabs', path: 'checkWork', targetPath: 'maintenanceWork' })
  }
  choose = () => {
    this.setState({ showChoose: true })
  }
  handleCancel = () => {
    this.setState({ showChoose: false })
  }
  render() {
    const { detail } = this.state;
    const colors = {
      '0': '#05A9F4',//申请维修
      '1': '#23BC08',//已维修
      '2': '#F49505',//维修中
      '3': '#E52C00',//无法修复
    }
    const repairStatusName = { 0: '申请维修', 1: '已维修', 2: '维修中', 3: '无法修复' }
    console.log('detail--', repairStatusName[detail.repairStatus])
    return (
      <div className="details-list maintenanceWork">
        <List>
          <List.Item>
            <div className="title-back">
              <div className="icon-back" onClick={() => this.showCreatePage()}> <i className="devicefont iconfanhui" /></div>
              <div className="title-span">
                <span style={{ paddingLeft: 5 }}>设备维修单：<span>{detail.code}</span></span>
                <div className="orderStatus"><span style={{ color: colors[detail.repairStatus] }}>{repairStatusName[detail.repairStatus]}</span></div>
              </div>
            </div>
          </List.Item>
          <div className="detailcon">
            <Row className="formContent">
              <Col span={8}>
                <Form.Item label="设备编号:">
                  <span>{detail.deviceCode}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="设备名称:">
                  <span>{detail.deviceName}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="设备型号:">
                  <span>{detail.model}</span>
                </Form.Item>
              </Col>
            </Row>
            <Row className="formContent">
              {/* <Col span={8}>
                <Form.Item label="保修人员:">
                  <span>{detail.deviceCode}</span>
                </Form.Item>
              </Col> */}
              <Col span={8}>
                <Form.Item label="申请维修日期:">
                  <span>{detail.applyRepairDate}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="要求维修日期:">
                  <span>{detail.requestRepairDate}</span>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="故障现象描述:">
                  <span>{detail.deviceCode}</span>
                </Form.Item>
              </Col>
            </Row>
            {/* <Row className="formContent">
              <Col span={8}>
                <Form.Item label="故障现象描述:">
                  <span>{detail.deviceCode}</span>
                </Form.Item>
              </Col>
            </Row> */}
          </div>
          <List.Item>
            <div className="secondTitle">
              <div className="iconBule" />
              <span>维修记录</span>
            </div>
          </List.Item>
          <List.Item>
            <Row className="RowContent">
              <Col span={8}>
                <label>维修项目:</label>
                <span>{detail.repairItem}</span>
              </Col>
            </Row>
          </List.Item>
        </List>
        <Row className="RowContent">
          <Col span={8}>
            <label>故障时限:</label>
            <span>{detail.faultTimeLimit}</span>
          </Col>
        </Row>
        <Row className="RowContent">
          <Col span={8}>
            <label>维修方式:</label>
            <span>{detail.repairModeName}</span>
          </Col>
        </Row>
        <Row className="RowContent">
          <Col span={8}>
            <label>原因分析:</label>
            <span>{detail.causeAnalysis}</span>
          </Col>
        </Row>
        <Row className="RowContent">
          <Col span={8}>
            <label>处理方式:</label>
            <span>{detail.processMode}</span>
          </Col>
        </Row>
        <Row className="RowContent">
          <Col span={8}>
            <label>预防方法:</label>
            <span>{detail.preventionMethod}</span>
          </Col>
        </Row>
        <Row className="RowContent">
          <Col span={4}>
            <label>维修成本:</label>
            <span>{detail.repairCost}</span>
          </Col>
          <Col span={4}>
            <label>维修工时:</label>
            <span>{detail.repairHour}</span>
          </Col>
        </Row>
        <Row className="RowContent">
          {/* <Col span={4}>
            <label>维修人员:</label>
            <span>{detail.repairBy}</span>
          </Col> */}
          <Col span={4}>
            <label>维修日期:</label>
            <span>{detail.repairDate}</span>
          </Col>
        </Row>
        <Row className="RowContent">
          <Col span={8}>
            <label>维修状态:</label>
            <span>{repairStatusName[detail.repairStatus]}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Details
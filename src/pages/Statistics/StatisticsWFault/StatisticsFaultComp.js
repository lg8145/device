import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Divider, Menu, Modal, Upload, Row, Col, Badge } from 'antd';
import Components from '../../../base/components'
import { IconFont } from '../../../base/components/IconFont';
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import FaultType from './FaultType'
import MaintenanceRecord from './MaintenanceRecord'
import './index.scss'
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';
import DataSet from "@antv/data-set";
const { SearchMore, FooterPagination, DeleteModal } = Components;
const colors = {
  '0': '#E52C00',
  '1': '#595959',
}
const statusName = ['未处理', '已处理']
@connect(state => ({
  statisticsFaultModel: state.statisticsFaultModel,
  warningRecordModel: state.warningRecordModel,

}))
class StatisticsFaultComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      code: ''
    }
    this.tableColumns = [
      {
        title: '预警时间',
        dataIndex: 'warningTime',
        key: 'warningTime'
      },
      {
        title: '预警信息',
        dataIndex: 'warningDescribe',
        key: 'warningDescribe'
      },
      {
        title: '处理状态',
        dataIndex: 'dealResult',
        key: 'dealResult',
        render: (text, record) => <span color={colors[record.dealResult]} text={statusName[record.dealResult]} ></span>
      }
    ];
  }
  componentDidMount() {
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'statisticsFaultModel/resetData' })
  }
  tabChangeClick = item => {
    this.props.dispatch({ type: 'statisticsFaultModel/setTabActiveKey', payload: item.key })
  }
  getCon = () => {
    const { tabActiveKey, listData } = this.props.statisticsFaultModel;
    switch (tabActiveKey) {
      case 1:
        return <div className="tabCon">
          <Row>
            <Col span={12} >
              <p className="tabConTitle">故障时长(小时)</p>
              <p style={{ paddingLeft: 20 }}><span className="tabConNub">10</span></p>
            </Col>
            <Col span={12} >
              <p className="tabConTitle">故障设备(台数)</p>
              <p style={{ paddingLeft: 20 }}><span className="tabConNub1">1</span></p>
            </Col>
          </Row>
        </div>
        break;
      case 2:
        return <div className="tabCon">
          <Row>
            <Col span={12}>
              <p className="tabConTitle">故障时长(小时)</p>
              <p><span className="tabConNub">100</span></p>
            </Col>
            <Col span={12}>
              <p className="tabConTitle">故障设备(台数)</p>
              <p><span className="tabConNub1">10</span></p>
            </Col>
          </Row>
        </div>
        break;
      case 3:
        return <div className="tabCon">
          <Row>
            <Col span={12}>
              <p className="tabConTitle">故障时长(小时)</p>
              <p><span className="tabConNub">500</span></p>
            </Col>
            <Col span={12}>
              <p className="tabConTitle">故障设备(台数)</p>
              <p><span className="tabConNub1">30</span></p>
            </Col>
          </Row>
        </div>
        break;
      case 4:
        return <div className="tabCon">
          <Row>
          <Col span={12}>
              <p className="tabConTitle">故障时长(小时)</p>
              <p><span className="tabConNub">1000</span></p>
            </Col>
            <Col span={12}>
              <p className="tabConTitle">故障设备(台数)</p>
              <p><span className="tabConNub1">50</span></p>
            </Col>
          </Row>
        </div>
        break;
      default:
        break;
    }
  }
  render() {
    const { tabActiveKey } = this.props.statisticsFaultModel;
    const tabList = [
      { key: 1, label: '当天故障' },
      { key: 2, label: '本周故障' },
      { key: 3, label: '本月故障' },
      { key: 4, label: '最近三个月' },
    ];
    return (
      <div className="StatisticsWFault baseListStyle">
        {/* <div className="top"> */}
        <Row gutter={24} style={{ marginLeft: 0 }}>
          <Col className="gutter-row faultCon DevicesProportion-top" span={12} >
            <div className="headerTab" style={{ marginBottom: 5 }}>
              {
                tabList.map(item => {
                  return <div
                    key={item.key}
                    className={'tab'}
                    onClick={() => this.tabChangeClick(item)}
                  >
                    <span
                      className={item.key === tabActiveKey ? 'tab active' : 'tab'}
                    >{item.label}</span>
                  </div>
                })
              }
            </div>
            {
              this.getCon()
            }
          </Col>
          <Col className="gutter-row" span={12}>
            <FaultType />
          </Col>
        </Row>
        <Row>
          <Col className="gutter-row" span={24}>
            <MaintenanceRecord />
          </Col>
        </Row>
        {/* </div> */}
      </div>
    )
  }
}

export default StatisticsFaultComp;

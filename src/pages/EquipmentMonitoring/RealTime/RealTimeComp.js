import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Badge } from 'antd';
import Components from '../../../base/components'
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import DetailModal from './DetailModal'
import moment from 'moment'
import './index.scss'

const { SearchMore, FooterPagination, DeleteModal } = Components;

@connect(state => ({ realTimeModel: state.realTimeModel }))
class RealTimeComp extends PureComponent {
  constructor(props) {
    super(props);
    var today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


    this.state = {
      visible: false,
      code: '',
      date: date
    }
  }
  componentDidMount() {
    this.currentTime()
    this.props.dispatch({ type: 'realTimeModel/getTableList' })
    this.props.dispatch({ type: 'realTimeModel/watchChange' })

  }
  //当前时间   
  currentTime() {
    let oTimer = document.querySelector('.timer');
    oTimer.innerHTML = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
    setInterval(() => {
      oTimer.innerHTML = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    }, 1000)
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'realTimeModel/resetData' })
  }
  //查看详情
  onDetail = (code) => {
    this.setState({ visible: true }, () => {
      this.props.dispatch({ type: 'realTimeModel/getDetial', payload: code })
    })
  }
  onCancel = () => {
    this.setState({ visible: false })
  }
  reload = () => {
    this.props.dispatch({ type: 'realTimeModel/getTableList' })
  }
  render() {
    const { tableLoading, listData } = this.props.realTimeModel;
    const { visible, code } = this.state
    const colors = [
      '#23BC08',//运转正常
      '#E52C00',//运行异常
      '#F49505',//预警
      '#BFBFBF'//关机
    ]
    const colorsbottom = [
      '#e6ffe7',//运转正常
      '#ffe9e6',//运行异常
      '#fff9e6',//预警
      '#f1f1f1'//关机
    ]
    const statusName = ['运转正常', '运行异常', '预警', '关机']
    return (
      <div className="RealTime baseListStyle">
        <div className="titleDiv">
          {statusName.map((item, index) => <Badge key={index} className="conDiv" color={colors[index]} text={item} />)}
          <div className="box-item">
            当前时间：<span className="timer"></span><Icon type="reload" style={{ paddingLeft: 10 }} onClick={this.reload} />
          </div>
        </div>
        {
          listData.productionLineVo && listData.productionLineVo.map((item, index) => {
            return <div>
              {item.monitorVo.length > 0 && <div className="box" key={index}>
                <div className="secondTitle">
                  <div className="iconBule" />
                  <span>{item.name}</span>
                </div>
                <div>
                  <Row gutter={16}>
                    {item.monitorVo.length > 0 && item.monitorVo.map(i =>
                      <Col className="gutter-row" span={6} key={i.code} onClick={() => this.onDetail(i.code)} style={{ cursor: 'pointer', paddingBottom: 20 }}>
                        <div className="gutter-box">
                          <div className="box-top" style={{ backgroundColor: colors[i.status] }}>
                            <img className="imgCss" src={require('../../../assets/images/defaultimg.png')} />
                            <div className="box-topTitle">燃气动力罐缝机-F53</div>
                          </div>
                          <div className="box-bottom" style={{ backgroundColor: colorsbottom[i.status] }}>
                            <Row>
                              <Col className="gutter-row coldiv" span={6}><span className="coldivT">设备编号：</span> </Col>
                              <Col className="gutter-row" span={16}><span className="coldivC">{i.name}</span> </Col>
                            </Row>
                            <Row>
                              <Col className="gutter-row coldiv" span={6}><span>型号：</span> </Col>
                              <Col className="gutter-row" span={16}><span>{i.model}</span> </Col>
                            </Row>
                            <Row>
                              <Col className="gutter-row coldiv" span={6}><span>开机时长：</span> </Col>
                              <Col className="gutter-row" span={16}><span>{i.openTime}</span> </Col>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    )}
                  </Row>
                </div>
              </div>}
            </div>
          })
        }
        {
          (listData.unProductionLineVo && listData.unProductionLineVo.length > 0) &&
          <div className="box">
            <div className="secondTitle">
              <div className="iconBule" />
              <span>其他</span>
            </div>
            <div>
              <Row gutter={16}>
                {listData.unProductionLineVo.length > 0 && listData.unProductionLineVo.map(i =>
                  <Col className="gutter-row" span={6} key={i.code} onClick={() => this.onDetail(i.code)} style={{ cursor: 'pointer', paddingBottom: 20 }}>
                    <div className="gutter-box">
                      <div className="box-top" style={{ backgroundColor: colors[i.status] }}>
                        <img className="imgCss" src={require('../../../assets/images/defaultimg.png')} />
                        <div className="box-topTitle">燃气动力罐缝机-F53</div>
                      </div>
                      <div className="box-bottom" style={{ backgroundColor: colorsbottom[i.status] }}>
                        <Row>
                          <Col className="gutter-row coldiv" span={6}><span className="coldivT">设备编号：</span> </Col>
                          <Col className="gutter-row" span={16}><span className="coldivC">{i.name}</span> </Col>
                        </Row>
                        <Row>
                          <Col className="gutter-row coldiv" span={6}><span>型号：</span> </Col>
                          <Col className="gutter-row" span={16}><span>{i.model}</span> </Col>
                        </Row>
                        <Row>
                          <Col className="gutter-row coldiv" span={6}><span>开机时长：</span> </Col>
                          <Col className="gutter-row" span={16}><span>{i.openTime}</span> </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        }
        {visible && <DetailModal code={code} onCancel={this.onCancel} />}
      </div>
    )
  }
}

export default RealTimeComp;

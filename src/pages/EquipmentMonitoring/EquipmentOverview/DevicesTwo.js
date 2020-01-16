import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Badge } from 'antd';
import Components from '../../../base/components'
import { IconFont } from '../../../base/components/IconFont';
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import './index.scss'
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';
import DataSet from "@antv/data-set";
const { SearchMore, FooterPagination, DeleteModal } = Components;
const { Html, Arc } = Guide;
@connect(state => ({ equipmentOverviewModel: state.equipmentOverviewModel }))
class DevicesTwo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detail: {
        id: 0,
        deviceCode: '3',
        deviceName: 'dddddd',
        model: '型号01',
        chanxian: '产线01',
        liandong: '24',
        zhuzhou: '6000r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '测试设备产线名称',
        daoku: '88',
        jin: '15m/min',
        kaijiDate: '2019-12-26',
        yunxing: '4.5小时',
        leijichanlaing: 1866,
        yujincishu: 2,
        data: [
          { value: 350 },
        ]
      },
      detail1: {
        id: 0,
        deviceCode: '3',
        deviceName: '设备02',
        model: '型号02',
        chanxian: '产线02',
        liandong: '36',
        zhuzhou: '5800r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '产线名称',
        daoku: '80',
        jin: '30m/min',
        kaijiDate: '2019-12-20',
        yunxing: '2小时',
        leijichanlaing: 5922,
        yujincishu: 2,
        data: [
          { value: 200 },
        ]
      },
    }
    this.tableColumns = [
      {
        title: '产线',
        dataIndex: 'productionLineName',
        key: 'productionLineName',
        render: (text, record) => <a onClick={() => this.checkVal(record)}>{text}</a>
      },
      {
        title: '设备编号',
        dataIndex: 'deviceCode',
        key: 'deviceCode'
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName'
      },
      {
        title: '联动轴数',
        dataIndex: 'liandong',
        key: 'liandong'
      },
      {
        title: '主轴转速',
        dataIndex: 'zhuzhou',
        key: 'zhuzhou'
      },
      {
        title: '刀库容量',
        dataIndex: 'daoku',
        key: 'daoku'
      },
      {
        title: '进给速度',
        dataIndex: 'jin',
        key: 'jin'
      }
    ];
    this.tableColumns1 = [
      {
        title: '产线',
        dataIndex: 'productionLineName',
        key: 'productionLineName',
        render: (text, record) => <a onClick={() => this.checkVa1l(record)}>{text}</a>
      },
      {
        title: '设备编号',
        dataIndex: 'deviceCode',
        key: 'deviceCode'
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName'
      },
      {
        title: '联动轴数',
        dataIndex: 'liandong',
        key: 'liandong'
      },
      {
        title: '主轴转速',
        dataIndex: 'zhuzhou',
        key: 'zhuzhou'
      },
      {
        title: '刀库容量',
        dataIndex: 'daoku',
        key: 'daoku'
      },
      {
        title: '进给速度',
        dataIndex: 'jin',
        key: 'jin'
      }
    ];
    this.list = [
      {
        id: 0,
        deviceCode: '3',
        deviceName: 'dddddd',
        model: '型号01',
        chanxian: '产线01',
        liandong: '24',
        zhuzhou: '6000r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '测试设备产线名称',
        daoku: '88',
        jin: '15m/min',
        kaijiDate: '2019-12-26',
        yunxing: '4.5小时',
        leijichanlaing: 1866,
        yujincishu: 2,
        data: [
          { value: 350 },
        ]
      },
      {
        id: 1,
        deviceCode: '3',
        deviceName: '设备02',
        model: '型号02',
        chanxian: '产线02',
        liandong: '36',
        zhuzhou: '5800r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '产线名称',
        daoku: '90',
        jin: '15m/min',
        kaijiDate: '2019-12-26',
        yunxing: '4.5小时',
        leijichanlaing: 5922,
        yujincishu: 2,
        data: [
          { value: 400 },
        ]
      },
      {
        id: 2,
        deviceCode: '3',
        deviceName: '设备03',
        model: '型号03',
        chanxian: '产线03',
        liandong: '24',
        zhuzhou: '6020r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '产线名称03',
        daoku: '80',
        jin: '15m/min',
        kaijiDate: '2019-12-26',
        yunxing: '8小时',
        leijichanlaing: 4576,
        yujincishu: 2,
        data: [
          { value: 100 },
        ]
      },
      {
        id: 3,
        deviceCode: '3',
        deviceName: '设备04',
        model: '型号04',
        chanxian: '产线04',
        liandong: '46',
        zhuzhou: '5000r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '产线名称04',
        daoku: '100',
        jin: '25m/min',
        kaijiDate: '2019-12-10',
        yunxing: '14小时',
        leijichanlaing: 5247,
        yujincishu: 4,
        data: [
          { value: 220 },
        ]
      },
      {
        id: 4,
        deviceCode: '3',
        deviceName: '设备05',
        model: '型号05',
        chanxian: '产线05',
        liandong: '24',
        zhuzhou: '6500r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '测试设备产线名称05',
        daoku: '66',
        jin: '15m/min',
        kaijiDate: '2019-12-01',
        yunxing: '8小时',
        leijichanlaing: 1477,
        yujincishu: 1,
        data: [
          { value: 120 },
        ]
      }
    ]
    this.list1 = [
      {
        id: 0,
        deviceCode: '3',
        deviceName: '设备02',
        model: '型号02',
        chanxian: '产线02',
        liandong: '36',
        zhuzhou: '5800r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '产线名称',
        daoku: '80',
        jin: '30m/min',
        kaijiDate: '2019-12-20',
        yunxing: '2小时',
        leijichanlaing: 5922,
        yujincishu: 2,
        data: [
          { value: 200 },
        ]
      },
      {
        id: 1,
        deviceCode: '3',
        deviceName: 'dddddd',
        model: '型号01',
        chanxian: '产线01',
        liandong: '24',
        zhuzhou: '6000r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '测试设备产线名称',
        daoku: '88',
        jin: '15m/min',
        kaijiDate: '2019-12-26',
        yunxing: '4.5小时',
        leijichanlaing: 1866,
        yujincishu: 2,
        data: [
          { value: 300 },
        ]
      },

      {
        id: 2,
        deviceCode: '3',
        deviceName: '设备03',
        model: '型号03',
        chanxian: '产线03',
        liandong: '24',
        zhuzhou: '6020r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '产线名称03',
        daoku: '80',
        jin: '15m/min',
        kaijiDate: '2019-12-26',
        yunxing: '8小时',
        leijichanlaing: 4576,
        yujincishu: 2,
        data: [
          { value: 100 },
        ]
      },
      {
        id: 3,
        deviceCode: '3',
        deviceName: '设备05',
        model: '型号05',
        chanxian: '产线05',
        liandong: '24',
        zhuzhou: '6500r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '测试设备产线名称05',
        daoku: '66',
        jin: '15m/min',
        kaijiDate: '2019-12-01',
        yunxing: '8小时',
        leijichanlaing: 1477,
        yujincishu: 1,
        data: [
          { value: 120 },
        ]
      },
      {
        id: 4,
        deviceCode: '3',
        deviceName: '设备04',
        model: '型号04',
        chanxian: '产线04',
        liandong: '46',
        zhuzhou: '5000r/min',
        productionLineCode: 'CX-05083555',
        productionLineName: '产线名称04',
        daoku: '100',
        jin: '25m/min',
        kaijiDate: '2019-12-10',
        yunxing: '14小时',
        leijichanlaing: 5247,
        yujincishu: 4,
        data: [
          { value: 220 },
        ]
      }
    ]
  }
  componentDidMount() {
    this.props.dispatch({ type: 'equipmentOverviewModel/getTableList' })
    this.props.dispatch({ type: 'equipmentOverviewModel/watchChange' })
    this.a()
  }
  checkVal = (record) => {
    const { deviceTwoTabActiveKey, listData } = this.props.equipmentOverviewModel;
    this.setState({ detail: record })
    // if (deviceTwoTabActiveKey === 1) {
    //   this.setState({ detail: record })
    // } else {
    //   this.setState({ detail1: record })
    // }

  }
  checkVa1l = (record) => {
    this.setState({ detail: record })
  }
  componentWillUnmount() {
    this.props.dispatch({ type: 'equipmentOverviewModel/resetData' })
  }
  tabChangeClick = item => {
    this.props.dispatch({ type: 'equipmentOverviewModel/setDeviceTwoTabActiveKey', payload: item.key })
  }
  a = () => {
    Shape.registerShape('point', 'pointer', {
      drawShape(cfg, group) {
        let point = cfg.points[0]; // 获取第一个标记点
        point = this.parsePoint(point);
        const center = this.parsePoint({ // 获取极坐标系下画布中心点
          x: 0,
          y: 0,
        });
        // 绘制指针
        group.addShape('line', {
          attrs: {
            x1: center.x,
            y1: center.y,
            x2: point.x,
            y2: point.y + 20,
            stroke: cfg.color,
            lineWidth: 3,
            lineCap: 'round',
          },
        });
        return group.addShape('circle', {
          attrs: {
            x: center.x,
            y: center.y,
            r: 8,
            stroke: cfg.color,
            lineWidth: 3,
            fill: '#fff',
          },
        });
      },
    })
  }

  getCon = () => {
    const { deviceTwoTabActiveKey, listData } = this.props.equipmentOverviewModel;
    const { DataView } = DataSet;
    const { detail, detail1 } = this.state
    const data = detail.data;
    // const data1 = detail1.data;
    // console.log('detail1--', detail1)
    const cols = {
      value: {
        min: 100,
        max: 900,
        tickInterval: 100,
        nice: false,
      },
    };
    const cols1 = {
      value: {
        min: 100,
        max: 900,
        tickInterval: 100,
        nice: false,
      },
    };
    switch (deviceTwoTabActiveKey) {
      case 1:
        return <div>
          <Row>
            <Col span={8}>
              <Chart height={180} data={data} scale={cols} padding={[0, 0, 0, 0]} forceFit>
                <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
                <Axis
                  name="value"
                  zIndex={2}
                  line={null}
                  label={{
                    offset: -16,
                    textStyle: {
                      fontSize: 12,
                      textAlign: 'center',
                      textBaseline: 'middle',
                    },
                  }}
                  subTickCount={4}
                  subTickLine={{
                    length: -8,
                    stroke: '#fff',
                    strokeOpacity: 1,
                  }}
                  tickLine={{
                    length: -18,
                    stroke: '#fff',
                    strokeOpacity: 1,
                  }}
                />
                <Axis name="1" visible={false} />
                <Guide>
                  <Arc
                    zIndex={0}
                    start={[100, 0.965]}
                    end={[900, 0.965]}
                    style={{ // 底灰色
                      stroke: '#CBCBCB',
                      lineWidth: 18,
                    }}
                  />
                  <Arc
                    zIndex={1}
                    start={[0, 0.965]}
                    end={[data[0].value, 0.965]}
                    style={{
                      stroke: '#1890FF',
                      lineWidth: 18,
                    }}
                  />
                  <Html
                    position={['50%', '95%']}
                    html={() => (`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 14px; color: #8C8C8C;margin: 0;">当前用电量</p><p style="font-size: 24;color: rgba(0,0,0,0.85);margin: 0;">${detail.data[0].value}</p></div>`)}
                  />
                </Guide>
                <Geom
                  type="point"
                  position="value*1"
                  shape="pointer"
                  color="#1890FF"
                  active={false}
                  style={{ stroke: '#fff', lineWidth: 1 }}
                />
              </Chart>
            </Col>
            <Col span={8} className="deviceWtoCon">
              <p className="deviceWtoKey">开机时间：<span className="deviceWtoVal">{detail.kaijiDate}</span></p>
              <p className="deviceWtoKey">运行时长：<span className="deviceWtoVal">{detail.yunxing}</span></p>
              <p className="deviceWtoKey">累计产量：<span className="deviceWtoVal">{detail.leijichanlaing}</span></p>
              <p className="deviceWtoKey">预警次数：<span className="deviceWtoVal">{detail.yujincishu}</span></p>
            </Col>
            <Col span={8} className="deviceWtoCon">
              <p className="deviceWtoKey">联动轴数：<span className="deviceWtoVal">{detail.liandong}</span></p>
              <p className="deviceWtoKey">主轴转速：<span className="deviceWtoVal">{detail.zhuzhou}</span></p>
              <p className="deviceWtoKey">刀库容量：<span className="deviceWtoVal">{detail.daoku}</span></p>
              <p className="deviceWtoKey">进给速度：<span className="deviceWtoVal">{detail.jin}</span></p>
            </Col>
          </Row>
          <Row>
            <Table
              rowKey={'id'}
              loading={this.tableLoading}
              columns={this.tableColumns}
              pagination={false}
              dataSource={this.list}
              className="tableCss"
              width={'100%'}
            />
          </Row>
        </div>
        break;
      case 2:
        return <div>
          <Row>
            <Col span={8}>
              <Chart height={180} data={data} scale={cols1} padding={[0, 0, 0, 0]} forceFit>
                <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
                <Axis
                  name="value"
                  zIndex={2}
                  line={null}
                  label={{
                    offset: -16,
                    textStyle: {
                      fontSize: 12,
                      textAlign: 'center',
                      textBaseline: 'middle',
                    },
                  }}
                  subTickCount={4}
                  subTickLine={{
                    length: -8,
                    stroke: '#fff',
                    strokeOpacity: 1,
                  }}
                  tickLine={{
                    length: -18,
                    stroke: '#fff',
                    strokeOpacity: 1,
                  }}
                />
                <Axis name="1" visible={false} />
                <Guide>
                  <Arc
                    zIndex={0}
                    start={[100, 0.965]}
                    end={[900, 0.965]}
                    style={{ // 底灰色
                      stroke: '#CBCBCB',
                      lineWidth: 18,
                    }}
                  />
                  <Arc
                    zIndex={1}
                    start={[0, 0.965]}
                    end={[data[0].value, 0.965]}
                    style={{
                      stroke: '#1890FF',
                      lineWidth: 18,
                    }}
                  />
                  <Html
                    position={['50%', '95%']}
                    html={() => (`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p style="font-size: 14px; color: #8C8C8C;margin: 0;">当前用电量</p><p style="font-size: 24;color: rgba(0,0,0,0.85);margin: 0;">${detail1.data[0].value}</p></div>`)}
                  />
                </Guide>
                <Geom
                  type="point"
                  position="value*1"
                  shape="pointer"
                  color="#1890FF"
                  active={false}
                  style={{ stroke: '#fff', lineWidth: 1 }}
                />
              </Chart>
            </Col>
            <Col span={8} className="deviceWtoCon">
              <p className="deviceWtoKey">开机时间：<span className="deviceWtoVal">{detail.kaijiDate}</span></p>
              <p className="deviceWtoKey">运行时长：<span className="deviceWtoVal">{detail.yunxing}</span></p>
              <p className="deviceWtoKey">累计产量：<span className="deviceWtoVal">{detail.leijichanlaing}</span></p>
              <p className="deviceWtoKey">预警次数：<span className="deviceWtoVal">{detail.yujincishu}</span></p>
            </Col>
            <Col span={8} className="deviceWtoCon">
              <p className="deviceWtoKey">联动轴数：<span className="deviceWtoVal">{detail.liandong}</span></p>
              <p className="deviceWtoKey">主轴转速：<span className="deviceWtoVal">{detail.zhuzhou}</span></p>
              <p className="deviceWtoKey">刀库容量：<span className="deviceWtoVal">{detail.daoku}</span></p>
              <p className="deviceWtoKey">进给速度：<span className="deviceWtoVal">{detail.jin}</span></p>
            </Col>
          </Row>
          <Row>
            <Table
              rowKey={'id'}
              loading={this.tableLoading}
              columns={this.tableColumns1}
              pagination={false}
              dataSource={this.list}
              className="tableCss"
              width={'100%'}
            />
          </Row>
        </div>
        break;
      default:
        break;
    }
  }
  render() {
    const { deviceTwoTabActiveKey, listData } = this.props.equipmentOverviewModel;
    const { visible, code } = this.state
    const tabList = [
      { key: 1, label: 'CNC数控机床' },
      { key: 2, label: '码垛机' },
    ];
    const statusName = ['运转正常', '运行异常', '预警', '关机']
    return (
      <div className="DevicesTwo baseListStyle">
        <div className="headerTab" style={{ marginBottom: 5 }}>
          {
            tabList.map(item => {
              return <div
                key={item.key}
                className={'tab'}
                onClick={() => this.tabChangeClick(item)}
              >
                <span
                  className={item.key === deviceTwoTabActiveKey ? 'tab active' : 'tab'}
                >{item.label}</span>
              </div>
            })
          }
        </div>
        {
          this.getCon()
        }
      </div>
    )
  }
}

export default DevicesTwo;

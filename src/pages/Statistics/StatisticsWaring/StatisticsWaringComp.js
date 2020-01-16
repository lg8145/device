import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Tabs, Button, message, Icon, Menu, Modal, Radio, Row, Col, Tag } from 'antd';
import Components from '../../../base/components';
import { ReqApi, Urls, UserInfo } from '../../../base/common';
import WaringDataDetail from './WaringDataDetail'
import './index.scss'
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts"
import DataSet from "@antv/data-set";
const { SearchMore, FooterPagination, DeleteModal } = Components;
const TabPane = Tabs.TabPane;
@connect(state => ({ statisticsWaringModel: state.statisticsWaringModel }))
class StatisticsWaringComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 5,
      visible: false
    }
    this.tableColumns = [
      {
        title: '所属产线',
        dataIndex: 'productionLineName',
        key: 'productionLineName'
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
        title: '设备型号',
        dataIndex: 'model',
        key: 'model',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        title: '设备类别',
        dataIndex: 'categoryName',
        key: 'categoryName',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        title: '生产厂商',
        dataIndex: 'manufacturer',
        key: 'manufacturer',
        render: (text, index) => <span>{text ? text : '--'}</span>
      },
      {
        title: '当天预警次数',
        dataIndex: 'warningValue',
        key: 'warningValue',
        render: (text, record) => <a style={{ color: '#E52C00' }} onClick={() => this.checkDetail(record)}>{text}</a>
      },
      {
        title: '本周预警次数',
        dataIndex: 'weekWarningCount',
        key: 'weekWarningCount',
        render: (text, record) => <a style={{ color: '#E52C00' }} onClick={() => this.checkDetail(record)}>{text}</a>
      },
      {
        title: '本月预警次数',
        dataIndex: 'monthWarningCount',
        key: 'monthWarningCount',
        render: (text, record) => <a style={{ color: '#E52C00' }} onClick={() => this.checkDetail(record)}>{text}</a>
      }
    ];
  }

  componentDidMount() {
    this.props.dispatch({ type: 'statisticsWaringModel/getWaringDeviceList', payload: { page: 1, pageSize: 5 } })//预警设备排名
    this.props.dispatch({ type: 'statisticsWaringModel/getWaringLineList' })//预警产线占比
    this.props.dispatch({ type: 'statisticsWaringModel/getLineList' })//产线
    this.props.dispatch({ type: 'statisticsWaringModel/getWaringProductionLineDeviceList' })//预警分析车间预警柱状数据
    this.props.dispatch({ type: 'statisticsWaringModel/getTableList' })

  }
  pageChange = e => {
    this.props.dispatch({ type: 'statisticsWaringModel/setCurrent', payload: e })
  }
  componentWillUnmount() {
  }
  checkDetail = (record) => {
    this.setState({ visible: true })
    this.props.dispatch({ type: 'statisticsWaringModel/setDetail', payload: record })
    this.props.dispatch({ type: 'statisticsWaringModel/getWaringDataDetail' })
  }
  onCancel = () => {
    this.setState({ visible: false })
  }
  tabChangeClick = item => {
    this.props.dispatch({ type: 'statisticsWaringModel/settabActiveKey', payload: item.key })
    this.props.dispatch({ type: 'statisticsWaringModel/getWaringDeviceList', payload: { page: 1, pageSize: 5 } })//预警设备排名
    this.props.dispatch({ type: 'statisticsWaringModel/getWaringProductionLineDeviceList' })//预警分析车间预警柱状数据
    this.props.dispatch({ type: 'statisticsWaringModel/getWaringLineList' })//预警产线占比
  }
  tabChangeClickaring = item => {
    this.props.dispatch({ type: 'statisticsWaringModel/setWaringTabActiveKey', payload: item.key })
    if (item.key == 1) {
      this.props.dispatch({ type: 'statisticsWaringModel/getTableList' })//预警分析数据列表
    }
  }
  onChangeType = (e) => {
    this.props.dispatch({ type: 'statisticsWaringModel/getWaringProductionLineDeviceList', payload: { productionLineCode: e.target.value } })
  }
  onRight = (page) => {
    const { lineList, lineListData } = this.props.statisticsWaringModel
    let { currentPage, pageSize } = this.state
    let totalsize = Math.ceil(lineList.total / pageSize)
    if (currentPage != totalsize) {
      this.setState({ currentPage: currentPage + 1 }, () => {
        this.props.dispatch({ type: 'statisticsWaringModel/getLineList', payload: { page: this.state.currentPage, pageSize: 5 } })
      })
    }
  }
  onLeft = (page) => {
    const { lineList, lineListData } = this.props.statisticsWaringModel
    let { currentPage, pageSize } = this.state
    let totalsize = Math.ceil(lineList.total / pageSize)
    if (currentPage != 1) {
      this.setState({ currentPage: currentPage - 1 }, () => {
        this.props.dispatch({ type: 'statisticsWaringModel/getLineList', payload: { page: this.state.currentPage, pageSize: 5 } })
      })
    }
  }
  getCon = () => {
    const { listData, tableLoading, current, tabActiveKey, waringDeviceList, waringLineList,
      lineList, lineListData, waringProductionLineDeviceList, WaringTabActiveKey } = this.props.statisticsWaringModel
    const tabList = [
      { key: 0, label: '当天' },
      { key: 1, label: '本周' },
      { key: 2, label: '本月' },
    ];
    let { currentPage, pageSize } = this.state
    let totalsize = Math.ceil(lineList.total / pageSize)
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = waringLineList
    data.map(item => item.proLinePercentage = Number(item.proLinePercentage))
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "proLinePercentage",
      dimension: "productionLineName",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    const colsw = {
      warningCount: {
        tickInterval: 20
      }
    };
    switch (WaringTabActiveKey) {
      case 0:
        return <div>
          <div className="headerTab" style={{ marginBottom: 5 }}>
            {
              tabList.map(item => {
                return <div
                  key={item.key}
                  className={'tabDiv'}
                  onClick={() => this.tabChangeClick(item)}
                >
                  <span
                    className={item.key === tabActiveKey ? 'tabListDiv tabListDivActive' : 'tabListDiv'}
                  >{item.label}</span>
                </div>
              })
            }
          </div>
          <div className="box-content">
            <Row>
              <Col className="gutter-row" span={12} style={{ paddingRight: 20 }}>
                <div className="backcolor">
                  <div className="waring-title">预警设备排名(TOP5)</div>
                  <div className="waring-con">
                    {waringDeviceList.list && waringDeviceList.list.length > 0 && waringDeviceList.list.map((item, index) =>
                      <Row key={index}>
                        <Col span={18}>{item.deviceName}</Col>
                        <div className="waring-con-nub"><span style={{ width: 75 }}>预警次数</span></div>
                        <div className="waring-conTitle">{item.warningCount}次</div>
                        {/* <Col span={3} className="waring-con-nub" style={{ width: 75 }}><span>预警次数</span></Col> */}
                        {/* <Col span={3}>{item.warningCount}次</Col> */}
                      </Row>
                    )}
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="backcolor">
                  <div className="waring-title">预警产线占比</div>
                  <div className="waring-con">
                    <Col span={18}>
                      <Chart
                        height={230}
                        data={dv}
                        scale={cols}
                        padding={[0, 0, 0, 0]}
                        forceFit
                      >
                        <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
                        <Axis name="percent" />
                        <Legend
                          position="right"
                          offsetY={-window.innerHeight / 2 + 220}
                          offsetX={-100}
                        />
                        <Tooltip
                          showTitle={false}
                          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                        />
                        <Geom
                          type="intervalStack"
                          position="percent"
                          color={['productionLineName', ['#5AD8A6', '#5D7092','#F6BD16','#5B8FF9']]}
                          tooltip={[
                            "productionLineName*percent",
                            (productionLineName, percent) => {
                              percent = percent * 100 + "%";
                              return {
                                name: productionLineName,
                                value: percent
                              };
                            }
                          ]}
                          style={{
                            lineWidth: 1,
                            stroke: "#fff"
                          }}
                        >
                          <Label
                            content="percent"
                            formatter={(val, productionLineName) => {
                              return productionLineName.point.productionLineName + ": " + val;
                            }}
                          />
                        </Geom>
                      </Chart>
                    </Col>

                  </div>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20, backgroundColor: '#fff' }}>
              <div className="bottombackcolor">
                <div className="title-span">
                  <div>
                    <Icon type="left" onClick={() => this.onLeft(lineList.page)} className={currentPage == 1 ? 'lefticon colorcss' : 'lefticon'} />
                    <Radio.Group defaultValue="" buttonStyle="solid" onChange={this.onChangeType}>
                      {lineListData && lineListData.map((i, index) => (
                        <Radio.Button value={i.code} key={index}>{i.name}</Radio.Button>
                      ))}
                    </Radio.Group>
                    <Icon type="right" onClick={() => this.onRight(lineList.page)} className={currentPage == totalsize ? 'righticon colorcss' : 'righticon'} />
                  </div>
                </div>
                <div>
                  <Chart height={400} data={waringProductionLineDeviceList} scale={colsw} forceFit>
                    <Axis name="deviceName" />
                    <Axis name="warningCount" />
                    <Tooltip
                      crosshairs={{
                        type: "y"
                      }}
                    />
                    <Geom type="interval" position="deviceName*warningCount" />
                  </Chart>
                </div>
              </div>
            </Row>
          </div>
        </div>
        break;
      case 1:
        return <div>
          <Table
            rowKey={'code'}
            loading={tableLoading}
            columns={this.tableColumns}
            pagination={false}
            dataSource={listData.list}
            width={1000}
          />
          <FooterPagination total={listData.total ? listData.total : 0} current={current} pageChange={this.pageChange} />
        </div>
        break;
      default:
        break;
    }
  }
  render() {
    const { listData, tableLoading, current, tabActiveKey, waringDeviceList, waringLineList,
      lineList, lineListData, waringProductionLineDeviceList, WaringTabActiveKey } = this.props.statisticsWaringModel
    const { visible, detail } = this.state
    const tabListWaring = [
      { key: 0, label: '预警分析' },
      { key: 1, label: '预警数据' },
    ];

    // console.log('-------', parseInt(lineList.total / lineList.pageSize))
    return (
      <div className="StatisticsWaring baseListStyle tabHeight">
        <div className="headerTab" style={{ marginBottom: 5 }}>
          {
            tabListWaring.map(item => {
              return <div
                key={item.key}
                className={'tab'}
                onClick={() => this.tabChangeClickaring(item)}
              >
                <span
                  className={item.key === WaringTabActiveKey ? 'tab active' : 'tab'}
                >{item.label}</span>
              </div>
            })
          }
        </div>
        {
          this.getCon()
        }
        {visible && <WaringDataDetail onCancel={this.onCancel} />}
      </div>
    )
  }
}

export default StatisticsWaringComp;

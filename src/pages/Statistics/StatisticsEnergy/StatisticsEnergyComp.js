import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Input, Button, Select, Tabs } from 'antd';
// import StatisticsCostStore from './StatisticsCostStore';
import { ReqApi, Urls, UserInfo } from '../../../base/common';
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
} from "bizcharts";
import DataSet from "@antv/data-set";
import './StatisticsCost.scss'
const TabPane = Tabs.TabPane;
const { Search } = Input;
const Option = Select.Option;
@connect(state => ({ statisticsEnergyModel: state.statisticsEnergyModel }))
class StatisticsEnergyComp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      spinning: false,
      yearList: [],
      type: '0',
      year: new Date().getFullYear(),
      data1: null,
    }
    this.columns = [
      {
        title: '设备编号',
        dataIndex: 'deviceCode',
        key: 'deviceCode',
        width: 100,
        fixed: 'left',
        render: text => <span title={text}>{text && text.length > 12 ? text.substring(0, 12) + '...' : text ? text : '--'}</span>
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        width: 100,
        fixed: 'left',
        render: text => <span title={text}>{text && text.length > 12 ? text.substring(0, 12) + '...' : text ? text : '--'}</span>
      },
      {
        title: '1月',
        dataIndex: 'january',
        key: 'january'
      },
      {
        title: '2月',
        dataIndex: 'february',
        key: 'february'
      },
      {
        title: '3月',
        dataIndex: 'march',
        key: 'march',
      },
      {
        title: '4月',
        dataIndex: 'april',
        key: 'april',
      },
      {
        title: '5月',
        dataIndex: 'may',
        key: 'may',
      },
      {
        title: '6月',
        dataIndex: 'june',
        key: 'june',
      },
      {
        title: '7月',
        dataIndex: 'july',
        key: 'july',
      },
      {
        title: '8月',
        dataIndex: 'august',
        key: 'august',
      },
      {
        title: '9月',
        dataIndex: 'september',
        key: 'september',
      },
      {
        title: '10月',
        dataIndex: 'october',
        key: 'october',
      },
      {
        title: '11月',
        dataIndex: 'november',
        key: 'november',
      },
      {
        title: '12月',
        dataIndex: 'december',
        key: 'december',
      }
    ];
  }

  componentDidMount() {
    // 获取表格数据
    this.getYearList()
    this.props.dispatch({ type: 'statisticsEnergyModel/getTableList', payload: { year: this.state.year, searchFlag: 1 } })
    this.props.dispatch({ type: 'statisticsEnergyModel/getEngryList', payload: { year: this.state.year, searchFlag: 1 } })
  }

  componentWillUnmount() {
    // 清理数据
  }
  //获取年集合
  getYearList = () => {
    const beforeArr = this.getResultArr((arrMiddle, resultArr) => {
      arrMiddle--;
      resultArr.unshift(arrMiddle);
      return arrMiddle;
    })

    this.setState({
      yearList: beforeArr.concat([new Date().getFullYear()])
    })
  }
  //取年前或年后5个（工具函数）
  getResultArr = (callback) => {
    let arrMiddle = [new Date().getFullYear()];
    let resultArr = [];
    let count = 4;
    while (count != 0) {
      arrMiddle = callback(arrMiddle, resultArr);
      count--;
    }
    return resultArr;
  }
  //渲染当前
  handleChange1A = (year) => {
    const { tabActiveKey } = this.props.statisticsEnergyModel
    this.setState({ year, spinning: true }, () => {
      this.props.dispatch({ type: 'statisticsEnergyModel/getTableList', payload: { year: this.state.year, searchFlag: tabActiveKey } })
      this.props.dispatch({ type: 'statisticsEnergyModel/getEngryList', payload: { year: this.state.year, searchFlag: tabActiveKey } })
    })
  }

  onchangeDetailsTabs = (key) => {
    // console.log(key)
  }
  tabChangeClick = item => {
    this.props.dispatch({ type: 'statisticsEnergyModel/setTabActiveKey', payload: item.key })
    this.props.dispatch({ type: 'statisticsEnergyModel/getTableList', payload: { year: this.state.year, searchFlag: item.key } })
    this.props.dispatch({ type: 'statisticsEnergyModel/getEngryList', payload: { year: this.state.year, searchFlag: item.key } })
  }
  getCon = () => {
    const { listData, engryList, tabActiveKey } = this.props.statisticsEnergyModel
    const cols0 = {
      waterUsageTotal: {
        tickInterval: 1000
      }
    };
    const cols1 = {
      electricUsageTotal: {
        tickInterval: 1000
      }
    };
    const cols2 = {
      gasUsageTotal: {
        tickInterval: 1000
      }
    };
    switch (tabActiveKey) {
      case 0:
        return <div className="tabCon">
          <div className="tabTop">
            <div className="tabBarExtraRight">年份：
                  <Select defaultValue={this.state.year} value={this.state.year} style={{ width: 96 }} onChange={this.handleChange1A}>
                {
                  this.state.yearList.length > 0 && this.state.yearList.map(item => <Option key={item} value={item}>{item}</Option>)
                }
              </Select>
            </div>
          </div>
          <div className="box-content">
            <div className="box-content-body">
              <div>
                <Chart height={400} data={listData} scale={cols0} forceFit>
                  <Axis name="month" />
                  <Axis name="waterUsageTotal" />
                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                  />
                  <Geom type="interval" position="month*waterUsageTotal" />
                </Chart>
              </div>
            </div>
          </div>
          {
            engryList.length > 0 &&
            <Table
              rowKey={'deviceCode'}
              className="tabA"
              columns={this.columns}
              pagination={false}
              dataSource={engryList || []}
              scroll={{ x: 1500 }}
            />
          }
          <div className="_bottom">
            <Button type='default' style={{ width: '65px', height: '32px' }}><a href={`/device/Energy/exportExcel?tokenId=${UserInfo.getCookie('tokenId')}&year=${this.state.year}&searchFlag=${tabActiveKey}`}>导出</a></Button>
          </div>
        </div>
        break;
      case 1:
        return <div className="tabCon">
          <div className="tabTop">
            <div className="tabBarExtraRight">年份：
                  <Select defaultValue={this.state.year} value={this.state.year} style={{ width: 96 }} onChange={this.handleChange1A}>
                {
                  this.state.yearList.length > 0 && this.state.yearList.map(item => <Option key={item} value={item}>{item}</Option>)
                }
              </Select>
            </div>
          </div>
          <div className="box-content">
            <div className="box-content-body">
              <div>
                <Chart height={400} data={listData} scale={cols1} forceFit>
                  <Axis name="month" />
                  <Axis name="electricUsageTotal" />
                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                  />
                  <Geom type="interval" position="month*electricUsageTotal" />
                </Chart>
              </div>
            </div>
          </div>
          {
            engryList.length > 0 &&
            <Table
              rowKey={'deviceCode'}
              className="tabA"
              columns={this.columns}
              pagination={false}
              dataSource={engryList || []}
              scroll={{ x: 1500 }}
            />
          }
          <div className="_bottom">
            <Button type='default' style={{ width: '65px', height: '32px' }}><a href={`/device/Energy/exportExcel?tokenId=${UserInfo.getCookie('tokenId')}&year=${this.state.year}&searchFlag=${tabActiveKey}`}>导出</a></Button>
          </div>
        </div>
        break;
      case 2:
        return <div className="tabCon">
          <div className="tabTop">
            <div className="tabBarExtraRight">年份：
                  <Select defaultValue={this.state.year} value={this.state.year} style={{ width: 96 }} onChange={this.handleChange1A}>
                {
                  this.state.yearList.length > 0 && this.state.yearList.map(item => <Option key={item} value={item}>{item}</Option>)
                }
              </Select>
            </div>
          </div>
          <div className="box-content">
            <div className="box-content-body">
              <div>
                <Chart height={400} data={listData} scale={cols2} forceFit>
                  <Axis name="month" />
                  <Axis name="gasUsageTotal" />
                  <Tooltip
                    crosshairs={{
                      type: "y"
                    }}
                  />
                  <Geom type="interval" position="month*gasUsageTotal" />
                </Chart>
              </div>
            </div>
          </div>
          {
            engryList.length > 0 &&
            <Table
              rowKey={'deviceCode'}
              className="tabA"
              columns={this.columns}
              pagination={false}
              dataSource={engryList || []}
              scroll={{ x: 1500 }}
            />
          }
          <div className="_bottom">
            <Button type='default' style={{ width: '65px', height: '32px' }}><a href={`/device/Energy/exportExcel?tokenId=${UserInfo.getCookie('tokenId')}&year=${this.state.year}&searchFlag=${tabActiveKey}`}>导出</a></Button>
          </div>
        </div>
        break;
      default:
        break;
    }
  }
  render() {
    const { data1 } = this.state;
    const { listData, engryList, tabActiveKey } = this.props.statisticsEnergyModel
    const cols = {
      electricUsageTotal: {
        tickInterval: 1000
      }
    };
    const tabList = [
      { key: 1, label: '用电量' },
      { key: 0, label: '用水量' },
      { key: 2, label: '用气量' },
    ];
    return (
      <div className="StatisticsEnergy">
        {/* <div className="contant"> */}
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
      </div>
    )
  }
}
export default StatisticsEnergyComp;
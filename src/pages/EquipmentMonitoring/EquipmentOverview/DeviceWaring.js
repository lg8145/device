import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Dropdown, Menu, Modal, Upload, Row, Col, Badge } from 'antd';
import Components from '../../../base/components'
import { IconFont } from '../../../base/components/IconFont';
import { ReqApi, Urls, UserInfo } from '../../../base/common';
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

@connect(state => ({ equipmentOverviewModel: state.equipmentOverviewModel }))
class DeviceWaring extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }

  componentWillUnmount() {
  }
  tabChangeClick = item => {
    this.props.dispatch({ type: 'equipmentOverviewModel/setDeviceWaringTabActiveKey', payload: item.key })
  }
  getCon = () => {
    const { deviceWaringTabActiveKey, listData } = this.props.equipmentOverviewModel;
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = [
      {
        item: "预警",
        count: 20
      },
      {
        item: "正常",
        count: 80
      }
    ];
    const data2 = [
      {
        item: "预警",
        count: 10
      },
      {
        item: "正常",
        count: 90
      }
    ];
    const data3 = [
      {
        item: "预警",
        count: 15
      },
      {
        item: "正常",
        count: 85
      }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const dv2 = new DataView();
    dv2.source(data2).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const dv3 = new DataView();
    dv3.source(data3).transform({
      type: "percent",
      field: "count",
      dimension: "item",
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
    const data4 = [
      {
        year: "12-20",
        value: 3
      },
      {
        year: "12-21",
        value: 1
      },
      {
        year: "12-22",
        value: 5
      },
      {
        year: "12-23",
        value: 8
      },
      {
        year: "12-24",
        value: 4
      },
      {
        year: "12-25",
        value: 3
      },
      {
        year: "12-26",
        value: 1
      }
    ];
    const cols4 = {
      value: {
        min: 0
      },
      year: {
        range: [0, 1]
      }
    };
    switch (deviceWaringTabActiveKey) {
      case 1:
        return <div>
          <Row>
            <Col span={8}>
              <Chart
                className="chart1"
                height={147}
                data={dv}
                scale={cols}
                padding={[0, 0, 0, 0]}
                forceFit
              >
                <Coord type={"theta"} radius={0.8} innerRadius={0.8} />
                <Axis name="percent" />
                {/* <Legend
                position="right"
                offsetY={-window.innerHeight / 2 + 120}
                offsetX={-100}
              /> */}
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Guide>
                  <Html
                    position={["50%", "50%"]}
                    html="<div style=&quot;color:#595959;font-size:12px;text-align: center;width: 10em;&quot;>CNC数控机床<br><span style=&quot;color:#000000;font-size:24px&quot;>4</span></div>"
                    alignX="middle"
                    alignY="middle"
                  />
                </Guide>
                <Geom
                  type="intervalStack"
                  position="percent"
                  // color="item"
                  tooltip={[
                    "item*percent",
                    (item, percent) => {
                      percent = percent * 100 + "%";
                      return {
                        name: item,
                        value: percent
                      };
                    }
                  ]}
                  style={{
                    lineWidth: 1,
                    stroke: "#fff"
                  }}
                  color={['item', ['#1890FF', '#F0F2F5']]}
                >
                  {/* <Label
                    content="percent"
                    formatter={(val, item) => {
                      return item.point.item + ": " + val;
                    }}
                  /> */}
                </Geom>
              </Chart>
            </Col>
            <Col span={8}>
              <Chart
                className="chart1"
                height={147}
                data={dv2}
                scale={cols}
                padding={[0, 0, 0, 0]}
                forceFit
              >
                <Coord type={"theta"} radius={0.8} innerRadius={0.8} />
                <Axis name="percent" />
                {/* <Legend
                position="right"
                offsetY={-window.innerHeight / 2 + 120}
                offsetX={-100}
              /> */}
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Guide>
                  <Html
                    position={["50%", "50%"]}
                    html="<div style=&quot;color:#595959;font-size:12px;text-align: center;width: 10em;&quot;>码垛机<br><span style=&quot;color:#000000;font-size:24px&quot;>8</span></div>"
                    alignX="middle"
                    alignY="middle"
                  />
                </Guide>
                <Geom
                  type="intervalStack"
                  position="percent"
                  color={['item', ['#F65855', '#F0F2F5']]}
                  tooltip={[
                    "item*percent",
                    (item, percent) => {
                      percent = percent * 100 + "%";
                      return {
                        name: item,
                        value: percent
                      };
                    }
                  ]}
                  style={{
                    lineWidth: 1,
                    stroke: "#fff"
                  }}
                >
                  {/* <Label
                    content="percent"
                    formatter={(val, item) => {
                      return item.point.item + ": " + val;
                    }}
                  /> */}
                </Geom>
              </Chart>
            </Col>
            <Col span={8}>
              <Chart
                className="chart1"
                height={147}
                data={dv3}
                scale={cols}
                padding={[0, 0, 0, 0]}
                forceFit
              >
                <Coord type={"theta"} radius={0.8} innerRadius={0.8} />
                <Axis name="percent" />
                {/* <Legend
                position="right"
                offsetY={-window.innerHeight / 2 + 120}
                offsetX={-100}
              /> */}
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Guide>
                  <Html
                    position={["50%", "50%"]}
                    html="<div style=&quot;color:#595959;font-size:12px;text-align: center;width: 10em;&quot;>称重机<br><span style=&quot;color:#000000;font-size:24px&quot;>6</span></div>"
                    alignX="middle"
                    alignY="middle"
                  />
                </Guide>
                <Geom
                  type="intervalStack"
                  position="percent"
                  color={['item', ['#FACC14', '#F0F2F5']]}
                  tooltip={[
                    "item*percent",
                    (item, percent) => {
                      percent = percent * 100 + "%";
                      return {
                        name: item,
                        value: percent
                      };
                    }
                  ]}
                  style={{
                    lineWidth: 1,
                    stroke: "#fff"
                  }}
                >
                  {/* <Label
                    content="percent"
                    formatter={(val, item) => {
                      return item.point.item + ": " + val;
                    }}
                  /> */}
                </Geom>
              </Chart>
            </Col>
          </Row>
        </div>
        break;
      case 2:
        return <div>
          <Chart height={200} data={data4} scale={cols4} forceFit>
            <Axis name="year" />
            <Axis
              name="value"
              label={{
                formatter: val => {
                  return parseInt(val / 1);
                }
              }}
            />
            <Tooltip
              crosshairs={{
                type: "line"
              }}
            />
            <Geom type="area" position="year*value" />
            <Geom type="line" position="year*value" size={2} />
          </Chart>
        </div>
        break;
      default:
        break;
    }
  }
  render() {
    const { deviceWaringTabActiveKey, listData } = this.props.equipmentOverviewModel;
    const tabList = [
      { key: 1, label: '当天设备预警' },
      { key: 2, label: '7天内设备预警' },
    ];
    return (
      <div className="DeviceWaring baseListStyle">
        <div className="headerTab" style={{ marginBottom: 5 }}>
          {
            tabList.map(item => {
              return <div
                key={item.key}
                className={'tab'}
                onClick={() => this.tabChangeClick(item)}
              >
                <span
                  className={item.key === deviceWaringTabActiveKey ? 'tab active' : 'tab'}
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

export default DeviceWaring;

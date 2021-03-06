import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Icon, Button, message, Divider, Menu, Modal, Upload, Row, Col, Badge } from 'antd';
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
class DevicesProportion extends PureComponent {
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
  render() {
    const { deviceWaringTabActiveKey, listData } = this.props.equipmentOverviewModel;
    const { DataView } = DataSet;
    const { Html } = Guide;
    const dv = new DataView();
    const data = [
      {
        item: "正常运行",
        count: 70
      },
      {
        item: "故障维修",
        count: 20
      },
      {
        item: "停机",
        count: 10
      }
    ];
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const dv2 = new DataView();
    const data2 = [
      {
        item: "数控机床",
        count: 30
      },
      {
        item: "码垛机",
        count: 60
      },
      {
        item: "称重机",
        count: 10
      }
    ];
    dv2.source(data2).transform({
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
    return (
      <div className="DevicesProportion baseListStyle">
        <Row className="DevicesProportion-top marginbottom">
          <div className="headerTab">设备状态</div>
          {/* <Divider type="horizontal" /> */}
          <Col span={24}>
            <Chart
              className="chart1"
              height={193}
              data={dv}
              scale={cols}
              padding={[0, 0, 0, 0]}
              forceFit
            >
              <Coord type={"theta"} radius={0.7} innerRadius={0.6} />
              <Axis name="percent" />
              <Legend
                position="right"
                offsetY={-193 / 2 + 20}
                offsetX={-100}
              />
              <Tooltip
                showTitle={false}
                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
              />
              {/* <Guide>
                <Html
                  position={["50%", "50%"]}
                  html="<div style=&quot;color:#595959;font-size:12px;text-align: center;width: 10em;&quot;>CNC数控机床<br><span style=&quot;color:#000000;font-size:24px&quot;>4</span></div>"
                  alignX="middle"
                  alignY="middle"
                />
              </Guide> */}
              <Geom
                type="intervalStack"
                position="percent"
                color={['item', ['#48E2A4', '#FF5353','#5D7092']]}
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
                <Label
                  content="percent"
                  formatter={(val, item) => {
                    return item.point.item + ": " + val;
                  }}
                />
              </Geom>
            </Chart>
          </Col>
        </Row>
        <Row className="DevicesProportion-top">
          <div className="headerTab">设备占比</div>
          {/* <Divider type="horizontal" /> */}
          <Col span={24}>
            <Chart
              className="chart1"
              height={193}
              data={dv2}
              scale={cols}
              padding={[0, 0, 0, 0]}
              forceFit
            >
              <Coord type={"theta"} radius={0.7} />
              <Axis name="percent" />
              <Tooltip
                showTitle={false}
                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
              />
              <Geom
                type="intervalStack"
                position="percent"
                color={['item', ['#FF501A', '#18C6E9','#FF9611']]}
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
                <Label
                  content="percent"
                  formatter={(val, item) => {
                    return item.point.item + ": " + val;
                  }}
                />
              </Geom>
            </Chart>
          </Col>
        </Row>
      </div>
    )
  }
}

export default DevicesProportion;

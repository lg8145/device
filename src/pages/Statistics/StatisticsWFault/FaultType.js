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
class FaultType extends PureComponent {
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
    const dv2 = new DataView();
    const data2 = [
      {
        item: "漏油",
        count: 30
      },
      {
        item: "漏电",
        count: 25
      },
      {
        item: "过热",
        count: 10
      },
      {
        item: "磨损",
        count: 20
      },
      {
        item: "损坏",
        count: 10
      },
      {
        item: "其他",
        count: 5
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
        <Row className="DevicesProportion-top">
          <div className="headerTab">故障类别占比</div>
          <Divider type="horizontal" />
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
              <Legend
                position="right"
                offsetY={-193 / 2 + 20}
                offsetX={-100}
              />
              <Tooltip
                showTitle={false}
                itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
              />
              <Geom
                type="intervalStack"
                position="percent"
                color={['item', ['#5B8FF9', '#5AD8A6','#5D7092','#F6BD16','#E8684A','#6DC8EC']]}
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

export default FaultType;

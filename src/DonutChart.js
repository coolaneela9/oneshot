import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Highcharts from "highcharts";
import Styled from "styled-components";
import ListingModal from "./ListingModal";
import { getCollegesByState } from "./api";
require("highcharts-no-data-to-display")(Highcharts);

const Div = Styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  a {
    font-size: 1rem
  }
  .highcharts-tooltip span {
    z-index: 99999 !important;
  }
  span.highcharts-title  {
    top: 110px !important;
    z-index: 1 !important;
  }
  svg.highcharts-root {
    border-radius:6px;
  }
`;

const Num = Styled.div`
    font-size: 16px;
    display: inline-flex;
    width: 200px;
`;
const Text = Styled.div`
    font-size: 16px;
    margin-left: 20px;
    font-size: 16px;
    display: inline-flex;
    justify-content: center;
`;

const Marker = Styled.span`
    border: solid 4px;
    border-color: #ee4f3e;
    width: 12px;
    height: 8px;
    border-radius: 20px;
    margin-top: 8px;
    margin-right: 10px;
    display: inline-block;
`;

const LegendWrapper = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 40px;
    .legend-wrapper {
        display: flex;
        padding: 4px;
    }
`;

class DonutChart extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    seriesData: PropTypes.array,
    sum: PropTypes.number,
    colors: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.state = {
      isOpenListingPopup: false,
      name: undefined,
      collegesByState: [],
      isFetchingCollegesByState: false,
    };

    this.id = `donut_chart__${Math.floor(Math.random() * 1000)}`;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps, prevState) {
    const { seriesData } = this.props;
    this.renderChart();
    if (!_.isEmpty(prevProps.seriesData) && !_.isEmpty(seriesData)) {
      if (prevProps.seriesData[0][1] !== seriesData[0][1]) {
        this.renderChart();
      }
    }
  }

  handleCollegePopup = (name) => {
    const { collegesByState } = this.state;
    this.setState({
      isFetchingCollegesByState: true,
    });
    getCollegesByState(name).then((res) => {
      this.setState({
        collegesByState: [...collegesByState, ...res],
        isOpenListingPopup: !this.state.isOpenListingPopup,
        name: name,
        isFetchingCollegesByState: false,
      });
    });
  };

  renderChart() {
    const { data, title, seriesData, colors } = this.props;
    if (_.isEmpty(data)) {
      return null;
    }

    Highcharts.setOptions({
      colors: colors,
    });

    // Create the chart
    Highcharts.chart(this.id, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: 250,
        width: 250,
      },
      title: {
        text: title,
        align: "center",
        verticalAlign: "middle",
        y: -10,
        style: {
          color: "#4d4c4c",
          fontSize: "15px",
          zIndex: 1,
          top: "150px",
        },
        useHTML: true,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
        point: {
          valueSuffix: "%",
        },
      },
      noData: {
        style: {
          fontWeight: "bold",
          fontSize: "1rem",
          color: "#303030",
        },
      },
      lang: {
        noData: "No data",
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          return (this.percentage >= 1 && this.percentage <= 99) ||
            this.percentage >= 100
            ? Math.round(this.y) +
                " (" +
                Highcharts.numberFormat(this.percentage, 0, ".", ",") +
                "%" +
                ") " +
                "<br>" +
                this.point.name
            : this.percentage > 0 || this.percentage > 99
            ? Math.round(this.y) +
              " (" +
              Highcharts.numberFormat(this.percentage, 1, ".", ",") +
              "%" +
              ") " +
              "<br>" +
              this.point.name
            : null;
        },
        style: {
          color: "#fff",
        },
        opacity: "1",
        backgroundColor: "rgb(77, 76, 76)",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          dataLabels: {
            enabled: false,
            formatter: function () {
              return (this.percentage >= 1 && this.percentage <= 99) ||
                this.percentage >= 100
                ? Highcharts.numberFormat(this.percentage, 0, ".", ",") + "%"
                : this.percentage > 0 || this.percentage > 99
                ? Highcharts.numberFormat(this.percentage, 1, ".", ",") + "%"
                : null;
            },
            distance: -15,
            style: {
              textOutline: 0,
            },
          },
          borderWidth: 0,
          startAngle: -180,
          endAngle: 180,
          center: ["50%", "50%"],
          states: {
            hover: {
              opacity: "1",
              color: colors,
            },
            inactive: {
              opacity: "1",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          innerSize: "60%",
          data: seriesData,
        },
      ],
      credits: false,
    });
  }

  render() {
    const { data, sum, colors, chartName } = this.props;
    const {
      isOpenListingPopup,
      name,
      collegesByState,
      isFetchingCollegesByState,
    } = this.state;

    return (
      <React.Fragment>
        <div className="donut-chart">
          <Div>
            <div id={this.id} />
          </Div>
          <LegendWrapper>
            {_.map(data, (key, i) => (
              <div className="legend-wrapper" key={i}>
                <Marker style={{ borderColor: colors[i] }} />
                <span className="d-flex ml-2">
                  <Num
                    onClick={() =>
                      chartName === "college_chart"
                        ? this.handleCollegePopup(key["name"])
                        : null
                    }
                  >
                    {key["name"]}
                  </Num>
                  <Text>{Math.round((key["count"] * 100) / sum) + "%"}</Text>
                </span>
              </div>
            ))}
          </LegendWrapper>
        </div>
        {!isFetchingCollegesByState && (
          <ListingModal
            show={isOpenListingPopup}
            name={name}
            handleClose={this.handleCollegePopup}
            collegesByState={collegesByState}
            {...this.props}
          />
        )}
      </React.Fragment>
    );
  }
}

export default DonutChart;

import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Highcharts from "highcharts";
import Styled from "styled-components";
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
  .highcharts-title span {
    z-index: 1 !important;
  }
`;

class DonutChart extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    seriesData: PropTypes.array,
    sum: PropTypes.number,
  };
  constructor(props) {
    super(props);

    this.id = `donut_chart__${Math.floor(Math.random() * 1000)}`;
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps) {
    const { seriesData } = this.props;
    this.renderChart();
    if (!_.isEmpty(prevProps.seriesData) && !_.isEmpty(seriesData)) {
      if (prevProps.seriesData[0][1] !== seriesData[0][1]) {
        this.renderChart();
      }
    }
  }

  renderChart() {
    const { data, title, seriesData } = this.props;
    if (_.isEmpty(data)) {
      return null;
    }

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
    return (
      <Div>
        <div id={this.id} />
      </Div>
    );
  }
}

export default DonutChart;

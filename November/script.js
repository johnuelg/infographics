/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
  layout: root.verticalLayout
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
var series = chart.series.push(am5percent.PictorialStackedSeries.new(root, {
  alignLabels: true,
  orientation: "vertical",
  valueField: "value",
  categoryField: "category",
  svgPath: "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"
}));

series.labelsContainer.set("width", 100);
series.ticks.template.set("location", 0.6);

// Set custom colors for each level
series.slices.template.adapters.add("fill", function (fill, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    switch (dataItem.get("category")) {
      case "Level 1":
        return am5.color("#5083c5");
      case "Level 2":
        return am5.color("#f02f26");
      case "Level 3":
        return am5.color("#fff205");
      case "Level 4":
        return am5.color("#0fb259");
      case "Level 5":
        return am5.color("#b1b3b5");
    }
  }
  return fill;
});

// Set data with automatic percentage computation
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
var data = [
  { value: 10, category: "Level 1" },
  { value: 9, category: "Level 2" },
  { value: 6, category: "Level 3" },
  { value: 5, category: "Level 4" },
  { value: 4, category: "Level 5" }
];

var totalValue = data.reduce((sum, item) => sum + item.value, 0);
data.forEach(item => {
  item.percent = Math.round((item.value / totalValue) * 100) + "%";
});

series.data.setAll(data);

// Add volume value and percentage to labels
series.labels.template.adapters.add("text", function (text, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    return `${dataItem.get("category")}: ${dataItem.get("value")} (${dataItem.get("percent")})`;
  }
  return text;
});

// Add volume value and percentage to tooltips
series.slices.template.adapters.add("tooltipText", function (tooltipText, target) {
  var dataItem = target.dataItem;
  if (dataItem) {
    return `${dataItem.get("category")}: ${dataItem.get("value")} (${dataItem.get("percent")})`;
  }
  return tooltipText;
});

// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
chart.appear(1000, 100);

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
  svgPath: "M16.998 97.65v54.648c0 4.943 4.008 8.95 8.951 8.95 4.941 0 8.949-4.007 8.949-8.95v-39.955h6.281v39.955c0 4.943 4.006 8.95 8.949 8.95 4.943 0 8.949-4.007 8.949-8.95V97.65H16.998zM16.998 66.878V93.65h42.08V66.897c.567 1.423 1.107 3.047 1.6 4.893l12.949-1.859c-1.962-8.113-4.924-13.862-8.219-17.951-5.856-7.293-12.436-8.502-13.58-8.576-1.39-.149-2.721.155-3.855.787H47.75c-1.734 3.091-5.426 5.232-9.711 5.232-4.286 0-7.977-2.141-9.711-5.232h-.227c-1.134-.632-2.464-.936-3.852-.786-1.147.075-7.729 1.284-13.582 8.576-3.295 4.088-6.257 9.837-8.219 17.95l12.942 1.858C15.884 69.935 16.429 68.308 16.998 66.878z M0 93.521c0 1.403.021 2.852.063 4.345.101 3.524 2.989 6.313 6.491 6.313.064 0 .129-.001.192-.003 3.589-.102 6.415-3.095 6.311-6.684C13.019 96.128 13 94.805 13 93.521c.002-7.859.69-14.059 1.728-18.947L1.833 72.721C.677 78.496-.001 85.358 0 93.521zM63.074 93.521c0 1.281-.02 2.607-.057 3.98-.098 3.588 2.733 6.577 6.32 6.675.061.002.121.002.182.002 3.508 0 6.396-2.795 6.494-6.323.041-1.484.061-2.929.061-4.335.002-8.162-.676-15.024-1.832-20.799l-12.899 1.853C62.384 79.467 63.076 85.667 63.074 93.521zM47.868 36.491c5.823-3.393 9.749-9.688 9.749-16.913C57.617 8.765 48.852 0 38.039 0S18.461 8.765 18.461 19.578c0 7.225 3.926 13.52 9.749 16.913 2.892 1.684 6.242 2.665 9.829 2.665C41.627 39.156 44.978 38.175 47.868 36.491z"
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
        return am5.color("#e0e0e0");
    }
  }
  return fill;
});

// Set data with automatic percentage computation
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
var data = [
  { value: 11, category: "Level 1" },
  { value: 106, category: "Level 2" },
  { value: 3174, category: "Level 3" },
  { value: 2203, category: "Level 4" },
  { value: 436, category: "Level 5" }
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

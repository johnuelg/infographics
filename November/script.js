/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var iconPath = "M16.998 97.65v54.648c0 4.943 4.008 8.95 8.951 8.95 4.941 0 8.949-4.007 8.949-8.95v-39.955h6.281v39.955c0 4.943 4.006 8.95 8.949 8.95 4.943 0 8.949-4.007 8.949-8.95V97.65H16.998zM16.998 66.878V93.65h42.08V66.897c.567 1.423 1.107 3.047 1.6 4.893l12.949-1.859c-1.962-8.113-4.924-13.862-8.219-17.951-5.856-7.293-12.436-8.502-13.58-8.576-1.39-.149-2.721.155-3.855.787H47.75c-1.734 3.091-5.426 5.232-9.711 5.232-4.286 0-7.977-2.141-9.711-5.232h-.227c-1.134-.632-2.464-.936-3.852-.786-1.147.075-7.729 1.284-13.582 8.576-3.295 4.088-6.257 9.837-8.219 17.95l12.942 1.858C15.884 69.935 16.429 68.308 16.998 66.878z M0 93.521c0 1.403.021 2.852.063 4.345.101 3.524 2.989 6.313 6.491 6.313.064 0 .129-.001.192-.003 3.589-.102 6.415-3.095 6.311-6.684C13.019 96.128 13 94.805 13 93.521c.002-7.859.69-14.059 1.728-18.947L1.833 72.721C.677 78.496-.001 85.358 0 93.521zM63.074 93.521c0 1.281-.02 2.607-.057 3.98-.098 3.588 2.733 6.577 6.32 6.675.061.002.121.002.182.002 3.508 0 6.396-2.795 6.494-6.323.041-1.484.061-2.929.061-4.335.002-8.162-.676-15.024-1.832-20.799l-12.899 1.853C62.384 79.467 63.076 85.667 63.074 93.521zM47.868 36.491c5.823-3.393 9.749-9.688 9.749-16.913C57.617 8.765 48.852 0 38.039 0S18.461 8.765 18.461 19.578c0 7.225 3.926 13.52 9.749 16.913 2.892 1.684 6.242 2.665 9.829 2.665C41.627 39.156 44.978 38.175 47.868 36.491z";

var chart = am4core.create("chartdiv", am4charts.SlicedChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
chart.paddingLeft = 150;
chart.language.locale["_decimalSeparator"] = ".";
chart.language.locale["_thousandSeparator"] = ",";

chart.data = [{
    "name": "Urgent",
    "value": 55,
    "volume": 3291,
    "color": am4core.color("#7ac3e0")
}, {
    "name": "Non-Urgent",
    "value": 45,
    "volume": 2639,
    "color": am4core.color("#1494d3")
}];

var series = chart.series.push(new am4charts.PictorialStackedSeries());
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;

// Configure tooltips
series.slices.template.tooltipText = "{category}: {value}% ({volume.formatNumber('#,###')})";

// Configure labels
series.labels.template.text = "{category}: {value.formatNumber('#')}%";
series.labelsContainer.width = 150;
series.labelsContainer.paddingRight = 200;
series.slices.template.propertyFields.fill = "color";

series.maskSprite.path = iconPath;
series.ticks.template.locationX = 1;
series.ticks.template.locationY = 0;

chart.legend = new am4charts.Legend();
chart.legend.disabled = true;
chart.legend.position = "top";
chart.legend.paddingRight = 150;
chart.legend.paddingBottom = 40;

let marker = chart.legend.markers.template.children.getIndex(0);
chart.legend.markers.template.width = 30;
chart.legend.markers.template.height = 30;
marker.cornerRadius(20, 20, 20, 20);

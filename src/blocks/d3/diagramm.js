import * as d3 from "d3";

let dataset = [
    {"color": "#FFE39C", "rate": 260},
    {"color": "#6FCF97", "rate": 130},
    {"color": "#BC9CFF", "rate": 130}
];
let diagram = d3.select('.js-d3-diagramm');

let width = 180, 
    height = 180,
    radius = Math.min(width, height) / 2;

let color = d3.scaleOrdinal(d3.schemeCategory10);
// let color = d3.scaleOrdinal().domain(dataset.map(d => d.color))
//             .range(d3.quantize(t => d3.interpolateSpectral(t * 0.3 + 0.1), dataset.length).reverse());
let arc = d3.arc().innerRadius(radius).outerRadius(radius - 10);
let pie = d3.pie().padAngle(0.005).sort(null).value(d => d.rate);
let arcs = pie(dataset);
let svg = diagram.append("svg");
svg.attr("height", height)
    .attr("width", width)
    .attr("viewBox", [-width / 2, -height / 2, width, height]);

svg.selectAll("path")
    .data(arcs)
    .join("path")
    .attr("fill", function(d) {return d.data.color})
    .attr("d", arc)

// let g = svg.append("g").attr("transform", "translate(" + radius + "," + radius + ")");
// let color = d3.scaleOrdinal(d3.schemeCategory10);

// let pie = d3.pie().value(function(d) {
//     return d.rate;
// });

// let path = d3.arc().outerRadius(radius).innerRadius(radius - 10);
// let arc = g.selectAll("arc")
//             .data(pie(dataset))
//             .enter()
// //             .append("g");
// arc.append("path")
//     .data(arcs)
//     .attr("d", path)
//     .join("path")
//     .attr("fill", d => color(d.dataset.color))
//     .attr("d", arc);




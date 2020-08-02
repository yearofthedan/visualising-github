const height = 600;
const width = 800;

function color(d) {
  const scale = d3.scaleOrdinal(d3.schemeCategory10);
  return d => scale(d);
}

const drag = simulation => {

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
  .on("start", dragstarted)
  .on("drag", dragged)
  .on("end", dragended);
}

export function draw({links, nodes}) {
  // drawn from https://observablehq.com/@d3/force-directed-graph

  const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("charge", d3.forceManyBody().strength(-100))
  .force("x", d3.forceX())
  .force("y", d3.forceY());

  d3.select("body").select("svg").remove();

  const svg = d3.select("body").append("svg")
  .attr("viewBox", [-width / 2, -height / 2, width, height]);

  const link = svg.append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke-width", d => Math.sqrt(d.value));

  const labels = svg.append("g")
  .attr("fill", "blue")
  .attr("font-size", "12px")
  .attr("stroke-width", 1.5)
  .selectAll("text")
  .data(nodes)
  .join("text")
  .text(d => d.id);

  const node = svg.append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", 6)
  .attr("fill", color)
  .call(drag(simulation));

  node.append("title")
  .text(d => d.id);

  simulation.on("tick", () => {
    link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

    node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

    labels
    .attr("x", d => d.x + 12)
    .attr("y", d => d.y - 12);
  });

  return svg.node();
}

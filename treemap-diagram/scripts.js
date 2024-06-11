kickstarterURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
movieURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
videoGamesURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

fetch(videoGamesURL)
  .then((response) => response.json())
  .then((data) => {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 1200 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

    const svg = d3
      .select("#data-viz")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const legend = d3.select("#legend").attr("width", 400).attr("height", 300).append("g");

    const root = d3
      .hierarchy(data, (node) => node.children)
      .sum((d) => d.value)
      .sort((node1, node2) => node2.value - node1.value);

    d3.treemap().size([width, height]).padding(2)(root);

    svg
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("rect")
      .style("stroke", "black")
      .style("fill", (d) => {
        const dataColors = [
          "#00008B",
          "#B8860B",
          "#2F4F4F",
          "#008B8B",
          "#8A2BE2",
          "#DC143C",
          "#A52A2A",
          "#DEB887",
          "#D2691E",
          "#FF7F50",
          "#BDB76B",
          "#8FBC8F",
          "#E9967A",
          "#483D8B",
          "#228B22",
          "#4B0082",
          "#9370DB",
          "#48D1CC",
        ];
        const dataCategory = [
          "2600",
          "Wii",
          "NES",
          "GB",
          "DS",
          "X360",
          "PS3",
          "PS2",
          "SNES",
          "GBA",
          "PS4",
          "3DS",
          "N64",
          "PS",
          "XB",
          "PC",
          "PSP",
          "XOne",
        ];

        let category = d.data.category;

        const index = dataCategory.indexOf(category);
        return index >= 0 ? dataColors[index] : "#000000";
      })
      .attr("data-name", (d) => d.data.name)
      .attr("data-category", (d) => d.data.category)
      .attr("data-value", (d) => d.data.value)
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => {
        return d.x1 - d.x0;
      })
      .attr("height", (d) => {
        return d.y1 - d.y0;
      })
      .attr("class", "tile");

    svg
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("x", function (d) {
        return d.x0 + 5;
      })
      .attr("y", function (d) {
        return d.y0 + 20;
      })
      .text(function (d) {
        return d.data.name;
      })
      .attr("font-size", "15px")
      .attr("fill", "white")
      .attr("font-size", 10);

    legend
      .selectAll("rect")
      .data(root.data.children)
      .enter()
      .append("rect")
      .attr("width", 30)
      .attr("height", 30)
      .attr("y", (d, i) => (i > 8 ? 0 + (i - 8) * 33 - 35 : i * 33))
      .attr("x", (d, i) => (i > 8 ? 200 : 0))
      .style("fill", (d) => {
        const dataColors = [
          "#00008B",
          "#B8860B",
          "#2F4F4F",
          "#008B8B",
          "#8A2BE2",
          "#DC143C",
          "#A52A2A",
          "#DEB887",
          "#D2691E",
          "#FF7F50",
          "#BDB76B",
          "#8FBC8F",
          "#E9967A",
          "#483D8B",
          "#228B22",
          "#4B0082",
          "#9370DB",
          "#48D1CC",
        ];
        const dataCategory = [
          "2600",
          "Wii",
          "NES",
          "GB",
          "DS",
          "X360",
          "PS3",
          "PS2",
          "SNES",
          "GBA",
          "PS4",
          "3DS",
          "N64",
          "PS",
          "XB",
          "PC",
          "PSP",
          "XOne",
        ];

        let childArray = d.name;

        const index = dataCategory.indexOf(childArray);

        return index >= 0 ? dataColors[index] : "#000000";
      })
      .attr("class", "legend-item");

    legend
      .selectAll("text")
      .data(root.data.children)
      .enter()
      .append("text")
      .html((d) => {
        return "- " + d.name;
      })
      .attr("y", (d, i) => (i > 8 ? 0 + (i - 8) * 32.5 - 10 : i * 32.5 + 25))
      .attr("x", (d, i) => (i > 8 ? 235 : 35));

    console.log(root.data.children);
  })
  .catch((err) => console.error(err));

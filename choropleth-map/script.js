const countyURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const educationURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let svg = d3.select("#map");
let countyData;
let educatoinData;

d3.json(countyURL).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    countyData = topojson.feature(data, data.objects.counties).features;
    console.log(countyData);

    d3.json(educationURL).then((data, error) => {
      if (error) {
        console.log(error);
      } else {
        educatoinData = data;
        console.log(educatoinData);

        svg
          .selectAll("path")
          .data(countyData)
          .enter()
          .append("path")
          .attr("d", d3.geoPath())
          .attr("class", "county");
      }
    });
  }
});

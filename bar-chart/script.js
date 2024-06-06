fetch("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
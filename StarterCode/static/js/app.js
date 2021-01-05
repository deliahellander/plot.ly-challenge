// git statusDefine a function that will create metadata for given sample
function buildMetadata(id) {

    // Read the json data
    d3.json("\samples.json").then((data)=> {
        // Parse and filter the data to get the sample's metadata 
        var metadata = data.metadata;
        console.log(metadata);

        // filter data by id
        var results = metadata.filter(metadata => metadata.id.toString() === id)[0];

        // Specify the location of the metadata and update it
        var demographicInfo = d3.select("#sample-metadata");

        //empty previous inputs
        demographicInfo.html("");

        //append info into the panel
        Object.entries(results).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });

}

// Define a function that will create charts for given sample
function buildCharts(id) {

    // Read the json data
    d3.json("\samples.json").then ((data) =>{
        console.log(data)

        // filter data by id
        var result = data.samples.filter(s => s.id.toString() === id)[0];
        
        //retrieving top 10 ids
        var ids = result.otu_ids.slice(0, 10).reverse();;
        console.log(ids)

        //retrieving top 10 sample values
        var sampleValues = result.sample_values.slice(0,10).reverse();
        console.log(sampleValues)

        //retrieving top 10 otu lables
        var labels = result.otu_labels.slice(0,10);
        console.log(labels)


    //Bar Chart
        // display the top 10 OTUs found in that individual ID. 
        // get the otu id's to the desired form for the plot
        var OTU_id = ids.map(d => "OTU " + d);
        console.log(`OTU IDS: ${ids}`)

        // retrieve lables for top 10 OTUs for the plot
        console.log(`OTU_labels: ${labels}`)

        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: "blue"},
            type: "bar",
            orientation: "h",
        };
        
        // create data variable to hold trace
        var data = [trace];

        // editing layout of bar chart
        var layout = {
            margin: {
                l: 100,
                r: 75,
                t: 75,
                b: 75
            }
        };

        // Create bar chart in correct location
        Plotly.newPlot("bar", data, layout);

    // Bubble Chart
        var trace2 = {
            x: result.otu_ids,
            y: result.sample_values,
            mode: "markers",
            marker: {
                size: result.sample_values,
                color: result.otu_ids
            },
            text: result.labels

        };

        // set the layout for the bubble plot
        var layout_2 = {
            xaxis: {title: "OTU ID"},
            height: 500,
            width: 1100
        };

        // creating data variable 
        var data2 = [trace2];

        // Create bubble chart in correct location
        Plotly.newPlot("bubble", data2, layout_2); 
    });
    
}


// Define function that will run on page load
function init() {

    // Add dropdown option for each sample
    var dropdown = d3.select("#selDataset");

    // Read json data
    d3.json("\samples.json").then((data)=> {
        console.log(data)

        // Parse and filter data to get sample names
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Use first sample to build metadata and initial plots
        buildCharts(data.names[0]);
        buildMetadata(data.names[0]);
    });

}

function optionChanged(id) {
    buildCharts(id);
    buildMetadata(id);
}

// Initialize dashboard on page load
init();


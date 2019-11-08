//--- Document Ready ----------------------------------------------------------------------------------------   //

$(document).ready( function()  {

    window.addEventListener ? window.addEventListener("message", $.receive_message) : window.attachEvent("onmessage", $.receive_message);


    dataset = {
        "children": [{"Shortname":"Ideologie","Name":"Ablehnung der Ideologie","Count":44,"Color":"#4e527f"},
            {"Shortname":"Partei-Aufträge","Name":"Ablehnung von Partei-Aufträgen","Count":29,"Color":"#4e527f"},
            {"Shortname":"Kirchenaustritt","Name":"Zwang zum Kirchenaustritt","Count":21,"Color":"#4e527f"},
            {"Shortname":"Jugendweihe","Name":"Ablehnung der Jugendweihe","Count":36,"Color":"#4e527f"},
            {"Shortname":"Spitzelauftrag","Name":"Spitzelaufträge gegen Geistliche","Count":14,"Color":"#4e527f"},
            {"Shortname":"Zeugen Jehovas","Name":"Bekenntnis zu den Zeugen Jehovas","Count":27,"Color":"#4e527f"},
            {"Shortname":"Erziehungssystem","Name":"Ablehnung des Erziehungssystems","Count":48,"Color":"#4e527f"},
            {"Shortname":"Studium","Name":"Nicht-Zulassung zum Studium","Count":41,"Color":"#4e527f"},
            {"Shortname":"Reiseverbot", "Name":"Keine Reisegenehmigung oder legale Umsiedlung","Count":68,"Color":"#4e527f"},
            {"Shortname":"Spitzelauftrag","Name":"Spitzelaufträge und Spitzelverpflichtungen","Count":135,"Color":"#4db9bf"},
            {"Shortname":"Parteiauftrag","Name":"Parteiaufträge","Count":84,"Color":"#4db9bf"},
            {"Shortname":"Militärdienst","Name":"Armee- oder Volkspolizei-Eintritt","Count":59,"Color":"#4db9bf"},
            {"Shortname":"Arbeitseinsatz","Name":"Arbeitseinsatz von Jugendlichen","Count":12,"Color":"#4db9bf"},
            {"Shortname":"Politische Aktivität","Name":"Aufforderung zu politischen Betätigung","Count":528,"Color":"#4db9bf"},
            {"Shortname":"Regime","Name":"Widerstand gegen das Regime","Count":57,"Color":"#4286be"},
            {"Shortname":"West-Beziehung","Name":"Verfolgung von Beziehungen zum Westen","Count":81,"Color":"#4286be"},
            {"Shortname":"Passgesetz","Name":"Verstöße gegen das Passgesetz","Count":140,"Color":"#4286be"},
            {"Shortname":"Pol. Untätigkeit","Name":"Maßregelung wegen politischer Untätigkeit","Count":22,"Color":"#4286be"},
            {"Shortname":"Haft","Name":"Politische Häftlinge","Count":44,"Color":"#4286be"},
            {"Shortname":"Reorganisation","Name":"Maßnahmen im Zuge der Reorganisation","Count":14,"Color":"#4286be"},
            {"Shortname":"Freizügigkeit","Name":"Inanspruchnahme des Freizügigkeitsrechts","Count":18,"Color":"#4286be"},
            {"Shortname":"wirtsch. Verstaatlichung","Name":"Verstaatlichuhng der privaten Wirtschaft","Count":59,"Color":"#9a9fe7"},
            {"Shortname":"Kollektivierung","Name":"Ablehnung von Kollektivierung","Count":136,"Color":"#9a9fe7"},
            {"Shortname":"Lohn / Arbeit","Name":"Lohn- und Arbeitsschwierigkeiten","Count":47,"Color":"#9a9fe7"},
            {"Shortname":"Entlassung","Name":"Entlassung wegen Betriebseinschränkung","Count":17,"Color":"#9a9fe7"},
            {"Shortname":"Normerhöhung","Name":"Normerhöhung","Count":26,"Color":"#9a9fe7"},
            {"Shortname":"Einschränkung","Name":"Einschränkung bisheriger Entscheidungsbefugnisse","Count":23,"Color":"#9a9fe7"},
            {"Shortname":"Planwirtschaft","Name":"Planschwierigkeiten","Count":22,"Color":"#9a9fe7"},
            {"Shortname":"Wirtschaftsgesetze","Name":"Verstöße gegen Wirtschaftsgesetze","Count":32,"Color":"#9a9fe7"},
            {"Shortname":"Familie","Name":"Familienzusammenführung","Count":343,"Color":"#6db3a2"},
            {"Shortname":"Eheprobleme","Name":"Differenzen in der Ehe","Count":53,"Color":"#6db3a2"},
            {"Shortname":"Sorgerecht","Name":"Drohender Sorgerechtsentzug","Count":14,"Color":"#6db3a2"},
            {"Shortname":"Einkommen","Name":"Wunsch nach besseren Einkommen","Count":205,"Color":"#6db3a2"},
            {"Shortname":"Arbeit in BRD","Name":"Arbeitsaufnahme in BRD","Count":19,"Color":"#6db3a2"},
            {"Shortname":"Auswanderung","Name":"Auswanderung","Count":14,"Color":"#6db3a2"},
            {"Shortname":"Pendler","Name":"Ost-West-Pendler","Count":53,"Color":"#6db3a2"},
            {"Shortname":"Angst","Name":"Angst vor Bestrafung","Count":63,"Color":"#6db3a2"},
            {"Shortname":"Sonstige Gründe","Name":"Sonstige Gründe","Count":162,"Color":"#5b6065"}]

    };


    var useraction = "mouseover";
    var diameter = 760;
    if (window.innerWidth < 750)     {
        diameter = window.innerWidth - 10;
        d3.select("main")
            .style("height", diameter + 80+ "px");
    };

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select(".svg-content")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset)
        .sum(function(d) { return d.Count; });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });



    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .attr("class", "circle")
        .style("fill", function(d) {
            return d.data.Color;
        })


    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text("+")
        .attr("font-family",  "HelveticaLight")
        .attr("font-size", function(d){
            return d.r/2;
        })
        .attr("fill", "white")
        .attr("inline-size", 80)
        .attr("class", "circletxt");


    if ('ontouchstart' in window) {
        useraction = "click";

    }

    if (window.innerWidth < 600)     {
        node.on(useraction, function (d) {


            var g = d3.select(this); // The node
            var htmltxt =  d.data.Name;
            var htmlcount = d.data.Count;

            var div = d3.select(".svg-content").append("div")
                .attr('pointer-events', 'none')
                .attr("class", "infolayer")
                .html("<span style='font-family:HelveticaBold'>"+htmltxt+"</span><br><br>"+htmlcount+" Nennungen")
                .style("left", "5px")
                .style("top", "0px");
           
        });
    } else {
        node.on(useraction, function (d) {
            var g = d3.select(this); // The node
            var htmltxt =  d.data.Name;
            var htmlcount = d.data.Count;
            var posx=d.x +20+ "px";
            if(window.innerWidth > 1000){
                posx = d.x +200+ "px";
            }
            var posy=d.y +"px"
            var div = d3.select(".svg-content").append("div")
                .attr('pointer-events', 'none')
                .attr("class", "infolayer")
                .html("<span style='font-family:HelveticaBold'>"+htmltxt+"</span><br><br>"+htmlcount+" Nennungen")
                .style("left", posx)
                .style("top", posy);
        });
        node.on("mouseout", function (d) {
            d3.selectAll(".infolayer").remove();

        });

    };








} );

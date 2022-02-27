$(document).ready(function() {
    window.state = [];
    fetch("input.json")
        .then(response => response.json())
        .then(data => {
            var key = Object.keys(data);
            key.forEach(famille => {
                if (famille == "UX/UI") {
                    var tmp = "UXUI"
                    $("#" + tmp + "").append(default_card(data[famille]));
                    $(".badge").html(window.state.length)

                } else {
                    $("#" + famille + "").append(default_card(data[famille]));
                }
            })



            // Click on shipping cart
            $(document).on("click", "#panier", function(e) {
                visual_card(window.state);
            });

            // Click on download
            $(document).on("click", "#btn_download", function(e) { // C'est ici pour Download
                console.log("Download...")
                console.log(window.state); // Parser le tableau avec JSON.stringify(window.state);
            }); // fin la 


            // Click on card
            $(document).on("click", ".card-body", function(e) {
                console.log($(this).data('id'));
                var id = $(this).data('id');
                var famille = $(this).data('famille');
                var page = ""
                $("#modal_indivudal_card").html("");
                data[famille].forEach(element => {
                    if (element.id == id) {

                        page += "<div class=\"row\"> <div class=\"shadow_box\" " + get_color_cycle(element.cycle) + "> " + element.cycle + "</div>" + "<div class=\"shadow_box\" " + get_color_difficulty(element.difficulty) + "> " + element.difficulty + "</div> </div> <br>";
                        page += " <h5> " + element.descript + " </h5> <br>";
                        page += "<div style=text-align:center> <b> " + element.title + " </b> </div> <hr> <br>";

                        page += "<div class=\"container\">"
                        page += "  <div class=\"row\">"
                        page += "    <div class=\"col-sm-4\">" + "Problématique : " + "</div>"
                        page += "    <div class=\"col-sm-8\">" + element.justif + "</div>"
                        page += "  </div> <br> <br>"

                        page += "  <div class=\"row\">"
                        page += "    <div class=\"col-sm-4\">" + "Vérification : " + "</div>"
                        page += "    <div class=\"col-sm-8\">" + element.test + "</div>"
                        page += "  </div> <br> <hr>"

                        page += "  <div class=\"row\">"
                        page += "    <div class=\"col\" style=text-align:center>" + " ECO SCORE : " + "</div>"
                        page += "  </div> <br> "

                        page += "  <div class=\"row\">"
                        page += "    <div class=\"col\" style=text-align:center>" + "Score people : <b>" + element.score_people + "</b> </div>";
                        page += "    <div class=\"col\" style=text-align:center>" + "Score planet : <b>" + element.score_planet + "</b> </div>";
                        page += "    <div class=\"col\" style=text-align:center>" + "Score prosperity : <b>" + element.score_prosperity + " </b> </div>";
                        page += "  </div> <hr>"
                        page += "</div> "

                        page += "<div style= left:10%; font-size:small> " + element.id + " </div>"
                        $("#modal_indivudal_card").append(page);
                    }
                })
            });

            // Add card
            $(document).on("click", "#add", function(e) {
                var id = $(this).data('id');
                var famille = $(this).data('famille');
                $(this).prop('disabled', true);
                data[famille].forEach(element => {
                    if (element.id == id) {
                        window.state.push(element);
                        $(".badge").html(window.state.length)
                    }
                })
            });

            // Delete card
            $(document).on("click", "#delete", function(e) {
                var id = $(this).data('id');
                var famille = $(this).data('famille');
                var i = 0;
                window.state.forEach(element => {
                    if (element.id == id) {
                        window.state.splice(i, 1);
                        $(".badge").html(window.state.length)
                        $("#modal_card ." + id + "").remove()
                        $("#modal_card").html("");
                        $("#modal_card").append(visual_card(window.state));
                    }
                    i++;
                })
            });

        });
});


function get_color_cycle(element) {
    ret_color = ""
    switch (element) {
        case "Réalisation":
            ret_color = "style =\"background-color: #EE6C4D;\""
            break;
        case "Administration":
            ret_color = "style =\"background-color: #005F73; \""
            break;
        case "Déploiement":
            ret_color = "style =\"background-color: #87986A; \""
            break;
        case "Acquisition":
            ret_color = "style =\"background-color: #CA6702; \""
            break;
        case "Conception":
            ret_color = "style =\"background-color: #8ECAE6; \""
            break;
        case "Utilisation":
            ret_color = "style =\"background-color: brown; \""
            break;
        case "Maintenance":
            ret_color = "style =\"background-color: #DDBEA9; \""
            break;
        case "Fin de Vie":
            ret_color = "style =\"background-color: #FFACC5; \""
            break;
        case "Revalorisation":
            ret_color = "style =\"background-color: #78290F; \""
            break;
        case "N/A":
            ret_color = "style =\"background-color: #06D6A0; \""
            break;
        default:
            ret_color = "style =\"background-color: black; \""
            break;
    }
    return ret_color;
}

function get_color_difficulty(element) {
    ret_color = ""
    switch (element) {
        case "easy":
            ret_color = "style =\"background-color: green; \""
            break;
        case "medium":
            ret_color = "style =\"background-color: orange; \""
            break;
        case "hard":
            ret_color = "style =\"background-color: red; \""
            break;
        case "N/A":
            ret_color = "style =\"background-color: grey; \""
            break;
        default:
            ret_color = "style =\"background-color: black; \""
            break;
    }
    return ret_color;
}

function visual_card(tab) {
    var page = "";
    tab.forEach(element => {
        page = "";
        page += "<div class=\"card\"  class = \"" + element.id + "\" style =\"width: 18em; height : 16em;\">";
        page += "   <div class=\"card-header\"> " + "<div class=\"row\"> <div class=\"shadow_box\" " + get_color_cycle(element.cycle) + "> " + element.cycle + "</div>" + "<div class=\"shadow_box\" " + get_color_difficulty(element.difficulty) + "> " + element.difficulty + "</div> </div>" + " </div>";
        page += "       <div class=\"card-body\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal2\"  data-famille = \"" + element.famille + "\" data-id = \"" + element.id + "\">";
        page += "           <h3 class=\"card-title\"></h5>";
        page += "           <h5 class=\"card-text\"><small class=\"text-muted\">" + element.test + "</small></p>";
        page += "       </div>";
        if (element.incont && element.famille != "HEBERGEMENT") {
            page += "    <div class=\"card-footer\" id=\"tmp\"> " + element.id + "</div>";
        } else
            page += "    <div class=\"card-footer\" id=\"tmp\"> " + element.id + " <button type=\"button\" id =\"delete\"  data-famille = \"" + element.famille + "\" data-id = \"" + element.id + "\"  class=\"btn-primary\">DELETE</button></div>";
        page += "</div>";

        if (element.cycle == "N/A") {
            var tmp = "NA";
            $("#" + tmp + "").append(page);
        } else {
            $("#" + element.cycle + "").append(page);
        }
    });

}



function default_card(tab) {
    var page = "";
    tab.forEach(element => {
        if (element.incont && element.famille != "HEBERGEMENT")
            window.state.push(element);
        page += "<div class=\"card\"  class = \"" + element.id + "\"  data-famille = \"" + element.famille + "\" data-id = \"" + element.id + "\"  style =\"max-width: 18rem; min-height : 10em;\">";
        page += "   <div class=\"card-header\"> " + "<div class=\"row\"> <div class=\"shadow_box\" " + get_color_cycle(element.cycle) + "> " + element.cycle + "</div>" + "<div class=\"shadow_box\" " + get_color_difficulty(element.difficulty) + "> " + element.difficulty + "</div> </div>" + " </div>";
        page += "       <div class=\"card-body\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModal2\"  data-famille = \"" + element.famille + "\" data-id = \"" + element.id + "\">";
        page += "           <h3 class=\"card-title\"></h5>";
        page += "           <p class=\"card-text\"><medium class=\"text-muted\">" + element.title + "</small></p>";
        page += "       </div>";
        page += "       <div class=\"card-footer\" id=\"tmp\"> " + element.id + " <button type=\"button\" id=\"add\"  data-famille = \"" + element.famille + "\" data-id = \"" + element.id + "\" class=\"btn btn-primary\" > <i class = \"fa fa-shopping-cart\"></i></button></div>"; //+ "</div>";
        page += "</div>";
    });

    return page;
}
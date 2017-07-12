$(document).ready(function(){
    var streamers =
        ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    var twitchCallBack= function(){
        var url ="https://api.twitch.tv/kraken/streams/" + streamers[i] +"?client_id=7slsxf0da18e4dn8rou1dw1ji1oxsca";
        $.ajax({
            url:url,
            dataType:'jsonp',
            type:"GET",
            success:function(data){
     // check if user online offline or deleted
                if(data.stream === null){
                    updateOffline(data);
                }
                else if(data.message){
                    updateDeleted(data);
                }
                else
                {
                    updateOnline(data);
                }
            },
            error:function(){
                console.log("error");
            }
        });

        var updateOnline = function(data){
            console.log(url + " " + "is online");
            $("#online").append("<div class=\"online-well well container-fluid\">"+"<img  class=img-circle src="+ data.stream.channel.logo +">"+"<p>"+"<a target='_blank' href="+
                data.stream.channel.url + ">" + data["stream"]._links["self"].substr(37)+": "+
                data.stream.game +" "+"("+data.stream.viewers+"<i class='fa fa-eye'></i>"+")"+"</a>"+"</p>"+"</div>");

        };

        var updateOffline = function(data) {
            var offlineUrl = data._links.channel+"?client_id=7slsxf0da18e4dn8rou1dw1ji1oxsca";
            $.ajax({
                url:offlineUrl,
                dataType:"jsonp",
                type:"GET",
                success:function(offlineData){
                    console.log(url + " " + "is offline")
                    $("#offline").append("<div class=\"offline-well well container-fluid\">"+"<img  class=img-circle src="+ offlineData.logo +">"+"<p>"+"<a target='_blank' href="
                        + offlineData.url+">"+
                        data["_links"].self.substr(37)+"</a>"+"</p>"+"</div>");

                },
                error:function(){
                    console.log("error");
                }

            });


        };
        var updateDeleted = function(data){
            console.log(url + " "+"does not exist");
            $("#deleted-user").append("<div  class=\"deleted-well well container-fluid\">"+"<img  class=img-circle src='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQm7XIo4srBySyMhZmhChDONNWQRrvWo9HNAej2tuNFkOeFVfuN'>"+"<p>" +
                data.message+"</p>"+"</div>");
        }
    };

    // loop through array of users
    for (var i = 0; i < streamers.length; i++){
        twitchCallBack()
    }

    $("#all-btn").click(function(){
        $("#online").show(1000);
        $("#offline").show(1000);
        $("#deleted-user").show(1000);
    });

    $("#offline-btn").click(function(){
        $("#online").hide(1000);
        $("#deleted-user").hide(1000);
        $("#offline").show(1000);
    });

    $("#online-btn").click(function(){
        $("#offline").hide(1000);
        $("#deleted-user").hide(1000);
        $("#online").show(1000);
    });
});

/**
 * Created by agubertoni on 6/9/15.
 */

WaterSensors = new Mongo.Collection('sensors');

if (Meteor.isServer) {
    Meteor.startup(function(){
        if (WaterSensors.find().count() === 0){
            WaterSensors.insert({'node':'01','flow':3});
            WaterSensors.insert({'node':'02','flow':2});
            WaterSensors.insert({'node':'03','flow':5});
            WaterSensors.insert({'node':'04','flow':9});
        }
    });
}

if (Meteor.isClient) {

    Template.morrisBar.onRendered(function () {

        var drawChart = function () {
            $('#myfirstchart').empty();
            var data = WaterSensors.find({},{fields:{node:1,flow:1},sort:{node:1}}).fetch();

            if (data) {
                new Morris.Bar({
                    // ID of the element in which to draw the chart.
                    element: 'myfirstchart',
                    // Chart data records -- each entry in this array corresponds to a point on
                    // the chart.
                    data:    data,
                    // The name of the data record attribute that contains x-values.
                    xkey:    'node',
                    // A list of names of data record attributes that contain y-values.
                    ykeys:   ['flow'],
                    // Labels for the ykeys -- will be displayed when you hover over the
                    // chart.
                    labels:  ['Value'],
                    resize:  true
                });
            }
        }

        WaterSensors.find().observe({
            added: function () {
                drawChart()
            },
            changed: function () {
                drawChart()
            }
        });

    }); //end rendered


}
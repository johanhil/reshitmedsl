/** calls callback with the SL.se url. calls the callback w/ null as only parameter
    in case of no origin set. destination is an object w/ text or id property.
    TODO: Handle other error scenarios?
*/
function createUrl(destination, callback)
{
/* 
two main ways to specify destinations/origins exists, through text or id.
the text parameters to query.exe are S (origin) and Z (destionation).
the id parameters are REQ0JourneyStopsSID (origin) and REQ0JourneyStopsZID (destination).
finding the id's are done through the suggestion feature on sl.se - see suggestions.js.
*/
    var base = "http://reseplanerare.sl.se/bin/query.exe/sn?sl=1" 
    
//    navigator.geolocation.getCurrentPosition(function (position) {
//        get_address(position.coords.latitude, position.coords.longitude, function (address) { 
    get_address(59.3751767, 17.9393162, function (address) {
            /* w/o origin, present the user w/ SL.se with an empty From field */
            if (address == undefined)
            {
                _gaq.push(['_trackPageview', '/failed_to_get_address']);
                best_suggestion_id(destination.text, function (destination_id) {
                    callback(base + 
                        "&REQ0JourneyStopsZID=" + escape(destination_id) + 
                        "&start=0");
                    });
            }
            else
            {
                /* find origin and destination id */
                best_suggestion_id(address, function (origin_id) {
                    best_suggestion_id(destination.text, function (destination_id) {
                        callback(base + 
                            "&REQ0JourneyStopsZID=" + escape(destination_id) +
                            "&REQ0JourneyStopsSID=" + escape(origin_id) +
                            "&start=1");
                    });
                });
            }
        });
    /*}, 
    function (error) {
        _gaq.push(['_trackPageview', '/geolocation/error/' + error.code]);
        if (error.code == PositionError.PERMISSION_DENIED)
            alert('The plugin is not allowed to determine your position! Whyyyy :\'(');

        alert('Error determining position: Code ' + error.code + ' and message is ' + error.message);
    });*/
}

function showSearch (input) {
    createUrl(input, function (url) {
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.update(tab.id, {'url': url});
        });
    });
}

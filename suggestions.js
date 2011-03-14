/* TODO: cache */
/**
Calls the callback function with the num suggestions as a list.
*/
function suggestions(str, num, callback) {
    if (str == '' || num == 0)
        return;

    var url = "http://reseplanerare.sl.se/bin/ajax-getstop.exe/sn?getstop=1&REQ0JourneyStopsB="+num+"&REQ0JourneyStopsS0A=255&S=" + escape(str) + "?&js=true&";

    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) { // request completed
            var tmp = req.responseText;
            // substring the response so we can JSON.parse it.
            // TODO error handling
            callback(JSON.parse(tmp.substring(8, tmp.length-22))["suggestions"]);
        }
    }
    req.send(null);
    return;
}

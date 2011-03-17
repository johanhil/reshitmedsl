function get_address(lat, lng, callback)
{
    var url = 'http://reseplanerare.sl.se/bin/query.exe/sny?performLocating=512&tpl=reverselookup2json&look_nv=type|reverselookup|radius|500|get_addressid|no|get_addresscoord|no|x|'+lat+'|y|'+lng;
    
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            // TODO error handling?
            var json = JSON.parse(req.responseText);
            if (! json.hasOwnProperty('urlname'))
                callback(null)

            callback(decodeURIComponent(json['urlname']));
        }
    };
    req.send(null);
    return;
}


function get_address(lat, lng, callback)
{
/* http://reseplanerare.sl.se/bin/query.exe/sny?performLocating=512&tpl=reverselookup2json&look_nv=type|reverselookup|radius|500|get_addressid|yes|get_addresscoord|yes|x|17885734|y|59365913 */

    /* the coordinates need to be w/o decimal sign and 8 chars long */
    var lat_fixed = lat.toFixed(8).toString();
    var lng_fixed = lng.toFixed(8).toString();
    lat_fixed = lat_fixed.replace('.', '').substring(0, 8);
    lng_fixed = lng_fixed.replace('.', '').substring(0, 8);
    var url = 'http://reseplanerare.sl.se/bin/query.exe/sny?performLocating=512&tpl=reverselookup2json&look_nv=type|reverselookup|radius|500|get_addressid|no|get_addresscoord|no|x|'+lng_fixed+'|y|'+lat_fixed;

    //var url = 'http://reseplanerare.sl.se/bin/query.exe/sny?performLocating=512&tpl=reverselookup2json&look_nv=type|reverselookup|radius|500|get_addressid|yes|get_addresscoord|yes|x|17885734|y|59365913';
    
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            // TODO error handling?
            //var json = JSON.parse(req.responseText);
            eval('var json = ' + req.responseText); // this is the weirdest shit, JSON.parse fails with "Unexpected token ILLEGAL".
            
            if (json.hasOwnProperty('urlname'))
                callback(unescape(json.urlname));
            else
                callback();
        }
    };
    req.send(null);
    return;
}


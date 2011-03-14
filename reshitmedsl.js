// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
Create the context menu menu item.
*/
chrome.contextMenus.create({'title': 'Res hit med SL'
                          ,'contexts': ['selection']
                          ,'onclick': travel});

/**
Creates a tab with the SL page loaded
*/
function travel(info, tab) {
/* travel URL: http://reseplanerare.sl.se/bin/query.exe/sn?sl=1&S=AAAAAAAAAAAAA&Z=BBBBBBBBBBBBB&start=1 (more options possible but this is the basics) where AAA... is the origin and BBB... is the destionation.
   currently using ID:s from the suggestions feature instead, with REQ0JourneyStops[S|Z]ID=..."
*/
    var urlbase = "http://reseplanerare.sl.se/bin/query.exe/sn?sl=1&" // REQ0JourneyStopsSID=";

    var origin_id = localStorage(LS_KEY_ORIGIN_ID);

    // TODO put this in its own method
    if (typeof origin_id == undefined || !origin_id)
    {
        var origin = escape(localStorage[LS_KEY_ORIGIN]);
        if (!origin || origin == 'undefined') { // escape makes undefined -> 'undefined'
            /* alert the user that s/he has not set a start station */
            /* TODO make this more user-friendly and link the user to
            the options page */
            chrome.tabs.create({'url': 'options.html'});
            alert("Du har inte ställt in varifrån du vill åka.");
            return;
        }
        else
        {
            urlbase += "S=" + origin;
        }
    }
    else
    {
        urlbase += "REQ0JourneyStopsSID=" + escape(origin_id);
    }

    var destination_text = escape(info.selectionText);

    _gaq.push(['_trackEvent', 'search', 'done']);

    // make a suggestions call that only returns one result and use that to build the url
    suggestions(destination_text, 1, function(suggestionList) {
        var url = urlbase + "&REQ0JourneyStopsZID=" + suggestionList[0].id + "&start=1";
        chrome.tabs.create({'url': url});
    });
}

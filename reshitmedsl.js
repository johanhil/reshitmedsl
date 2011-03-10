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
/* travel URL: http://reseplanerare.sl.se/bin/query.exe/sn?sl=1&S=AAAAAAAAAAAAA&Z=BBBBBBBBBBBBB&start=1 (more options possible but this is the basics) */
    var urlbase = "http://reseplanerare.sl.se/bin/query.exe/sn?sl=1&S=";
    var origin = escape(localStorage[LS_KEY_ORIGIN]);
    var destination = escape(info.selectionText); /* TODO trim this? */

    if (!origin) {
        /* alert the user that s/he has not set a start station */
        /* TODO make this more user-friendly and link the user to
           the options page */
        chrome.tabs.create({'url': 'options.html'});
        alert("Du har inte ställt in varifrån du vill åka.");
        return;
    }

    var url = urlbase + origin + "&Z=" + destination + "&start=1"; /* start=1 gives suggestions */
    _gaq.push(['_trackEvent', 'search', 'done']);
    chrome.tabs.create({'url': url});
}

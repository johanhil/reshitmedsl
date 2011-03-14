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
    var originparams = getOriginParameters();
    if (originparams == null)
    {
        callback(null);
        return;
    }

    var url = base + "&" + getOriginParameters();
    
    if (destination.hasOwnProperty('id'))
    {
        callback(url + "&REQ0JourneyStopsZID=" + destination.id + "&start=1");
    }
    else
    {
        suggestions(destination.text, 1, function (list) {
            callback(url + "&REQ0JourneyStopsZID=" + list[0].id + "&start=1");
        });
    }
}

function getOriginParameters()
{
    /* is the string set? if not, we need the user to set the string */
    if (! localStorage.hasOwnProperty(LS_KEY_ORIGIN))
        return null;

    var id = localStorage[LS_KEY_ORIGIN_ID];
    if (typeof id == undefined || !id)
    {
        /* no id, use the string */
        return "S=" + escape(localStorage[LS_KEY_ORIGIN]);
    }
    else
    {
        return "REQ0JourneyStopsSID=" + escape(id);
    }
}

function showSearch (input) {
    createUrl(input, function (url) {
            if (url == null)
            {
                /* TODO error handling has to be done better than this */
                chrome.tabs.create({'url': 'options.html'});
                alert("Du har inte ställt in varifrån du vill åka.");
                return;
            }

            chrome.tabs.create({'url': url});
        }
    );
}

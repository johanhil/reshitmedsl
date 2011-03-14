chrome.omnibox.onInputChanged.addListener(
function(text, suggest) {
    if (text.length < 3) /* emulate sl.se behaviour */
        return;

    suggestions(text, 10, function(list)
    {
        var retlist = [];
        for (i in list)
        {
            retlist.push({content: list[i].value, description: list[i].value + ' <dim>' + list[i].typeStr + '</dim>'});
        }

        suggest(retlist);
    });
});
            
// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
    function(text) {
        _gaq.push(['_trackPageview', '/omniboxsearch']);
        showSearch({'text': text});
    }
);

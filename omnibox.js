chrome.omnibox.onInputChanged.addListener(
function(text, suggest) {
    suggestions(text, 10, function(list)
    {
        var retlist = [];
        for (i in list)
        {
            reslist.push({content: list[i].value, description: list[i].value});
        }

        suggest(retlist);
    });
});
            
// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
    function(text) {
        _gaq.push(['_trackPageview', '/omniboxsearch']);
        showSearch(text);
    }
);

chrome.contextMenus.create({'title': 'Res hit med SL' 
                            ,'contexts': ['selection']
                            ,'onclick': travel});

function travel(info, tab) {
    _gaq.push(['_trackPageview', '/contextmenusearch']);
    showSearch(info.selectionText);
}

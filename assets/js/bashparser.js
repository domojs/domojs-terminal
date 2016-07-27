var colorize=(function(){
    var colors={
        '00':null,
        '39':null,
        '30':'black',
        '31':'maroon',
        '32':'green',
        '33':'olive',
        '34':'blue',
        '35':'purple',
        '36':'teal',
        '37':'silver',
        '90':'gray',
        '91':'red',
        '92':'lime',
        '93':'yellow',
        '94':'lightblue',
        '95':'fuchsia',
        '96':'cyan',
        '97':'white',
    };
    
    var invisibleText=/\x1b\]0;[^\x1b]+/g;
    var format=/\x1b\[([0-9]+)(?:;([0-9]+))?m/g;
    
    
    function buildStyle(style)
    {
        var result='';
        $.each(style, function(key, value){
            if(value!=null)
                result+=key+':'+value+';';
        });
        return result;
    }
        
    
    return function(text)
    {
        debugger;
        text=text.replace(invisibleText, '');
        var openedSpans=0;
        var colorSpan=false;
        var m;
        var result='';
        var lastIndex=0;
        var style={};
        while(m=format.exec(text))
        {
            result+='<span style="'+buildStyle(style)+'">'+text.substr(lastIndex, m.index-lastIndex)+'</span>';
            lastIndex=m.index+m[0].length;
            
            if(typeof(colors[m[2]])!='undefined')
                style.color=colors[m[2]];
            
        }
        result+='<span style="'+buildStyle(style)+'">'+text.substr(lastIndex)+'</span>';
        return result;
    };
})();
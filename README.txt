Read the TODO!

The reason i chouse the localstorage insteed of cookie is becouse of few reasons. 

First i prefer the support of modern browsers.. As you said on the interview , no body supprot old IE's

Cookies get loaded at every request

Cookies can only hold limited amount of information ( 4096 bytes per cookie and 20 cookie per unique host ).

The storage i use is other called "HTML5 offline storage". Its nice new thign added in the HTML ( i even think its cooler even than naturalWidth of the image attribute )

I save it as HTML even when the string cost more memory than JSON becouse i use static page ( its bad idea to make the backbone app when that app wont be used by many people ) and the append on load works faster than json stringify and then append.
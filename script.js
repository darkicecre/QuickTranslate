String.prototype.encodeUnicode = function(){
    var result = "";
    for(var i = 0; i < this.length; i++){
    // Assumption: all characters are < 0xffff
      result += "\\u" + ("000" + this[i].charCodeAt(0).toString(16)).substr(-4);
    }
    return result;
};
String.prototype.decodeUnicode = function(){
    var x = /\\u([\d\w]{4})/gi;
    var res = this.replace(x,function(match,grp){
      return String.fromCharCode(parseInt(grp, 16)); 
    });
    return res;
}
var a = document.getElementById("encode_simple")
a.value = "사고이력";
encodeSimple();
var a = document.getElementById("encode_multi")
a.value = "모델명,사고이력";
encodeMulti();
var a = document.getElementById("decode_simple")
a.value="\\uc0c1\\ud488\\ud654\\u0020\\ub300\\uc0c1\\uad00\\ub9ac"
decodeSimple();
var a = document.getElementById("decode_multi")
a.value = "\\uc0c1\\ud488\\ud654\\u0020\\ub300\\uc0c1\\uad00\\ub9ac,\\uad8c\\uc218\\uacbd";
decodeMulti();

function encodeSimple(){
    var a = document.getElementById("encode_simple").value;
    var b = document.getElementById("a1_result")
    b.innerText = a.encodeUnicode();
}
function encodeMulti(){
    var a = document.getElementById("encode_multi").value;
    var b = a.split(',');
    var r = ""
    for(var i = 0;i<b.length;i++){
        b[i] = b[i].encodeUnicode();
        // r = r + b[i] + ","
        r = r + "<span>"+b[i]+"</span><br>"
    }
    
    var c = document.getElementById("a2_result")
    c.innerHTML = r
}
function decodeSimple(){
    var a = document.getElementById("decode_simple").value;
    var b = document.getElementById("b1_result")
    b.innerText = a.decodeUnicode();
}
function decodeMulti(){
    var a = document.getElementById("decode_multi").value;
    var b = a.split(',');
    var r = ""
    for(var i = 0;i<b.length;i++){
        b[i] = b[i].decodeUnicode();
        // r = r + b[i] + ","
        r = r + "<span>"+b[i]+"</span><br>"
    }
    
    var c = document.getElementById("b2_result")
    c.innerHTML = r
}
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
var a = document.getElementById("compare_text_1")
a.value = "So sanh text dau tien";
var b = document.getElementById("compare_text_2")
b.value = "So sanh text dau thu hai";
compareText();
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
var a = document.getElementById("timestamp_convert")
a.value = "1704329564";
timestampConvertSimple();
var a = document.getElementById("date_convert")
a.value = "2024-01-04 07:52:44";
dateConvertSimple();

function compareText(){
    var a = document.getElementById("compare_text_1").value;
    var b = document.getElementById("compare_text_2").value
    var r_a = document.getElementById("result_compare_text_1");
    var r_b = document.getElementById("result_compare_text_2")
    var r_c = document.getElementById("result_compare_text_3")
    var len = Math.min(a.length,b.length)
    let redArray = [];
    var resA = "";
    var resB = "";
    var count = 0;
    for(var i=0;i<len;i++){
        if(a[i]!=b[i]){
            resA = resA + '<span class="c-red">'+a[i]+'</span>'
            resB = resB + '<span class="c-red">'+b[i]+'</span>'
        }
        else{
            resA = resA + '<span class="c-green">'+a[i]+'</span>'
            resB = resB + '<span class="c-green">'+b[i]+'</span>'
            count++;
        }
    }
    if(a.length>b.length){
        for(var i =len;i<a.length;i++){
            resA = resA + '<span class="c-red">'+a[i]+'</span>'
        }
    }
    if(b.length>a.length){
        for(var i =len;i<b.length;i++){
            resB = resB + '<span class="c-red">'+b[i]+'</span>'
        }
    }
    r_c.innerText = Math.round(count*100/Math.max(a.length,b.length)) + " %"
    r_a.innerHTML = resA;
    r_b.innerHTML = resB;
}
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
function timestampConvertSimple(){
    var a = document.getElementById("timestamp_convert").value;
    var b = document.getElementById("timestamp_result")
    var date = new Date(parseInt(a)*1000);
    var month = date.getMonth()+1;
    var day = date.getDate() ;
    var hours = date.getHours();
    var mins = date.getMinutes();
    var sec = date.getSeconds();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = `0${month}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (mins < 10) {
        mins = `0${mins}`;
    }
    if (sec < 10) {
        sec = `0${sec}`;
    }
    b.innerText = date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + sec ;
}
function dateConvertSimple(){
    var a = document.getElementById("date_convert").value;
    var b = document.getElementById("date_result")
    var date = new Date(a);
    var unixTimestamp = Math.floor(date.getTime()/1000);
    b.innerText = unixTimestamp;
}
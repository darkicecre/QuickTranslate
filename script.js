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
var a = document.getElementById("decrypt_simple")
a.value = "S2FJN2JKZy91NEE3NzU2K1NaZTZmMFJlMmY0a3pGNDJ1UWoxRmtRU2M0Tk5ReWdDWFZLNmFjeU1FbW50d1kyVnhGVUtUVW9weklaZXZtVlZRQS9EWUFSSHVVd2pFRFVwajJDUkIwck80WGVicTA4SGxWMjNHb1NzQTBUZXlRaGZFaGNjdHVtNERNeGwvWnFaM3h5c2h5bERkeklaTlFkeWtaMXNORHhKbVl0NG8vZU5PUFVjWG8vYldnMDMzN2Yw";
decryptSimple();

var a = document.getElementById("groupware_string")
a.value = "b02b48f8297895c4edb4c82b70ee1b04d5620ff9a35e993d5dbe1302b849e204a9570ead85ec3235e5191049cfefddaf";
decodeGroupwareString()

var a = document.getElementById("sql_log_to")
var date = new Date();
a.value = date.toISOString().split('T')[0].replaceAll('-','')
date.setDate(date.getDate() - 1);
var a = document.getElementById("sql_log_from")
a.value = date.toISOString().split('T')[0].replaceAll('-','')

var a = document.getElementById("backup_table")
a.value = 'crm_purchase_product'
var a = document.getElementById("backup_date")
a.value = date.toISOString().split('T')[0].replaceAll('-','')

sql_log_change_domain()
backup_change_domain()

function sql_log_change_domain(){
  var a = document.getElementById("sql_log_domain").value
  var b = document.getElementById("sql_log_account")
  if(a=='kgm'){
    b.innerHTML='<option value="vsweb">vsweb</option>'
  }
  else if (a=='kolon'){
    b.innerHTML='<option value="duy.nguyennhat">duy</option><option value="canhnguyen">canh</option><option value="thinh.lequoc">Q.Thinh</option>'
  }
  sql_log_change()
}
function backup_change_domain(){
  var a = document.getElementById("backup_domain").value
  var b = document.getElementById("backup_account")
  if(a=='kgm'){
    b.innerHTML='<option value="vsweb">vsweb</option>'
  }
  else if (a=='kolon'){
    b.innerHTML='<option value="duy.nguyennhat">duy</option><option value="canhnguyen">canh</option><option value="thinh.lequoc">Q.Thinh</option>'
  }
  backup_change()
}

function backup_change(){
  var a = document.getElementById("backup_domain").value
  var c = document.getElementById("backup_account").value
  var f = document.getElementById("backup_table").value
  var t = document.getElementById("backup_date").value
  var r = document.getElementById("backup_res")
  var s = [];
  if(a=='kgm'){
    s.push('ssh -oHostKeyAlgorithms=+ssh-rsa vsweb@150.1.54.179')
    s.push('sftp -oHostKeyAlgorithms=+ssh-rsa vsweb@150.1.54.179')
    s.push('su -');
    s.push('rsync -av --progress /home/DUMP/'+t+'_22/kgmcpokg_mobilitycom/DATA/'+f+'.sql /home/vsweb/a57.txt');
    s.push('get a57.txt');
    
  }
  else if(a=='kolon'){
    s.push('ssh '+c+'@admin.702pickplus.co.kr')
    s.push('sftp '+c+'@admin.702pickplus.co.kr')
    s.push('sudo su -');
    s.push('rsync -av --progress /home/DUMP/'+t+'_22/kgmcpokg_mobilitycom/DATA/'+f+'.sql /home/vsweb/a57.txt');
    s.push('get a57.txt');
  }
  var rr = ''
  for(var i=0;i<s.length;i++){
    rr = rr + '<div style="display:flex; margin-bottom:5px;" id="backup_res_'+i+'"><button style="margin-right:10px;" onclick="backup_res_btn('+i+')"><i class="fa-solid fa-copy" style="color: #3f50b5;"></i> </button><div id="backup_res_text_'+i+'">'+s[i]+'</div></div>'
  }
  r.innerHTML=rr;
}

function sql_log_change(){
  var a = document.getElementById("sql_log_domain").value
  var c = document.getElementById("sql_log_account").value
  var f = document.getElementById("sql_log_from").value
  var t = document.getElementById("sql_log_to").value
  var r = document.getElementById("sql_log_res")
  var s = [];
  if(a=='kgm'){
    s.push('ssh -oHostKeyAlgorithms=+ssh-rsa vsweb@150.1.54.179')
    s.push('sftp -oHostKeyAlgorithms=+ssh-rsa vsweb@150.1.54.179')
    s.push('su -');
    s.push('cd /home/HanbiroMailcore/GWDATA/kgmcpo.kg-mobility.com/queue/');
    s.push('rsync -av --progress sync.que zsync.log.23')
    s.push('/usr/local/bin/php /home/HanbiroMailcore/sync/queutil.php zsync.log.23 -from '+f+' -to '+t+' > a56.txt')
    s.push('mv a56.txt /home/vsweb')
    s.push('get a56.txt')
  }
  else if(a=='kolon'){
    s.push('ssh '+c+'@admin.702pickplus.co.kr')
    s.push('sftp '+c+'@admin.702pickplus.co.kr')
    s.push('sudo su - && cd /home/HanbiroMailcore/GWDATA/admin.702pickplus.co.kr/queue/ && rsync -av --progress sync.que zsync.log.23')
    s.push('/usr/local/bin/php /home/HanbiroMailcore/sync/queutil.php zsync.log.23 -from '+f+' -to '+t+' > a56.txt')
    s.push('mv a56.txt /home/'+c)
    s.push('get a56.txt')
  }
  var rr = ''
  for(var i=0;i<s.length;i++){
    rr = rr + '<div style="display:flex; margin-bottom:5px;" id="sql_log_res_'+i+'"><button style="margin-right:10px;" onclick="sql_log_res_btn('+i+')"><i class="fa-solid fa-copy" style="color: #3f50b5;"></i> </button><div id="sql_log_res_text_'+i+'">'+s[i]+'</div></div>'
  }
  r.innerHTML=rr;
  
}

function sql_log_res_btn(i){
  var a = document.getElementById("sql_log_res_text_"+i).innerText
  console.log(a)
  navigator.clipboard.writeText(a)
}
function backup_res_btn(i){
  var a = document.getElementById("backup_res_text_"+i).innerText
  navigator.clipboard.writeText(a)
}
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
async function decryptSimple(){
  var a = document.getElementById("decrypt_simple").value;
  const response = await fetch('http://211.234.116.228:7013/api/dev/bidding?key=S2FJN2JKZy91NEE3NzU2K1NaZTZmMFJlMmY0a3pGNDJ1UWoxRmtRU2M0Tk5ReWdDWFZLNmFjeU1FbW50d1kyVnhGVUtUVW9weklaZXZtVlZRQS9EWUFSSHVVd2pFRFVwajJDUkIwck80WGVicTA4SGxWMjNHb1NzQTBUZXlRaGZFaGNjdHVtNERNeGwvWnFaM3h5c2h5bERkeklaTlFkeWtaMXNORHhKbVl0NG8vZU5PUFVjWG8vYldnMDMzN2Yw');
  const myJson = await response.json();
  var b = document.getElementById("d1_result");
  b.innerHTML = JSON.stringify(myJson).replaceAll(',"',',<br/>"');
  console.log(myJson)
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
function decodeGroupwareString(){
    var a = document.getElementById("groupware_string").value;
    var b = document.getElementById("groupware_result")
    fetch('https://hanbirosoft.hanbiro.net/ngw2/netclover/decode/'+a)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if(data && data.data){
        b.innerText = data.data
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
function dateConvertSimple(){
    var a = document.getElementById("date_convert").value;
    var b = document.getElementById("date_result")
    var date = new Date(a);
    var unixTimestamp = Math.floor(date.getTime()/1000);
    b.innerText = unixTimestamp;
}
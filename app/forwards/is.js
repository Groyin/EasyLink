//5个localhost


//********注册元素(开始)**********//
let a4=document.getElementById('a4')
let a5=document.getElementById('a5')
let a6=document.getElementById('a6')
let b1=document.getElementById('b1')
let b2=document.getElementById('b2')
let canvas1=document.getElementById('canvas1')
let p1=document.getElementById('p1')

let b135=document.getElementById('b135')
let svg1=document.getElementById('svg1')
let svg2=document.getElementById('svg2')
let b131=document.getElementById('b131')
let b134=document.getElementById('b134')
var b132={
    value:''
}
let b1321=document.getElementById('b1321')
let b1314=document.getElementById('b1314')

let b12=document.getElementById('b12')
let b11=document.getElementById('b11')

let b14=document.getElementById('b14')
let b21=document.getElementById('b21')
let b22=document.getElementById('b22')
let b23=document.getElementById('b23')
let b24=document.getElementById('b24')
let b27=document.getElementById('b27')
let b28=document.getElementById('b28')
let inp1=document.getElementById('inp1')
let inp2=document.getElementById('inp2')


let js1=document.getElementById('js1')




//***********注册元素(结束)**********//
//**********通用变量处理(开始)**********//
let win_hei=window.innerHeight
let win_wid=window.innerWidth
console.log(win_hei,win_wid)
if(16*win_hei>9*win_wid){
    p1.style.height=win_hei+'px'
}
else{
    p1.style.width=win_wid+'px'
}


window.onresize=function(){
    win_hei=window.innerHeight
    win_wid=window.innerWidth

    if(16*win_hei>9*win_wid){        
        p1.style.width='auto'
        p1.style.height=win_hei+'px'
        
    }
    else{
        p1.style.width=win_wid+'px'
        p1.style.height='auto'
    }

}
//**********通用变量处理(结束)**********//


a5.onclick=function(){
    a6.style.left='90px'
    a5.style.color='#00cc4c'
    a4.style.color='black'
    b1.style.visibility='hidden'
    b2.style.visibility='visible'

}
a4.onclick=function(){
    a6.style.left='2px'
    a4.style.color='#00cc4c'
    a5.style.color='black'
    b2.style.visibility='hidden'
    b1.style.visibility='visible'
}
//获取浏览器信息
let GetDevice = function () {

    /* 版本信息获取 */
    // 各主流浏览器
    var getBrowser = function () {
        var u = navigator.userAgent
        var bws = [{
            name: 'sgssapp',
            it: /sogousearch/i.test(u)
        }, {
            name: 'wechat',
            it: /MicroMessenger/i.test(u)
        }, {
            name: 'weibo',
            it: !!u.match(/Weibo/i)
        }, {
            name: 'uc',
            it: !!u.match(/UCBrowser/i) || u.indexOf(' UBrowser') > -1
        }, {
            name: 'sogou',
            it: u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1
        }, {
            name: 'xiaomi',
            it: u.indexOf('MiuiBrowser') > -1
        }, {
            name: 'baidu',
            it: u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1
        }, {
            name: '360',
            it: u.indexOf('360EE') > -1 || u.indexOf('360SE') > -1
        }, {
            name: '2345',
            it: u.indexOf('2345Explorer') > -1
        }, {
            name: 'edge',
            it: u.indexOf('Edge') > -1
        }, {
            name: 'ie11',
            it: u.indexOf('Trident') > -1 && u.indexOf('rv:11.0') > -1
        }, {
            name: 'ie',
            it: u.indexOf('compatible') > -1 && u.indexOf('MSIE') > -1
        }, {
            name: 'firefox',
            it: u.indexOf('Firefox') > -1
        }, {
            name: 'safari',
            it: u.indexOf('Safari') > -1 && u.indexOf('Chrome') === -1
        }, {
            name: 'qqbrowser',
            it: u.indexOf('MQQBrowser') > -1 && u.indexOf(' QQ') === -1
        }, {
            name: 'qq',
            it: u.indexOf('QQ') > -1
        }, {
            name: 'chrome',
            it: u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1
        }, {
            name: 'opera',
            it: u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1
        }]
        for (var i = 0; i < bws.length; i++) {
            if (bws[i].it) {
                return bws[i].name
            }
        }

        return 'other'
    };
    // 系统区分
    var getOS = function () {
        var u = navigator.userAgent
        if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
            return 'windows'
        } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
            return 'macOS'
        } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
            return 'ios'
        } else if (u.match(/android/i)) {
            return 'android'
        } else if (u.match(/Ubuntu/i)) {
            return 'Ubuntu'
        } else {
            return 'other'
        }
    };
    //判断数组中是否包含某字符串
    Array.prototype.contains = function (needle) {
        for (i in this) {
            if (this[i].indexOf(needle) > 0)
                return i;
        }
        return -1;
    }

    var device_type = navigator.userAgent; //获取userAgent信息
    // document.write(device_type); //打印到页面
    var md = new MobileDetect(device_type); //初始化mobile-detect
    var os = md.os(); //获取系统
    console.log(os)
    var model = "";
    if (os == "iOS") { //ios系统的处理
        os = +md.version("iPhone");
        console.log(os)
        model = md.mobile();
    } else if (os == "AndroidOS") { //Android系统的处理
        os = md.os() + md.version("Android");
        var sss = device_type.split(";");
        var i = sss.contains("Build/");
        if (i > -1) {
            model = sss[i].substring(0, sss[i].indexOf("Build/"));
        }
    }
    else {
        os = getOS();
        model = getBrowser();
    }
    //alert(os + "---" + model);//打印系统版本和手机型号
    //console.log(model + '||' + os, '打印系统版本和手机型号')
    return os+' '+model
}
let my_software=GetDevice()
//ip获取
let my_ip='未知'
let my_base='未知'
try {
    my_ip=returnCitySN['cip']
    my_base=returnCitySN['cname']
} catch (error) {
    console.log('returnCitySN jsop跨域被限制,IP无法获取')
    
}

//申请房间号

function get_room_number(){
    var xhr1=new XMLHttpRequest()
    xhr1.open('GET','http://localhost/p1/get_room_number')
    xhr1.send()
    xhr1.onreadystatechange=function(){
        if(xhr1.readyState==4 & xhr1.status==200){
            var ptt1=JSON.parse(xhr1.responseText)
            var room_number=ptt1.new_number
            b11.innerText=room_number
        } 
    }
}

let get_room_number_time=0
get_room_number()
b12.onclick=function(){
    get_room_number_time+=1
    if(get_room_number_time<=3){
        get_room_number() 
    }
    else{
        console.log('更改房间号禁止超过三次')
    }
}


//人数设置
let page1_number=2
let page1_number_max=10
let page1_number_min=2
b135.innerText=page1_number
let b135t
function b135_color(){
    clearTimeout(b135t)
    b135.style.borderColor='#00cc4c'
    b135t=setTimeout(()=>{
        b135.style.borderColor='#dcdfe6'
    },3000)
}
let b135s
function b135_color2(){
    clearTimeout(b135s)
    b135.style.borderColor='#ff561b'
    b29.style.color='#ff561b'
    b135s=setTimeout(()=>{
        b135.style.borderColor=null
        b29.style.color='#ff581b00'
    },2000)
}
svg1.onclick=function(){
    b135_color()
    if(page1_number+1<=page1_number_max){
        page1_number+=1
        b135.innerText=page1_number
    }
    else{
        console.log('已达人数上限')
        b29.innerText='已达人数上限'
        b135_color2()
    }
}
svg2.onclick=function(){
    b135_color()
    if(page1_number-1>=page1_number_min){
        page1_number-=1
        b135.innerText=page1_number
    }
    else{
        console.log('已达人数下限')
        b29.innerText='已达人数下限'
        b135_color2()
    }
    
}
//密码设置
let bs132='<input type="text" placeholder="请输入密码" id="b132">'
let b134_checked=false
let b132_ok=1
b1314.onclick=function(){
    b134_checked=!b134_checked
    if(b134_checked==true){
        b29.style.top='199px'
        b132_ok=0
        b1321.innerHTML=bs132
        b132=document.getElementById('b132')
        b131.style.color='#00cc4c'
        b134.checked=true
        b132.onblur=function(){
            if(b132.value.length>0){
                b132_ok=1
                b132.style.borderColor=null
                b27.style.display='none'
                b28.style.display='none'
            }
            else{
                b132_ok=0
                console.log('密码不能为空')
                b132.style.borderColor='#ff561b'
                b27.style.display='block'
                b28.style.display='block'
        
            }
        }

    }
    else{
        b29.style.top='141px'
        b132_ok=1
        b1321.innerHTML=''
        b132.value=''
        b131.style.color='rgb(153 153 153)'
        b134.checked=false
        b132.onblur=null
        b27.style.display='none'
        b28.style.display='none'
    }
}
//提交创建房间信息
b14.onclick=function(){
    if(b132_ok==0){
        console.log('密码不能为空')
        b132.style.borderColor='#ff561b'
        b27.style.display='block'
        b28.style.display='block'
    }
    else{
        console.log('qingqiuok')
        var room_number_post=b11.innerText
        var key_word_type=b134.checked
        var key_word=b132.value
        var people_number=b135.innerText
        var xhr2_send={
            room_number_post:room_number_post,
            key_word_type:key_word_type,
            key_word:key_word,
            people_number:people_number,
            software:my_software,
            ip:my_ip,
            base:my_base
        }
        console.log(xhr2_send)
        axios.post('http://localhost/p2/creat',xhr2_send).then(function(res){
            var axios1_res=res.data
            var axios1_type=axios1_res.type
            var typenum=axios1_res.typenum
            var connect_root=axios1_res.connect_root
            var user_id=axios1_res.user_id
            var user_num=axios1_res.user_num
            var room_max=axios1_res.room_max
            //设置cookie
            var expires2 = new Date();
            expires2.setTime(expires2.getTime() + 48 * 3600000)
            var GMT2=expires2.toGMTString()
            document.cookie='user_num='+user_num+';expires='+GMT2
            document.cookie='room_max='+room_max+';expires='+GMT2

            
            if(typenum==1){
                var tt1='http://localhost:'+room_number_post+connect_root+'?user_if='+user_id
                window.location.href=tt1
            }
            else{

            }
        })
    }
}
//提交连接房间信息
b21.onclick=function(){
    var room_number_connect=inp1.value
    var key_word_connect=inp2.value
    if(room_number_connect.length==4){
        var xhr3_send={
            room_number_connect:room_number_connect,
            key_word_connect:key_word_connect,
            software:my_software,
            ip:my_ip,
            base:my_base
            
        }
        var url11='http://localhost:'+room_number_connect+'/'+room_number_connect+'/connect'
        axios.post(url11,xhr3_send).then(function(res){
            let axios2_res=res.data
            if(axios2_res.typenum==3){
                alert('您无法加入，该房间人已满。连接请求禁用5秒')
                b24.style.display='block'
                setTimeout(function(){
                    b24.style.display='none'
                },5000)
            }
            else if(axios2_res.typenum==4){
                alert('密码错误。连接请求禁用3秒')
                inp2.value=''
                b25.style.display='block'
                setTimeout(function(){
                    b25.style.display='none'
                },3000)
            }
            else{
                let axios2_type=axios2_res.type
                let typenum2=axios2_res.typenum
                let connect_root2=axios2_res.connect_root
                let user_id2=axios2_res.user_id
                let user_num2=axios2_res.user_num
                let room_max=axios2_res.room_max
                
                //设置cookie
                let expires = new Date();
                expires.setTime(expires.getTime() + 48 * 3600000)
                let GMT1=expires.toGMTString()
                document.cookie='user_num='+user_num2+';expires='+GMT1
                document.cookie='room_max='+room_max+';expires='+GMT1

                if(typenum2==2){
                    let tt2='http://localhost:'+room_number_connect+connect_root2+'?user_if='+user_id2
                    window.location.href=tt2

                }
            }
        }).catch(function(error){
            alert('房间不存在')
            console.log('房间不存在')
        })
    }
    else{
        console.log('输入房间号不是四位!')
    }
}

inp1.onfocus=function(){
    inp1.onkeydown=function(e){
        if(e.key=='Enter'){
            inp2.focus()
            inp1.onkeydown=null
        }
    }
}
var inp1_ok=0
inp1.onblur=function(){
    if(inp1.value.length==4 && Number(inp1.value)!=NaN){
        inp1.style.borderColor=null
        b22.style.display='none'
        b23.style.display='none'
        
        inp1_ok=1
    }
    else{
        console.log('房间号格式有误')
        inp1.style.borderColor='#ff561b'
        b22.style.display='block'
        b23.style.display='block'
        inp1_ok=0
    }
}
inp2.onfocus=function(){
    inp2.onkeydown=function(e){
        if(e.key=='Enter' && inp1_ok==1){
            b21.click()
            inp2.blur()
            inp2.onkeydown=null
        }
    }
}



//右侧浮动公告组件函数
j2.onclick=function(){
    js1.style.display='block'
}
js12.onclick=function(){
    js1.style.display='none'
}

j3.onclick=function(){
    window.open('http://localhost/page2/feedback','_blank')
}
j4.onclick=function(){
    window.open('http://localhost/page2/help','_blank')
}
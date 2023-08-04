//4个localhost  43.143.39.43
let a00=document.getElementById('a00')
let a1=document.getElementById('a1')
let a0=document.getElementById('a0')
let c2=document.getElementById('c2')
let d6=document.getElementById('d6')
let d7=document.getElementById('d7')
let d8=document.getElementById('d8')
let d9=document.getElementById('d9')
let d51=document.getElementById('d51')
let d52=document.getElementById('d52')
let d53=document.getElementById('d53')
let d1=document.getElementById('d1')
let d2=document.getElementById('d2')
let d5=document.getElementById('d5')
let d10=document.getElementById('d10')
let d11=document.getElementById('d11')
let b2=document.getElementById('b2')
let b2s=document.getElementById('b2s')
let b25=document.getElementById('b25')
let d32=document.getElementById('d32')
let b52=document.getElementById('b52')

let d31=document.getElementById('d31')
let e2=document.getElementById('e2')
let e3=document.getElementById('e3')

let e7=document.getElementById('e7')
let e8=document.getElementById('e8')
let e9=document.getElementById('e9')
let ipt1=document.getElementById('ipt1')
let e16=document.getElementById('e16')
let e17=document.getElementById('e17')
let b510=document.getElementById('b510')
let b520=document.getElementById('b520')
let f1=document.getElementById('f1')
let f2=document.getElementById('f2')
let f3=document.getElementById('f3')
let f4=document.getElementById('f4')
let f5=document.getElementById('f5')
let f6=document.getElementById('f6')
let f10=document.getElementById('f10')
let f20=document.getElementById('f20')


//console.dir(f1)
//console.dir(f2)
//console.dir(f3)
//console.dir(f4)
//console.log(f5)
//console.log(f6)
console.dir(f10)

let js1=document.getElementById('js1')

//---通用变量处理------

let win_hei=window.innerHeight
let win_wid=window.innerWidth
console.log(win_hei,win_wid)
if(16*win_hei>9*win_wid){
    a0.style.height=win_hei+'px'
}
else{
    a0.style.width=win_wid+'px'
}

if(win_hei<=625 || win_wid<=935){
    a00.style.overflow='auto'
    //a00.width=Math.max(win_wid,935)+'px'
    //a00.height=Math.max(win_hei,625)+'px'
    a0.style.width=Math.max(win_wid,935)+'px'
    a0.style.height=Math.max(win_hei,625)+'px'
    a1.style.left='467px'
}
else{
    a00.style.overflow='hidden'
    //a00.width='100vw'
    //a00.height='100vh'
    a1.style.left='50%'
}

window.onresize=function(){
    win_hei=window.innerHeight
    win_wid=window.innerWidth

    if(16*win_hei>9*win_wid){        
        a0.style.width='auto'
        a0.style.height=win_hei+'px'
        
    }
    else{
        a0.style.width=win_wid+'px'
        a0.style.height='auto'
    }


    if(win_hei<=625 || win_wid<=935){
        a00.style.overflow='auto'
        //a00.style.width=Math.max(win_wid,935)+'px'
        //a00.style.height=Math.max(win_hei,625)+'px'
        a0.style.width=Math.max(win_wid,935)+'px'
        a0.style.height=Math.max(win_hei,625)+'px'

        a1.style.left='467px'
    }
    else{
        a00.style.overflow='hidden'
        //a00.style.width='100vw'
        //a00.style.height='100vh'
        a1.style.left='50%'
    }

}
//--------结束--------




var socket=io()
//从cookie读取用户房间信息//读取全部cookie/////////////////////////////
/**
 * @ {static_room_number} 房间号
 * @ {static_room_key}房间密码
 * @ {static_room_max}房间人数上限
 * @ {static_user_num} 用户唯一标识数字
 * @ {static_connect_condition}连接状态（1：连接；2：断开）
 * 
 *  
 */
function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
  {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}
let static_room_number=getCookie("room_name")
d31.innerText=static_room_number
let static_room_key=getCookie("room_key")
let static_user_num=getCookie("user_num")
let static_connect_condition
let static_room_max=getCookie("room_max")

//右侧栏目切换,其他ui变换函数
function clear_b4(){
    d6.style.backgroundColor='rgba(0,0,0,0)'
    d7.style.backgroundColor='rgba(0,0,0,0)'
    d8.style.backgroundColor='rgba(0,0,0,0)'
    b51.style.visibility= 'hidden'
    b52.style.visibility= 'hidden'
    b53.style.visibility= 'hidden'

}
d6.onclick=function(){
    clear_b4()
    d6.style.backgroundColor='rgba(0,0,0,.06)'
    b51.style.visibility= 'visible'
}
d7.onclick=function(){
    clear_b4()
    d7.style.backgroundColor='rgba(0,0,0,.06)'
    b52.style.visibility= 'visible'
}
d8.onclick=function(){
    clear_b4()
    d8.style.backgroundColor='rgba(0,0,0,.06)'
    b53.style.visibility= 'visible'
}

d9.onclick=function(){
    a1.style.width='550px'

}
d2.onclick=function(){
    a1.style.width='929px'
}
d1.onmouseover=function(){
    d13.style.color='rgba(239, 163, 0, 100%)'
    
}
d1.onmouseout=function(){
    d13.style.color='rgba(239, 163, 0, 0)'
}
//连接状态检测
function connectDetection(){
    let e=socket.emit('isIt','1436')
    let ear=e.connected
    if(ear==false){
        d1.src="http://43.143.39.43/forwards2/public/img/n.svg"
        static_connect_condition=0
        console.log('连接断开')
    }
    else{
        d1.src="http://43.143.39.43/forwards2/public/img/y.svg"
        static_connect_condition=1
    }
}
d1.onclick=function(){
    connectDetection()
}
//换头像组件
e17.onclick=function(){
    ipt1.click()
}
ipt1.onchange=function(){
    let file=ipt1.files[0]
    let reader = new FileReader()
    let fileName = file.name
    let fileType = fileName.substring(fileName.lastIndexOf('.')+1,fileName.length)
        reader.readAsArrayBuffer(file)
        reader.onload = (ev) => {
            let blob = new Blob([ev.target['result']])
            window['URL'] = window['URL'] || window['webkitURL']
            let blobURL = window['URL'].createObjectURL(blob)
            let image = new Image()
            image.src = blobURL
            image.onload = (e) => {
                let thumb = resizeMe(image,fileType)

                let formData = new FormData()
                formData.append("count",1)
                formData.append("name",'li lei')
                formData.append("file",thumb)
                console.log(formData)
                let config = {
                            headers: { "Content-Type": "multipart/form-data;boundary="+new Date().getTime() }
                        }
                axios.post('http://43.143.39.43:'+static_room_number+'/'+static_room_number+'/sendhead',formData,config).then(function (res) {
                    console.log(res)
                    let head_res=res.data
                    if(head_res.id==1){
                        e16.src=head_res.head_url
                        socket.emit('changehead',[static_user_num,head_res.head_url])
                    }

                })
            }
        }
    function dataURItoBlob(dataURI) {
        let byteString = atob(dataURI.split(',')[1])
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        let ab = new ArrayBuffer(byteString.length)
        let ia = new Uint8Array(ab)
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ab], {type: mimeString})
    }

    function resizeMe(img,type) {
        let canvas = document.createElement('canvas')
        

        let l=Math.min(img.width,img.height)
 
        let ctx = canvas.getContext("2d")
        canvas.width =300
        canvas.height = 300
        ctx.drawImage(img,0,0,l,l, 0,0,300, 300)
        type = type === 'jpg'?"jpeg":type;
        return dataURItoBlob(canvas.toDataURL("image/"+type, 0.7))
    }

    ipt1.value=null
}
socket.on('changehead',function(e){
    //响应重构头像
    users_message[e[0]].head=e[1]
    let b2sc=b2s.childNodes
    for(let i=3 ;i<b2sc.length;i++){
        if(b2sc[i].getAttribute('name')==e[0]){
            b2sc[i].childNodes[1].src=e[1]
        }
    }
    let b520c=b520.childNodes
    for(let i=0;i<b520c.length;i++){
        if(b520c[i].getAttribute('name')==e[0]){
            b520c[i].childNodes[1].childNodes[1].src=e[1]
        }
    }
})
//用户重命名设置组件
let e2_change=0
e3.onclick=function(){
    e2_change=1
    e2.disabled=false
    e2.focus()
    e3.style.display='none'
    e5.style.display='inline-block'
    e2.onblur=function(){
        //console.log(11)
        e3.style.display='inline-block'
        e5.style.display='none'
        e2.disabled=true
        if(e2_change!=2){
            e2.value=users_message[static_user_num].name
        }
        e2_change=0
        e2.onblur=null
    }
    e5.onmousedown=function(){
        e2_change=2
        //console.log(22)
        let tt1=e2.value
        socket.emit('changename',[static_user_num,tt1])
        console.log('发送重命名')
        e5.onclick=null
    }
}
socket.on('changename',function(e){
    //响应重构重命名状态
    users_message[e[0]].name=e[1]
    let b2sc=b2s.childNodes
    for(let i=3 ;i<b2sc.length;i++){
        if(b2sc[i].getAttribute('name')==e[0]){
            b2sc[i].childNodes[3].childNodes[1].childNodes[1].innerText=e[1]
        }
    }
    let b520c=b520.childNodes
    for(let i=0;i<b520c.length;i++){
        if(b520c[i].getAttribute('name')==e[0]){
            b520c[i].childNodes[1].childNodes[3].childNodes[1].innerText=e[1]
        }
    }

})
//显示房间设置
e7.value=static_room_number
e8.value=static_room_key
e9.onclick=function(){
    if(e8.type=='text'){
        e8.type='password'
    }
    else{
        e8.type='text'
    }
}
e10.value=static_room_max
//文件下载函数
function saveAs(data, name) {
    const urlObject = window.URL || window.webkitURL || window
    const export_blob = new Blob([data])
    const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    save_link.href = urlObject.createObjectURL(export_blob)
    save_link.download = name
    save_link.click()
  }
function downLoad(url, fileName) {
    const url2 = url.replace(/\\/g, "/")
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url2, true)
    xhr.responseType = "blob"
    //xhr.setRequestHeader('Authorization', 'Basic a2VybWl0Omtlcm1pdA==');
    // 为了避免大文件影响用户体验，建议加loading
    xhr.onload = () => {
      if (xhr.status === 200) {
        // 获取文件blob数据并保存
        saveAs(xhr.response, fileName)
      }
    };
    xhr.send()
}

//信息显示函数
function new_text_mine(thing,name){
    let newd=f1.cloneNode(true)
    newd.childNodes[1].src=users_message[name].head
    newd.childNodes[3].childNodes[1].childNodes[1].innerText=users_message[name].name
    newd.childNodes[3].childNodes[3].innerText=thing
    newd.setAttribute('name',name)
    b2s.appendChild(newd)
    b25.scrollIntoView(false)
}

function new_text_other(thing,name){
    let newd=f2.cloneNode(true)
    newd.childNodes[1].src=users_message[name].head
    newd.childNodes[3].childNodes[1].childNodes[1].innerText=users_message[name].name
    newd.childNodes[3].childNodes[3].innerText=thing
    newd.setAttribute('name',name)
    b2s.appendChild(newd)
    b25.scrollIntoView(false)
}

function new_file_mine(url,fname,fbig,name,fimg){
    let newd=f3.cloneNode(true)
    newd.childNodes[1].src=users_message[name].head
    newd.childNodes[3].childNodes[1].childNodes[1].innerText=users_message[name].name
    newd.childNodes[3].childNodes[3].childNodes[1].childNodes[1].innerText=fname
    newd.childNodes[3].childNodes[3].childNodes[1].childNodes[3].innerText=fbig
    newd.childNodes[3].childNodes[3].childNodes[3].src=fimg
    newd.setAttribute('name',name)
    b2s.appendChild(newd)
    newd.onclick=function(){
        downLoad(url,fname)

    }
    b25.scrollIntoView(false)
}

function new_file_other(url,fname,fbig,name,fimg){
    let newd=f4.cloneNode(true)
    newd.childNodes[1].src=users_message[name].head
    newd.childNodes[3].childNodes[1].childNodes[1].innerText=users_message[name].name
    newd.childNodes[3].childNodes[3].childNodes[1].childNodes[1].innerText=fname
    newd.childNodes[3].childNodes[3].childNodes[1].childNodes[3].innerText=fbig
    newd.childNodes[3].childNodes[3].childNodes[3].src=fimg
    newd.setAttribute('name',name)
    b2s.appendChild(newd)
    newd.onclick=function(){
        downLoad(url,fname)
    }
    b25.scrollIntoView(false)
}

function new_img_mine(){

}

function new_img_other(){

}

function new_people(e,l){
    let newd=f10.cloneNode(true)
    newd.childNodes[1].childNodes[1].src=e.head
    newd.childNodes[1].childNodes[3].childNodes[1].innerText=e.name
    newd.childNodes[1].childNodes[3].childNodes[3].childNodes[3].innerText=e.software
    if(l==1){newd.childNodes[3].childNodes[1].childNodes[3].innerText='房主'}
    else{newd.childNodes[3].childNodes[1].childNodes[3].innerText='成员'}
    newd.childNodes[3].childNodes[3].childNodes[3].innerText=e.base
    newd.childNodes[3].childNodes[5].childNodes[3].innerText=e.time

    newd.childNodes[1].childNodes[5].onclick=function(){
        newd.childNodes[1].childNodes[5].style.display='none'
        newd.childNodes[1].childNodes[7].style.display='block'
        newd.childNodes[3].style.display='block'
    }
    newd.childNodes[1].childNodes[7].onclick=function(){
        newd.childNodes[1].childNodes[5].style.display='block'
        newd.childNodes[1].childNodes[7].style.display='none'
        newd.childNodes[3].style.display='none'
    }
    newd.setAttribute('name',l)
    b520.appendChild(newd)

}
//new_people({},1)
let node_after=document.getElementById('b511')
function new_file(url,fname,fbig,name,fimg){
    let newd=f20.cloneNode(true)
    newd.childNodes[1].src=fimg
    newd.childNodes[3].childNodes[1].innerText=fname
    newd.childNodes[3].childNodes[3].childNodes[3].innerText=fbig
    newd.setAttribute('name',name)
    b510.insertBefore(newd,node_after)
    newd.onclick=function(){
        downLoad(url,fname)
    }
    node_after=newd
}
//socket链接用户信息表,有新用户接入,有用户退出。基于此定义以下两个函数
/**
 * @{users_message}全部用户信息对象
 */
let users_message={}
socket.on('connectok',function(e){
    let users_message_key=Object.keys(users_message)
    let e_key=Object.keys(e)
    for(let i in e_key){
        if(users_message_key.indexOf(e_key[i])==-1){
            //该人为新用户
            if(e_key[i]==static_user_num){
                //本人信息写入
                e2.value=e[e_key[i]].name
                e16.src=e[e_key[i]].head
            }
            users_message[e_key[i]]=e[e_key[i]]
            new_people(e[e_key[i]],e_key[i])

        }
    }
    d32.innerText='('+Object.keys(users_message).length+')'
})
  
socket.on('disconnectok',function(e){
    let b520c=b520.childNodes
    for(let i=0;i<b520c.length;i++){
        if(b520c[i].getAttribute('name')==e){
            //该人已退出，移除信息
            b520.removeChild(b520c[i])
            break
        }
    }
    delete users_message[e]
    d32.innerText='('+Object.keys(users_message).length+')'
})


//发送信息
d10.onmousedown=function(){
    d10.style.backgroundColor='rgba(0,0,0,.04)'
    d10.onmouseup=function(){
        d10.style.backgroundColor='rgba(0,0,0,.05)'
    }
}
var send_text
d10.onclick=function(){
    send_text=d5.value
    if(send_text==''){
        console.log('发送没有内容')
    }
    else{
        console.log(send_text)

        //socketio
        socket.emit('chat_message',{
            io_type:'text',
            thing:send_text,
            send_user_num:static_user_num



        })

        d5.value=''
    }
}
//发送文件
d4.onclick=function(){
    d11.click()
}
d11.onchange=function(){
    console.log(d11.files)
    let file_list=d11.files
    for(let i in file_list){
        let the_file=file_list[i]
        let formData = new FormData()
        formData.append("count",1)
        formData.append("name",the_file.name)
        formData.append("file",the_file)
        
        let config = {
            headers: { "Content-Type": "multipart/form-data;boundary="+new Date().getTime() }
        }
        
        axios.post('http://43.143.39.43:'+static_room_number+'/'+static_room_number+'/sendfile',formData,config).then(function (res) {
            console.log(res)
            let file_res=res.data
            if(file_res.id==1){
                //socketio
                socket.emit('file',{
                    io_type:'file',
                    url:file_res.file_url,
                    fname:file_res.file_name,
                    fbig:file_res.file_big,
                    fimg:file_res.file_img,
                    send_user_num:static_user_num


                })
            }

        })
    }
    d11.value=''
}
//接收
//接收信息
socket.on('chat_message',function(e){
    if(e.send_user_num==static_user_num){
        //自己发的
        new_text_mine(e.thing,e.send_user_num)
    }
    else{
        //接收别人的
        new_text_other(e.thing,e.send_user_num)
    }
    

})


//接收文件
socket.on('file',function(e){
    if(e.send_user_num==static_user_num){
        new_file_mine(e.url,e.fname,e.fbig,e.send_user_num,e.fimg)
        new_file(e.url,e.fname,e.fbig,e.send_user_num,e.fimg)
    }
    else{
        new_file_other(e.url,e.fname,e.fbig,e.send_user_num,e.fimg)
        new_file(e.url,e.fname,e.fbig,e.send_user_num,e.fimg)
    }
    
})

socket.emit('getsocketid',static_user_num)

//右侧浮动公告组件函数
j2.onclick=function(){
    js1.style.display='block'
}
js12.onclick=function(){
    js1.style.display='none'
}

j3.onclick=function(){
    window.open('http://43.143.39.43/page2/feedback','_blank')
}
j4.onclick=function(){
    window.open('http://43.143.39.43/page2/help','_blank')
}
const express=require('express')
const cors=require('cors')
const http = require('http')
const { Server } = require("socket.io")
const cookieParser=require("cookie-parser")
const multiparty = require('multiparty')
const fs = require('fs')

//*********服务器资源调度代码（开始）***********//
//服务房间号数据
var room_numbers=[]

function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 

function get_room_number(){
    while(1){
        let rtt1=''+randomNum(1000,9999)
        if(room_numbers.indexOf(rtt1)==-1 ){
            return rtt1
        }
        else{
            return get_room_number()
        }
    }
}
//随机生成10位字符串
function randomString(){
	var chars = 'ABCDEFGHMNPQRSTWXYZo9gqVvlaUubcdefhkmnprsxyzI12345678'
	var tempLen = chars.length, tempStr=''
	for(var i=0; i<10; ++i){
		tempStr += chars.charAt(Math.floor(Math.random() * tempLen ))
	}
	return tempStr
}
//获取当前时间
function getNowTime() {
    const yy = new Date().getFullYear()
    const MM = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
    const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
    const HH = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
    const mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
    const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
    return yy + MM + dd + HH + mm + ss
}
//获取标准时间字符串
function standard_time(){
    const yy = new Date().getFullYear()
    const MM = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)
    const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
    const HH = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
    const mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
    const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
    return yy + '-'+MM +'-'+ dd +' '+ HH+':' + mm +':'+ ss
}
//字节简化换算
function byteEasy(x){
    let bytelist=['B','k','M','G']
    let a=Number(x)
    let b=0
    while(1){
        if(a<1024 || b>=3){
            return String(Math.round(a*10)/10)+bytelist[b]
        }
        else{
            a=a/1024
            b+=1
        }
    }
}
//文件类型给予图片
let toImg={
    code:"public/img/code.svg",
    img:"public/img/img.svg",
    pdf:"public/img/pdf.svg",
    ppt:"public/img/ppt.svg",
    txt:"public/img/txt.svg",
    word:"public/img/word.svg",
    xls:"public/img/xls.svg",
    zip:"public/img/zip.svg",
    un:"public/img/unknow.svg",
    music:"public/img/mp3.svg",
    video:"public/img/video.svg"
}
function fileToImg(x){
    if(x.indexOf('.')==-1){
        return toImg.un
    }
    else{
        let t=x.substring(x.lastIndexOf('.')+1,x.length)
        if(t=='png'||t=='jpg'||t=='jpeg'||t=='gif'||t=='svg'||t=='ai'||t=='psd'||t=='bmp'||t=='pic'||t=='tif'){
            return toImg.img
        }
        else if(t=='pdf'){
            return toImg.pdf
        }
        else if(t=='ppt'){
            return toImg.ppt
        }
        else if(t=='txt'||t=='md'){
            return toImg.txt
        }
        else if(t=='doc'||t=='docx'){
            return toImg.word
        }
        else if(t=='xls'||t=='xlsx'||t=='csv'){
            return toImg.xls
        }
        else if(t=='rar'||t=='zip'||t=='arj'||t=='gz'||t=='z'){
            return toImg.zip
        }
        else if(t=='js'||t=='html'||t=='css'||t=='py'||t=='cpp'||t=='java'||t=='c'||t=='json'){
            return toImg.code
        }
        else if(t=='mp4'||t=='flv'||t=='mpg'||t=='mpeg'){
            return toImg.video
        }
        else if(t=='wav'||t=='mp3'||t=='aif'||t=='au'){
            return toImg.music
        }
        else{
            return toImg.un
        }
    }
}
//*********服务器资源调度代码（结束）***********//

const app1=express()


    //跨域中间件
app1.use(cors())
    //解析请求体中间件
app1.use(express.json())
app1.use(express.urlencoded({ extended: true }))
    //cookie中间件
app1.use(cookieParser())



//静态资源服务器
app1.use('/',express.static('forwards'))
app1.use('/page2/',express.static('otherForwards'))
app1.use('/forwards2/public/img/',express.static('forwards2/public/img'))



//api接口服务器

app1.get('/p1/get_room_number',function(req,res){
    let new_number=get_room_number()
    res.send({new_number:new_number})

})
app1.post('/p2/creat',function(req,res){
    let req1=req.body
    let room_number_post=req1.room_number_post//房间号
    let key_word_type=req1.key_word_type//有无密码
    let key_word=req1.key_word//密码字符串
    let max_people=req1.people_number//最大人数
    let people_software=req1.software
    let people_base=req1.base
    let people_ip=req1.ip
    console.log(req1)
    //全局登记房间号
    room_numbers.push(room_number_post)
    //创建socket服务器
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);
    const sockets=[]
    //跨域中间件
    app.use(cors())
    //解析请求体中间件
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    //cookie中间件
    app.use(cookieParser())
    
    function closeServer(){
        sockets.forEach(function(socket){
            socket.destroy()
        })
        server.close(function(){
            console.log(room_number_post+' close server!')
        })
    }
    let users_id_sql=[]
    let users_num_sql=[]
    let users_message={
        1:{
            name:people_software,
            software:people_software,
            ip:people_ip,
            base:people_base,
            time:standard_time(),
            head:'public/img/head/momo.svg'
        }
    }
    let root='/'+room_number_post
    //静态资源托管
    app.use('/public/',express.static('forwards2/public'))
    app.get(root, (req, res) => {
        let req2=req.query.user_if
        let judge1=0
        for(let i1 in users_id_sql){
            if(req2==users_id_sql[i1]){
                res.sendFile(__dirname + '/forwards2/index.html')
                users_id_sql.splice(i1,1)
                judge1=1
                break
            }
        }
        if(judge1==0){
            res.send('找不到身份码')
            console.log('找不到身份码')
        }
    })
    //文件操作
    fs.mkdirSync('./forwards2/public/all_files/'+room_number_post)
    fs.mkdirSync('./forwards2/public/all_files/'+room_number_post+'/userhead')
    app.post('/'+room_number_post+'/sendfile',  function (req, res) {
        /* 生成multiparty对象，并配置上传目标路径 */
        let form = new multiparty.Form()
        // 设置编码 
        form.encoding = 'utf-8'
        // 设置文件存储路径，以当前编辑的文件为相对路径
        form.uploadDir = './forwards2/public/all_files/'+room_number_post
        // 设置文件大小限制
        // form.maxFilesSize = 1 * 1024 * 1024;
        form.parse(req, function (err, fields, files) {
            console.log(files)
            try {
                let inputFile = files.file[0]
                let newPath = form.uploadDir + "/" + getNowTime()+'_'+inputFile.originalFilename
                // 同步重命名文件名 fs.renameSync(oldPath, newPath)
                //oldPath  不得作更改，使用默认上传路径就好
                fs.renameSync(inputFile.path, newPath)
                res.send({ 
                    data: "上传成功！" ,
                    id:1,
                    file_url:newPath.substring(12,newPath.length),
                    file_name:inputFile.originalFilename,
                    file_big:byteEasy(inputFile.size),
                    file_img:fileToImg(inputFile.originalFilename)
                    
                })
            } 
            catch (err) {
                console.log(err)
                res.send({ 
                    data: "上传失败！" ,
                    id:0
                })
            }
        })
    })
    app.post('/'+room_number_post+'/sendhead',function(req,res){
        /* 生成multiparty对象，并配置上传目标路径 */
        let form = new multiparty.Form()
        // 设置编码 
        form.encoding = 'utf-8'
        // 设置文件存储路径，以当前编辑的文件为相对路径
        form.uploadDir = './forwards2/public/all_files/'+room_number_post+'/userhead'
        // 设置文件大小限制
        // form.maxFilesSize = 1 * 1024 * 1024;
        form.parse(req, function (err, fields, files) {
            console.log(files)
            try {
                let inputFile = files.file[0]
                let newPath = form.uploadDir + "/" + getNowTime()+'_'+inputFile.originalFilename+'.jpg'
                // 同步重命名文件名 fs.renameSync(oldPath, newPath)
                //oldPath  不得作更改，使用默认上传路径就好
                fs.renameSync(inputFile.path, newPath)
                res.send({ 
                    data: "上传成功！" ,
                    id:1,
                    head_url:newPath.substring(12,newPath.length)
                    
                })
            } 
            catch (err) {
                console.log(err)
                res.send({ 
                    data: "上传失败！" ,
                    id:0
                })
            }
        })
    })
    io.on('connection', (socket) => {
        io.emit('connectok',users_message)
        socket.on('getsocketid',(e)=>{
            console.log(e+'接入连接')
            users_message[e].socketid=socket.id
        })
        socket.on('disconnect', () => {
            let mkey=Object.keys(users_message)
            for(let i in mkey){
                if(users_message[mkey[i]].socketid==socket.id){
                    console.log(mkey[i]+'断开连接')
                    if(mkey[i]==1){
                        //房主退出房间，文件转存,释放房间号，服务关闭
                        fs.rename('./forwards2/public/all_files/'+room_number_post,'./forwards2/public/history_files/'+getNowTime()+room_number_post,function(s){
                            console.log(s)
                        })
                        room_numbers.splice(room_numbers.indexOf(room_number_post),1)
                        closeServer()
                        
                    }
                    else{
                        io.emit('disconnectok',mkey[i])
                        delete users_message[mkey[i]]
                    }
                    break
                }
            }
        })
        socket.on('changename',function(e){
            users_message[e[0]].name=e[1]
            io.emit('changename',e)
        })
        socket.on('changehead',function(e){
            users_message[e[0]].head=e[1]
            io.emit('changehead',e)
        })
        socket.on('chat_message', (msg) => {
          io.emit('chat_message', msg)
        })
        socket.on('file', (msg) => {
            io.emit('file', msg)
        })
    })
    
    //接收连接者第一次请求
    app.post(root+'/connect',function(req,res){
        let req3=req.body
        //console.log(req3)
        if(Object.keys(users_message).length>=max_people){
            res.send({
                type:'connect_over',
                typenum:'3'
            })
        }
        else if(req3.key_word_connect!=key_word){
            res.send({
                type:'wrong_keyword',
                typenum:'4'
            })
        }
        else{
            let room_number_connect=req3.room_number_connect
            let people_software=req1.software
            let people_base=req1.base
            let people_ip=req1.ip
            let other_user_num=users_num_sql[users_num_sql.length-1]+1
            users_num_sql.push(other_user_num)
            users_message[other_user_num]={
                name:people_software,
                software:people_software,
                ip:people_ip,
                base:people_base,
                time:standard_time(),
                head:'public/img/head/momo.svg'
            }
            if(key_word_type==true){
                if(room_number_connect==room_number_post){
                    let other_user_id=randomString()
                    while(1){
                        if(users_id_sql.indexOf(other_user_id)==-1){
                            users_id_sql.push(other_user_id)
                            res.cookie("room_name",room_number_post,{maxAge: 172800})
                            res.cookie("room_key",key_word,{maxAge: 172800})
                            res.cookie("max_person",max_people,{maxAge: 172800})
                            res.send({
                                type:'connect_ok',
                                typenum:'2',
                                connect_root:root,
                                user_id:other_user_id,
                                user_num:other_user_num,
                                room_max:max_people
                            })
                            break
                        }
                    }
                }
            }
            else{
                if(room_number_connect==room_number_post){
                    let other_user_id=randomString()
                    while(1){
                        if(users_id_sql.indexOf(other_user_id)==-1){
                            users_id_sql.push(other_user_id)
                            res.cookie("room_name",room_number_post,{maxAge: 172800})
                            res.cookie("room_key",key_word,{maxAge: 172800})
                            res.cookie("max_person",max_people,{maxAge: 172800})
                            res.send({
                                type:'connect_ok',
                                typenum:'2',
                                connect_root:root,
                                user_id:other_user_id,
                                user_num:other_user_num,
                                room_max:max_people
                            })
                            break
                        }
                    }
                }
            }
        }
    })
    server.on("connection",function(socket){
        sockets.push(socket)
        socket.once("close",function(){
            sockets.splice(sockets.indexOf(socket),1)
        })
    })
    server.listen(Number(room_number_post), () => {
        console.log('listening on '+room_number_post)
    })


    //给创建者返回id信息
    /**
     * @{user_id}socket连接时唯一标识验证码
     * @{user_num}用户唯一标识数字
     * 
     */
    let first_user_id=randomString()
    users_id_sql.push(first_user_id)
    users_num_sql.push(1)
    res.cookie("room_name",room_number_post,{maxAge: 172800})
    res.cookie("room_key",key_word,{maxAge: 172800})
    res.cookie("max_person",max_people,{maxAge: 172800})
    res.send({
        type:'create_ok',
        typenum:'1',
        connect_root:root,
        user_id:first_user_id,
        user_num:1,
        room_max:max_people
    })

})



app1.listen(80,()=>{
    console.log('ok')
})
const fs = require('fs')
const prompt = require("prompt-sync")()
const dict = {}
while(true){
    try {
        console.log('\npress 1 for signup\npress 2 for login\npress 3 for exit\n')
        let passwd3 = ()=>{
            let password5 = prompt('Enter your password:-')
            if(password5.length == "8"){
                return password5
            }else{
                console.log("your password shoud be 8 charecter and there shoud be special charecter add.");       
                return passwd3()
            }
        }
        let email = function(){
            let email2 = prompt("Enter your emailAddress:-")
            if(email2.includes('@gmail.com')){   
                return email2
            }else{
                console.log('Please enter valid emailAddress,"@gmail.com" Shoud be present');
                return email()
            }
        }
        function signup(){
            if(!fs.existsSync('./node.js/login.json')){
                function recall(){
                    const mobaile = prompt('Enter your mobaile number:-')
                    if(mobaile.length == "10"){
                        dict[mobaile] = {'userName':prompt('Enter your userName:-'),'Password':passwd3(),
                        'firstName':prompt('Enter your firstname:- '),'lastName':prompt('Enter your lastname:- '),
                        'emailAddress':email()}
                        fs.writeFileSync('./node.js/login.json',JSON.stringify(dict,null,4))
                        console.log('your account created sucessfully....');
                    }else{
                        console.log('Please enter valid mo.number');
                        recall()
                    }
                }
                recall()
            }else{
                let recall2 = ()=>{
                    let read = fs.readFileSync("./node.js/login.json",'utf-8')
                    if(read == ""){
                        const mobaile = prompt('Enter your mobaile number:-')
                        if(mobaile.length == "10"){
                            dict[mobaile] = {'userName':prompt('Enter your userName:-'),'Password':passwd3(),
                            'firstName':prompt('Enter your firstname:- '),'lastName':prompt('Enter your lastname:- '),
                            'emailAddress':email()}
                            fs.writeFileSync('./node.js/login.json',JSON.stringify(dict,null,4))
                            console.log('your account created sucessfully....');
                        }else{
                            console.log('Please enter valid mo.number');
                            recall2()
                        }
                    }else{
                        function recall3(){
                            let mobaile1 = prompt("Enter your mobaile number:- ")
                            if(mobaile1.length == "10"){
                                let read = fs.readFileSync("./node.js/login.json",'utf-8')
                                let parse = JSON.parse(read)
                                parse[mobaile1] = {'userName':prompt('Enter your userName:-'),'Password':passwd3(),
                                'firstName':prompt('Enter your firstname:- '),'lastName':prompt('Enter your lastname:- '),
                                'emailAddress':email()}
                                fs.writeFileSync('./node.js/login.json',JSON.stringify(parse,null,4))
                                console.log('your account created sucessfully....');
                            }else{
                                console.log('Please enter valid mo.number');
                                recall3()
                            }
                        }
                        recall3()
                    }
                }
                recall2()
            }
        }
        function login(){
            const check = fs.readFileSync('./node.js/login.json','utf-8')
            const parse2 = JSON.parse(check)
            let username1 = []
            let password1 = []
            for(let keys of Object.keys(parse2)){
                username1.push(parse2[keys]['userName'])
                password1.push(parse2[keys]['Password'])
            }
            let loop = "true";
            while(loop == "true"){
                let username = prompt('Enter your userName:- ')
                if(username1.includes(username)){
                    let passwd = prompt('Enter your paassword:- ')
                    if(password1.includes(passwd)){
                        loop = "false"
                        console.log("login successful........");
                    }else{
                        console.log("password incorrect.......");
                    }
                }else{
                    console.log("username incorrect........");
                }
            }
        }
        let user_choice = parseInt(prompt('Enter your choice: '))
        if(user_choice == 1){
            signup()
        }else if(user_choice == 2){
            login()
        }else if(user_choice == 3){
            break
        }
    }catch(error){
        console.log('Sorry your acount does not exist');
    }
}
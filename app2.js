let api='https://618fc8a0f6bf450017484a4d.mockapi.io/users';
let api2='https://618fc8a0f6bf450017484a4d.mockapi.io/category';
/*let button=document.getElementById('b1');
button.addEventListener('click',formValidate);*/

async function formValidate()                                    
{ 
    var alertname= document.getElementById("user");
    var alertemail= document.getElementById("email");
    var alertpassword= document.getElementById("pass");
    var alertcpassword= document.getElementById("cpass");
    var alertquespass= document.getElementById("ans");
    var msg= document.getElementById("msg");

    var name1 = document.getElementById('user1')             
    var email1 = document.getElementById('email1');    
    var password1 = document.getElementById('pass1'); 
    var cpassword1 = document.getElementById('cpass1');
    var ques=document.getElementById('pass2');
    var ans=document.getElementById('ans1');
    let f=0;  
    if (name1.value==""&&email1.value == ""&&password1.value == ""&&cpassword1.value == ""&&ans.value)
    {
        alertname.innerText="*Kindly fill Username field";
        alertemail.innerText="*Kindly fill Email field";
        alertpassword.innerText="*Kindly fill this field";
        alertcpassword.innerText="*Kindly fill this field";
        alertquespass.innerText="*Kindly answer the security question";
        f=f+1;
       // console.log(f);
    }
    if (name1.value.length < 8)
    { 
        alertname.innerText="*Alteast 8 to 15 Characters Required";
        name1.focus(); 
        f=f+1;
        //console.log(f);
        
    }
    else
    {
        const val=await checkUser(name1.value);
        if(val==1)
        {
            f=f+1;
            alertname.innerText="*This Username already exists";
        }
        else{
        alertname.innerText="";
        }
    } 
   
    if (email1.value == "")                                   
    { 
        alertemail.innerText="*Kindly fill Email field";
        f=f+1;
        email.focus(); 
        //console.log(f);
    }
    else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email1.value))
    {
        const val=await checkEmail(email1.value);
        if(val==1)
        {
            f=f+1;
            alertemail.innerText="*This Email already exists";
        }
        else{
        alertemail.innerText="";
        }
    }
    else
    {
        alertemail.innerText="*Enter Valid Email address";
        email1.focus();
        f=f+1;
        //console.log(f);
        
    }
   

    if (password1.value == "")                        
    { 
        alertpassword.innerText="*Kindly fill this field";
        password1.focus(); 
        f=f+1;
       // console.log(f);
    }
    else if(password1.value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))
    {
        
        alertpassword.innerText="";
       
        //console.log(f);
    }
    else
    {
        alertpassword.innerText="*Password must contain 1 uppercase letter,1 lowercase letter,atleast 1 number and symbol";
        password1.focus();
        f=f+1;
       
    }  
    


    if (cpassword1.value == "")                        
    { 
        alertcpassword.innerText="*Kindly fill this field";
        cpassword1.focus(); 
        f=f+1;
        //console.log(f);
        
    }
    else if(password1.value == cpassword1.value)
    {
        alertcpassword.innerText="";
    }
    else
    {
        alertcpassword.innerText="*Password and Confirm password must be same";
        cpassword1.focus(); 
        f=f+1;
        //console.log(f);
        
    }
    if(ans.value=="")
    {
        alertquespass.innerText="*Kindly answer the security question";
        f=f+1;
    }
    else{
        alertquespass.innerText="";
    }
    if(f==0)
    {
        try{
            axios.post(api,{email:email1.value.toLowerCase(),password:password1.value,username:name1.value.toLowerCase(),ques:ques.value,ans:ans.value.toLowerCase()})
            .then(res=>console.log(res))
            .catch(err=>console.log(err));
            axios.post(api2,{email:email1.value,categoryname:"General",items:[]})
            .then(res=>console.log(res))
            .catch(err=>console.log(err));
           email1.value="";
           password1.value="";
           name1.value="";
           cpassword1.value="";
            msg.innerHTML="Account Created";
            ans.value="";
        }
        catch(error)
        {
            console.log(error);
        }
        
    }

        

}

async function getUserData(){
    try{
    return axios.get(api)
    }
    catch(error){
        console.error(error);
    }
}

async function checkEmail(email)
{
    let f=0;
    const response=await getUserData();
    for(let i=0;i<response.data.length;i++)
    {
        
        if(response.data[i].email===email)
        {
            f=f+1;
            break;
        }
    }
    if(f==0)
    {
        return 0;
    }
    else
    {
        return 1;
    }
}


async function checkUser(user)
{
    let f=0;
    const response=await getUserData();
    for(let i=0;i<response.data.length;i++)
    {
        if(response.data[i].username===user)
        {
            f=f+1;
            break;
        }
    }
    if(f==0)
    {
        return 0;
    }
    else
    {
        return 1;
    }

}


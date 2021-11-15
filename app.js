var api="https://618fc8a0f6bf450017484a4d.mockapi.io/users";

if(localStorage.getItem("User")!=null)
{
    let str=localStorage.getItem("User");
    let arr=str.split(" ");
    //console.log(arr);
    //console.log(document.getElementById("user1").value);
    document.getElementById("user1").value=arr[0];               
    document.getElementById("pass1").value=arr[1]; 
}

async function getUserData(){
    try{
    return axios.get(api)
    }
    catch(error){
        console.error(error);
    }
}

async function checkEmailUser(user,email,pass)
{
    let f=0;
    let val="";
    const response=await getUserData();
    for(let i=0;i<response.data.length;i++)
    {
        
        if((response.data[i].email===email ||response.data[i].username===user)&response.data[i].password===pass)
        {
            val=response.data[i].email;
            f=f+1;
            break;
        }
    }
    if(f==0)
    {
        return "";
    }
    else
    {
        return val;
    }
}

async function formValidate()                                    
{ 
    var alertmsg= document.getElementById("msg");
   
    
    var validate= document.getElementById("remember");
    var name = document.getElementById("user1");               
    var pass= document.getElementById("pass1");    
    
    if (name.value=="" || pass.value == "")
    {
        alertmsg.innerText="*Please enter both Username and Password";

        
    }
    else{
            let st="";
            st=await checkEmailUser(name.value,name.value,pass.value);
            if(st!="")
            {
                if(validate.checked)
                {
                    localStorage.setItem("User",name.value+" "+pass.value);
                } 
                sessionStorage.setItem("Email",st);
                window.location.replace("category.html");
            }
            else{
                alertmsg.innerText="*Username or Password incorrect"; 
            }  
    }
   
}
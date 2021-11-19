var api="https://618fc8a0f6bf450017484a4d.mockapi.io/users";
var email="";
var ques="";
var ans="";
async function getUserData(){
    try{
    return axios.get(api)
    }
    catch(error){
        console.error(error);
    }
}
async function generatePassword(){
    email=document.getElementById("email1").value;
    ques=document.getElementById("pass2").value;
    ans=document.getElementById("ans1").value.toLowerCase();
    let f=0;
    let x=0;
    if(ans==="")
    {
        document.getElementById("ans").innerText="*Kindly answer the security question";
        document.getElementById("password").style.display="none";
        x=x+1;
    }
    if(email===""){
        document.getElementById("msg").innerText="*Please Enter your Username or Email";
        document.getElementById("password").style.display="none";
    }
    else{
        document.getElementById("msg").innerText="";
        document.getElementById("password").style.display="none";
    }
    console.log(ans+x);
    if(email!="" && x===0)
    {
        document.getElementById("ans").innerText="";
        const response=await getUserData();
        for(let i=0;i<response.data.length;i++)
    {
        
        if((response.data[i].email===email.toLowerCase() ||response.data[i].username===email.toLowerCase())&&(response.data[i].ques===ques && response.data[i].ans===ans))
        {
            val=response.data[i].password;
            f=f+1;
            break;
        }
    }
    if(f==0)
    {
        document.getElementById("msg").innerText="*Your Username or Email or security question and answer is incorrect";
        document.getElementById("password").style.display="none";
    }
    else
    {
        
        document.getElementById("password").innerText=val;
        document.getElementById("password").style.display="flex";
        document.getElementById("msg").innerText="";
    document.getElementById("ans").innerText="";    
}
    }

}
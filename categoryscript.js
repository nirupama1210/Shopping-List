let api='https://618fc8a0f6bf450017484a4d.mockapi.io/users';
let api2='https://618fc8a0f6bf450017484a4d.mockapi.io/category';

let email="";
async function getUserData(){
    try{
    return axios.get(api2)
    }
    catch(error){
        console.error(error);
    }
}

async function checkEmailUser(email)
{

    const response=await getUserData();
    for(let i=0;i<response.data.length;i++)
    {
        
        if(response.data[i].email===email)
        {
            if(i==0)
            {
                let but=document.createElement("button");
            
                but.setAttribute("class","buttonbox");

                but.innerHTML="<p class='categoryname'>"+response.data[i].categoryname+"</p>";
                document.getElementById("innerdiv").appendChild(but);
            }
            else{

            let but=document.createElement("button");
            
            but.setAttribute("class","buttonbox");
           if(response.data[i].items.length>0)
            {but.innerHTML="<p class='categoryname'>"+response.data[i].categoryname+"</p><div class='bigicons2'><img class='smallimage' src='pencil.svg' alt='edit' onclick='editCategory(\""+email+"\","+response.data[i].id+",\""+response.data[i].categoryname+"\","+response.data[i].items+")'><img class='smallimage' src='trash.svg' alt='delete' onclick='deleteCategory(\""+email+"\","+response.data[i].id+")'></div>";
            }
            else{
                but.innerHTML="<p class='categoryname'>"+response.data[i].categoryname+"</p><div class='bigicons2'><img class='smallimage' src='pencil.svg' alt='edit' onclick='editCategory(\""+email+"\","+response.data[i].id+",\""+response.data[i].categoryname+"\")'><img class='smallimage' src='trash.svg' alt='delete' onclick='deleteCategory(\""+email+"\","+response.data[i].id+")'></div>";
            }
            document.getElementById("innerdiv").appendChild(but);
            }
        }
    }
}


if(sessionStorage.getItem("Email")!=null)
{
email=sessionStorage.getItem("Email");
console.log(email);
checkEmailUser(email);
}
else{
    window.location.replace("index.html");
}

function addCategory()
{
    document.querySelector(".inner2").style.display="block";
    document.querySelector(".inner3").style.display="none";
    document.getElementById("msg1").innerText="";
}
async function deleteFunction(api3){
    try{
        return axios.delete(api3)
        }
        catch(error){
            console.error(error);
        }
}
async function clearCategory()
{
    const response=await getUserData();
    let arr=[];
    let x=0;
    for(let i=1;i<response.data.length;i++)
    {
        
        if(response.data[i].email===email)
        {
            arr[x]=response.data[i].id;
            x=x+1;
        }
    }
    console.log(arr);
    let f=0;
    for(let i=0;i<arr.length;i++)
    {
        let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/category/'+arr[i];
       const res= await deleteFunction(api3);
        f=f+1;
    }
    window.location.reload();
}
  

async function editNewCategory(email,id,item){
    let catname=document.getElementById("cat2").value;
    let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/category/'+id;
    if(catname!="")
    {try{
        if(item.length>0)
       { axios.put(api3,{email:email,categoryname:catname,items:item})
        .then(res=>{
            console.log(res)
            window.location.reload();
        })
        .catch(err=>console.log(err));
    }
    else{
        axios.put(api3,{email:email,categoryname:catname})
        .then(res=>{
            console.log(res)
            window.location.reload();
        })
        .catch(err=>console.log(err));
    }
     
        
    }
    catch(error)
    {
        console.log(error);
    }
}
else{
    document.getElementById("msg2").innerText="*Please Enter Category";
}
}

function editCategory(email,id,catname,items=[])
{
    document.getElementById("cat2").value=catname;
    document.querySelector(".inner2").style.display="none";
    document.querySelector(".inner3").style.display="block";
    document.getElementById("msg2").innerText="";
    if(items.length>0)
    {document.getElementById("b1").setAttribute("onclick","editNewCategory(\""+email+"\",\""+id+"\","+items+")");
}
else{
    document.getElementById("b1").setAttribute("onclick","editNewCategory(\""+email+"\",\""+id+"\",[])");
}
}


function cancelButton(){
    document.querySelector(".inner2").style.display="none";
    document.querySelector(".inner3").style.display="none";
}

async function addNewCategory(){
    let catname=document.getElementById("cat").value;
    if(catname!="")
    {try{
        axios.post(api2,{email:email,categoryname:catname,items:[]})
        .then(res=>{
            console.log(res)
            window.location.reload();
        })
        .catch(err=>console.log(err));

        /*document.querySelector(".inner2").style.display="none";
       catname="";
       await checkEmailUser(email);*/
       
        
    }
    catch(error)
    {
        console.log(error);
    }
}
else{
    document.getElementById("msg1").innerText="*Please Enter Category";
}
}

async function deleteCategory(email,id){
    
        try{
        let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/category/'+id;
        axios.delete(api3)
        .then(res=>{
            console.log(res)
            window.location.reload();
        })
        .catch(err=>console.log(err));

        //document.querySelector(".inner2").style.display="none";
       //catname="";
       //await checkEmailUser(email);
       
        
    }
    catch(error)
    {
        console.log(error);
    }

}

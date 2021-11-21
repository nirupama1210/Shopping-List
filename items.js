let api2='https://618fc8a0f6bf450017484a4d.mockapi.io/category';
let email="";
let catid="";
let arr=[];
let pricearr=[];
let quanarr=[];
let catname="";
let item="";
let q=0;
async function getUserData(){
    try{
    return axios.get(api2)
    }
    catch(error){
        console.error(error);
    }
}
async function checkCatData(email,id)
{
    const response=await getUserData();
    let s=0;
    let f=0;
    for(let i=0;i<response.data.length;i++)
    {
        
        if(response.data[i].email===email && response.data[i].id===id)
        {
         document.getElementById("h2").innerText=response.data[i].categoryname;  
         catname=response.data[i].categoryname;  

            
        }
    }
    for(let i=0;i<response.data.length;i++)
    {
        if(response.data[i].email===email && response.data[i].id===id)
        {
       
           for(let j=0;j<response.data[i].items.length;j++)
            {
                f=f+1;
                let but=document.createElement("button");
            
                but.setAttribute("class","buttonbox");
                let p=0;
                //console.log(parseInt(response.data[i].price[j]))
                if(parseInt(response.data[i].price[j])>0)
                 {
                   

                     p=parseInt(response.data[i].price[j])*parseInt(response.data[i].quantity[j]);
                     s=s+p;
 
                 }
              but.innerHTML="<p class='categoryname'>"+response.data[i].items[j]+"</p><p class='categoryname'>"+p+"</p><div class='bigicons2'><img class='smallimage' src='pencil.svg' alt='edit' onclick='editItem(\""+email+"\","+response.data[i].id+",\""+response.data[i].items[j]+"\","+response.data[i].price[j]+","+response.data[i].quantity[j]+","+j+")'><img class='smallimage' src='trash.svg' alt='delete' onclick='deleteItem(\""+email+"\","+response.data[i].id+","+j+")'></div>";

            document.getElementById("innerdiv").appendChild(but);
            }
            if(f!=0)
            {
            document.querySelector(".emptylist").style.display="none";
            let total=document.createElement("button");
            total.setAttribute("class","buttonbox2")
            total.setAttribute("id","total");
            total.innerHTML=s;
            document.getElementById("innerdiv").appendChild(total);
            }
        }
    }
}
function signOut()
{
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("items");
    localStorage.removeItem("User");
    window.location.replace("index.html");
}

async function addNewItem(){
    item=document.getElementById("item").value;
    let quan=document.getElementById("quan").value;
   // let q=0;
    if(quan!="")
    {
        q=parseInt(quan);
    }
    if(item!="")
    {
        const response=await getUserData();
        let f=0;

        let n=0;
        for(let i=0;i<response.data.length;i++)
        {
            if(response.data[i].email===email && response.data[i].id===catid)
            {
                console.log(response.data[i]);
                console.log(response.data[i].items.length);
                for(let j=0;j<response.data[i].items.length;j++)
                {
                    arr[j]=response.data[i].items[j];
                    pricearr[j]=response.data[i].price[j];
                    quanarr[j]=response.data[i].quantity[j];
                    n=n+1;
                }
                break;
            }
        }
        let x=0;
        let price="";
        for(let i=0;i<response.data.length;i++)
        {
            if(response.data[i].email===email)
            {
                for(let j=0;j<response.data[i].items.length;j++)
                {
                    if(response.data[i].items[j]===item && response.data[i].id!==catid)
                    {
                        
                        price=response.data[i].price[j];

                        x=x+1;

                    }
                    if(response.data[i].items[j]===item && response.data[i].id===catid)
                    {
                        f=f+1;
                    }

                }
            
            }
            if(x>0)
            {
                break;
            }
        }
        if(x==0)
        {
            document.querySelector(".inner2").style.display="none";
            document.querySelector(".innernew").style.display="flex";
           
            // sessionStorage.setItem("item",item);
            // sessionStorage.setItem("q",q);
            // sessionStorage.setObj("itemlist",arr);
            // sessionStorage.setObj("price",pricearr);
            // sessionStorage.setObj("quan",quanarr);
        }
        if(f>0)
        {
            document.getElementById("msg1").innerText="*You already have this item in your list";
        }
        else if(x>0)
        {
            addNewItemPrice(price);
        }
    }
else{
    document.getElementById("msg1").innerText="*Please Enter Item";
}
}

function addNewItemPrice(p="")
{
    if(p=="")
    {
        p=document.getElementById("price").value;
    }
    let price=0;
    if(p!="")
    {
        price=parseInt(p);
    }
    //let item=sessionStorage.getItem("item");
    //let q=sessionStorage.getItem("q");
   // let arr=sessionStorage.getObj("itemlist");
   // let pricearr=sessionStorage.getObj("price");
   // let quanarr=sessionStorage.getsetObj("quan");
    let n=quanarr.length;
    arr[n]=item;
    pricearr[n]=price;
    quanarr[n]=q;
    console.log(arr);
    console.log(quanarr);
    console.log(pricearr);
    let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/category/'+catid;
    try{
        //{email:email,categoryname:catname,items:JSON.stringify(arr),price:JSON.stringify(pricearr),quantity:JSON.stringify(quanarr)}
        let data={
            "email":email,
            "categoryname":catname,
            "items":arr,
            "price":pricearr,
            "quantity":quanarr

        }
        axios.put(api3,data)
        .then(res=>{
            console.log(res)
            // sessionStorage.removeItem("item");
            // sessionStorage.removeItem("q");
            // sessionStorage.removeObj("itemlist")
            // sessionStorage.removeObj("price")
            // sessionStorage.removeObj("quan")
            arr=[];
            pricearr=[];
            quanarr=[];
            window.location.reload();
        })
        .catch(err=>console.log(err));
    }
    catch(error)
    {
        console.log(error);
    }
    
    

}
function addItem()
{
    //console.log("Yes");
    document.querySelector(".inner2").style.display="flex";
    document.querySelector(".innernew").style.display="none";
    document.querySelector(".inner3").style.display="none";
    
}
//console.log("js page");

if(sessionStorage.getItem("Email")!=null && sessionStorage.getItem("items")!=null)
{
email=sessionStorage.getItem("Email");
catid=sessionStorage.getItem("items").split(" ")[1];
checkCatData(email,catid);
console.log(email);
}
else{
    window.location.replace("index.html");
}

function showCategory()
{
    window.location.replace("category.html");
}
function clearItem()
{
    try{
        let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/category/'+catid;
        data={
            "email":email,
            "categoryname":catname,
            "items":[],
            "price":[],
            "quantity":[]
        }
        axios.put(api3,data)
        .then(res=>{
            console.log(res)
            window.location.reload();
        })
        .catch(err=>console.log(err));
    }
    catch(err)
    {
        console.log(err)
    }
}
async function deleteSpecificItem(email,id,idx)
{
    const response=await getUserData();
    let n=0;
    for(let i=0;i<response.data.length;i++)
    {
        if(response.data[i].email==email && response.data[i].id==id)
        {
            for(let j=0;j<response.data[i].items.length;j++)
            {
                if(j!=idx)
                {
                    arr[n]=response.data[i].items[j];
                    pricearr[n]=response.data[i].price[j];
                    quanarr[n]=response.data[i].quantity[j];
                    n=n+1;
                }
            }
            break;
        }
    }

}
async function deleteItem(email,id,idx)
{
    await deleteSpecificItem(email,id,idx);   
    let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/category/'+catid;
    try{
        let data={
            "email":email,
            "categoryname":catname,
            "items":arr,
            "price":pricearr,
            "quantity":quanarr

        }
        axios.put(api3,data)
        .then(res=>{
            console.log(res)
            arr=[];
            pricearr=[];
            quanarr=[];
            window.location.reload();
        })
        .catch(err=>console.log(err));
    }
    catch(error)
    {
        console.log(error);
    }

}
function editItem(email,id,item,price,quan,idx)
{
    document.querySelector(".inner3").style.display="flex";
    document.querySelector(".inner2").style.display="none";
    document.querySelector(".innernew").style.display="none";
    document.getElementById("item2").value=item;
    document.getElementById("price2").value=price;
    document.getElementById("quan2").value=quan;
    document.getElementById("b1").setAttribute("onclick","saveItem('"+email+"','"+id+"',"+idx+")");
}

async function saveItem(email,id,idx)
{
    if(document.getElementById("item2").value!="")
    {
    const response=await getUserData();
    let n=0;
    for(let i=0;i<response.data.length;i++)
    {
        if(response.data[i].email==email && response.data[i].id==id)
        {
            for(let j=0;j<response.data[i].items.length;j++)
            {
                if(j!=idx)
                {
                    arr[n]=response.data[i].items[j];
                    pricearr[n]=response.data[i].price[j];
                    quanarr[n]=response.data[i].quantity[j];
                    n=n+1;
                }
                else{
                    let p=0,q=0;
                    if(document.getElementById("price2").value!="")
                    {
                        p=parseInt(document.getElementById("price2").value);
                    }
                    if(document.getElementById("quan2").value!="")
                    {
                        q=parseInt(document.getElementById("quan2").value);
                    }
                    arr[n]=document.getElementById("item2").value;
                    pricearr[n]=p
                    quanarr[n]=q;
                    n=n+1;
                }
            }
            break;
        }
    }
    console.log(arr,pricearr,quanarr)
    let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/category/'+id;
    try{
        let data={
            "email":email,
            "categoryname":catname,
            "items":arr,
            "price":pricearr,
            "quantity":quanarr

        }
        axios.put(api3,data)
        .then(res=>{
            console.log(res)
            arr=[];
            pricearr=[];
            quanarr=[];
            window.location.reload();
        })
        .catch(err=>console.log(err));
    }
    catch(error)
    {
        console.log(error);
    }
}
else{
    document.getElementById("msg2").innerText="*Please enter Item";
}

}
function showAddItem()
{
    document.querySelector(".innernew").style.display="none";
    document.querySelector(".inner2").style.display="flex";
}

function cancelButton()
{
    document.querySelector(".innernew").style.display="none";
    document.querySelector(".inner2").style.display="none"; 
    document.querySelector(".inner3").style.display="none";   
}

function printList()
{
       if(document.querySelector(".emptylist").style.display==="none")
        {var originalContents = document.body.innerHTML;

        document.getElementById("signout").style.display="none";
        document.querySelector(".innernew").style.display="none";
        document.querySelector(".bigicons").style.display="none";
        const icons=document.querySelectorAll(".bigicons2");
        icons.forEach(function(icon){
            icon.style.display="none";
        })
    document.querySelector(".inner2").style.display="none"; 
    document.querySelector(".inner3").style.display="none";  
    document.getElementById("total").style.marginLeft="250px";
        var printContents=document.body.innerHTML;
        document.body.innerHTML = printContents;
   
        window.print();
   
        document.body.innerHTML = originalContents;
    }
   
}

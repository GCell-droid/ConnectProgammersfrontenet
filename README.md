### API Call Problem
- When we are making cross orgin call we need to have cors as middleware and configure it so we can get cookie and make api call
- we also need to enable credentials in cors options
``` js
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
```
- when calling api in fontened we need to have withCredential:true while calling every api to cookie
``` js
 const handleLogin = async ()=>{
    //to get cookie
    const res = await axios.post('http://localhost:7777/login',{emailId,password},{withCredentials:true});
    console.log(res.data);
  }
```

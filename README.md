### API Call Problem
- When we are making cross orgin call we need to have cors as middleware in baackend and configure it so we can get cookie and make api call
- we also need to enable credentials in cors options
``` js
//In App.js (Backened)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
```
- when calling api in fontened we need to have withCredential:true while calling every api to cookie
``` js
//In Frontened
 const handleLogin = async ()=>{
    //to get cookie
    const res = await axios.post('http://localhost:7777/login',{emailId,password},{withCredentials:true});
    console.log(res.data);
  }
```
### Theme DaisyUI
``` css
/* Index.css */
  @import "tailwindcss";

  @plugin "daisyui" {
      themes: all;
  }
  /* <html lang="en" data-theme="forest"> */
```

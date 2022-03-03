import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const[username,setUsername] =  React.useState('');
  const[password,setPassword] =  React.useState('');


async function loginUser(event){
  event.preventDefault();

    const response = await fetch('http://localhost:5000/users/find',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
    const data = await response.json()

    if(data.user){
        localStorage.setItem('token',data.user)
        alert('Login Successful')
        window.location.href = '/'
    }
    else{
        alert('Invalid Username or password')
    }

}


  return (
    


    <div>
  <div className="col-md-12">
    <div classname="card card-container">

      <form onSubmit={loginUser} className="form-horizontal">
      <div className="form-group">
    <label className="sr-only" for="email">UserName:</label>

    <input className="form-control" id="usernameid"
    input value={username} 
    onChange={(e) => setUsername(e.target.value)}
    type="text" placeholder='username'/>
    
  </div>
  <div  className="form-group">
    <label label className="control-label col-sm-2" for="pwd">Password:</label>
    <input value={password} 
        onChange={(e) => setPassword(e.target.value)}
        type="text" placeholder='password' className="form-control" id="pwd"/>
  </div>
  <div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
      <button type="submit" className="btn btn-lg btn-primary btn-block">Submit</button>
    </div>
  </div>


      </form>

    </div>
  </div>


    </div>
    

  

  );
}

export default App;

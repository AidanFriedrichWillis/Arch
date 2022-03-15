import React from "react";

function Bookcomp(props){



      const [bookid,setBookId] = React.useState("");
        React.useEffect(() => {
            onLoad()
            console.log(props.book._id)
        },[bookid]);

            async function onLoad(){
            await setBookId(props.book._id);
            console.log("bookid:   " +bookid)

            }


      
    async function makeTooExpensivee(event){
        event.preventDefault();

      await console.log("ahhhhhhhhhh: " +bookid)

          const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:5000/Books/change',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookid,
          token,
        }),
      })
      const data = await response.json()
      if(data){
          
          console.log(data)
      }
      else{
          console.log("no response")
      }
  

    }


        async function authPurchase(event){
        event.preventDefault();

      await console.log("ahhhhhhhhhh: " +bookid)

          const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:5000/Books/changeAuth',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookid,
          token,
        }),
      })
      const data = await response.json()
      if(data){
          
          console.log(data)
      }
      else{
          console.log("no response")
      }
  

    }



            async function denied(event){
        event.preventDefault();

      await console.log("ahhhhhhhhhh: " +bookid)

          const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:5000/Books/denied',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookid,
          token,
        }),
      })
      const data = await response.json()
      if(data){
          
          console.log(data)
      }
      else{
          console.log("no response")
      }
  

    }






    return (
        <div>
            {/* <h1>
            {"Title:  " + props.book.bookName + "   Cost:  " + props.book.cost  + "    Autherised: " + props.book.auth + " Denied: " + props.book.denied }
            
            </h1> */}
    <tr>
      <td>{props.book.bookName}</td>
      <td>{props.book.cost}</td>
      <td>{props.book.auth}</td>
      <td>{props.book.denied}</td>

    </tr>
            {props.rank == "Admin" ? (
               <div>
                   <h1>{"Is too expensive  " + props.book.toExpensive}

                   </h1>
          <button onClick={makeTooExpensivee}>Aprove Purchase</button>
          <button onClick={denied}>Deney Purchse</button>
          </div>
          
      ) : (
        <h1></h1>
      )}
      {props.rank == "Employee" ? (       
               <div>
          <button onClick={authPurchase}>Yes</button>
          <button >Suspend Request</button>
          <button onClick={makeTooExpensivee}>Too exensize ask admin lol</button>

          </div>
          
      ) : (
        <h1></h1>
      )}
      {props.rank == "Client" ? (
               <div>
          </div>
          
      ) : (
        <h1></h1>
      )}

    </div>
    );
}
export default Bookcomp;

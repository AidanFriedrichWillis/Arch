import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Token } from '../../../../AppData/Local/Microsoft/TypeScript/4.5/node_modules/acorn/dist/acorn';


const Rank = () => {
	const[rank,setRank] = React.useState('');


	React.useEffect(() => {
		const token = localStorage.getItem('token')
        console.log(token)
		if (token) {
			const user = jwtDecode(token)
			setRank(user.rank);
            console.log(user)
            console.log('1')

		}
	}, [])

	
    if(rank == "Client"){
        return (
            <div>
                <>client prof</>
    
            </div>
        )
        }
    
        else if(rank == "Employee"){
            return (
                <div>
                    <>em prof</>
        
                </div>
            )
        }
        else if(rank == "Admin"){
            return (
                <div>
                    <>Admin Proff</>
        
                </div>
            )
            }
    
    
}

export default Rank

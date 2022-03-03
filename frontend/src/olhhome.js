import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Token } from '../../../../AppData/Local/Microsoft/TypeScript/4.5/node_modules/acorn/dist/acorn';
import Rank from 'Rank'


const Home = () => {
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


	return(

		<div>
			<h1>Client</h1>

		</div>
	)

}

export default Home

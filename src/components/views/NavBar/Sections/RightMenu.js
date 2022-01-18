// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React,{useState,useEffect} from 'react';
// import { Menu } from 'antd';
// import axios from 'axios';
// import { USER_SERVER } from '../../../Config';
// import { withRouter } from 'react-router-dom';
// import { useSelector } from "react-redux";

// function RightMenu(props) {
//   const user = useSelector(state => state.user)
//   const curUser = localStorage.getItem('userId');
//   const [auth,setAuth] = useState(false);
//   const [authUser,setAuthUser] = useState([]);
//   const logoutHandler = () => {
//     axios.get('https://movieappfasal.herokuapp.com/api/users/logout').then(response => {
//       if (response.status === 200) {
//         props.history.push("/login");
//       } else {
//         alert('Log Out Failed')
//       }
//     });
//   };
//   useEffect(() => {
//     axios.get('https://movieappfasal.herokuapp.com/api/users/auth').then(res => {
//       if(res.status === 200){
//         setAuth(true);
//       }
//     });
//     fetch('https://movieappfasal.herokuapp.com/api/users/auth')
//         .then(res => res.json())
//         .then(res => {
//           console.log(res);
//           setAuthUser([res.results])
//         });
//   },[]);
//   if (authUser.isAuth === false) {
//     return (
//       <Menu mode={props.mode}>
//         <Menu.Item key="mail">
//           <a href="/login">Login</a>
//         </Menu.Item>
//         <Menu.Item key="app">
//           <a href="/register">Register</a>
//         </Menu.Item>
//       </Menu>
//     )
//   } else {
//     return (
//       <Menu mode={props.mode}>
//         <Menu.Item >
//           <h4>Logged in as subscriber </h4>
//         </Menu.Item>
//         <Menu.Item key="logout">
//           <a onClick={logoutHandler}>Logout</a>
//         </Menu.Item>
//       </Menu>
//     )
//   }
// }

// export default withRouter(RightMenu);
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";


function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get('https://movieappfasal.herokuapp.com/api/users/logout').then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);


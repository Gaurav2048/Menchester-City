import React from 'react';
import Adminnav from '../Components/Admin/Nav/Adminnav'; 

const AdminLayout =(props)=> {
    return(
        <div className="admin_container">
            <div className = "admin_left_nav" >
            <Adminnav/>
            </div>
            <div className="admin_right">
                {props.children}
            </div>
        </div>
    )
}

export default AdminLayout; 
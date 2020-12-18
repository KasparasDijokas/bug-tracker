import React from 'react';
import {connect} from 'react-redux';

const ProjectDetails = (props) => {
    console.log(props)
    return (
        <div>
            
        </div>
    )

  
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    const id = ownProps;
    return {
        state: id
    }
}



export default connect(mapStateToProps)(ProjectDetails)

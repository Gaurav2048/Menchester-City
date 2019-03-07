import React from 'react';
import { Link } from 'react-router-dom';


export const Tag = (props) => {
    const template = <div
        style={{
            background: props.bck,
            fontSize: props.size,
            color: props.color,
            padding: '5px 10px',
            display: 'inline-block',
            fontFamily: 'rightious',
            ...props.add
        }}
    >{props.children}</div>


    if (props.link) {
        return (
            <Link to={props.linkto}>
                {template}
            </Link>
        )
    } else {
        return template
    }

}

export const firebaselooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapShot) => {
        data.push({
            ...childSnapShot.val(),
            id: childSnapShot.key
        })
    });
    return data
}

export const reverseAnArray = (array) => {
    let reverseArray = [];
    for (let i=array.length-1;i>=0;i--){
        reverseArray.push(array[i])
    }
    return reverseArray;
}


export const validate = (element) => {
    let error = [true,'']

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`
        error = !valid ? [valid, message] :error; 
    }

    if(element.validation.required){
        const valid = element.value.trim() !=='';
        const message = `${!valid ? 'This field is required' :''}`
        error = !valid ? [valid, message]: error;

    }
    return error; 

}
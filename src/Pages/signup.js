import React from 'react'
import { connect } from 'react-redux'
import { fetchUserSuccess } from '../Actions/auth'
import { Button, Form, TextArea } from 'semantic-ui-react'

class Signup extends React.Component{
state = {
    username: '',
    password: '',
    fname: '',
    lname: '',
    age: null,
    email: '',
    bio: ''
}


handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

handleSubmit = (e) => {
    e.preventDefault()
    const reqObj = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({user: this.state})
    }

    fetch('http://localhost:3000/users', reqObj)
    .then(resp => resp.json())
    .then(user => {
            const reqObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }
        
            fetch('http://localhost:3000/auth', reqObj)
            .then(resp => resp.json())
            .then(user => {
                if(user.error){
                    this.setState({
                        error: user.error
                    })
                } else {
                    localStorage.setItem('myToken', user.token)
                    this.props.fetchUserSuccess(user)
                    this.props.history.push('/home')
                }
            })
    })
}


    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
            <label name='username'>Username</label>
                <input onChange={this.handleChange} type="text" name="username" value={this.state.username}></input>
                <label>Password</label>
                <input onChange={this.handleChange} type="text" name="password" value={this.state.password}></input>
                <label>First Name</label>
                <input onChange={this.handleChange} type="text" name="fname" value={this.state.fname}></input>
                <label>Last Name</label>
                <input onChange={this.handleChange} type="text" name="lname" value={this.state.lname}></input>
                <label>Age</label>
                <input onChange={this.handleChange} type="number" name="age" value={this.state.age}></input>
                <label>Email</label>
                <input onChange={this.handleChange} type="text" name="email" value={this.state.email}></input>
                <label>Bio</label>
                <TextArea onChange={this.handleChange} name="bio" value={this.state.bio}/>
                <Button type='submit'>Signup</Button>
            </Form>
        )
    }
}

const mapDispatchToProps = {
    fetchUserSuccess
}

export default connect(null, mapDispatchToProps)(Signup)
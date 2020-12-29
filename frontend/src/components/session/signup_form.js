import React from 'react'; 
import { withRouter } from 'react-router-dom'; 

class SignupForm extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            username: '', 
            email: '', 
            password: '', 
            performerType: '', 
            bio: '', 
            imageURL: '', 
            errors: {} 
        }

        this.handleFile = this.handleFile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value 
        })
    }

    handleFile(e) {
        const file = e.currentTarget.files[0]; 
        const reader = new FileReader(); 
        reader.onloadend = () => {
            this.setState({ imageURL: reader.result, photoFile: file })
        }

        if (file) {
            reader.readAsDataURL(file); 
        }
    }

    handleSubmit(e) {
        e.preventDefault(); 

        const formData = new FormData(); 
        formData.append('user[username]', this.state.username)
        formData.append('user[email]', this.state.email)
        formData.append('user[password]', this.state.password) //take out?

        if (this.state.performerType) {
            formData.append('user[performerType]', this.state.performerType)
        }

        if (this.state.bio) {
            formData.append('user[bio]', this.state.bio)
        }
        
        if (this.state.photoFile) {
            formData.append('user[imageURL]', this.state.photoFile)
        }

        this.props.signup(formData)
            .then(this.props.history.push('/')) //! works? 
    }

    renderErrors() {
        return(
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        )
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="signup-form">
                        <input type="text"
                            value={this.state.username}
                            onChange={this.update('username')}
                            placeholder="Username"
                        />
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <select value={this.state.performerType} onChange={this.update('performerType')}>
                            <option value="">Select your Performer Type</option>
                            <option value="Musician">Musician</option>
                            <option value=""></option> //TODO what other performer types? 

                        </select>
                        <input type="text"
                            value={this.state.bio}
                            onChange={this.update('bio')}
                            placeholder="Bio"
                        />
                        <input type="file"
                            onChange={this.handleFile.bind(this)}
                        />
                        <input type="submit" value="Sign up" />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SignupForm);
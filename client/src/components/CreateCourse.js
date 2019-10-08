import React, {Component} from 'react';
import Form from "./Form";


class CreateCourse extends Component {

  constructor() { 
    super(); 
    this.state = {
      title: '',
      description: '',
      estimatedTime: "",
      materialsNeeded: '',
      errors: [],
      };
  } 


  render() {
    const { 
      title, 
      description, 
      estimatedTime, 
      materialsNeeded,
      errors } = this.state;
    const { context } = this.props;
    const userName = `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`;

    return(
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.change} value={title}  /></div>
                    <p>By {userName}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" placeholder="Course description..." onChange={this.change} value={description} /></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.change} value={estimatedTime}  /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." onChange={this.change} value={materialsNeeded}  /></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )} />
        </div>
      </div>
    )
  }
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const { email, password } = context.authenticatedUser;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    // New user payload
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    // Update Course
    context.data.createCourse(course, email, password) 
      .then( errors => {
        if (errors.length) { 
          this.setState({ errors });
          console.log(errors + "SDA");
        } else {
          console.log(`You have successfully created a course`);
          this.props.history.push(`/`);
        }
      }).catch( err => {
        console.log(err);
        this.props.history.push("/error"); //changes the current url //Need to create error component!!
      })
  }
  cancel = () => {
    this.props.history.push("/");
  }
}

export default CreateCourse;
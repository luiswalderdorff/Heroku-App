import React, {Component} from 'react';
import Form from "./Form";


class UpdateCourse extends Component {

	constructor() { 
    super(); 
    this.state = {
      courseInfo: {},
      teacher: "",
      title: '',
	    description: '',
	    estimatedTime: "",
	    materialsNeeded: '',
	    errors: [],
      };
  } 

  componentDidMount() {
    this.getCourseInfo();
  }

  getCourseInfo = function() {
  	const paramId = this.props.match.params.id;
    fetch(`http://localhost:5000/api/courses/${paramId}`)
      .then(response => response.json())
      .then(response => {
      	const { context } = this.props;
      	if(response.teacher.id === context.authenticatedUser.id) {
      		const teacherName = `${response.teacher.firstName} ${response.teacher.lastName}`;
        	this.setState({description: response.description, teacher: teacherName, teacherId: response.teacher.id, paramId: paramId, title: response.title, estimatedTime: response.estimatedTime, materialsNeeded: response.materialsNeeded})
      	} else {
      		this.props.history.push("/forbidden");
      	}
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
        const path = (error.name === 'notFound') ? "/notfound" : "/error";
        this.props.history.push(path);  
      });
  }

	render() {

		const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      teacher,
      errors
    } = this.state;

		return(
			<div className="bounds course--detail">
			  <h1>Update Course</h1>
			  <div>
			  	<Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
					        <div className="course--header">
					          <h4 className="course--label">Course</h4>
					          <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} onChange={this.change}  /></div>
					          <p>By {teacher}</p>
					        </div>
					        <div className="course--description">
					          <div><textarea id="description" name="description" placeholder="Course description..." value={description} onChange={this.change}  /></div>
					        </div>
					      </div>
					      <div className="grid-25 grid-right">
					        <div className="course--stats">
					          <ul className="course--stats--list">
					            <li className="course--stats--list--item">
					              <h4>Estimated Time</h4>
					              <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} onChange={this.change}  /></div>
					            </li>
					            <li className="course--stats--list--item">
					              <h4>Materials Needed</h4>
					              <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." value={materialsNeeded} onChange={this.change}  /></div>
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

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      paramId,
      teacherId
    } = this.state;

    const id = paramId;
    const userId = teacherId;

    // New user payload
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id,
      userId
    };

    // Update Course
    context.data.updateCourse(course, this.props.match.params.id, context.authenticatedUser.email, context.authenticatedUser.password)
      .then( errors => {
        if (errors.length) { 
          this.setState({ errors });
        } else {
        	console.log(`You have successfully updated the course`);
          this.props.history.push(`/courses/${this.props.match.params.id}`);
        }
      }).catch( err => {
        console.log(err);
        this.props.history.push("/error"); 
      })
  }
  cancel = () => {
		this.props.history.push(`/courses/${this.state.paramId}`);
	}
}

export default UpdateCourse;
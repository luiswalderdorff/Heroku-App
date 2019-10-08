import React, {Component} from 'react';
import {Link} from 'react-router-dom';



class CourseDetail extends Component {

	constructor() { 
    super(); 
    this.state = {
      courseInfo: {},
      teacher: "",
      };
  } 

  componentDidMount() {
    this.getCourseTitles();
  }

  getCourseTitles = function() {
  	const paramId = this.props.match.params.id;
    fetch(`http://localhost:5000/api/courses/${paramId}`)
      .then(response => response.json())
      .then(response => {
      	if (response.teacher) {
      		const teacherName = `${response.teacher.firstName} ${response.teacher.lastName}`;
	      	const teacherId = response.teacher.id;
	        this.setState({courseInfo: response, teacher: teacherName, teacherId: teacherId})
      	} else {
      		this.props.history.push("/notfound");
      	}
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
        const path = (error.name === 'notFound') ? "/notfound" : "/error";
        this.props.history.push(path);  
      });
  }

	render() {

		const { courseInfo, teacher, teacherId } = this.state;
		const { context } = this.props;
		let userId; 
		if (context.authenticatedUser) {
			userId = context.authenticatedUser.id;
		}

		let buttons;
		const ReactMarkdown = require('react-markdown/with-html');

		/* Only shows update and delete buttons if user owns the course*/
		if (userId === teacherId) {
			buttons = <span>
			      			<Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
			      			<Link className="button" to="#"><span onClick={this.deleteCourse}>Delete Course</span></Link>
		      			</span>
		}


		return(
			<div>
			  <div className="actions--bar">
			    <div className="bounds">
			      <div className="grid-100">
		      		{buttons}
		      		<Link className="button button-secondary" to="/">Return to List</Link>
	      		</div>
			    </div>
			  </div>
			  <div className="bounds course--detail">
			    <div className="grid-66">
			      <div className="course--header">
			        <h4 className="course--label">Course</h4>
			        <h3 className="course--title">{courseInfo.title}</h3>
							<p>By {teacher}</p>
			      </div>
			      <div className="course--description">
			        <ReactMarkdown source={courseInfo.description} />
			      </div>
			    </div>
			    <div className="grid-25 grid-right">
			      <div className="course--stats">
			        <ul className="course--stats--list">
			          <li className="course--stats--list--item">
			            <h4>Estimated Time</h4>
			            <h3>{courseInfo.estimatedTime}</h3>
			          </li>
			          <li className="course--stats--list--item">
			            <h4>Materials Needed</h4>
			            <ul>
			              <ReactMarkdown source={courseInfo.materialsNeeded} />
			            </ul>
			          </li>
			        </ul>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}

	deleteCourse = () => {
		const { context } = this.props;
		context.data.deleteCourse(this.props.match.params.id, context.authenticatedUser.email, context.authenticatedUser.password)
      .then( errors => {
        if (errors.length) { 
          this.setState({ errors });
          console.log(errors + "+++++");
        } else {
        	console.log(`You have successfully deleted the course`);
          this.props.history.push(`/`);
        }
      }).catch( err => {
        console.log(err);
        this.props.history.push("/error"); 
      })
	}
}

export default CourseDetail;
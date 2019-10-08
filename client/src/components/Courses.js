import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// add Link component
// How do I know which course page I am on? I did a course with that for Programmer courses. Rewatch
const CourseButton = ({title, id}) => {
  return(
    <div className="grid-33">
      <Link className="course--module course--link" to={`/courses/${id}`}>
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">{title}</h3>
      </Link>
    </div>
  )
}

class Courses extends Component {

  constructor() { 
    super(); 
    this.state = {
      courseInfo: []
      };
  } 

  componentWillMount() {
    this.getCourseTitles();
  }

  getCourseTitles = function() {
    fetch("http://localhost:5000/api/courses")
      .then(response => response.json())
      .then(response => {
        let courseInfo = [];
        let i;
        for(i=0; i < response.length; i++) {
          courseInfo.push({courseTitle: response[i].title, courseId: response[i].id})
        }
        this.setState({courseInfo: courseInfo})
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  }


  render() {
    const { courseInfo } = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const courseButtons = courseInfo.map(info => <CourseButton title={info.courseTitle} id={info.courseId} key={info.courseId}/>); // Each child should hava a uniquie "key" prop
    
    return(
      <div>
        {courseButtons}
        {authUser ? 
          <div className="grid-33">
            <Link className="course--module course--add--module" to="/courses/create">
              <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                </svg>New Course</h3>
            </Link>
          </div>
        : <div></div>}
      </div>  
    )
  }
}

export default Courses;
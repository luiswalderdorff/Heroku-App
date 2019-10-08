import React from 'react';

export default (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} /> {/*Displays all the returned errors*/}
      <form onSubmit={handleSubmit}>
        {elements()} {/*Displays the form elements for the specific form*/}
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">{submitButtonText}</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
          </div>
      </form>
    </div>
  );
}
/*Creates the ErrorDisplay component*/
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {

    let showErrors;

    if (Array.isArray(errors)) {
      showErrors = errors.map((error, i) => <li key={i}>{error}</li>)
    } else {
      showErrors = errors;
    }
    console.log(errors);
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {showErrors}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}

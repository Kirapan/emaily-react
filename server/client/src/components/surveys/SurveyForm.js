import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';
import formField from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formField, ({label, name}) => {
            return (
                <Field key={name} type='text' name={name} label={label} component={SurveyField} />
            )
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to='/surveys' className='red btn-flat white-text' >Cancel</Link>
                    <button className='teal btn-flat right white-text' type='submit'>
                        <i className='material-icons right'>done</i>
                        Next
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    errors.emails = validateEmails(values.emails || '');

    _.each(formField, ({name}) => {
        if(!values[name]) {
            errors[name] = `You must provide a ${name}`;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);
import React from 'react';
import { Formik } from 'formik';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as Yup from 'yup';

export default class Login extends React.Component {
  render() {
    
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('E-mail is not valid!')
        .required('E-mail is required!'),
      password: Yup.string()
        .min(6, 'Password has to be longer than 6 characters!')  
        .required('Password is required!')
    });

    function onSubmit(values, { setSubmitting }) {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }

    return (  
      <div>
        <h3>Login</h3>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema = {validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            dirty,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                  <Label id="lblEmail">Email:</Label>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    </FormGroup>
                </Col>              
                <Col md={4}>
                  <FormGroup>
                    <Label id="lblPassword">Password:</Label>
                  
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && errors.password}
                  </FormGroup>
                </Col>
              </Row>
              <Button 
                  type="submit" 
                  disabled={isSubmitting || !dirty}
                  className="btn btn-default"
                >
                  Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
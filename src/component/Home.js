import React, { Component } from 'react';
import React from 'react';
import { Component } from 'react'
import { withRouter } from "react-router-dom";


class Home extends Component {

    render() {
        return (
            <>
            <div className="userForm">
                <h3 className="userTitle">User Name</h3>
            <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label htmlFor="userEmail" className="homeUserEmail">Email:</Label>
                        <Input onChange={this.handleFieldChange}
                            required="" autoFocus="" type="email" name="email" id="homeEmail"/>
                    </FormGroup>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                                Edit Item
							</ModalHeader>
                </Form>
                </div>
                </>
                );
    }
}
export default withRouter(Home);
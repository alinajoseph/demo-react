import 'rxjs'
import React, { Component } from 'react';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import { Redirect, Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
// const required = value => value ? undefined : 'Required'
class LoginForm extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: [],
	    	row: '',
	    	row1: '',
	    	row2: '',
	    	buttonName: 'Add New',
	    	index: '',
			showResult:false,
	    };
  	}

  	// ..............................
    




  	handleChange(event) {
    	this.setState({[event.target.name]: event.target.value});
  	}

  	handleAdd(event) {
  		var data = this.state.data;
  		if(this.state.buttonName == 'Add New'){
	  		//var row = this.state.row;
	  		data.row = this.state.row;
	  		data.row1 = this.state.row1;
	  		data.row2 = this.state.row2;
	  		data.push(data);
	  		console.log(data);

	  		this.setState([{data: data}])
  		}else{
  			data[this.state.index] = this.state.row;
  			this.setState([{data: data, buttonName: 'Add New'}]);
  		}
  	}

    
	// save(){
	//   	$('#save, .info').hide();
	//   	$('input').each(function(){
	//     	var content = $(this).val();//.replace(/\n/g,"<br>");
	//     	$(this).html(content);
	//     	$(this).contents().unwrap();    
	//   	}); 
	//   	$('.save-button').hide(); 
	//   	$('.edit20').show(); 
	// }

    edittable(index,edt1,edt2,edt3){
		var data = this.state.data
		var editData = data[index]
		this.setState({row: editData, buttonName: 'Edit Data', index: index})

	}

	delete(index){
		var data = this.state.data
		data.splice(index, 1);
		console.log(data)
		this.setState([{data: data}])
	}

	render() {
		let self = this
  		var dataList =  this.state.data.map((val) => {
  			console.log(val);
  			return(


                <tr>
					<td id="name-edit">{val.row}</td>
					<td id="email-edis">{val.row1}</td>
					<td id="number-edit">{val.row2}</td>
					<td> <div className="edit20">

                        <button id="someButton" onClick={this.handleClick}>
                            Click me!
                        </button>

                        <button className="btn btn-edit" onClick="edittable(name-edit,email-edis,number-edit)">
						<i className="fas fa-pencil-alt"></i></button>
						<button className="btn"><i className="fas fa-trash-alt"></i></button>
						</div> <div className="save-button"><button className="btn btn-can" onClick="cancelrow()">Cancel</button>
						<button className="btn btn-save" id="save">Save</button></div> </td>
				</tr>

  			)
  		 });


    return (		 

<div className="container-fluid">
	<div className="title-heading">
		<h1>List of participants</h1>	
	</div>
	<div className="search-bar">
		 	<div className="clearfix">
				 <div className="form-group col-md-3 no-padding">
				    <input type="text" name="row" value={this.state.row}  placeholder="Full Name" onChange={this.handleChange.bind(this)}/>
				</div>
                <div className="form-group col-md-3">
                    <input type="text" name="row1" value={this.state.row1}  placeholder="Email Address" onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="form-group col-md-3 no-padding">
                    <input type="text" name="row2" value={this.state.row2}  placeholder="Phone Number" onChange={this.handleChange.bind(this)}/>
                </div>
   				<div className="form-group col-md-3">
    				<button className="btn btn-can" onClick={this.handleAdd.bind(this)}>{this.state.buttonName}</button>
  				</div>
 			</div>
	</div>
    <div className="bg-table">
		<div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
					{dataList}
                </tbody>

            </table>
        </div>

    </div>
</div>
    );
  }
}

export default (LoginForm)
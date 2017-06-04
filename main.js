//"StAuth10065: I Vitaliy Shahanyants, 000311736 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
// Shortcut code that allows us to write ReactRouter tags as <Link /> instead 
// of <ReactRouter.Link />
var { hashHistory,
      IndexLink,
      IndexRoute,
      Link,
      Route,
      Router} = ReactRouter;
//Header component
var App = React.createClass({
	render: function() {
	return (
	  <div>
	    <h1>Catbook</h1>
	    <ul className="header">
	      <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
	      <li><Link to="/newsfeed" activeClassName="active">Newsfeed</Link></li>
	      <li><Link to="/cats" activeClassName="active">Cats</Link></li>
	      <li><Link to="/search" activeClassName="active" >Search</Link></li>
	      <li><Link to="/additional" activeClassName="active" >Additional</Link></li>
	    </ul>
	  <div className="content jumbotron">
	    {this.props.children}
	  </div>
	  <div className="footer">
	    <p>Catbook - Copyright 2017</p>
	  </div>
	  </div>
	)
	}
});




//Route components 
var Home = React.createClass({
  render: function() {
    return (
      <div>
      <p>Welcome to Catbook!</p>
      </div>
    )
  }
});


//Additional components


var Newsfeed = React.createClass({
	getInitialState: function() {
	    return {
	    	cats: [],
	    	source:'https://csunix.mohawkcollege.ca/~000311736/private/10125/2/backend.php?action=allposts'
	    }
  	},
	componentDidMount: function() {
	    this.serverRequestAllPost = $.ajax({
	    	url:this.state.source,
	    	dataType: 'json',
			method:'get',
			success:function (result) {
		      	this.setState({
		        	cats: result
		      	});
	    	}.bind(this)
		});
	},
	componentWillUnmount: function() {
    	this.serverRequestAllPost.abort();
  	},
  	render: function() {
	    return (
	      <div>
	      <h2>Newsfeed</h2>
	      <table className ="table table-hover">
	      <thead>
		      	<tr>
		      		<th>Cat's Image</th>
		      		<th>Cat's Name</th>
		      		<th>Post Body</th>
		      		<th>Post Time</th>
		      		<th>Post Image</th>
		      	</tr>
	      	</thead>
	      	<DisplayAllCatsTable cats = {this.state.cats} />
	      </table>
	      </div>
	    )
	}
});

var DisplayAllCatsTable = React.createClass({
	display: function(astate,i){
		var post = astate; //JSON.parse(astate);
		if(this.props.catisclicked){
			return (<tr key = {i}>
				<td><img width = "50" height = "50" src={"img/"+post.CATIMAGE} /> </td>
				<td>{post.NAME}</td>
				<td>{post.OWNER}</td>
				<td>{post.AGE}</td>
				<td>{post.BODY}</td>
				<td>{post.POSTTIME}</td>
				<td><img width = "50" height = "50" src={"img/"+post.POSTIMAGE} /></td>
				</tr>)
		}else{
			return (<tr key = {i}>
				<td><img width = "50" height = "50" src={"img/"+post.CATIMAGE} /> </td>
				<td>{post.NAME}</td>
				<td>{post.BODY}</td>
				<td>{post.POSTTIME}</td>
				<td><img width = "50" height = "50" src={"img/"+post.POSTIMAGE} /></td>
				</tr>)
		}
	
	},
	render: function(){
		return (
			<tbody>
			   	{this.props.cats.map(this.display)}
		    </tbody>
			
		);
	}
});


var Cats = React.createClass({
	getInitialState: function() {
	    return {
	  		catisclicked: false,
	  		source:'https://csunix.mohawkcollege.ca/~000311736/private/10125/2/backend.php?action=allcats',
	  		cats:[],
	  		cat:[]
	    };
  	},
  	componentDidMount: function() {
	    this.serverRequestAllPost = $.ajax({
	    	url:this.state.source,
	    	dataType: 'json',
			method:'get',
			success:function (result) {
		      	this.setState({
		        	cats: result
		      	});
	    	}.bind(this)
		});
	},
	componentWillUnmount: function() {
    	this.serverRequestAllPost.abort();
  	},
	catinformation: function(image,id,name,age,owner,e){
		var catpost = {};
		var link = "https://csunix.mohawkcollege.ca/~000311736/private/10125/2/backend.php?action=catposts&catid="+id;
		$.ajax({
			url:link,
			dataType: 'json',
			method:'get',
			success:function (result) {
			this.setState({
				catisclicked:true,
				cat:result
			});
	    	}.bind(this)
		});  
	},
	display: function(astate,i){
		var cats = astate;
		return(
			<tr key={i}>
				<td><img width = "50" height = "50" src={"img/"+cats.CATIMAGE} onClick={this.catinformation.bind(this,cats.CATIMAGE,cats.ID,cats.NAME,cats.AGE,cats.OWNER)} /></td>
				<td>{cats.NAME}</td>
			</tr>
		);
	},
	render: function() {
		return (
			<div>
			  <div>
			  	<table className ="table table-hover">
			  		<thead>
			  			<tr>
			      			<th>Cat's Image</th>
			      			<th>Cat's Name</th>
			      		</tr>
			  		</thead>
			  		<tbody>
			  		{this.state.cats.map(this.display)}
			  		</tbody>
			  	</table>
			  	</div>
			  	<div>
			  		<h3>Cat's Information</h3>
			  		<table className ="table table-hover">
				  		<thead>
				  			<tr>
				      			<th>Cat's Image</th>
					      		<th>Cat's Name</th>
					      		<th>Cat's Owner</th>
					      		<th>Cat's Age</th>
					      		<th>Post Body</th>
					      		<th>Post Time</th>
					      		<th>Post Image</th>
				      		</tr>
				  		</thead>
				  			{this.state.catisclicked?<DisplayAllCatsTable catisclicked = {this.state.catisclicked} cats = {this.state.cat} />:<tbody></tbody>}
			  		</table>
			  	</div>
			</div>
		)
	}
});

var DisplaySearchResult = React.createClass({
	getInitialState: function() {
		return {
			searchresults:[]
		}
	},
	componentDidMount: function() {
		$.ajax({
			url:this.props.source,
			dataType: 'json',
			method:'get',
			success:function (result) {
				this.setState({
					searchresults:result,
				});
			}.bind(this)
		});
	},
	searchresults:function(results,i){
  		if(results.BODY.search(this.props.search) != -1){
  			return(<tr key = {i}>
				<td><img width = "50" height = "50" src={"img/"+results.CATIMAGE} /> </td>
				<td>{results.NAME}</td>
				<td>{results.OWNER}</td>
				<td>{results.BODY}</td>
			</tr>);
  		}
		  	
				
	},
	render:function(){
		return(
				<tbody>
					{this.state.searchresults.map(this.searchresults)}
				</tbody>
			);
	}
});




var Search = React.createClass({
	getInitialState: function() {
	    return {
	    	search: '',
	    	searchbool:false,
	    	source: 'https://csunix.mohawkcollege.ca/~000311736/private/10125/2/backend.php?action=allposts'
	    };
  	},
	componentDidMount: function() {
		var searchparams = this.props.params.searchquery;
		if(typeof searchparams !== "undefined"){
			this.setState({
				searchbool:true,
	        	search: searchparams
	      	});
		}else{
			console.log("empty search query");
		}
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			searchbool:true,
        	search: nextProps.params.searchquery
	    });
	},
	componentWillUnmount: function(){
		this.setState({
			searchbool:false,
	    });
	},
	search:function(event,source){
		this.setState({
			searchbool:true,
			search:event.target.value
		});
	},
	render:function(){
		return(
			<div>
				<ul>
					<li>
						<Link to="/search/Down">Garfield</Link>
					</li>
					<li>
						<Link to="/search/He">Mr. Bigglesworth</Link>
					</li>
					<li>
						<Link to="/search/I made">Mr. Bigglesworth</Link>
					</li>
					<li>
						<Link to="/search/Woah">Felix</Link>
					</li>
					<li>
						<Link to="/search/Check">Larissa</Link>
					</li>
				</ul>
				<h2>Search</h2>
				<div className="input-group">
				  <span className="input-group-addon" id="basic-addon1">
				  	<span className="glyphicon glyphicon-search"></span>
				  </span>
				  <input type="text" id= "search" onChange={this.search} className="form-control" placeholder="Search" />
				</div>
				<br />
				<h3>Text Search</h3>
		  		<table className ="table table-hover">
			  		<thead>
			  			<tr>
			      			<th>Cat's Image</th>
			      			<th>Cat's Name</th>
			      			<th>Cat's Owner</th>
			      			<th>Post Body</th>
			      		</tr>
			  		</thead>
			  			{this.state.searchbool?<DisplaySearchResult source = {this.state.source} search = {this.state.search} />:<tbody></tbody>}
		  		</table>

			</div>);
	}
});
/*
	--My additonal page uses React life cycle method "componentWillReceiveProps"
		which give me a new property coming in to the component, and i can set a new state and rerenders
	--Another useful feature we did not go over in class, how can child update parent component.
		Which is what this Additional component does.
*/
var AdditionalTableHeadComponent = React.createClass({
	render:function(){
		return (
			<thead>
	  			<tr>
	      			<th>Cat's Image</th>
		      		<th>Cat's Name</th>
		      		<th>Cat's Owner</th>
		      		<th>Cat's Age</th>
		      		<th>Post Body</th>
		      		<th>Post Time</th>
		      		<th>Post Image</th>
	      		</tr>
			</thead>
		)
	}
});


var AdditionalTableBodyComponent = React.createClass({	
	displayCatsPosts:function(astate,key){
		return(
			<li key = {key}>
				{astate.BODY}
			</li>
			)
	},
	render:function(){
		return (
			<tbody>
			<tr>
				<td>
					<img width = "50" height = "50" src = {"img/"+this.props.imageSelectedCat} />
				</td>
				<td>
					{this.props.nameSelectedCat}
				</td>
				<td>
					{this.props.ownerSelectedCat}
				</td>
				<td>
					{this.props.ageSelectedCat}
				</td>
				<td>
					<ul>
						{this.props.selectedCatPosts.map(this.displayCatsPosts)}
					</ul>
				</td>
				<td>
					{this.props.posttimeSelectedCat}
				</td>
				<td>
					<img width = "50" height = "50" src = {"img/"+this.props.postimageSelectedCat} />
				</td>
			</tr>
				
			</tbody>
			);
	}
});


var AdditionalTableComponent = React.createClass({
	render:function(){
		return (
			<table className ="table table-hover">
				<AdditionalTableHeadComponent />
				<AdditionalTableBodyComponent
					selectedCatPosts = {this.props.selectedCatPosts} 
				    imageSelectedCat= {this.props.imageSelectedCat}
				    nameSelectedCat = {this.props.nameSelectedCat}
		    		ownerSelectedCat = {this.props.ownerSelectedCat}
		    		ageSelectedCat = {this.props.ageSelectedCat}
		    		posttimeSelectedCat = {this.props.posttimeSelectedCat}
		    		postimageSelectedCat = {this.props.postimageSelectedCat}
				 />
			</table>
			);
	}
});

var AdditionalSelectComponent = React.createClass({
	/*
		As You can see if there is a change in this component
		than parent will catch it  
	*/
	displayOptions:function(astate,key){
		return(
			<option key = {key} value = {astate.ID}>
				{astate.NAME}
			</option>
			)
	},
	render:function(){
		return(
			<div className="form-group">
		      <label htmlFor="selectcat">Select a Cate from this list:</label>
		      <select className="form-control" id="selectcat" onChange = {this.props.onChangeSelect}>
		      <option>---Select The Following---</option>
		        {this.props.allcats.map(this.displayOptions)}
		      </select>
		    </div>
			);
	}
});

var Additional = React.createClass({
	getInitialState:function(){
		return {
			linkAllCats:'https://csunix.mohawkcollege.ca/~000311736/private/10125/2/backend.php?action=allcats',
			linkCatsPosts:'https://csunix.mohawkcollege.ca/~000311736/private/10125/2/backend.php?action=catposts&catid=',
			linkCatsInfo:'https://csunix.mohawkcollege.ca/~000311736/private/10125/2/backend.php?action=catinfo&catid=',
			allcats:[],
			catid:'',
			selectedCat:false,
			imageSelectedCat:'',
			nameSelectedCat:'',
			ownerSelectedCat:'',
			ageSelectedCat:'',
			posttimeSelectedCat:'',
			postimageSelectedCat:'',
			selectedCatPosts:[]
		};
	},
	componentWillMount:function(){
		$.ajax({
	    	url:this.state.linkAllCats,
	    	dataType: 'json',
			method:'get',
			success:function (result) {
		      	this.setState({
		        	allcats: result
		      	});
		      	if(this.props.params.id != undefined){
		      		this.callAjax(this.props.params.id);
		      	}
	    	}.bind(this)
		});
	},
	//Any properties (including url parameters passed) this function will catch
	//This Does not run on load the page it runs when the next property passed.
	//This function requries cat's id in url parameter
	componentWillReceiveProps:function(nextProps){
		this.callAjax(nextProps.params.id);
	},
	/*
		this function handles any changes in children 
		component and update the parent(this componenet)
	*/
	onChangeSelect:function(event){
		var id = event.target.value;
		this.callAjax(id);
	},
	callAjax:function(id){
		if(!isNaN(id)){
			$.ajax({
		    	url:this.state.linkCatsInfo+id,
		    	dataType: 'json',
				method:'get',
				success:function (result) {
			      	this.setState({
			        	imageSelectedCat: result[0].CATIMAGE
			      	});
		    	}.bind(this)
			});
			$.ajax({
		    	url:this.state.linkCatsPosts+id,
		    	dataType: 'json',
				method:'get',
				success:function (result) {
			      	this.setState({
			      		nameSelectedCat:result[0].NAME,
						ownerSelectedCat:result[0].OWNER,
						ageSelectedCat:result[0].AGE,
						posttimeSelectedCat:result[0].POSTTIME,
						postimageSelectedCat:result[0].POSTIMAGE,
			        	selectedCatPosts: result
			      	});
		    	}.bind(this)
			});
			this.setState({
				selectedCat:true,
				catid:id
			});
		}else{
			this.setState({
				selectedCat:false,
				catid:''
			});
		}
	},
	render:function(){
		return (<div>
					<h2>Additional... </h2>
					<ul>
					<li>
						<Link to="/additional/1">Garfield</Link>
					</li>
					<li>
						<Link to="/additional/2">Scruffles</Link>
					</li>
					<li>
						<Link to="/additional/3">Felix</Link>
					</li>
					<li>
						<Link to="/additional/4">Mr. Bigglesworth</Link>
					</li>
				</ul>
					<br />
					{/* I'm passing parent's (this component) method to a child component to catch any changes*/}
					<AdditionalSelectComponent allcats = {this.state.allcats} onChangeSelect = {this.onChangeSelect} />
				    {this.state.selectedCat == true ? 
				    	<AdditionalTableComponent 
				    		selectedCatPosts = {this.state.selectedCatPosts} 
				    		imageSelectedCat= {this.state.imageSelectedCat}
				    		nameSelectedCat = {this.state.nameSelectedCat}
				    		ownerSelectedCat = {this.state.ownerSelectedCat}
				    		ageSelectedCat = {this.state.ageSelectedCat}
				    		posttimeSelectedCat = {this.state.posttimeSelectedCat}
				    		postimageSelectedCat = {this.state.postimageSelectedCat}
				    		/> : 
				    	null}
				</div>);
	}
});


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="newsfeed" component={Newsfeed} />
      <Route path="cats" component={Cats} />
      <Route path="search" component={Search}>
      	<Route path="/search/:searchquery" component={Search}/>
      </Route>
      <Route path="additional" component={Additional} >
      	<Route path = "/additional/:id" component={Additional} />
      </Route>
    </Route>
  </Router>
  ,document.getElementById("app")
);
// Include React and React-Router dependencies
var React = require('react');
var Router = require('react-router');

// Create the Main component
var Main = React.createClass({

  render: function(){

    return(
      /*We can only render a single div. So we need to group everything inside of this main-container one*/

      <div className="main-container">
          <div className="container">

          {this.props.children}


        </div>
      
      </div>
    )
  }
});

// Export the module back to the route
module.exports = Main;
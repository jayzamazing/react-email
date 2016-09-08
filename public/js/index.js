var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
//data object to display
var EMAILS = {
  inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
};
/* component that displays data for a specific email
* @return html and filled in variables
*/
var Email = function(props) {
  //return function filling in variables with html
  return (
    <div>
      <p>{props.from}</p>
      <p>{props.to}</p>
      <p>{props.title}</p>
      <p>{props.content}</p>
    </div>
  );
};
/* component that displays data for a specific folder
* @return html and filled in variables
*/
var Folder = function(props) {
  return (
    <div>
      <p>{props.folder}</p>
    </div>
  );
};
/* component that sorts through the data, calls email component and passes data to
* email component
* @return emails object
*/
var EmailList = function(props) {
  //restructure data
  var emails = Object.keys(props.emails).map(function(emailId, index) {
    //set current email
    var email = props.emails[emailId];
    //return function that calls email component and passes data to it
    return (
      <li key={index}>
        <Email id={email.id} from={email.from} to={email.to}
          title={email.title} content={email.content} />
      </li>
    );
  });
  //return emails object
  return (
    <ul>
      {emails}
    </ul>
  );
};
var FolderList = function(props) {
  var folders = Object.keys(props.emails).map(function(folderName, index) {
    return (
      <li key={index}>
        <Folder folder={folderName} />
      </li>
    );
  });
  return (
    <ul>
      {folders}
    </ul>
  )
}
var FolderListContainer = function() {
  return <FolderList emails={EMAILS} />
};
//component to call email list component and pass emails to it
var EmailListContainer = function() {
  return <EmailList emails={EMAILS} />;
};
var App = function(props) {
  return (
    <section>
      <aside className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div>
          <FolderListContainer />
        </div>
      </aside>
      <section className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div>
          {props.children}
        </div>
      </section>
    </section>
  );
};
//variable that deals with the routing for the app
var routes = (
  <Router history={hashHistory}>
    <Route path="/temp" component={App} />
  </Router>
);
//Event listener that waits for dom to be loader then renders
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(routes, document.getElementById('app'));
});

import React from "react";
import { IndexLink, Link } from "react-router";
import Cookies from 'js-cookie';
import createHistory from 'history/createBrowserHistory';

const history = createHistory({
  forceRefresh: true
})
const isLoggedIn = Cookies.get('debprojdb');
export default class Nav extends React.Component {
  constructor() {
    super()
  
    this.state = {
      collapsed: true,
      user:Cookies.get('debprojdb')
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }
  componentWillMount(){
    if(this.state.user === undefined){
      history.push('/#/login')
    }
  }

  render() {
    const { location } = this.props;
    const { collapsed, user } = this.state;
    const welcomeClass = location.pathname === "/" ? "active" : "";
    const sourcesClass = location.pathname.match(/^\/sources/) ? "active" : "";
    const favouritesClass = location.pathname.match(/^\/favourites/) ? "active" : "";
    const loginClass = location.pathname.match(/^\/favourites/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";
    
    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class={welcomeClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Welcome</IndexLink>
              </li>
              <li class={sourcesClass}>
                <Link to="sources" onClick={this.toggleCollapse.bind(this)}>Sources</Link>
              </li>
              <li class={favouritesClass}>
                <Link to="favourites" onClick={this.toggleCollapse.bind(this)}>Favourites</Link>
              </li>
              <li class={loginClass}>
                <Link to={!isLoggedIn? "login":"logout"} onClick={this.toggleCollapse.bind(this)}>{isLoggedIn? "Logout":"Login"}</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

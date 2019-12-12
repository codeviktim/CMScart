import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    //Authenticated Links
    const authLinks = (
      <div className="menu">
        <Link className="ui item" to="/pages">
          Pages
        </Link>
        <Link className="ui item" to="/categories">
          Categories
        </Link>
        <Link className="ui item" to="/Products">
          Products
        </Link>
        <a href="" onClick={this.onLogoutClick.bind(this)} className="item">
          Logout
        </a>
      </div>
    );

    //Guest Links *Must Write a function to loop through all pages created
    const guestLinks = <div />;

    return (
      <div class="ui inverted segment">
        <div class="ui attached stackable inverted secondary medium menu">
          <Link to="/" className="active item">
            CmsShoppingCart
          </Link>
          <Link to="/profiles" className="item">
            Developers
          </Link>
          <Link to="/newsfeed" className="item">
            NewsFeed
            <div class="floating ui red label">22</div>
          </Link>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    );
  }
}

export default Navbar;

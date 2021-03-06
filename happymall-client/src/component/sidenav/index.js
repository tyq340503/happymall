import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class SideNav extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <nav className="navbar-default navbar-side" role="navigation">
                    <div className="sidebar-collapse">
                        <ul className="nav" id="main-menu">

                            <li>
                                <NavLink exact  to="/" activeClassName="active-menu">
                                    <i className="fa fa-dashboard"></i> Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="ui-elements.html" activeClassName="active-menu">
                                    <i className="fa fa-desktop"></i> UI Elements
                                </NavLink>
                            </li>
                            <li>
                                <a href="chart.html"><i className="fa fa-bar-chart-o"></i> Charts</a>
                            </li>
                            <li>
                                <a href="tab-panel.html"><i className="fa fa-qrcode"></i> Tabs &amp; Panels</a>
                            </li>

                            <li>
                                <a href="table.html"><i className="fa fa-table"></i> Responsive Tables</a>
                            </li>
                            <li>
                                <a href="form.html"><i className="fa fa-edit"></i> Forms </a>
                            </li>


                            <li>
                                <NavLink to="/">
                                    <i className="fa fa-sitemap"></i>
                                    Multi-Level Dropdown
                                    <span className="fa arrow"></span>
                                </NavLink>
                                <ul className="nav nav-second-level collapse">
                                    <li>
                                        <a href="#">Second Level Link</a>
                                    </li>
                                    <li>
                                        <a href="#">Second Level Link</a>
                                    </li>
                                    <li>
                                        <a href="#">Second Level Link<span className="fa arrow"></span></a>
                                        <ul className="nav nav-third-level collapse">
                                            <li>
                                                <a href="#">Third Level Link</a>
                                            </li>
                                            <li>
                                                <a href="#">Third Level Link</a>
                                            </li>
                                            <li>
                                                <a href="#">Third Level Link</a>
                                            </li>

                                        </ul>

                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="empty.html"><i className="fa fa-fw fa-file"></i> Empty Page</a>
                            </li>
                        </ul>

                    </div>

                </nav>
            </div>
        )
    }
}
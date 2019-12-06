import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from "react-router-dom";
import { Provider } from 'mobx-react'
import * as serviceWorker from './serviceWorker';
import stores from './store';
import { routers } from './router';
import MyRoute from './util-biz/route';
import history from "./util/router/history";
import './css/index.css';

const BBDishH5: React.FC = () => {
    return (
        <Provider {...stores}>
            <Router history={history}>
                <Switch>
                    {
                        routers.map((routeProps, index) =>
                            <MyRoute
                                key={index}
                                {...routeProps}
                            />
                        )
                    }
                </Switch>
            </Router>
        </Provider>
    );
};

ReactDOM.render(<BBDishH5 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

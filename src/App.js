import React from 'react';

// General
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';

// Pages
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import CheckoutPage from './pages/checkout/checkout';

// Components
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';

// Selectors
import { selectCurrentUser } from './redux/user/user.selectors';

// Style
import './App.css';

class App extends React.Component {

    unsubscribeFromAuth = null

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                })
            }

            setCurrentUser(userAuth);
         
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render () {
        return (
          <div>
              <Header/>
              <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route path='/checkout' component={CheckoutPage}/>
                <Route 
                    exact path='/signIn' 
                    render={() => 
                        this.props.currentUser ? 
                        (<Redirect to='/' />):
                        (<SignInAndSignUpPage />)
                    }
                />
              </Switch>
          </div>
        );
    }
}

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

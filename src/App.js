import React from 'react';
import {Route,Redirect} from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component'
import {createStructuredSelector} from 'reselect';

import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';

import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'; 

import {selectCurrentUser} from './redux/user/user.selectors';


class App extends React.Component {
  unsubscribeFromAuth=null; 

  componentDidMount(){
    const {setCurrentUser} =this.props;

    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef=await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot=>{
          setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
            })
        });
      }
      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections',collectionsArray.map(({title,items})=>({title,items})));
    }); 
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header/>
        <switch>
          <Route  exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage}></Route>
          <Route exact path='/checkout' component={CheckoutPage}></Route>
          <Route exact path='/signin' render={()=>
            this.props.currentUser ?(
              <Redirect to='/' />
            ):(
              <SignInAndSignUpPage/>
            )
          }></Route>
        </switch>  
      </div>
    );
  }
}
const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser,
})
const mapDispatchToProps = dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
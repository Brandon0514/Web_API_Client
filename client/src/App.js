import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppNavbar from './components/NavBar/AppNavbar';
import axios from 'axios';
import Footer from './components/Footer/Footer';
import SearchPage from './components/Search/SearchPage';

//Account
import Landing from './components/Account/Landing';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import Profile from './components/Account/Profile';

import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/Home/HomePage';
import FavoritePage from './components/Favorite/FavoritePage';
import TVDetail from './components/TVDetail/TVDetail';
import About from './components/About/About';

class App extends Component {
  constructor() {
    super();
    this.state = {
      SaveFavorite: [],
      DeleteFavorite: [],
      Search: [],
      Name: [],
      page: 1
    };
  }

  /*------------------Axios-----------------*/
  getPagination = () => {
    const url = `https://damp-garden-38136.herokuapp.com/${this.state.page}`;
    console.log(url);
    axios
      .get(url)
      .then(response => {
        var joinedArray = this.state.SaveFavorite.concat(response.data.results);
        this.setState({
          SaveFavorite: joinedArray
        });
      })
      .catch(error => {
        alert(`Error Message =${error}`);
        this.getPagination();
      });
    this.setState({ page: this.state.page + 1 });
  };

  getFavorite = () => {
    const url = `https://damp-garden-38136.herokuapp.com/getFavorite`;
    axios
      .get(url)
      .then(response => {
        this.setState({
          DeleteFavorite: response.data
        });
      })
      .catch(error => {
        // alert(`Error Message : ${error}`);
      });
  };

  getMoreTvSeries = () => {
    const url = `https://damp-garden-38136.herokuapp.com/getOfficialSite/Name`;

    axios
      .get(url)
      .then(response => {
        this.setState({
          Name: response.data
        });
      })
      .catch(error => {
        // alert(`Error Message : ${error}`);
      });
  };

  /*----------API GET Call-----------------*/

  componentDidMount() {
    this.getPagination();

    document.addEventListener('scroll', this.trackScrolling);

    this.getFavorite();

    this.getMoreTvSeries();
  }

  //Pagination track
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  isBottom(bottom) {
    return bottom.getBoundingClientRect().bottom <= window.outerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('HomePage');
    if (wrappedElement === null) {
    } else {
      if (this.isBottom(wrappedElement)) {
        this.getPagination();
      }
    }
  };

  /*----------End of API GET Call-------------*/

  /*----------Add and Delete Funtion Call-------------*/
  handleSubmit(newFavorite) {
    if (window.confirm('Are you wish to Favorite this item?')) {
      axios
        .post('https://damp-garden-38136.herokuapp.com/getFavorite/Add', newFavorite)
        .then(res => {
          alert('Added Favorite Tv Show: ' + newFavorite.Tv_Series_Name);
        })
        .catch(err => {
          alert(`Error Message : ${err}`);
        });
    }
  }

  handleDelete(title) {
    if (window.confirm('Are you wish to Delete this item?')) {
      axios
        .post('https://damp-garden-38136.herokuapp.com/getFavorite/Delete', title)
        .then(res => {
          this.getFavorite();
          alert('Deleted Favorite Tv Show: ' + title.Tv_Series_Name);
        })
        .catch(err => {
          alert(`Error Message : ${err}`);
        });
    }
  }

  handleName(name) {
    if (name === null) {
      return;
    } else {
      axios.post(`https://damp-garden-38136.herokuapp.com/getOfficialSite`, name).catch(err => {
        alert(`Error Message : ${err}`);
      });
    }
  }

  render() {
    return (
      <Router>
        <div id="App">
          <AppNavbar />

          <Route exact path="https://damp-garden-38136.herokuapp.com/" component={Landing} />
          <Route path="https://damp-garden-38136.herokuapp.com/register" component={Register} />
          <Route path="https://damp-garden-38136.herokuapp.com/login" component={Login} />
          <Route path="https://damp-garden-38136.herokuapp.com/profile" component={Profile} />

          <Route
            path="https://damp-garden-38136.herokuapp.com/HomePage"
            render={() => (
              <div id="HomePage">
                <HomePage
                  item={this.state.SaveFavorite}
                  onClick={favorite => {
                    try {
                      if (favorite.id != null) {
                        this.handleSubmit(favorite);
                        return;
                      } else {
                        this.handleName(favorite);
                        return;
                      }
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
              </div>
            )}
          />
          <Route
            path="https://damp-garden-38136.herokuapp.com/FavoritePage"
            render={() => (
              <FavoritePage
                item={this.state.DeleteFavorite}
                onClick={favorite => {
                  try {
                    if (favorite.id != null) {
                      this.handleDelete(favorite);
                      return;
                    } else {
                      this.handleName(favorite);
                      return;
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            )}
          />
          <Route path="https://damp-garden-38136.herokuapp.com/About" render={() => <About />} />
          <Route path="https://damp-garden-38136.herokuapp.com/SearchPage" component={SearchPage} />
          <Route
            path="https://aqueous-hollows-45184.herokuapp.com/detail"
            render={() => (
              <TVDetail
                item={this.state.Name}
                onClick={favorite => {
                  try {
                    if (favorite.id != null) {
                      this.handleSubmit(favorite);
                      return;
                    } else {
                      this.handleName(favorite);
                      return;
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            )}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

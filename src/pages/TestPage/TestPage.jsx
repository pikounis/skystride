import React from 'react';
import axios from 'axios';

export default class TestPage extends React.Component {
  state = {
    users: []
  }

  // This is an example of a get request - get data from the server
  componentDidMount() {
    axios.get(`http://127.0.0.1:8081/user/getAll`) // use the link from backend
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.users
            .map(user => //  a map
              <li key={user.id}>{user.id}
                                {user.email}</li>
            )
        }
      </ul>
    )
  }
}
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import { createAddPerson } from '../../redux/actions/person'
class Person extends Component {

  addPerson = () => {
    this.props.addPerson({ name: this.nameNode.value, age: this.ageNode.value, id: nanoid() })
  }
  render () {
    return (
      <div>
        <h1>这个是Person组件</h1>
        <h3>求和结果为{this.props.count}, 人员列表为</h3>
        <div>
          {
            this.props.persons.map(person => (<div key={person.id}>
              {person.name} ---- {person.age}
            </div>))
          }
        </div>
        姓名: <input ref={c => this.nameNode = c} type="text" placeholder='姓名' />
        年龄: <input ref={c => this.ageNode = c} type="text" placeholder='年龄' />

        <button onClick={this.addPerson}>添加人员</button>
      </div>
    )
  }
}

export default connect(
  (state) => ({ persons: state.persons, count: state.count }), // mapReduxStateToProps
  { addPerson: createAddPerson }) // mapReduxActionsToProps
  (Person)
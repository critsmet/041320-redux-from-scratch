//a reducer is a function that has a switch statement inside of it, and it receives two arguments: 1. the current state, 2. instructions about what to do
//

//actions are objects that have keys with instructions that the reducer uses to change state
//ACTIONS

// let nickel = {type: "nickel"}
// let dime = {type: "dime"}
// let penny = {type: "penny"}
// let quarter = {type: "quarter"}

//action creators are functions that return actions

let nickel = () => ({type: "nickel"})
let dime = () => ({type: "dime"})
let penny = () => ({type: "penny"})
let quarter = () => ({type: "quarter"})
let message = (text) => ({type: "message", payload: text})

function counterReducer(state={nickels: 0, quarters: 0, pennies: 0, dimes: 0, message: "Set message here"}, action){
  switch (action.type) {
    case 'nickel':
      return {...state, nickels: state.nickels + 1}
    case 'penny':
      return {...state, pennies: state.pennies + 1}
    case 'dime':
      return {...state, dimes: state.dimes + 1}
    case 'quarter':
      return {...state, quarters: state.quarters + 1}
      case 'message':
      return {...state, message: action.payload}
    default:
      return state;
  }
}

function createStore(reducer){
  let state = reducer( undefined , {type: "default"})
  return {
    dispatch: function(action){ state = reducer(state, action)},
    getState: function(){
      console.log(state)
      return state
    }
  }
}

let store = createStore(counterReducer)


let coinCount = document.getElementById('coin-count')
let form = document.getElementById('add-message-form')
let input = document.getElementById('message-input')
let messageArea = document.getElementById('message')

let addPenny = document.getElementById('add-penny')
let addQuarter = document.getElementById('add-quarter')
let addNickel = document.getElementById('add-nickel')
let addDime = document.getElementById('add-dime')

addPenny.addEventListener('click', () => {
    store.dispatch(penny())
    render()
})

addNickel.addEventListener('click', () => {
    store.dispatch(nickel())
    render()
})

addDime.addEventListener('click', () => {
    store.dispatch(dime())
    render()
})

addQuarter.addEventListener('click', () => {
    store.dispatch(quarter())
    render()
})

form.addEventListener('submit', e => {
  e.preventDefault()
  store.dispatch(message(input.value))
  render()
})

function render(){
  messageArea.innerHTML = store.getState().message
  coinCount.innerHTML = `
    <h2>Pennies:</h2>
    Count: <span id="pennies-count">${store.getState().pennies}</span>
    Value: <span id="pennies-value">${store.getState().pennies * .01}</span>
    <h2>Nickels:</h2>
    Count: <span id="nickels-count">${store.getState().nickels}</span>
    Value: <span id="nickels-value">${store.getState().nickels * .05}</span>
    <h2>Dimes:</h2>
    Count: <span id="dimes-count">${store.getState().dimes}</span>
    Value: <span id="dimes-value">${store.getState().dimes * .1}</span>
    <h2>Quarters:</h2>
    Count: <span id="quarters-count">${store.getState().quarters}</span>
    Value: <span id="quarters-value">${store.getState().quarters * .25}</span>
    <br />
    <h2>Total:</h2>
    Count: <span id="total-count"></span>
    Value: <span id="total-value"></span>
  `
}

render()

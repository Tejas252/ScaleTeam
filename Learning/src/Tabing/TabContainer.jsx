import React from 'react'
import {Chrome} from './Tabs/Chrome'
import {Second} from './Tabs/Second'
import {Third} from './Tabs/Third'
import {Fourth} from './Tabs/Fourth';
import { Nothing } from './Tabs/Nothing';
// import {TableContainer} from './TabContainer'

export const TableContainer = ({tag}) => {
  // var MyComponent = component[type + "Component"];

 const  components ={
    chrome: Chrome,
    second: Second,
    third:Third,
    fourth:Fourth,
    nothing:Nothing 
  }
  const TagName = components[tag || 'nothing'];
  return (
    
      <TagName />

    );
  
}

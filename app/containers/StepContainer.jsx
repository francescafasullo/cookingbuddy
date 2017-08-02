import React from 'react'
import {connect} from 'react-redux'

import Step from '../components/Step'

const mapStateToProps = state => ({
  selectedStep: state.recipe.selectedStep
})

export default connect(mapStateToProps)(Step)

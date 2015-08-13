import Tappable from 'react-tappable'
import React from 'react'

let TapLink = (props, context) => {

  return {

    ...React.Component.prototype,
    props,
    context,

    handleTap () {
      this.context.router.transitionTo(this.props.to, this.props.params, this.props.query)
    },

    getClassName () {
      let className = this.props.className

      if (this.getActiveState()) {
        className += ' ' + this.props.activeClassName
      }

      return className
    },

    getActiveState () {
      return this.context.router.isActive(this.props.to, this.props.params, this.props.query)
    },

    render () {

      let { component } = this.props

      return (
        <Tappable onTap={::this.handleTap} component={component} className={this.getClassName()}>
          {this.props.children}
        </Tappable>
      )
    }
  }

}

TapLink.propTypes = {
  activeClassName: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
  params: React.PropTypes.object,
  query: React.PropTypes.object,
  activeStyle: React.PropTypes.object,
  component: React.PropTypes.string
}

TapLink.defaultProps = {
  activeClassName: 'active',
  className: '',
  component: 'a'
}

TapLink.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default TapLink

import Tappable from 'react-tappable'
import React from 'react'

let TapLink = (props, context) => {

  return {

    ...React.Component.prototype,
    props,
    context,

    handleTap () {

      let { redirectType } = this.props
      let { history } = this.context

      if (redirectType === 'push') {
        history.pushState(this.props.state, this.props.to, this.props.query)
      } else if (redirectType === 'replace') {
        history.replaceState(this.props.state, this.props.to, this.props.query)
      } else {
        throw new Error(`Unsupported redirect type "${ redirectType }" given`)
      }
    },

    getClassName () {
      let className = this.props.className

      if (this.getActiveState()) {
        className += ' ' + this.props.activeClassName
      }

      return className
    },

    getActiveState () {
      let { history } = this.context
      return history.isActive(this.props.to, this.props.query, this.props.onlyActiveOnIndex)
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
  query: React.PropTypes.object,
  activeStyle: React.PropTypes.object,
  component: React.PropTypes.string,
  redirectType: React.PropTypes.string.isRequired,
  onlyActiveOnIndex: React.PropTypes.bool.isRequired
}

TapLink.defaultProps = {
  activeClassName: 'active',
  className: '',
  component: 'a',
  activeStyle: {},
  redirectType: 'push',
  onlyActiveOnIndex: false
}

TapLink.contextTypes = {
  history: React.PropTypes.object.isRequired
}

export default TapLink

import Tappable from 'react-tappable'
import React from 'react'

let TapLink = (props, context) => {

  return {

    ...React.Component.prototype,
    props,
    context,

    handleTap () {

      let { redirectType } = this.props
      let { router } = this.context

      if (redirectType === 'transition') {
        router.transitionTo(this.props.to, this.props.params, this.props.query)
      } else if (redirectType === 'replace') {
        router.replaceWith(this.props.to, this.props.params, this.props.query)
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
  component: React.PropTypes.string,
  redirectType: React.PropTypes.string.isRequired
}

TapLink.defaultProps = {
  activeClassName: 'active',
  className: '',
  component: 'a',
  redirectType: 'transition'
}

TapLink.contextTypes = {
  router: React.PropTypes.func.isRequired
}

export default TapLink

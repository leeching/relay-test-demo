import Relay from 'react-relay'

module.exports = class AddArticleMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {addArticle}
    `
  }
  getVariables() {
    const {title, content} = this.props
    return {title, content}
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddArticlePayload {
        archive {id},
        newArticle {cursor,node}
      }
    `
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'archive',
      parentID: this.props.archive.id,
      connectionName: 'articles',
      edgeName: 'newArticle',
      rangeBehaviors: {
        '': 'append'
      }
    }]
  }
}

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as newsActions from "../store/actions";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled";
import ReactHtmlParser from "react-html-parser";

const StyledTitle = styled("div")({
  display: "flex",
  justifyContent: "center",
  fontSize: "30px",
  fontWeight: "800"
});

const StyledCommentWrapper = styled("div")({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  border: "2px solid black",
  padding: "5px",
  span: {
    fontWeight: "800",
    marginRight: "5px"
  }
});

class CurrentPost extends PureComponent {
  componentDidMount() {
    const { fetchFeedById, match } = this.props;
    const id = match.params.id;
    fetchFeedById(id);
  }

  comments = comment => (
    <StyledCommentWrapper>
      <div>
        <span>User:</span>
        {comment.user}
      </div>
      {ReactHtmlParser(comment.content)}
      {(comment.comments || []).map(c => (
        <>{this.comments(c)}</>
      ))}
    </StyledCommentWrapper>
  );

  render() {
    const { feed } = this.props;
    return (
      <div>
        <StyledTitle>{feed.title}</StyledTitle>
        {(feed.comments || []).map(comment => (
          <>{this.comments(comment)}</>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    feed: state.currentFeed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFeedById: id => dispatch(newsActions.fetchFeedById(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CurrentPost));

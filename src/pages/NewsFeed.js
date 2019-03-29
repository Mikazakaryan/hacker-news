import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as newsActions from "../store/actions";
import { withRouter } from "react-router-dom";
import styled from "@emotion/styled";

const StyledPagination = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  div: {
    marginRight: "15px"
  }
});

const StyledFeedTitle = styled("div")({
  fontSize: "25px",
  cursor: "pointer"
});

const StyledFeedInfo = styled("div")({
  span: {
    fontWeight: "800",
    marginRight: "5px"
  },
  div: {
    marginTop: "20px"
  }
});

const StyledFeedsWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr"
});

const StyledSingleFeedWrapper = styled("div")({
  margin: "20px"
});

class NewsFeed extends PureComponent {
  componentDidMount() {
    const { fetchNewsByPage, page } = this.props;
    fetchNewsByPage(page);
  }

  get pagination() {
    return (
      <StyledPagination>
        <div>
          <button onClick={this.onPrevClick}>previous</button>
        </div>
        <div>
          <button onClick={this.onNextClick}>next</button>
        </div>
      </StyledPagination>
    );
  }

  onNextClick = () => {
    const { fetchNewsByPage, nextPage } = this.props;
    fetchNewsByPage(nextPage);
  };

  onPrevClick = () => {
    const { fetchNewsByPage, prevPage, page } = this.props;
    if (page === prevPage) {
      return;
    }
    fetchNewsByPage(prevPage);
  };

  onFeedClick = id => {
    this.props.history.push(`/news/${id}`);
  };

  render() {
    const { news } = this.props;
    return (
      <div>
        {this.pagination}
        <StyledFeedsWrapper>
          {news.map(feed => (
            <StyledSingleFeedWrapper key={feed.id}>
              <StyledFeedTitle onClick={() => this.onFeedClick(feed.id)}>
                {feed.title}
              </StyledFeedTitle>
              <StyledFeedInfo>
                <div>
                  <span>Source:</span>
                  <a
                    href={feed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="link"
                  >
                    {feed.domain}
                  </a>
                </div>
                <div>
                  <span>Points:</span>
                  {feed.points}
                </div>
                <div>
                  <span>Comments Count:</span>
                  {feed.comments_count}
                </div>
                <div>
                  <span>Time:</span>
                  {feed.time_ago}
                </div>
              </StyledFeedInfo>
            </StyledSingleFeedWrapper>
          ))}
        </StyledFeedsWrapper>
        {this.pagination}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.news,
    page: state.page,
    nextPage: state.nextPage,
    prevPage: state.prevPage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNewsByPage: page => dispatch(newsActions.fetchNewsByPage(page))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewsFeed));

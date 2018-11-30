import React from 'react';
import { NavLink } from 'react-router-dom';
import FollowingListContainer from './FollowingListContainer';
import FollowerListContainer from './FollowerListContainer';
import FollowProfileCard from './FollowProfileCard';
import './FollowListView.scss';
import PaginationContainer from './PaginationContainer';

const FollowerListView = () => (
  <div className="profile-container">
    <div className="profile__titlebar">
      <div className="user__toolbar--follow">
        <FollowerListContainer>
          {({ total }) => (
            <NavLink
              to="/dashboard/followers"
              className="toolbar__icon"
              activeStyle={{ fontWeight: 'bold', fontSize: '1.1em' }}
            >
              <i className="fas fa-user-friends" /> {total} Followers
            </NavLink>
          )}
        </FollowerListContainer>
        <FollowingListContainer>
          {({ total }) => (
            <NavLink
              to="/dashboard/following"
              className="toolbar__icon"
              activeStyle={{ fontWeight: 'bold', fontSize: '1.1em' }}
            >
              <i className="fas fa-user-check" /> {total} Following
            </NavLink>
          )}
        </FollowingListContainer>
      </div>
    </div>
    <hr />
    <FollowerListContainer>
      {({
        followerList, loading, total, pageFetcher, currentPage, totalPages
      }) => {
        if (!loading && total) {
          return (
            <React.Fragment>
              <div className="follow__list">
                {followerList.map(user => (
                  <FollowProfileCard key={user.userId} user={user} />
                ))}
              </div>
              <PaginationContainer
                totalPages={totalPages}
                currentPage={currentPage}
                pageFetcher={pageFetcher}
                limit={15}
              >
                {({
                  nextPageHandler, prevPageHandler, firstPage, lastPage
                }) => (
                  <div className="featured-articles__control">
                    <div
                      className="featured-articles__more-btn"
                      onClick={nextPageHandler}
                      style={{ display: firstPage && 'none', transform: 'scale(0.8, 0.8)' }}
                    >
                      NEXT&nbsp;
                      <i className="fas fa-arrow-right" />
                    </div>
                    <div
                      className="featured-articles__more-btn"
                      onClick={prevPageHandler}
                      style={{ display: lastPage && 'none', transform: 'scale(0.8, 0.8)' }}
                    >
                      <i className="fas fa-arrow-left" />
                      &nbsp;PREVIOUS
                    </div>
                  </div>
                )}
              </PaginationContainer>
            </React.Fragment>
          );
        }
        if (!total) {
          return <div className="follow__list--empty">You do not have followers at the moment</div>;
        }
        return (
          <div className="follow__list--loading">
            <i className="fas fa-circle-notch fa-spin fa-3x" />
          </div>
        );
      }}
    </FollowerListContainer>
  </div>
);

export default FollowerListView;

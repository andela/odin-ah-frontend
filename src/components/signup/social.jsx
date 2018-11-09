import PropTypes from 'prop-types';
import React from 'react';
import { ApiRequest } from '../../services/apiRequest';
import toSentenceCase from '../../utils';

export default function SocialButton(props) {
  let label;
  const { social } = props;
  const sentenceCase = toSentenceCase(social);
  if (props.type === 'signup') {
    label = `Sign up with ${sentenceCase}`;
  } else {
    label = `Log in with ${sentenceCase}`;
  }
  const icon = (social === 'google') ? `${social}` : `fa-${social}`;
  return (
    <div className="field">
      <div className="control">
        <a href={ApiRequest.socialAuthUrl(social)}
           className={`button is-medium is-fullwidth is-${social}`}>
                  <span className="icon is-left">
                    <i className={`fab fa ${icon}`}/>
                  </span>
          <span>{label}</span>
        </a>
      </div>
    </div>);
}

SocialButton.propTypes = {
  type: PropTypes.oneOf(['signin', 'signup']).isRequired,
  social: PropTypes.oneOf(['facebook', 'twitter', 'google']).isRequired
};

SocialButton.defaultProps = {};

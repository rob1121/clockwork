import React from 'react';
import { isEmpty } from 'lodash';
import Spinner from 'react-spinkit';
import '../../sass/components/LoaderHOC.sass';

const LoaderHOC = prop => WrapperComponent => props => (
    isEmpty(props[prop])
      ? <div className="loader-container"><Spinner name={'circle'} fadeIn={'none'} /></div>
      : <WrapperComponent {...props} />
);

export default LoaderHOC;

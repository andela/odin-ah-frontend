import React from 'react';
import StatisticsHolder from './StatisticsHolder';

const StastisticsView = props => (
    <>
   { props.statistics && (<div>
    <span className='profile-title'>Statistics Summary</span>
     <div className='profile-content-wrapper'>
     <hr/>
     <div className='stats-container'>
     <StatisticsHolder number={props.statistics.count} title={'Articles'}/>
     <StatisticsHolder number={props.statistics.allViews} title={'Views'}/>
     <StatisticsHolder number={props.statistics.uniqueViews} title={'Unique Views'}/>
     </div>
   </div>
   </div>)}
   </>
);

StastisticsView.propTypes = {

};

export default StastisticsView;

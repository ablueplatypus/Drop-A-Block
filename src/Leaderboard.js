import React from 'react';


const Leaderboard = (props) => {
  // console.log(props.scores);

  const renderRank = () => {
    return props.scores.map((score, index) => {
      return <li key={index}>{index < 9 ? '0'+ (index + 1) : index + 1}&nbsp;&nbsp;&nbsp; {score.mod_high_score} &nbsp; {score.initials}</li>
    })
  }

  return (
    <div className="leaderboard">
      <h3>High Scores</h3>
      <ul id="rank-titles">
        <li>Rank</li>
        <li>Scores</li>
        <li>Int</li>
      </ul>
      <ul id="rank">
        {renderRank()}
      </ul>
    </div>
  )

}


export default Leaderboard;

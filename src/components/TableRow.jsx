import React, { Fragment, useState, useCallback, useContext, useMemo } from 'react';

import { getNextActive, getNextActiveEnd, isLogActive, formatTimeSpan, humanizeDuration, formatDate } from '../services/functions';
import { TimeContext } from '../services/time';
import { weatherNames } from '../services/data';

const getMessages = (item, active, time) => {
  if(active) {
    var goal = getNextActiveEnd(item, time);
    var pop = Math.ceil((goal - time));

    return {
      timer: `${humanizeDuration(pop)} left`,
      title: formatDate(goal)
    }
  } else {
    var goal = getNextActive(item, time);
    var pop = Math.ceil((goal - time));
    return {
      timer: `in ${humanizeDuration(pop)}`,
      title: formatDate(goal)
    }
  }
};

const TableRow = ({ item }) => {
  const [shown, setShown] = useState(false);
  const toggleShown = useCallback(() => {
    setShown(!shown);
  }, [shown]);

  const time = useContext(TimeContext);
  const active = isLogActive(item, time.local);
  const messages = useMemo(() => getMessages(item, active, time.local), [item, active, time]);

  return <Fragment>
    <tr onClick={toggleShown} className={`row whitespace-no-wrap text-center border-t border-b border-gray-300${active ? ' active' : ''}`}>
      <td><label><input type="checkbox" /> #{item.index}</label></td>
      <td className="toggle-description text-left cursor-pointer select-none py-1">
        <strong>{item.name}</strong><br />
        {item.location} <span className="text-gray-500 text-sm">@</span> {item.region} ({item.position.x}, {item.position.y})
      </td>
      <td title={messages.title}>
        {formatTimeSpan(item.time)}<br />
        <small className="timer">{messages.timer}</small>
      </td>
      <td>
        { item.weather.map(weather => 
          <img key={weather} src={`img/${weather}.png`} className="inline-block" title={weatherNames[''+weather]} />
        )}
      </td>
      <td>{item.emote}</td>
    </tr>
    { shown && <tr>
      <td className="description hidden" colspan="5">
        <div className="whitespace-normal text-center italic my-4">
					{item.description}<br />
					<a className="px-3 py-2 rounded bg-blue-600 inline-block text-white mt-2" href={item.image} target="_blank" title="Open a preview image in a new tab">Preview</a>
        </div>
      </td>
    </tr>}
  </Fragment>;
}

export default TableRow;
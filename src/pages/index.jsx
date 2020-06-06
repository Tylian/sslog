import React, { useContext } from 'react';
import TableRow from '../components/TableRow';
import { logData } from '../services/data';
import { formatTime } from '../services/functions';

import { TimeContext, timeProvider } from '../services/time';

const App = () => {
  const time = useContext(TimeContext);
  return <div className="container mx-auto my-2">
    <header className="text-center">
      <h1 className="font-bold text-4xl leading-none">Sightseeing Log Helper</h1>
      <h2 className="text-3xl leading-snug">{formatTime(time.eorzea)}</h2>
      <h3 className="text-sm leading-none">Weather changes at 12 AM, 8 AM and 4 PM.</h3>

      <div className="my-4 text-center">
        <label htmlFor="filter-active" data-toggle="filter-active" className="toggle inline-flex items-center cursor-pointer mx-4 select-none">
          <div className="relative">
            <input id="filter-active" type="checkbox" className="hidden" />
            <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div className="toggle__dot absolute w-6 h-6 bg-red-100 rounded-full inset-y-0 left-0"></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">
            Hide inactive
          </div>
        </label>
        <label htmlFor="filter-twenty" data-toggle="filter-twenty" className="toggle inline-flex items-center cursor-pointer mx-4 select-none">
          <div className="relative">
            <input id="filter-twenty" type="checkbox" className="hidden" />
            <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div className="toggle__dot absolute w-6 h-6 bg-red-100 rounded-full inset-y-0 left-0"></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">
            Hide logs above 20
          </div>
        </label>
        <label htmlFor="filter-finished" data-toggle="filter-finished" className="toggle inline-flex items-center cursor-pointer mx-4 select-none">
          <div className="relative">
            <input id="filter-finished" type="checkbox" className="hidden" />
            <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div className="toggle__dot absolute w-6 h-6 bg-red-100 rounded-full inset-y-0 left-0"></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium">
            Hide finished
          </div>
        </label>
      </div>
    </header>
    
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th width="6%">No.</th>
          <th className="py-2">Location</th>
          <th width="12%">Time</th>
          <th width="8%">Weather</th>
          <th width="8%">Emote</th>
        </tr>
      </thead>
      <tbody>
        {logData.map(item => <TableRow item={item} key={item.index} />)}
      </tbody>
    </table>

    <footer className="text-center text-sm mt-4">
      Made with love by <a className="hover:text-blue-400 text-blue-600" href="http://reddit.com/user/cute-kitsune">/u/cute-kitsune</a>, with data and logic either directly or indirectly from <a className="text-blue-400" href="http://reddit.com/user/Clorifex">/u/Clorifex</a>, <a className="text-blue-400" href="http://reddit.com/user/Rogueadyn">/u/Rogueadyn</a> and <a className="text-blue-400" href="https://docs.google.com/spreadsheets/d/1kbvzIWgXKJZFL08oPge_szSeYVNWbXije-aY2MCyeEc/edit#gid=0">this spreadsheet</a>.<br />
      Version 0.8.0-beta <small className="text-xs">(Last update: Added decimals to the locations!)</small>
    </footer>
  </div>
};

export default timeProvider(App);
# Sightseeing Log Helper
This entire app is a work in progress rewrite of my original [Sightseeing Log Helper](https://tylian.net/sslog/). All contributions are welcome, from scripts to generate data to efficiency tweaks.

Currently this is a work in progress, not all features are done, though the base functionality exists.

Short term goal is to get a 100% functional site working, regardless of code quality. Long term goal is to patch up the site to make maintainability easier via automatic generation of required data, as well as eventually port the project to Typescript.

## Notes
Data is manually pulled and pupulated using a combination of sources:

 - [This spreadsheet](https://docs.google.com/spreadsheets/d/1kbvzIWgXKJZFL08oPge_szSeYVNWbXije-aY2MCyeEc/edit#gid=0) is the basis of most data.
 - [XIVAPI](https://xivapi.com/Adventure) is a way to access data from the game itself related to all Sightseeing Log entries.
 - The method used to calculate the in game time is based on [a post made by Clorifex](https://www.reddit.com/r/ffxiv/comments/33tqok/cloudy_with_a_chance_of_garlok_predicting_eorzean/), which is based on research done by Rogueadyn.
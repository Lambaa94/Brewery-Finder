# Brewery-Finder

## Description

Breweries are continuing to pop up up each year across the US as consumers tastes are changing: beer consumers are increasingly seeking out unique craft beers in place of the off-the-rack, mass-produced selection that they are used to. In fact, since 2009 the average year-over-year increase in total breweries has been a staggering 14% (source: www.ttb.gov/beer/statistics). For these reasons, we have created a way to find breweries by specifying the state and brewery type and simplified the process for beer drinkers to find new breweries. 

This project uses three APIs to return information: an OpenBreweryDB API to find breweries by state and type, a YELP API to provide star ratings, and a Google Maps API to indicate the selected brewery's geographic location on a map. Furthermore, we used Foundation as a framework for our CSS; it is also worth mentioning that we relied heavily on local storage to store user search information, particularly longitude and latitude of a given search result, which was critical for its usage alongside Google Maps.

One of the major challenges we faced was populating the Google map with all search results returned from the OpenBreweryDB query. We pivoted and adapted the original strategy to show results in a modal after a user clicks on the dynamically created brewery buttons instead. However, it was still a great learning experience to get accustomed to working with the Google Maps API. We also got well acquainted with API's on a broader scale and boosted our confidence for using them in the future. 

## Table of Contents

* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Usage

**Below is how our application functions**

![brewery-finder-gif](assets/Brewery-Finder.gif)

**Below is a link to our deployed application**

***https://lambaa94.github.io/Brewery-Finder/***

## Credits

* James Lamb (https://github.com/Lambaa94)
* Lauren Brown (https://github.com/laurenbrown108)
* Robert Greenawalt (https://github.com/rsg71)

## License

MIT License

Copyright (c) 2020 James Lamb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
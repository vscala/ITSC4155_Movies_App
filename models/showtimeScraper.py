'''
	Script for getting currently playing movies at UNCC.
	
	Usage:
		calling getMovies() returns a list of all currently 
		playing movies in the following format:
		[{
			'name' : movie_name,
			'description' : desciption,
			'startDate' : start_date,
			'endDate' : end_date,
			'eventStatus' : event_status,
			'location' : location,
			'url' : url,
			'image' : image_url
		}, ...]
	
	TODO:
		- add pickling for persistant data between calls
		- add time checking to check when new data should be scraped
'''

import json
import requests
from bs4 import BeautifulSoup
import re
from typing import List

# Returns a list of movies with details in chronological order
def getMovies() -> List[dict]:
	page = requests.get("https://campusevents.charlotte.edu/calendar")
	soup = BeautifulSoup(page.content, 'html.parser')
	movie_urls = [getMovieDetails(movie['href']) for movie in soup.find_all(text=re.compile("Movie: *"), href=True)]
	return movie_urls
	
# Returns data relating to each movie: 'name', 'description', 'startDate', 'endDate', 'eventStatus', 'location', 'url', 'image'
def getMovieDetails(url : str) -> dict:
	page = requests.get(url)
	soup = BeautifulSoup(page.content, 'html.parser')
	data = json.loads(soup.find('script', type='application/ld+json').text)[0]
	data['name'] = data['name'][8:-1]
	return data
	
if __name__ == "__main__":
	movie_urls = getMovies()
	for movie in movie_urls:
		print(movie['name'])

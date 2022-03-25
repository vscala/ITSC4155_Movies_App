import json
import requests
import re
import pickle
from time import time
from bs4 import BeautifulSoup
from typing import List

'''
	Script for getting currently playing movies at UNCC.
	
	Usage:
		calling loadMovies() returns a list of all currently 
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
		
		(loadMovies will attempt to use the cache file first then
		scrape if cache is expired or has not been generated.)
'''

EXPIRATION_TIME = 86_400 # time in seconds (86_400 == 1 day)
CACHEFILE = "moviecache.p"
UNCC_CALENDAR_URL = "https://campusevents.charlotte.edu/calendar"

# Loads (or generates) and returns list of movies
def loadMovies() -> List[dict]:
	try:
		prevTime, movies = pickle.load(open(CACHEFILE, "rb"))
		assert time() < prevTime + EXPIRATION_TIME
	except (OSError, IOError, AssertionError) as e:
		movies = scrapeMovies()
		saveMovies(movies)
	return movies
	
# Saves movies to cache file
def saveMovies(movies : List[dict]) -> None:
	pickle.dump((time(), movies), open(CACHEFILE, "wb"))

# Scrapes and returns a list of movies with details in chronological order
def scrapeMovies() -> List[dict]:
	page = requests.get(UNCC_CALENDAR_URL)
	soup = BeautifulSoup(page.content, 'html.parser')
	movie_urls = [scrapeMovieDetails(movie['href']) for movie in soup.find_all(text=re.compile("Movie: *"), href=True)]
	return movie_urls
	
# Scrapes and returns data relating to each movie: 
# 	'name', 'description', 'startDate', 'endDate', 'eventStatus', 'location', 'url', 'image'
def scrapeMovieDetails(url : str) -> dict:
	page = requests.get(url)
	soup = BeautifulSoup(page.content, 'html.parser')
	data = json.loads(soup.find('script', type='application/ld+json').text)[0]
	data['name'] = data['name'][8:-1]
	return data


movies = loadMovies()
print(movies)


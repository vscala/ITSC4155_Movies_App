# Wordle-like game
from random import shuffle
WORDS = ['also', 'come', 'even', 'find', 'from', 'give', 'have', 'here', 'into', 'just', 'know', 'like', 'look', 'make', 'many', 'more', 'only', 'some', 'take', 'tell', 'than', 'that', 'them', 'then', 'they', 'this', 'time', 'very', 'want', 'well', 'what', 'when', 'will', 'with', 'year', 'your', 'about', 'could', 'first', 'other', 'their', 'there', 'these', 'thing', 'think', 'those', 'which', 'would', 'people', 'because']
GUESSES = 5

def getNewWord(words):
	n = len(words)//2
	front, back = words[:n], words[n:]
	shuffle(front); shuffle(back)
	words = back + front # ensures words will only repeat at most every n/2 calls
	for word in words:
		yield word
	yield from getNewWord(words)


if __name__ == "__main__":
	randomWords = getNewWord(WORDS)
	running = True
	while running:
		word = next(randomWords)
		print(f"Guess a word with length {len(word)}")
		for g in range(GUESSES):
			guess = input()
			if guess == word:
				print(f"You won in {g+1} guesses")
				break
			for i, c in enumerate(guess):
				if word[i] == c:
					print(c, end="")
				else:
					print("_", end="")
			print("_"*(len(word) - len(guess)))
		else:
			print(f"You lost, correct word was {word}")

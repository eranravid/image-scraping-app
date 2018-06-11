# image-scraping-app

# Goal
Create a command line tool that will scrape all images from a given URLand create an HTML page displaying all of the fetched images.
# Guidelines
1. Choose any computer language but -if compiled also send the source code
2. The command line tool will get 2 arguments:
  a. URLof the web page 
  b. output folder
3. It should run on both windows and Linux
4. Be able to explain everything you did.
# Specification
1. Scan the given URLfor image URLs
2. Download all images to the output folder
3. Create inthe given output folder an index.html file
4. The created HTML file will include a table with two columns 
  a. The image in max width of 120px (height should change accordingly as the original proportions)
  b. The original URLof the image, it’s original size and format

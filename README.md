# image-scraping-app

# Installing
git clone this repository.
install Node.js on your system.
run `node index.js`.

# Usage
An express server run at `localhost:80`.
Use query parameter `domain` to change the domain to be scraped.
Use query parameter `imgmaxwidth` to change the maximum image width to be rendered.
For example `http://localhost/?domain=https://unsplash.com/search/photos/spring&imgmaxwidth=200`.
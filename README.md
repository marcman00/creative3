# Lab 3: Creating a Vue XKCD Browser

In this assignment, you will use Vue to build an application that uses
an API to browse XKCD comics.

## Starting the lab

To start the lab, you must follow this [GitHub Classroom
link](https://classroom.github.com/a/qC4peA9p). This will create a
private repository for you using our classroom site. We will only
grade repositories created and submitted this way.

Once you "Accept the assignment" on GitHub Classroom, it will create a
new repository for you and grant you access to it on GitHub. In order
to start working on the lab, simply clone the repository to your
laptop or other working environment.

## Tutorial

Use the [tutorial](https://github.com/BYU-CS260-Winter-2018/lab3/wiki)
in the Wiki to create the application. This will help you create most
of the functionality. Once you are done, your lab should look like this:

![xkcd](images/xkcd.png)

## Additional Functionality

Once you complete the tutorial, add the following functionality:

### More navigation buttons

Add buttons to navigate to the first comic and the last comic.

### Date and time for comments

Add the current date and time to every comment that is created, then
show the current date and time after or below the author's name.

### Star rating

Add the ability for people to rate the cartoon. Display the average
rating accumulated so far.

Use this [star rating library for
Vue](https://github.com/craigh411/vue-star-rating). Use the CDN method
for loading the libary:

```
<script src="https://unpkg.com/vue-star-rating/dist/star-rating.min.js"></script>
```


along with the suggestion for creating a Vue component:

```
Vue.component('star-rating', VueStarRating.default);
```

Once this is done, you just need to create a star rating element in
`index.html` and you need to create the appropriate backing code in `script.js`.

Change the options on the star rating library so that it increments in
steps of 0.5, does not show the current rating, and uses red stars.

When you're done, it should look like this:

![rating](images/rating.png)

## Link to GitHub repository

In a footer, you must include a link to your GitHub repository, which must be
stored in GitHub Classroom.

## Submission

On Canvas, submit the URL for your website, which should be running on
your DigitalOcean server.

## Rubric for Grading

When we grade these labs, we will award points using the following
rubric:

Item | Points
--- | ---
The material in the tutorial works | 70
Buttons for first and last comic work | 10
Date and time for comments work | 10
Star ratings work | 10

// console.log('added');

//fetch, load and show categories

//create loadCategories
const loadCategories = () => {
  // console.log('load categories created');

  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};

// {
//     "category_id": "1001",
//     "category": "Music"
// }

//create displayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  // console.log(categories)
  categories.forEach((element) => {
    // console.log(element);
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = element.category;

    //add btn to categoryContainer
    categoryContainer.append(button);
  });
};

//create loadVideos
const loadVideos = () => {
  // console.log('load videos created')

  // fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

//create displayVideos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  // console.log(videos);

  videos.forEach((element) => {
    // console.log(element);
      const card = document.createElement("div");
      card.classList = "card";
      card.innerHTML = `
  <figure class="h-full w-full">
    <img class= "h-full w-full object-cover"
      src= ${element.thumbnail} />
  </figure>
  <div class="card-body px-0 ">
    <div>
    <div class = "flex gap-2">
        <img class="rounded-full w-8 h-8 object-cover" src=${element.authors[0].profile_picture} alt="" srcset="">
        <p class="font-bold text-lg">${element.title}</p>
    </div>
    <div class= "inline-flex items-center gap-1 pl-10">
        <p class="shrink-0">${element.authors[0].profile_name}</p>
        ${element.authors[0].verified == true ? '<img class="w-4 h-4" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="" srcset="">' : ""}
    </div>
    <p class = "pl-10">${element.others.views} views</p>
</div>
  </div>
            
            `;
      videoContainer.append(card);
    
  });
};
loadCategories();
loadVideos();


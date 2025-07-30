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
const removeBtnActiveStatus = () =>{
  const buttons = document.getElementsByClassName("button-class");
  for(let btn of buttons){
    btn.classList.remove("bg-blue-500");
    btn.classList.remove("text-white");
  }
}


const loadCategoryVideo = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeBtnActiveStatus();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("bg-blue-500");
      activeBtn.classList.add("text-white");
      displayVideos(data.category);
    })
    .catch((err) => console.log(err));
}

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  // console.log(categories)
  
  categories.forEach((element) => {
    // console.log(element);
    const buttonContainer = document.createElement("div");
    buttonContainer.classList="pt-10";
    buttonContainer.innerHTML = `
    
    <button id="btn-${element.category_id}" onclick="loadCategoryVideo(${element.category_id})" class = "btn button-class">
      ${element.category}
    </button>
    
    `

    //add btn to categoryContainer
    categoryContainer.append(buttonContainer);
  });
};

//create loadVideos
const loadVideos = (searchText = "") => {
  // console.log('load videos created')

  // fetch data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
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
  videoContainer.innerHTML =``;

  if(videos.length == 0){
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class= "w-full flex flex-col items-center gap-4">
    <img class="w-[200px]" src="assets/icon.png" />
    <h1 class="font-bold text-xl">No Content</h1>
    </div>
    `;
  }
  else{
    videoContainer.classList.add("grid");
  }
  

  videos.forEach((element) => {
    // console.log(element);
    const card = document.createElement("div");
    card.classList = "card";
    card.innerHTML = `
  <figure class="h-full w-full relative">
    <img class= "h-[200px] w-full object-cover"
      src= ${element.thumbnail} />
    ${
      element.others.posted_date.length == 0
        ? ""
        : `<p class="absolute right-2 bottom-2 bg-black/40 px-2 text-white text-xs">${time(element.others.posted_date)}</p>`
    }
  </figure>
  <div class="card-body px-0 ">
    <div>
    <div class = "flex gap-2">
        <img class="rounded-full w-8 h-8 object-cover" src=${
          element.authors[0].profile_picture
        } alt="" srcset="">
        <p class="font-bold text-lg">${element.title}</p>
    </div>
    <div class= "inline-flex items-center gap-1 pl-10">
        <p class="shrink-0">${element.authors[0].profile_name}</p>
        ${
          element.authors[0].verified == true
            ? '<img class="w-4 h-4" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="" srcset="">'
            : ""
        }
    </div>
    <p class = "pl-10">${element.others.views} views</p>
    <button onclick="loadDetails('${
      element.video_id
    }')" class="ml-10 btn btn-error">Details</button>
</div>
  </div>
            
            `;
    videoContainer.append(card);
  });
};
// {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }
function loadDetails(video_id) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.video))
    .catch((err) => console.log(err));
}

displayDetails = (data) => {
  // console.log(data.video.video_id);
  const modal = document.getElementById("display_description");
  modal.classList.remove("hidden");
  modal.innerHTML = `
<dialog id="my_modal_2" class="modal">
  <div class="modal-box h-[550px] w-[450px] flex flex-col items-center">
    <img class="w-full h-[300px] object-cover" src=${data.thumbnail} />
    <p class="py-4">${data.description}</p>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>

  `;
  const dialog = document.getElementById("my_modal_2");
  if (dialog) dialog.showModal();
};

// date to hour
const time = (second) =>{
  const hour = parseInt(second/3600);
  let remainingSeconds = second % 3600;
  const minute = parseInt(remainingSeconds/60);
  let seconds = remainingSeconds % 60; 
  return `${hour} hours ${minute} minutes ${seconds} seconds ago`
}
document.getElementById("search-input").addEventListener("keyup",(e)=>{
  loadVideos(e.target.value);
})

document.getElementById("home-btn").addEventListener("click", () => loadVideos(""))

loadCategories();
loadVideos();

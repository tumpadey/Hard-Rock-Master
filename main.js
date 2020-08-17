const inputSong = document.getElementById('songTitle');
const searchBtn = document.getElementById('searchBtn');
var result = document.getElementById('result');

searchBtn.addEventListener('click',search=>{
    search.preventDefault();
    const searchTerm = inputSong.value.trim();

   searchSong(searchTerm);
   
    
});


async function searchSong(term){


   const response = await fetch(`https://api.lyrics.ovh/suggest/${term}`);
   const data = await response.json();
   //console.log(data);
    showSong(data);
    
    
    
};
function showSong(data){
result.innerHTML =`
            <ul class="song-list">
            ${data.data.map(song=>`
            <li>
            <div>
            <strong>
            ${song.title} 
            </strong> By ${song.artist.name}
            </div>

            <span dataArtist ="${song.artist.name}" dataSongTitle="${song.title}">
            get lyrics
            </span>
            </li>
             `).join('')
             }
             </ul>
             `
};

result.addEventListener('click',result=>{
    const clickedElement = result.target;
    if(clickedElement.tagName === 'SPAN'){
       
        const artist = clickedElement.getAttribute("dataArtist");
        const songTitle = clickedElement.getAttribute("dataSongTitle");
     
        getLyrics(artist,songTitle);

    }
    
});

async function getLyrics(artist,songTitle){
   const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
   const data = await res.json();

   if(data.lyrics === undefined){
       confirm("Lyrics Not Found")
   }
   else{
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
   }
    
   const lyrics =data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    
   result.innerHTML=`<h2> <strong>
                ${songTitle}
                </strong> By ${artist}
                </h2>
                <span>${lyrics}</span>
                `
                           
}
    

    




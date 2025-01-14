document.getElementById("run").addEventListener("click",run);
let limit;

function run() {

    var artist = document.getElementById("artist").value;
    limit = document.getElementById("tablesize").value;
    console.log(limit);

    $.ajax({
     url: 'https://itunes.apple.com/search?entity=musicTrack&attribute=allArtistTerm&term=' + artist + "&limit=" + limit,
        dataType: "json",
        success: process
    });
}

function process(data) {
    console.log(data)

    //adjust to reflect the cols you need
    var cols = ["","artistName","trackName", 'previewUrl', 'collectionName','artworkUrl100'];
  
    //results from server
    var songs = data.results;

    //get table from page
    var table = document.getElementById("outputTable");

    for (let i=0; i<songs.length; i++){
        let row = document.createElement("tr");
        for (let j=0; j<cols.length; j++){
            //create tr and td tags
            let col = document.createElement("td"); 
    
            //write the first songs trackName to the td tag
            if (j==0){
                col.innerHTML = i+1
            }else if (j==3){
                let song=document.createElement('audio');
                song.src=songs[i][cols[j]];
                song.controls=true;
                col.appendChild(song);
            }else if (j==5){
                let img=document.createElement('img');
                img.src=songs[i][cols[j]];
                col.appendChild(img);
            }else{
                col.innerHTML = songs[i][cols[j]];
            }
            row.appendChild(col);
        }
        //write the first songs trackName to the td tag
        //col.innerHTML = i+1;
        table.appendChild(row);
    }

    
}

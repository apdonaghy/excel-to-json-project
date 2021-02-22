
let localData = [];
let localDataIndex;
let favorites = [];
let alreadyInFavorites = false;

const storedfavorites = JSON.parse(localStorage.getItem("favorites"));

const x =  document.querySelector(".favoritesPanel");

const container = document.querySelector('.container') 
const focusStyle = document.querySelector('#itemFocus')
const thumbnails = document.querySelector('#thumbnails')
const mainFocusImage = document.querySelector('#mainFocusImage')
const productInfo = document.querySelector('#productInfo')

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector("#navbar").style.top = "0";
    } else if(currentScrollPos < 20){
        document.querySelector("#navbar").style.top = "0";
    }
    else{
        document.querySelector("#navbar").style.top = "-110px";
    }
    prevScrollpos = currentScrollPos;
}

const deleteFavorite = function(e){
  
    for(let obj in favorites){
        if(e.target.dataset.index === favorites[obj].order){
          favorites.splice(favorites.indexOf(favorites[obj]), 1);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }
    console.log(favorites.length)
    e.target.parentNode.remove();
}


let toggleOn = false;



const toggleOff = function(){
    document.body.style.overflow = "scroll";
        $(focusStyle).fadeOut();
        thumbnails.innerHTML = '';
        mainFocusImage.innerHTML = '';
        productInfo.innerHTML = '';
} 

const showImage = function(e){
    // console.log(e.target.src)
    mainFocusImage.innerHTML = '';
    // mainFocusImage.appendChild(e.target);
    const itemImageInside4 = document.createElement('img');
    itemImageInside4.setAttribute("class", "mainImageInside")
    mainFocusImage.appendChild(itemImageInside4)
    document.querySelector('.mainImageInside').src = e.target.src;
}

const showVideo = function(){
    mainFocusImage.setAttribute('class', 'videoWrapper')
    mainFocusImage.innerHTML = localData[0][localDataIndex]['Video'];
}

const showClose = function(){
 document.querySelector('.textClose').innerHTML = 'CLOSE';
}

const dontShowClose = function(){
    document.querySelector('.textClose').innerHTML = '';
   }



function showSaved() {
    $(document.querySelector('.favoritesPanelOuter')).fadeIn()
    $(document.querySelector('.overlayGray')).fadeIn()
    document.body.style.overflow = "hidden";
  }

  function dontShowSaved(){
    $(document.querySelector('.favoritesPanelOuter')).fadeOut()
    $(document.querySelector('.overlayGray')).fadeOut()
    document.body.style.overflow = "scroll";
  }

  function showNotification(){
    document.querySelector(".addText").style.transform = "scale(1.08)";
    document.querySelector(".addText").style.opacity = ".5";
  // setTimeout(hideNotification(),3000);
   setTimeout(function(){
    document.querySelector(".addText").style.transform = "scale(1.0)";
    document.querySelector(".addText").style.opacity = "1";
   
   }, 300);
   
 }



const addItem = function(){
    
    
    for(let obj in favorites){
       if (localDataIndex === favorites[obj].order){
        alreadyInFavorites = true;
       }
      }

      if(!alreadyInFavorites){
        showNotification()


      favorites.unshift(localData[0][localDataIndex])

      favorites[0].order = localDataIndex
      localStorage.setItem("favorites", JSON.stringify(favorites));
      x.innerHTML = '';
      for(let i = 0; i < favorites.length; i++){
      const savedItemContainer = document.createElement('div');
      savedItemContainer.setAttribute('class', 'savedItemContainer');
      const newSavedItem = document.createElement('p');
      newSavedItem.setAttribute('data-index', favorites[i].order);
      newSavedItem.addEventListener("click", focusIn)
      newSavedItem.innerHTML = `${favorites[i]['Name']}`
      const deleteBtn = document.createElement('span')
      deleteBtn.setAttribute('data-index', favorites[i].order);
      deleteBtn.addEventListener('click', deleteFavorite)
      deleteBtn.setAttribute('class', 'deleteBtn');
      deleteBtn.innerHTML = "REMOVE";
      savedItemContainer.appendChild(newSavedItem);
      savedItemContainer.appendChild(deleteBtn); 
      x.appendChild(savedItemContainer);
      }
      
  } 
  alreadyInFavorites = false;

}

const focusIn = function(e){

    dontShowSaved()

    const close = document.querySelector('#close')
    close.addEventListener('click', toggleOff);
    close.addEventListener('mouseover', showClose);
    close.addEventListener('mouseout', dontShowClose);
    

    let localObject = localData[0][e.target.dataset.index]
    localDataIndex = e.target.dataset.index;
    // console.log(localDataIndex);
        
        
        if(localObject['imageURL1'] != ''){
        const itemImageInside2 = document.createElement('img');
        itemImageInside2.setAttribute('class', "mainImageInside2")
        itemImageInside2.addEventListener("mouseover", showImage)
        thumbnails.appendChild(itemImageInside2);
        document.querySelector('.mainImageInside2').src = localObject['imageURL1'];
        
        }

        if(localObject['imageURL2'] != ''){
            const itemImageInside3 = document.createElement('img');
            itemImageInside3.setAttribute('class', "mainImageInside3")
            itemImageInside3.addEventListener("mouseover", showImage)
            thumbnails.appendChild(itemImageInside3);
            document.querySelector('.mainImageInside3').src = localObject['imageURL2'];
        }

        if(localObject['Video'] != ''){   
          const videoContainer = document.createElement('img')
          videoContainer.addEventListener("mouseover", showVideo)
          videoContainer.setAttribute('class', "videoThumb")
          videoContainer.src = "product_video.svg"
          thumbnails.appendChild(videoContainer);
        }                          
        
        if(localObject['imageURL1'] != ''){
        
        const itemImageInside = document.createElement('img');
        itemImageInside.setAttribute('class', "mainImageInside")
        mainFocusImage.appendChild(itemImageInside);
        document.querySelector('.mainImageInside').src = localObject['imageURL1'];
        }

        const itemTitle = document.createElement('h4');
        itemTitle.innerHTML = localObject['Name']
        productInfo.appendChild(itemTitle)

        const itemNumAddContainer = document.createElement('div');
        itemNumAddContainer.setAttribute('class', 'itemAddContainer');
        const itemNum = document.createElement('p');
        itemNum.setAttribute('class', 'itemNum');
        itemNum.innerHTML = `#${localObject['Item Number']}`;
        itemNumAddContainer.appendChild(itemNum);
        const addTo = document.createElement('p');
        addTo.setAttribute('class', 'addText');
        addTo.innerHTML = `<span class="plus">+</span> Add to Favorites`;
        addTo.addEventListener('click', addItem);
        itemNumAddContainer.appendChild(addTo);
        productInfo.appendChild(itemNumAddContainer);

        const description = document.createElement('p');
        description.setAttribute('class', 'description')
        description.innerHTML = localObject['Item Description']
        productInfo.appendChild(description)

        const packaging = document.createElement('p');
        packaging.setAttribute('class', 'packaging')
        packaging.innerHTML = `Packaging: ${localObject['Packaging']}`
        productInfo.appendChild(packaging)

        const pricing2 = document.createElement('p');
        pricing2.setAttribute('class', 'pricing2')
        pricing2.innerHTML = localObject['Pricing']
        productInfo.appendChild(pricing2)
        
      

    // const focusContent = e.target.parentElement.innerHTML;
   
    // focusStyle.innerHTML = focusContent;
        // if(toggleOn === false){
        // toggleOn = true;
        $(focusStyle).fadeIn();
        document.body.style.overflow = "hidden";
        // focusStyle.style.display = 'block';
        // } 
     
  }

$(document).ready(function(){
const storedfavorites = JSON.parse(localStorage.getItem("favorites"));
    if(storedfavorites && storedfavorites.length >= 1){
    favorites = storedfavorites;
    x.innerHTML = '';
    for(let i = 0; i < favorites.length; i++){
    const savedItemContainer = document.createElement('div')
    savedItemContainer.setAttribute('class', 'savedItemContainer');
    const newSavedItem = document.createElement('p');
    newSavedItem.setAttribute('data-index', favorites[i].order);
    newSavedItem.addEventListener("click", focusIn)
    newSavedItem.innerHTML = `${favorites[i]['Name']}`
    const deleteBtn = document.createElement('span')
    deleteBtn.setAttribute('data-index', favorites[i].order);
    deleteBtn.addEventListener('click', deleteFavorite)
    deleteBtn.setAttribute('class', 'deleteBtn')
    deleteBtn.innerHTML = "REMOVE"
    savedItemContainer.appendChild(newSavedItem);
    savedItemContainer.appendChild(deleteBtn); 
    x.appendChild(savedItemContainer);
    }
    }
    $.getJSON("opportunity_buy.json", function(data){
        const headline = document.getElementById('catalogName')

        headline.innerHTML = data[0]['Catalog Name'];
            
            for(let key in data){

             const item = data[key];
             const itemContainer = document.createElement('div');
             itemContainer.setAttribute('class', 'itemContainer')
             container.appendChild(itemContainer)
            
                    const itemImage = document.createElement('img');
                    itemImage.setAttribute('class', `mainImage${data.indexOf(item)}`);
                    itemImage.setAttribute('id', 'mainImage');
                    itemImage.setAttribute('data-index', data.indexOf(item));
                    itemImage.addEventListener("click", focusIn)
                    itemContainer.appendChild(itemImage);
                    document.querySelector(`.mainImage${data.indexOf(item)}`).src = item['imageURL1'];
        
                    if(item["Sold Out"] === "TRUE"){
                        const soldOut = document.createElement('span');
                        soldOut.setAttribute('class', 'soldOut')
                        soldOut.innerHTML = 'Sold Out';
                        itemContainer.appendChild(soldOut)
                    }

             const title = document.createElement('h3');
             title.innerHTML = item['Name'];
             title.setAttribute('data-index', data.indexOf(item));
             title.addEventListener("click", focusIn)
             itemContainer.appendChild(title);

            //  const itemNum = document.createElement('p');
            //  itemNum.innerHTML = `${item['Item']}`;
            //  itemContainer.appendChild(itemNum);

             const price = document.createElement('p');
             price.innerHTML = `${item['Pricing']}`;
             price.setAttribute('data-index', data.indexOf(item));
             price.addEventListener("click", focusIn)
             itemContainer.appendChild(price);
             item.order = data.indexOf(item)
          }   
   
        //   for(let key of data){


        //      const itemContainer = document.createElement('div');
        //      itemContainer.setAttribute('class', 'itemContainer')
        //      container.appendChild(itemContainer)
        //      const item = data[key];


        //     if(item['Image']){
        //         const itemImage = document.createElement('img');
        //         itemImage.setAttribute('class', "mainImage")
        //         itemContainer.appendChild(itemImage);
        //         document.querySelector('.mainImage').src = item['Image'];
        //        }

        //      const title = document.createElement('h3');
        //      title.addEventListener("click", focusIn)
        //      title.innerHTML = item['Item Description'];
        //      itemContainer.appendChild(title);

        //      const itemNum = document.createElement('p');
        //      itemNum.addEventListener("click", test)
        //      itemNum.innerHTML = `${item['Item']}`;
        //      itemContainer.appendChild(itemNum);

        //      const price = document.createElement('p');
        //      price.innerHTML = `$${item['Standard Cost']}`;
        //      itemContainer.appendChild(price);
             
    

        //   }   
          localData.push(data);
          console.log(localData)
          
    }).fail(function(){
        console.log("An error has occurred.");
    });
    
});





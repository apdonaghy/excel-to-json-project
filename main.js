let localData = [];
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


let toggleOn = false;


const toggleOff = function(){
 
        $(focusStyle).fadeOut();
        thumbnails.innerHTML = '';
        mainFocusImage.innerHTML = '';
        productInfo.innerHTML = '';
} 

const showImage = function(e){
    // console.log(e.target.src)
    // mainFocusImage.innerHTML = '';
    // mainFocusImage.appendChild(e.target);
    document.querySelector('.mainImageInside').src = e.target.src;
}

const focusIn = function(e){

    const close = document.querySelector('#close')
    close.addEventListener('click', toggleOff)

    let localObject = localData[0][e.target.dataset.index]

        
        
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
        
        if(localObject['imageURL1'] != ''){
        
        const itemImageInside = document.createElement('img');
        itemImageInside.setAttribute('class', "mainImageInside")
        mainFocusImage.appendChild(itemImageInside);
        document.querySelector('.mainImageInside').src = localObject['imageURL1'];
        }

        const itemTitle = document.createElement('h4');
        itemTitle.innerHTML = localObject['Name']
        productInfo.appendChild(itemTitle)

        const itemNum = document.createElement('p');
        itemNum.setAttribute('class', 'itemNum')
        itemNum.innerHTML = `#${localObject['Item number']}`
        productInfo.appendChild(itemNum)

        const description = document.createElement('p');
        description.setAttribute('class', 'description')
        description.innerHTML = localObject['Item description']
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
        // focusStyle.style.display = 'block';
        // } 
     
  }





$(document).ready(function(){
    $.getJSON("testZoo.json", function(data){

            
            for(let key in data){

             const item = data[key];
             const itemContainer = document.createElement('div');
             itemContainer.setAttribute('class', 'itemContainer')
            //  itemContainer.setAttribute('data-index', data.indexOf(item));
            //  itemContainer.addEventListener("click", focusIn)
             container.appendChild(itemContainer)
            
             


           
                const itemImage = document.createElement('img');
                itemImage.setAttribute('class', `mainImage${data.indexOf(item)}`);
                itemImage.setAttribute('id', 'mainImage');
                itemImage.setAttribute('data-index', data.indexOf(item));
                itemImage.addEventListener("click", focusIn)
                itemContainer.appendChild(itemImage);
                document.querySelector(`.mainImage${data.indexOf(item)}`).src = item['imageURL1'];
         

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
          
          
    }).fail(function(){
        console.log("An error has occurred.");
    });
    
});





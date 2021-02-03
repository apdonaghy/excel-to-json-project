let localData = [];



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


const container = document.querySelector('.container') 
const focusStyle = document.querySelector('#itemFocus')

let toggleOn = false;


const toggleOff = function(){
    if(toggleOn === true){
        toggleOn = false;
        focusStyle.classList.remove("itemFocus");
        focusStyle.style.display = 'none';
        }
}

const focusIn = function(e){
    let localObject = localData[0][e.target.dataset.index]

 
        console.log(localObject['Item'])
        console.log(localObject['Item Description'])
        console.log(localObject['MASTER'])

    // const focusContent = e.target.parentElement.innerHTML;
    // focusStyle.addEventListener('click', toggleOff)
    // focusStyle.innerHTML = focusContent;
    //     if(toggleOn === false){
    //     toggleOn = true;
    //     focusStyle.style.display = 'block';
    //     focusStyle.setAttribute('class', 'itemFocus');
       
    //     } 
     
  }





$(document).ready(function(){
    $.getJSON("onHand2.json", function(data){

            
            for(let key in data){

             const item = data[key];
             const itemContainer = document.createElement('div');
             itemContainer.setAttribute('class', 'itemContainer')
            //  itemContainer.setAttribute('data-index', data.indexOf(item));
            //  itemContainer.addEventListener("click", focusIn)
             container.appendChild(itemContainer)
            
             


            if(item['Image']){
                const itemImage = document.createElement('img');
                itemImage.setAttribute('class', "mainImage")
                itemImage.setAttribute('data-index', data.indexOf(item));
                itemImage.addEventListener("click", focusIn)
                itemContainer.appendChild(itemImage);
                document.querySelector('.mainImage').src = item['Image'];
               }

             const title = document.createElement('h3');
             title.innerHTML = item['Item Description'];
             title.setAttribute('data-index', data.indexOf(item));
             title.addEventListener("click", focusIn)
             itemContainer.appendChild(title);

            //  const itemNum = document.createElement('p');
            //  itemNum.innerHTML = `${item['Item']}`;
            //  itemContainer.appendChild(itemNum);

             const price = document.createElement('p');
             price.innerHTML = `$${item['Standard Cost']}`;
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




